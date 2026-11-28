# Krestrel features: a list to write blog posts from

Every user-facing feature in Krestrel 1.6.1, with the problem it solves for a parent, post ideas,
the search phrase to aim for, the screenshot to use (`assets/screens/<name>.webp`) and the
features-page anchor to link to (`/features/#<anchor>`).

Start every post from `blog/_template/` (instructions are inside it). House rules:

- **Answer first.** The Key takeaways box and the first paragraph must answer the question on
  their own; Google and AI search engines quote them.
- **Question-shaped H2s** ("How do I…?", "What is…?") with a self-contained first sentence.
- **Never recommend amounts, targets, formulas or doses.** "Your dietitian sets the range;
  Krestrel does the arithmetic."
- **Status of conditions:** the app's diet tracking is total protein against the dietitian's range,
  so it fits any protein-restricted diet. In the app, PDE is the released condition profile; PKU,
  MSUD, HCU, GA1 and IVA profiles are pending clinical review. Say "for families managing PKU…"
  rather than claiming condition-specific clinical features.
- Link 2–3 related posts and one feature anchor; add the post to `blog/index.html`,
  `sitemap.xml`, `llms.txt` and the `POSTS` list order on the homepage.

## Diet and protein (the core)

| Feature | What it does | Parent problem | Post ideas | Target search | Screen | Anchor |
|---|---|---|---|---|---|---|
| Daily protein range | Min, max or both, per kg (× latest weight) or per day; shown as a neutral band | "Is toast still a yes?" at 5pm | *How a per-kg protein range works as your child grows*; *Protein budget vs protein diary* | protein tracking app for metabolic diet; g/kg/day protein child | today | protein |
| Amino-acid estimates | Lysine, phenylalanine, leucine… as estimates from the dietitian's mg/g factor | Clinic talks in amino acids, food labels in protein | *Protein vs phe exchanges vs lysine: what to track*; *Where amino-acid estimates fit* | how to estimate phenylalanine from protein; lysine per gram protein | today | protein |
| Meal logging + "g left today" | Weighed portions, saved meals, package-label entry | Turning a plate into grams fast | *Weighing food for a low-protein diet: a 5-minute routine* | how to weigh food for PKU diet | diet | diet |
| Food database | USDA, Canada, UK, Germany, France; one result per food; raw/cooked picker | Ten "rice" entries, which one? | *Raw vs cooked weights: why your totals drift* | protein in cooked rice per 100g | diet | diet |
| Custom foods + CSV import | Add medical foods and low-protein products; bulk-load a dietitian's list | Specialty low-protein foods aren't in USDA | *Getting your dietitian's food list into an app* | low protein food list app | diet | diet |
| Frozen history | Nutrients snapshotted onto each meal | Fixing a food value rewrote last month | *Why your past totals should never change* | — | diet | protein |
| First-foods journal + reaction log | Foods tried, favourites, want-to-try; reactions feed the allergy list | Starting solids on a restricted diet | *Introducing solids on a metabolic diet: keeping track* | starting solids PKU baby | diet | diet |

## Formula, feeds and the baby stuff

| Feature | What it does | Parent problem | Post ideas | Target search | Screen | Anchor |
|---|---|---|---|---|---|---|
| Metabolic formula feeds | Protein from the formula concentration (per 100 ml or per 100 g powder); recipe changes dated | Formula is most of the day's protein | *Tracking metabolic formula: concentration, volume and protein* | metabolic formula tracking app | feeds | feeds |
| Shared timers | Nursing, sleep, pumping, tummy time; any caregiver can stop one | Two parents, one baby, two apps | *One log for both parents* | baby tracker for two parents | feeds | feeds |
| Feed suggestions + outcomes | Yesterday's feed at this time; spit-up/vomited/refused | Night feeds on autopilot | *Logging a feed that came back up* | — | feeds | feeds |
| Day start hour | Choose when a "day" begins | 2am feeds split across two days | (published: day-start-hour) | baby feeding day start midnight | feeds | feeds |
| Diapers, temperature, milestones | Everyday trackers | All of it in one app | *What to log in the first year with a metabolic condition* | — | today | health-log |

## Clinical records

| Feature | What it does | Parent problem | Post ideas | Target search | Screen | Anchor |
|---|---|---|---|---|---|---|
| Lab results | Against clinic targets; trend chart with shaded band; "<" values | Results scattered in emails and portals | *Reading your child's amino acid results* (records only); *Bringing a lab trend to clinic* | track PKU blood phe levels app | labs | labs |
| Lab PDF import | Server parses text PDFs; on-device OCR for scans; review before saving | Typing 20 numbers off a PDF | *From lab PDF to trend chart in 2 minutes* | import lab results PDF app | labs | labs |
| Growth + WHO percentiles | Weight, length, head; WHO curves 0–5 y; weight drives per-kg range | Weight changes the protein allowance | *Why every weigh-in changes the protein range* | WHO growth chart app baby | growth | growth |
| Medicines and doses | List + dose log shared live across caregivers | "Did anyone give the B6?" | *Medication handoffs between caregivers* | medication log app for child | today | meds |
| Health log | Seizures (typed), vomiting, hypoglycemia, lethargy, fever, hospital stays, with severity | Remembering what happened before a crisis | *What to record during a metabolic crisis* | seizure log app for child | today | health-log |
| Appointments | Providers by specialty; questions carried forward; visit notes | Forgetting the question in the room | (published: appointment-management) | appointment question list app | circle | appointments |
| Timeline + reports | Day view (list/calendar); trends over any range | "How has this week been?" | *Spotting patterns before clinic* | — | today | reports |
| CSV export | Two CSVs by email; de-identified by default | Clinic or research wants data | *Sharing your child's log with the clinic* | export baby tracker data | today | reports |

## Emergency, family, AI, everyday

| Feature | What it does | Parent problem | Post ideas | Target search | Screen | Anchor |
|---|---|---|---|---|---|---|
| Emergency / sick-day plan + ER letter | Plan, contacts, ER letter from profile, meds, limits, allergies; offline | Explaining a rare disease in the ER | *Building an emergency letter for a metabolic disorder* | emergency letter metabolic disorder ER | emergency | emergency |
| Care circle + permissions | Primary/secondary roles; per-person permissions; invites by email/link | Grandparents and sitters logging safely | *Setting up a care team: who sees what* | share baby tracker with grandparents | circle | circle |
| Multiple children | Switcher; per-child ranges | Siblings with the same condition | *Two kids, two diets, one app* | — | today | circle |
| Claude & ChatGPT (MCP) | Per-child, per-area read/add; drafts for labs; activity log; family switch | Logging hands-free | (published: ai-meal-logging, claude-chatgpt-care-log); *Asking AI to summarise the week before clinic*; *Adding lab results from a PDF with Claude* | log meals with ChatGPT; Claude health app connector | ai / aiaccess | ai |
| iPhone widgets | Time since last bottle/meal/diaper/dose; start tummy time | Glance without unlocking | *The 3am glance* | baby tracker widget iPhone | today | everyday |
| Offline, dark mode, text size, units | Works without signal; comfort settings | Hospital basements; 3am | *Using Krestrel in hospital* | — | today | everyday |
| Privacy | No ads, no third-party analytics; delete everything | Trusting an app with a child's health data | *What happens to your child's data in Krestrel* | private baby health tracker no ads | — | — |

## Not yet in the app (don't write as if they exist)

Reminders/notifications, Apple Health, PDF export, Android release, languages other than English,
clinic export (flagged "coming soon"), photo gallery (flag off).
