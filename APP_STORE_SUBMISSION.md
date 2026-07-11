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
| Health (child diet, labs, seizures/adverse events, meds, growth) | Yes | Yes | No | App Functionality |
| Contact Info — Name (caregiver + child) | Yes | Yes | No | App Functionality |
| Contact Info — Email (caregiver + invited caregivers) | Yes | Yes | No | App Functionality |
| Contact Info — Phone Number (emergency-plan contacts) | Yes | Yes | No | App Functionality |
| User Content — Other (free-text notes) | Yes | Yes | No | App Functionality |
| Identifiers — User ID (account / user ID) | Yes | Yes | No | App Functionality |
| Everything else (Fitness, Financial, Location, Sensitive Info, Contacts, Photos/Videos, Audio, Device ID, Purchases, Usage Data, Diagnostics, Advertising) | **No** | — | — | — |

**Notes on specific rows:**

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
- For **every** collected row: **Linked to identity = Yes, Used for tracking = No, Purpose =
  App Functionality only.**

## App Review Information → Notes

> Krestrel is a direct-to-consumer caregiver tool. A parent/legal guardian tracks
> their own child's metabolic diet and care (growth, labs, medications, adverse events such
> as seizures, meals, appointments, notes). At sign-up the user must confirm they are
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

- **Category:** Health &amp; Fitness (primary) — accurate for a diet/care journal and avoids
  the extra scrutiny of the Medical category
- **Age rating:** complete the current questionnaire honestly (declare medical/wellness
  topics where true) and accept whatever rating it produces
- **Screenshots:** one iPhone set (6.9" or 6.5") **and** an iPad 13" set while
  `supportsTablet` stays true
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
metabolic,lysine,rare disease,caregiver,diet log,PDE,food diary,care circle,baby tracker
```

Don't repeat words already in the name or subtitle — Apple ignores duplicates.

### Description

```
Krestrel is a record-keeping tool for parents and legal guardians of children with metabolic conditions.

LOG MEALS AND NUTRIENTS
Record what your child eats. Krestrel calculates per-meal and daily nutrient totals from USDA FoodData Central reference values and shows them alongside the limits you enter from your child's care team. Krestrel does not suggest, set, or adjust any limit.

TRACK DAILY CARE
Feeding, sleep, diapers, medications given, growth measurements, milestones, appointments, and health-log entries, in one timeline your whole care circle shares.

RECORD LAB RESULTS
Enter bloodwork values and the reference range your clinician provides, and view them on a trend chart.

SHARE WITH YOUR CARE CIRCLE
Invite the other parent, family, or caregivers with per-person permissions.

PRIVATE BY DESIGN
No ads, no third-party analytics, no tracking. Your data is used only to run the features you use, and you can permanently delete your account and all data in Settings.

Krestrel is not a medical device and does not provide medical advice, diagnosis, or treatment. Nutrient figures are general references that may not match a specific product — always confirm values and your child's limits with your metabolic dietitian.
```

Every sentence above is verifiable against the app — keep it that way when editing:
no outcome promises, no "safe" / "accurate" / "precision" claims.

## Guidelines this submission satisfies

- **5.1.1** consent + secure handling + in-app account deletion
- **5.1.3** no HealthKit/CareKit; health data never used for ads/marketing
- **1.4.1 / medical** USDA references + visible "not medical advice" disclaimer
- **2.1** working seeded demo account
- **2.5.x** requests no camera/photo/microphone permissions in v1 — photo sharing is
  flag-gated off and its native module is excluded from the build (re-add the permissions
  when the feature ships)
