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

All data is **linked to the user's identity**, **none used for tracking**, all for **App Functionality**.

| Data type | Collected | Linked | Tracking | Purpose |
|---|---|---|---|---|
| Health &amp; Fitness (child diet, labs, seizures/adverse events, meds, growth) | Yes | Yes | No | App Functionality |
| Contact Info (caregiver name, email) | Yes | Yes | No | App Functionality |
| User Content (photos, notes) | Yes | Yes | No | App Functionality |
| Identifiers (account / user ID) | Yes | Yes | No | App Functionality |
| Diagnostics, Usage Data, Advertising, Location, Purchases | **No** | — | — | — |

## App Review Information → Notes

> Krestrel is a direct-to-consumer caregiver tool. A parent/legal guardian tracks
> their own child's metabolic diet and care (growth, labs, medications, adverse events such
> as seizures, meals, appointments, photos, notes). At sign-up the user must confirm they are
> the parent/legal guardian, are 18+, and agree to the Privacy Policy before any data is
> collected. Nutrient values are USDA references shown with an in-app "not medical advice"
> disclaimer; the app provides no diagnosis. The app uses **no HealthKit/CareKit**, contains
> no advertising or third-party analytics, and performs no tracking (privacy manifest declares
> tracking = false). Account email is verified with an in-app 6-digit code (no deep link).
> Users can permanently delete their account and all data from Settings → Danger zone.
> A pre-confirmed demo account seeded with sample data is provided below.

## App Review Information → Sign-In required

- **Sign-In required:** Yes
- **Username:** _<pre-confirmed demo account email>_
- **Password:** _<demo password>_
- Seed it with a child profile plus a few meals, labs, and adverse events so the reviewer can
  see the full flow without doing the email-code step.

## Store listing

- **Category:** Medical (or Health &amp; Fitness)
- **Age rating:** complete the questionnaire; medical/treatment info → typically 17+
- **Screenshots:** 6.7" and 6.5" iPhone (and iPad if `supportsTablet` stays true)
- **Encryption:** `ITSAppUsesNonExemptEncryption = false` (already in `app.json`)

## Guidelines this submission satisfies

- **5.1.1** consent + secure handling + in-app account deletion
- **5.1.3** no HealthKit/CareKit; health data never used for ads/marketing
- **1.4.1 / medical** USDA references + visible "not medical advice" disclaimer
- **2.1** working seeded demo account
- **2.5.x** only requests permissions used (camera + photos; microphone removed)
