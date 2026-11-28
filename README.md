# metabolic-care-urls

Marketing, legal and support site for the **Krestrel** app (formerly Metabolic Care), served via
GitHub Pages at www.krestrel.com. It also hosts the URLs Apple App Review requires (Privacy Policy +
Support), the OAuth consent page for the AI connection, and the invite fallback page.

## Pages

| Page | Path | Notes |
|---|---|---|
| Home | `/` | Marketing homepage: download, features, AI, FAQ. Uses `assets/site.css`. |
| Features | `/features/` | One section per feature, with anchors (`#protein`, `#diet`, `#feeds`, `#labs`, `#growth`, `#meds`, `#appointments`, `#health-log`, `#emergency`, `#circle`, `#ai`, `#reports`, `#everyday`). |
| Works with AI | `/ai/` | Claude & ChatGPT connector landing page. |
| Blog | `/blog/` | Index + posts in `blog/<slug>/`. Copy `blog/_template/` to start a post. |
| Privacy Policy | `/privacy/` | App links here (`src/lib/legal.ts`). |
| Terms of Use | `/terms/` | App links here. |
| Support | `/support/` | App links here. Guides: `support/connect-claude/`, `support/connect-chatgpt/`. |
| OAuth consent | `/oauth/consent/` | Used by the ChatGPT/Claude connection. Don't touch without testing the MCP sign-in. |
| Invite fallback | `/invite/accept/` | Universal-link fallback for caregiver invites. |

Public URLs are on the `www.krestrel.com` custom domain (`CNAME`).

## Two stylesheets — keep them separate

- `assets/style.css`: the original styles. **The app-facing pages depend on it** (privacy, terms,
  support, oauth consent, invite). Don't restyle or rename its rules.
- `assets/site.css`: the marketing design ("Warm Editorial"). Every class is prefixed `k-`.
  Loaded by the homepage, `/features/`, `/ai/` and the blog (blog posts load both files).

## Screenshots

`assets/screens/<name>.webp` (+ `<name>-dark.webp`), 786 px wide, shown in a CSS phone frame
(`.k-phone`, `object-fit: cover; object-position: top`). Pages pick light/dark with `<picture>`.
Names: `today`, `diet`, `feeds`, `labs`, `growth`, `emergency`, `circle`, `ai`, `aiaccess`.

> **The current images are drawn placeholders with a fictional child**, not real captures. Replace
> them with iOS Simulator captures (iPhone 6.9", status bar at 9:41) of an account holding only
> fictional data, resized to 786 px wide, same file names. No page changes are needed.
> Regenerate `assets/og/*.png` (1200×630 share images) afterwards if their screens changed.

## SEO and AI search

- Every page: canonical URL, Open Graph/Twitter tags with a 1200×630 image in `assets/og/`, the
  `apple-itunes-app` Smart App Banner meta, and JSON-LD (`Organization`, `WebSite`,
  `MobileApplication`, `FAQPage`, `BreadcrumbList`, `BlogPosting`, `HowTo` as relevant).
- Blog posts open with a **Key takeaways** box and use question-shaped H2s plus a visible FAQ that
  matches the `FAQPage` JSON-LD. See `blog/_template/`.
- `llms.txt` summarises the product for AI assistants; `robots.txt` allows AI search crawlers.
- When adding a page: add it to `sitemap.xml` (with `lastmod`), `llms.txt`, and the blog index.
- Feature list for writing posts: `docs/FEATURES_FOR_BLOG.md`. AI-directory promotion:
  `docs/AI_PROMOTION.md`.
- The App Store button is a stand-in styled like Apple's badge. Swap in the official badge SVG
  from Apple's marketing tools when you have it; links carry `data-store-url` for easy search.

## Enable GitHub Pages (one time)

1. Push this repo to `https://github.com/baochicabowwow/metabolic-care-urls`.
2. On GitHub: **Settings → Pages**.
3. **Source:** *Deploy from a branch*. **Branch:** `main`, folder **`/ (root)`**. Save.
4. Wait ~1 minute, then confirm the URLs above load over **HTTPS**.

`.nojekyll` is included so GitHub serves the files as-is.

## Support contact

The public support/privacy email is set to **support@krestrel.com** across all pages.
To change it, find-and-replace that address in the `*/index.html` files.

## Custom domain — krestrel.com (planned)

The site will move to **krestrel.com**. When ready:

1. Add a `CNAME` file to this repo containing `krestrel.com` (or `www.krestrel.com`).
2. Point DNS at GitHub Pages (A/AAAA records for the apex, or a `CNAME` record for `www`).
3. In **Settings → Pages**, set the custom domain and enable **Enforce HTTPS**.
4. Update the URL constants in the app's `src/lib/legal.ts` to the new domain, e.g.
   `https://krestrel.com/privacy/`, `/support/`, and `/terms/`.

Until then the pages are served from the `github.io` URLs listed above.

## App / Universal Links (invite deep linking)

These files let invite links open the app directly instead of the browser:

| File | Platform | Purpose |
|---|---|---|
| `.well-known/apple-app-site-association` | iOS | Associates `www.krestrel.com` with the app (`K9B98RPW3T.com.metaboliccare.app`) for the `/invite/accept` path. Served extensionless. |
| `.well-known/assetlinks.json` | Android | Verifies the app (`com.metaboliccare.app`) for the domain. **Replace `REPLACE_WITH_SHA256_FINGERPRINT`** with the app-signing SHA-256 from `eas credentials -p android` (or Play Console → App integrity → App signing key certificate). |
| `invite/accept/index.html` | Web fallback | Shown to visitors **without** the app installed (universal links only open the app when it's present). Offers copy-link / open-in-app and paste instructions. |

The operative host is **`www.krestrel.com`** (this repo's `CNAME`). The app side is
configured in the app repo's `app.json` (`ios.associatedDomains: applinks:www.krestrel.com`
and an auto-verified Android intent filter for `www.krestrel.com/invite/accept`); those
are native changes that need a new EAS build to take effect. Invite emails switch to the
tappable `https://www.krestrel.com/invite/accept?token=…` link once the `send-invite-email`
edge function has `APP_URL=https://www.krestrel.com` set.

Verify after deploy (must be `200`, JSON, no redirect):

```
curl -i https://www.krestrel.com/.well-known/apple-app-site-association
curl -i https://www.krestrel.com/.well-known/assetlinks.json
```

Apple's CDN caches the association for up to ~24 h; check it at
`https://app-site-association.cdn-apple.com/a/v1/www.krestrel.com`.

## Brand assets

`assets/brand/` holds the Krestrel mark — the "feather holder" chick from the app's
`assets/branding/concept-4c-feather-holder.svg`. The glyph is scaled about the canvas
centre so it fills the frame instead of floating in whitespace, matching the app's
`scripts/generate-icons.mjs`:

| File | Size | Glyph coverage |
|---|---|---|
| `icon.svg` | vector | 86% — header logo + SVG favicon |
| `web-icon-512.png` | 512 | 86% — PWA / social |
| `apple-touch-icon.png` | 180 | 86% — iOS home screen |
| `favicon-32.png` / `favicon-16.png` | 32 / 16 | 90% — fill harder so the mark reads |

Backgrounds are full-bleed cream (`#FBF6EF`), square on purpose: iOS masks the corners
and the site rounds the header logo via CSS. To regenerate after the mascot changes, run
the app repo's `node scripts/generate-icons.mjs` math against the same source SVG.

## Editing

Plain static HTML — no build step. Shared styles live in `assets/style.css`.
Update the "Last updated" date at the top of a page whenever you change its content.

> The legal text here is an engineering starting point, not legal advice. Have counsel
> review the Privacy Policy and Terms before publishing.
