# metabolic-care-urls

Public legal &amp; support site for the **Metabolic Care** app, served via GitHub Pages.
These are the URLs Apple App Review and Google Play require (Privacy Policy + Support),
plus supporting pages.

## Pages

| Page | Path | Public URL |
|---|---|---|
| Home | `/` | https://baochicabowwow.github.io/metabolic-care-urls/ |
| Privacy Policy | `/privacy/` | https://baochicabowwow.github.io/metabolic-care-urls/privacy/ |
| Terms of Use | `/terms/` | https://baochicabowwow.github.io/metabolic-care-urls/terms/ |
| Support | `/support/` | https://baochicabowwow.github.io/metabolic-care-urls/support/ |

The app reads the Privacy and Support URLs from `src/lib/legal.ts` in the app repo.

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

## Editing

Plain static HTML — no build step. Shared styles live in `assets/style.css`.
Update the "Last updated" date at the top of a page whenever you change its content.

> The legal text here is an engineering starting point, not legal advice. Have counsel
> review the Privacy Policy and Terms before publishing.
