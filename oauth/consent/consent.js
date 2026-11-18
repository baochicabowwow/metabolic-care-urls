// OAuth consent page for connecting an AI app (ChatGPT, Claude, …) to Krestrel.
//
// Supabase Auth's OAuth 2.1 server sends the parent here as
//   <site>/oauth/consent/?authorization_id=…
// The page signs them in with their KRESTREL account, shows which app is asking,
// lets them choose — per child and per area — what it may read or add, stores
// that choice (mcp_grants, via the mcp_set_grants RPC), then approves or denies
// the request. The MCP gateway and the database enforce the choice.
// Design: docs/MCP_ARCHITECTURE.md in the app repo.
//
// Security notes:
//   * The client name and redirect come from the AI app's own registration and
//     are untrusted: they are only ever set with textContent.
//   * Clickjacking: GitHub Pages can't send frame-ancestors, so the page refuses
//     to run inside a frame.
(function () {
  'use strict';

  var CONSENT_VERSION = 'mcp-consent-2026-11';

  // AI apps Krestrel connects to, by their exact OAuth callback. Must match
  // mcp_redirect_trusted in the app repo's migration 049, which is what
  // actually enforces it: an app is refused unless EVERY redirect address it
  // registered is one of these, or http on the parent's own computer
  // (loopback). Anyone can register an app (ChatGPT needs that), so a
  // look-alike would otherwise get its own sign-in code. Exact paths, so an
  // open redirect elsewhere on these sites can't bounce a code onward.
  var CALLBACKS = [
    { app: 'ChatGPT', re: /^https:\/\/chatgpt\.com\/connector\/oauth\/[A-Za-z0-9_-]{1,128}$/ },
    { app: 'ChatGPT', re: /^https:\/\/chatgpt\.com\/connector_platform_oauth_redirect$/ },
    { app: 'Claude', re: /^https:\/\/claude\.(ai|com)\/api\/mcp\/auth_callback$/ },
  ];
  var LOOPBACK = /^http:\/\/(127\.0\.0\.1|localhost|\[::1\])(:[0-9]{1,5})?(\/|$)/;

  var CAPS = [
    { key: 'feeds', label: 'Feeds, sleep, diapers & growth', hint: 'Bottles, nursing, sleep, diapers, temperature, weight', canWrite: true, def: 'read' },
    { key: 'diet', label: 'Diet & protein', hint: 'Meals, daily protein, the protein range from your care team', canWrite: false, def: 'read' },
    { key: 'labs', label: 'Labs', hint: 'Blood results and target ranges. “Read & add” lets it propose values for you to confirm', canWrite: true, def: 'none', perm: 'can_view_labs' },
    { key: 'meds', label: 'Medicines', hint: 'Medication list and doses given', canWrite: true, def: 'none' },
    { key: 'appointments', label: 'Appointments', hint: 'Providers, visits, questions for the next visit', canWrite: true, def: 'none', perm: 'can_view_appointments' },
    { key: 'health', label: 'Health log & reactions', hint: 'Seizures and other health events, food reactions', canWrite: false, def: 'none', perm: 'can_view_health' },
    { key: 'emergency', label: 'Emergency plan', hint: 'Sick-day instructions and contacts (read only)', canWrite: false, def: 'none' },
  ];

  var $ = function (id) { return document.getElementById(id); };
  var show = function (id) {
    ['loading', 'fatal', 'signin', 'untrusted', 'blocked', 'not-allowed', 'remembered', 'cancelled', 'consent'].forEach(function (s) { $(s).hidden = s !== id; });
  };
  var fatal = function (msg) { $('fatal-msg').textContent = msg; show('fatal'); };

  if (window.top !== window.self) {
    document.body.textContent = 'For your security, this page must be opened in its own window.';
    return;
  }

  var cfg = window.KRESTREL_SUPABASE || {};
  if (!window.supabase || !cfg.url || /YOUR-/.test(cfg.url + cfg.anonKey)) {
    fatal('This page isn’t configured yet (oauth/config.js).');
    return;
  }
  var authorizationId = new URLSearchParams(location.search).get('authorization_id');
  if (!authorizationId || !/^[A-Za-z0-9_-]{8,200}$/.test(authorizationId)) {
    fatal('This link is missing its authorization code. Start connecting again from your AI app.');
    return;
  }

  var sb = window.supabase.createClient(cfg.url, cfg.anonKey, {
    auth: { persistSession: true, storageKey: 'krestrel-oauth-consent', detectSessionInUrl: false },
  });

  var details = null; // { authorization_id, client, redirect_uri, … } or { redirect_url }
  var children = [];  // [{ id, name, perms, canLog }]
  var choices = {};   // childId → { include: bool, caps: { key: 'none'|'read'|'read_write' } }

  // ── Sign-in ──────────────────────────────────────────────────────────────
  var codeMode = false;
  $('use-code').addEventListener('click', function () {
    codeMode = !codeMode;
    $('password-block').hidden = codeMode;
    $('code-block').hidden = true;
    $('use-code').textContent = codeMode ? 'Use my password instead' : 'Email me a sign-in code instead';
    $('signin-submit').textContent = codeMode ? 'Email me a code' : 'Sign in';
    $('signin-error').textContent = '';
  });

  $('signin-form').addEventListener('submit', async function (e) {
    e.preventDefault();
    var email = $('email').value.trim();
    $('signin-error').textContent = '';
    $('signin-submit').disabled = true;
    try {
      var res;
      if (!codeMode) {
        res = await sb.auth.signInWithPassword({ email: email, password: $('password').value });
      } else if ($('code-block').hidden) {
        res = await sb.auth.signInWithOtp({ email: email, options: { shouldCreateUser: false } });
        if (!res.error) {
          $('code-block').hidden = false;
          $('signin-submit').textContent = 'Sign in';
          $('code').focus();
          return;
        }
      } else {
        res = await sb.auth.verifyOtp({ email: email, token: $('code').value.trim(), type: 'email' });
      }
      if (res.error) throw res.error;
      await start();
    } catch (err) {
      $('signin-error').textContent = (err && err.message) || 'Sign-in failed.';
    } finally {
      $('signin-submit').disabled = false;
    }
  });

  $('signout').addEventListener('click', async function () {
    await sb.auth.signOut();
    show('signin');
  });

  // ── Consent ──────────────────────────────────────────────────────────────
  function el(tag, attrs, text) {
    var n = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) { n.setAttribute(k, attrs[k]); });
    if (text != null) n.textContent = text;
    return n;
  }

  function renderChildren() {
    var box = $('children');
    box.textContent = '';
    children.forEach(function (child) {
      var c = choices[child.id];
      var card = el('div', { class: 'child' });
      var head = el('div', { class: 'row' });
      var cb = el('input', { type: 'checkbox', id: 'child-' + child.id });
      cb.checked = c.include;
      cb.addEventListener('change', function () { c.include = cb.checked; list.hidden = !cb.checked; });
      head.appendChild(cb);
      var h = el('h3', {});
      h.appendChild(el('label', { for: 'child-' + child.id }, 'Share ' + child.name));
      head.appendChild(h);
      card.appendChild(head);

      var list = el('div', {});
      list.hidden = !c.include;
      CAPS.forEach(function (cap) {
        if (cap.perm && !child.perms[cap.perm]) return; // hidden from this caregiver in Krestrel
        var row = el('div', { class: 'cap' });
        var id = 'cap-' + child.id + '-' + cap.key;
        var label = el('label', { for: id }, cap.label);
        label.appendChild(el('small', {}, cap.hint));
        row.appendChild(label);
        var sel = el('select', { id: id });
        sel.appendChild(el('option', { value: 'none' }, 'No access'));
        sel.appendChild(el('option', { value: 'read' }, 'Read'));
        if (cap.canWrite && child.canLog) sel.appendChild(el('option', { value: 'read_write' }, 'Read & add'));
        sel.value = c.caps[cap.key];
        sel.addEventListener('change', function () { c.caps[cap.key] = sel.value; });
        row.appendChild(sel);
        list.appendChild(row);
      });
      card.appendChild(list);
      box.appendChild(card);
    });
  }

  function grantsFromChoices() {
    var out = [];
    children.forEach(function (child) {
      var c = choices[child.id];
      if (!c.include) return;
      CAPS.forEach(function (cap) {
        var v = c.caps[cap.key];
        if (cap.perm && !child.perms[cap.perm]) return;
        if (v === 'read' || v === 'read_write') {
          out.push({ child_id: child.id, capability: cap.key, can_read: true, can_write: v === 'read_write' });
        }
      });
    });
    return out;
  }

  // A remembered approval's redirect_url already carries the sign-in code, so
  // following it IS approving. Cancelling therefore never follows it: it just
  // stops here, and the unused code expires.
  async function deny() {
    if (details && details.authorization_id) {
      await sb.auth.oauth.denyAuthorization(authorizationId); // redirects back to the AI app
    } else if (details && details.redirect_url) {
      show('cancelled');
    } else {
      history.back();
    }
  }
  $('deny').addEventListener('click', deny);
  $('blocked-deny').addEventListener('click', deny);
  $('not-allowed-deny').addEventListener('click', deny);
  $('untrusted-deny').addEventListener('click', deny);
  $('remembered-cancel').addEventListener('click', deny);
  $('remembered-continue').addEventListener('click', function () {
    // Only reachable for a trusted app (start() checks first).
    if (details && details.redirect_url) window.location.href = details.redirect_url;
  });

  $('allow').addEventListener('click', async function () {
    var grants = grantsFromChoices();
    $('consent-error').textContent = '';
    if (!grants.length) {
      $('consent-error').textContent = 'Choose at least one child and one area, or choose Don’t allow.';
      return;
    }
    $('allow').disabled = true;
    try {
      var days = parseInt($('expiry').value, 10);
      var expires = days ? new Date(Date.now() + days * 86400000).toISOString() : null;
      // Only a fresh request reaches the picker (a remembered one gets the
      // 'remembered' screen), so the client is always in the details.
      var clientId = details.client && details.client.id;
      var clientName = (details.client && details.client.name) || 'AI app';
      if (!clientId || !details.authorization_id) throw new Error('Could not identify the AI app.');
      var r = await sb.rpc('mcp_set_grants', {
        p_client_id: clientId,
        p_client_name: clientName || 'AI app',
        p_grants: grants,
        p_consent_version: CONSENT_VERSION,
        p_expires_at: expires,
      });
      if (r.error) throw r.error;
      var a = await sb.auth.oauth.approveAuthorization(authorizationId); // redirects back to the AI app
      if (a.error) throw a.error;
    } catch (err) {
      $('consent-error').textContent = (err && err.message) || 'Something went wrong. Try again.';
      $('allow').disabled = false;
    }
  });

  async function loadFamily(userId) {
    var m = await sb.from('circle_members')
      .select('care_circle_id, role, permissions, care_circles(ai_connections_allowed)')
      .eq('user_id', userId).eq('status', 'active');
    if (m.error) throw m.error;
    var memberships = m.data || [];
    if (!memberships.length) return { blocked: false, kids: [] };
    var allowed = memberships.filter(function (x) { return !x.care_circles || x.care_circles.ai_connections_allowed !== false; });
    if (!allowed.length) return { blocked: true, kids: [] };
    // A primary decides per caregiver whether they may connect AI apps (045).
    // Off unless explicitly on; primaries always may.
    allowed = allowed.filter(function (x) { return x.role === 'primary' || (x.permissions || {}).can_connect_ai === true; });
    if (!allowed.length) return { notAllowed: true, kids: [] };
    var byCircle = {};
    allowed.forEach(function (x) { byCircle[x.care_circle_id] = x; });
    var k = await sb.from('children').select('id, name, care_circle_id').in('care_circle_id', Object.keys(byCircle)).order('name');
    if (k.error) throw k.error;
    var kids = (k.data || []).map(function (c) {
      var mem = byCircle[c.care_circle_id];
      var p = mem.permissions || {};
      var primary = mem.role === 'primary';
      var flag = function (key) { return primary || p[key] !== false; };
      return {
        id: c.id,
        name: String(c.name || 'Child').split(' ')[0],
        canLog: primary || p.can_log === true,
        perms: { can_view_labs: flag('can_view_labs'), can_view_health: flag('can_view_health'), can_view_appointments: flag('can_view_appointments') },
      };
    });
    return { blocked: false, kids: kids };
  }

  async function start() {
    show('loading');
    var s = await sb.auth.getSession();
    var session = s.data && s.data.session;
    if (!session) { show('signin'); return; }

    var d = await sb.auth.oauth.getAuthorizationDetails(authorizationId);
    if (d.error) {
      fatal('This connection request has expired or was already used. Start connecting again from your AI app.');
      return;
    }
    details = d.data;

    // A remembered approval comes back as the final redirect, with the code
    // attached, so only then is the query ignored.
    var app = recogniseApp(details.redirect_uri || details.redirect_url || '', !details.redirect_uri);
    if (!app.trusted) {
      $('untrusted-host').textContent = app.host || 'an unknown address';
      show('untrusted');
      return;
    }

    // An already-approved app (consent remembered by Supabase) comes back with
    // a redirect_url that already carries its sign-in code, and no client
    // details. There's nothing to choose: following the link connects it with
    // the grants it already has. So say exactly that, warn, and wait for an
    // explicit Continue.
    if (!details.redirect_uri) {
      var name = app.app || 'The app on your computer';
      $('remembered-name').textContent = name;
      $('remembered-name-2').textContent = app.app || 'this app on your computer';
      $('remembered-host').textContent = app.host || 'your computer';
      show('remembered');
      return;
    }

    var fam = await loadFamily(session.user.id);
    if (fam.blocked) { show('blocked'); return; }
    if (fam.notAllowed) { show('not-allowed'); return; }
    if (!fam.kids.length) {
      fatal('There are no children in your Krestrel account yet. Add a child in the app, then connect again.');
      return;
    }
    children = fam.kids;
    children.forEach(function (child) {
      var caps = {};
      CAPS.forEach(function (cap) { caps[cap.key] = cap.def; });
      choices[child.id] = { include: true, caps: caps };
    });

    // Name the app by where its sign-in returns, not by the name it gave
    // itself: anyone can register an app called "Krestrel Assistant".
    var registered = (details.client && details.client.name) || '';
    $('client-name').textContent = app.app || 'an app on your computer';
    $('client-host').textContent = app.host;
    $('client-badge').textContent = app.app ? 'Recognised: ' + app.app : 'App on your computer';
    $('client-badge').className = 'badge';
    $('client-registered').textContent = registered ? 'It registered itself as “' + registered + '”.' : '';
    $('signed-in-as').textContent = session.user.email || 'your account';
    renderChildren();
    show('consent');
  }

  // Same rules as mcp_redirect_trusted (migration 049). Matches the raw
  // address, not a browser-normalised one, so "/x/../" tricks don't pass here
  // either. Returns { trusted, app ('ChatGPT' | 'Claude' | null for local), host }.
  function recogniseApp(redirect, isFinalRedirect) {
    var raw = String(redirect || '').trim();
    var host = '';
    try { host = new URL(raw).host; } catch (_) {}
    var base = isFinalRedirect ? raw.split(/[?#]/)[0] : raw;
    for (var i = 0; i < CALLBACKS.length; i++) {
      if (CALLBACKS[i].re.test(base)) return { trusted: true, app: CALLBACKS[i].app, host: host };
    }
    if (LOOPBACK.test(base)) return { trusted: true, app: null, host: host };
    return { trusted: false, app: null, host: host };
  }

  start().catch(function (err) {
    fatal((err && err.message) || 'Something went wrong.');
  });
})();
