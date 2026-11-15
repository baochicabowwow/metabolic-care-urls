# Vendored libraries

- `supabase-js-2.108.2.js` — the browser (UMD) build of
  [`@supabase/supabase-js`](https://github.com/supabase/supabase-js) 2.108.2,
  copied from `node_modules/@supabase/supabase-js/dist/umd/supabase.js`. MIT
  licensed (`LICENSE-supabase-js`).

Hosted here rather than loaded from a CDN so the OAuth consent page runs no
third-party code (its Content-Security-Policy allows scripts from this site
only). To upgrade, copy the new build in, rename it with the new version, and
update the `<script src>` in `../consent/index.html`.
