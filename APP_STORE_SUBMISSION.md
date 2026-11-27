# App Store Connect — copy/paste submission reference

Everything to paste into **App Store Connect** for Krestrel, kept next to the legal
site so the URLs and disclosures stay in sync. See the app repo's
`docs/APP_STORE_CHECKLIST.md` for the code/Supabase side.

## URLs

- **Privacy Policy URL:** `https://baochicabowwow.github.io/metabolic-care-urls/privacy/`
- **Support URL:** `https://baochicabowwow.github.io/metabolic-care-urls/support/`
- **Marketing URL (optional):** `https://baochicabowwow.github.io/metabolic-care-urls/`
- **Terms of Use / EULA URL:** `https://baochicabowwow.github.io/metabolic-care-urls/terms/`

## App Privacy ("nutrition labels")

All user-entered data is **linked to the user's identity**; crash data is **not linked**;
**nothing is used for tracking**; everything is for **App Functionality**.

| Data type | Collected | Linked | Tracking | Purpose |
|---|---|---|---|---|
| Health (child diet, labs, seizures/adverse events, meds, growth) | Yes | Yes | No | App Functionality |
| Contact Info — Name (caregiver + child) | Yes | Yes | No | App Functionality |
| Contact Info — Email (caregiver + invited caregivers) | Yes | Yes | No | App Functionality |
| Contact Info — Phone Number (emergency-plan contacts) | Yes | Yes | No | App Functionality |
| User Content — Other (free-text notes) | Yes | Yes | No | App Functionality |
| Identifiers — User ID (account / user ID) | Yes | Yes | No | App Functionality |
| Diagnostics — Crash Data (Sentry crash reports) | Yes | **No** | No | App Functionality |
| Everything else (Fitness, Financial, Location, Sensitive Info, Contacts, Photos/Videos, Audio, Device ID, Purchases, Usage Data, Diagnostics — Performance/Other, Advertising) | **No** | — | — | — |

**Notes on specific rows:**

- **Diagnostics — Crash Data** is collected via Sentry (crash reporting only; no tracing, replay,
  or screenshots). Declare it **Not linked to identity**: the app's Sentry config
  (`src/lib/sentry.ts` in the app repo) strips the user object, drops console breadcrumbs, and
  removes URL query strings before anything is sent. **If a user id/email is ever attached to
  Sentry events, flip this row to Linked = Yes.** Add **Performance Data** only if tracing is
  turned on (`tracesSampleRate` > 0). This is diagnostics, not "tracking" — the privacy
  manifest's `NSPrivacyTracking` stays `false`.

- **Phone Number** is collected because the emergency-plan feature stores contact phone
  numbers (`app/(app)/emergency/edit.tsx`). Declare it even though it is contact info for
  third parties (doctors/family) the caregiver enters — the app still stores phone-number data.
- **Photos or Videos** is **excluded** because the photo-sharing feature is flag-gated off in
  production (`photoSharing: false`; `EXPO_PUBLIC_FEATURE_PHOTO_SHARING` is not set in the
  `eas.json` production profile), so no images are uploaded. Profile avatars are initials, not
  photos. **If you ever ship with the photo flag on, add Photos or Videos here** — and note the
  build still requests camera/photo-library permissions, so decide whether to strip those for a
  photos-off release (2.5.x unused-permission risk).
- **Sensitive Info** is **excluded**: metabolic conditions (PDE/PKU, etc.) are declared under
  **Health**, per Apple's guidance that Health covers "any other user-provided health or medical
  data." The Sensitive Info "genetic information" bucket means DNA/genetic-test data, not a
  diagnosis name. Revisit with counsel if you want to be maximally conservative.
- For **every** collected row except Crash Data: **Linked to identity = Yes, Used for tracking =
  No, Purpose = App Functionality only.** Crash Data is the one **Not linked** row.

## App Review Information → Notes

> Krestrel is a direct-to-consumer caregiver tool. A parent/legal guardian tracks
> their own child's metabolic diet and care (growth, labs, medications, adverse events such
> as seizures, meals, appointments, notes). At sign-up the user must confirm they are
> the parent/legal guardian, are 18+, and agree to the Privacy Policy before any data is
> collected. Nutrient values are reference figures from public food-composition tables (USDA
> FoodData Central and other national databases, credited in Settings → About → Food data
> sources), shown with an in-app "not medical advice" disclaimer; the app provides no
> diagnosis. Families track total protein against a range their dietitian sets; any
> amino-acid figure (e.g. lysine) is labelled as an estimate and has no limit attached. The app uses **no HealthKit/CareKit**, contains
> no advertising or third-party analytics, and performs no tracking (privacy manifest declares
> tracking = false). Anonymous crash reports are sent to Sentry for diagnostics only — not
> linked to the user's identity and never containing health data.
> Account email is verified with an in-app 6-digit code (no deep link).
> Users can permanently delete their account and all data from Settings → Danger zone.
> A pre-confirmed demo account seeded with sample data is provided below.

## App Review Information → Sign-In required

- **Sign-In required:** Yes
- **Username:** _<pre-confirmed demo account email>_
- **Password:** _<demo password>_
- Seed it with a child profile plus a few meals, labs, and adverse events so the reviewer can
  see the full flow without doing the email-code step. Since 1.4.0 the child needs a
  **protein range** (not amino-acid limits, or the reviewer lands on the "Switch to protein"
  prompt), meals whose foods carry protein, and one dietitian estimate factor so a
  "≈ … mg lysine (estimate)" line shows.
- Since 1.6.0, also add the connected-AI-app seed under **AI features → Demo account seed**
  below, and one lab result saved as **less than** (e.g. `<2`) so that display shows.

## What's New (version 1.6.0)

```
Connect an AI assistant. Link your own ChatGPT or Claude account to ask about your child's logs or add entries by chat. You choose, per child and per area, what it can see or add, and you can change or remove access anytime in Settings, under AI & connected apps. Lab values an AI reads from a report wait for you to confirm.
• Primary caregivers choose which caregivers may connect AI apps (off by default).
• Lab results reported as "less than" a value can now be saved, and a range with only an upper limit can be entered.

Quality of life improvements:
• Busy moments on the Timeline day view are easier to read: overlapping events group into one tappable chip, you can pinch to zoom, and a long-press shows an event's full details.
• Late-night entries that count toward the previous day now show their weekday.

Bug Fixes:
• Fixed: emailed history exports now include the whole date range. Large exports used to stop early.
```

App Store Connect rejects this field with "invalid characters" if it contains `<` or `>`
(it reads them as HTML), so spell out "less than" and avoid arrows like `→`.

Naming ChatGPT and Claude here is descriptive and accurate (they're the only AI apps that can
connect). They stay out of the **name, subtitle and keywords** (2.3 / 5.2). Stricter option:
"Connect an AI assistant that supports MCP".

## Store listing

- **Category:** Health &amp; Fitness (primary) — accurate for a diet/care journal and avoids
  the extra scrutiny of the Medical category
- **Age rating:** complete the current questionnaire honestly (declare medical/wellness
  topics where true) and accept whatever rating it produces
- **Screenshots:** one iPhone set (6.9" or 6.5") **and** an iPad 13" set while
  `supportsTablet` stays true. Retake both for 1.4.0 — the pre-1.4 shots show lysine limits.
  Cover the protein card on Today, "g left today" on the meal log, and the raw/cooked form
  picker in food search.
- **Encryption:** `ITSAppUsesNonExemptEncryption = false` (already in `app.json`)

### Name (Localizable Information)

```
Krestrel
```

### Subtitle (Localizable Information, 30-char limit)

```
Metabolic diet & care tracker
```

### Keywords (100-char limit, comma-separated)

```
metabolic,protein,rare disease,caregiver,diet log,PDE,food diary,care circle,baby tracker
```

Don't repeat words already in the name or subtitle — Apple ignores duplicates.

### Description

```
Krestrel is a record-keeping tool for parents and legal guardians of children with metabolic conditions.

LOG MEALS AND PROTEIN
Record what your child eats. Krestrel calculates per-meal and daily protein from public food-composition reference tables — USDA FoodData Central and national tables from Germany, Canada, the UK and France — and shows it against the minimum and maximum you enter from your child's care team, including how much is left today. If your dietitian gives you a factor, Krestrel can also show an amino-acid estimate such as lysine, clearly labelled as an estimate. Krestrel does not suggest, set, or adjust any limit.

TRACK DAILY CARE
Feeding, sleep, diapers, medications given, growth measurements, milestones, appointments, and health-log entries, in one timeline your whole care circle shares.

RECORD LAB RESULTS
Enter bloodwork values and the reference range your clinician provides, and view them on a trend chart.

SHARE WITH YOUR CARE CIRCLE
Invite the other parent, family, or caregivers with per-person permissions.

PRIVATE BY DESIGN
No ads, no third-party analytics, no tracking. Your data is used only to run the features you use, and you can permanently delete your account and all data in Settings.

Krestrel is not a medical device and does not provide medical advice, diagnosis, or treatment. Nutrient figures are general references that may not match a specific product — always confirm values and your child's protein range with your metabolic dietitian.
```

Every sentence above is verifiable against the app — keep it that way when editing:
no outcome promises, no "safe" / "accurate" / "precision" claims. Before pasting the 1.4.0
copy, check that Settings → About → Food data sources in the release build lists the tables
the description names (the curated food list must be loaded and published first).

## Guidelines this submission satisfies

- **5.1.1** consent + secure handling + in-app account deletion
- **5.1.3** no HealthKit/CareKit; health data never used for ads/marketing
- **1.4.1 / medical** public reference tables (credited in-app) + visible "not medical
  advice" disclaimer; amino-acid figures labelled as estimates
- **2.1** working seeded demo account
- **2.5.x** requests no camera/photo/microphone permissions in v1 — photo sharing is
  flag-gated off and its native module is excluded from the build (re-add the permissions
  when the feature ships)

## AI features (connected AI apps / MCP) — ships in 1.6.0

Full background: `docs/MCP_ARCHITECTURE.md` §9 in the app repo. Paste the
items below into App Store Connect for **1.6.0**, the first build with
**Settings → AI & connected apps** turned on (feature flag `aiConnections: true`).
Go-live steps A–I in the app repo's `docs/MCP_SETUP.md` must be done before submitting:
the reviewer has to be able to reach and use the feature.

The app itself sends nothing to an AI company. The optional Claude mode for reading lab PDFs
was removed, so there's no in-app AI processing to disclose.

### App Privacy ("nutrition labels")

**Expected: no new rows, nothing marked Tracking.** The data involved is the
**Health** data already declared (Linked, App Functionality).

- **Connected AI apps:** that sharing is server-to-server, at the parent's
  request, started from the other app. It isn't collection by this iOS app.

Re-confirm these answers with counsel when the privacy policy is reviewed.

### App Review Information → Notes (append)

> **Connected AI apps.** Parents can optionally connect their own ChatGPT or
> Claude account. The connection is started from inside that AI app (not from this
> app), signs in on our website, and shows a consent screen that names the app and
> lists, per child and per area (e.g. "Labs: read", "Diet & protein: read & add"),
> what it may see or add. Nothing is shared before the parent approves. With "read &
> add" access an AI app can add new entries such as a meal, feed, medicine dose,
> provider or appointment. These appear in the app under the parent who connected it,
> and the parent can edit or delete them there. An AI app can never change or delete
> existing entries or account settings. Lab values an AI app reads from a report are
> saved only as drafts the parent must confirm. Settings → AI & connected apps lists
> each connection, what it can access and its recent activity, and lets the parent
> change access or disconnect. A primary caregiver can turn AI apps off for the whole
> family and decides per caregiver whether they may connect at all (off by default).
> The app itself sends nothing to any AI company. The demo account includes a sample
> connection, activity entries and a pending lab draft so these screens can be
> reviewed. No data is used for advertising or tracking.

### Demo account seed (add)

- Family AI switch **on**, and the demo primary's own **Connect AI apps** permission on.
- One `mcp_grants` connection, e.g. client name "Claude (demo)": Diet & protein, feeds and
  labs set to read & add.
- A few `mcp_audit` rows.
- One pending `ai_drafts` row of kind `lab_results`.
- Optional: one meal logged by the demo connection, so an AI-added entry shows in the meal log.

### Metadata

- No "ChatGPT" or "Claude" in the app name, subtitle or keywords (2.3 / 5.2).
- If the description mentions it, say "Connect an AI assistant that supports
  MCP to ask questions about your logs". Don't suggest diagnosis or advice.

### What does NOT need a submission

These are server-side changes, so they need no new build or App Review:

- the MCP gateway and its updates;
- the database migrations (045–054 in the app repo), the access token hook and turning on dynamic client registration;
- the consent page;
- the planned switch to asymmetric JWT signing keys.

Installed app versions keep working as long as the legacy JWT secret is **not revoked**: the
app's built-in `anon` key is signed with it. Retiring that key later needs an app update that
uses a publishable key, delivered either by Expo update (`eas update`, no review) or by a
normal release. Background: `docs/MCP_PLAN.md` section 4 in the app repo.

### Guidelines

- **5.1.2(i)** — explicit, named consent before any data goes to a third-party
  AI.
- **5.1.1(v)** — deleting the account cuts off every connected AI app.
