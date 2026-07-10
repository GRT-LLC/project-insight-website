# Plan-Not-Book Change Report — marketing-website

**Ticket:** JAR-298 · **Branch:** `chore/jar-298-plan-not-book` · **Date:** 2026-07-10
**Intent source:** "JarvisTravel — California Seller of Travel Registration Analysis" + Plan-Not-Book cleanup spec. Under CA Bus. & Prof. Code § 17550.1(a), *advertising* the ability to arrange air/sea transportation is itself a seller-of-travel trigger — marketing copy is legal surface.

## 1. Summary counts

- Files scanned: all of `src/` (ts/tsx/js/jsx/html/css/md)
- Files changed: 4 pages + `package.json` + CI workflow; 2 files added (guard script, allowlist)
- Strings changed: 9
- Identifiers renamed: 0 (none needed in this repo)

## 2. Change log

| File : line | Before | After |
|---|---|---|
| `src/app/pages/TermsPage.tsx` : 19 | "AI-powered travel planning, **booking assistance**, budget tracking" | "AI-powered travel planning, **trip intelligence**, budget tracking" |
| `src/app/pages/TermsPage.tsx` : §2 | — | **Added** not-a-seller-of-travel disclaimer paragraph (software service; no selling/arranging of transportation, lodging, tours; user transacts directly with providers; no commissions; charges are software-access fees only) |
| `src/app/pages/HomePage.tsx` : 81 | "Get instant help with **bookings**, translations, and local tips" | "Get instant help with **your plans**, translations, and local tips" |
| `src/app/pages/HomePage.tsx` : 109 | Testimonial: "Jarvis **handles all my bookings** and keeps me on schedule…" | "Jarvis **keeps my whole trip plan in one place** and keeps me on schedule…" |
| `src/app/pages/FeaturesPage.tsx` : 61 | "…translation help, **booking changes**, or local tips" | "…translation help, **plan changes**, or local tips" |
| `src/app/pages/FeaturesPage.tsx` : 63 | highlight "**Emergency assistance**" | "**24/7 app support**" (spec §3c) |
| `src/app/pages/FeaturesPage.tsx` : 68 | "Jarvis tracks check-in times, **coordinates luggage**, and ensures smooth transitions" | "Jarvis tracks check-in times **and helps you plan** smooth transitions between stays" (baggage transfer is an enumerated § 17550.9 travel service — the app does not provide it) |
| `src/app/pages/FeaturesPage.tsx` : 70 | highlight "**Luggage coordination**" | "**Stay details in one place**" |
| `src/app/pages/FeaturesPage.tsx` : 93 | "Everything you need to plan, **book**, and experience unforgettable journeys" | "Everything you need to plan and experience unforgettable journeys" |
| `src/app/pages/AboutPage.tsx` : 28 | "from inspiration to **booking** to on-trip guidance" | "from inspiration to **planning** to on-trip guidance" |

## 3. Renames

None. No identifiers in this repo carried booking semantics.

## 4. Escalations (human review needed)

1. **Terms of Service disclaimer (added, needs counsel):** the new §2 paragraph uses the affirmative-statement language from the registration analysis. Counsel should review before the page ships; the whole ToS is otherwise placeholder-thin (no governing law, liability, IP, etc.).
2. **Placeholder testimonials & stats:** all three testimonials (Sarah Chen, Marcus Johnson, Elena Rodriguez) and the stats banner ("50K+ Happy Travelers", "4.9 App Rating") appear fabricated. The Elena text was reframed to remove the booking claim, but fabricated endorsements are independent § 17500 / FTC exposure — replace with real, permissioned quotes and real metrics (or remove the sections) before launch.
3. **Deployment status:** the repo's GitHub Actions workflow deploys to GitHub Pages on every push to `main` — meaning the pre-fix booking language may be **publicly live**, not draft. Verify Pages status; if live, merge this promptly.

## 5. Allowlist touched?

No. `.plan-not-book-allow.txt` ships **empty** — the marketing site has zero legitimate uses of the banned lexicon. The §2 spec exceptions (subscription checkout, JARVIS persona, existing-reservation import) do not occur in this repo.

## 6. Durable guard (spec §9)

- `scripts/check-plan-not-book.mjs` — scans `src/` for the banned lexicon (word-boundaried, so bookmark/notebook/Facebook never match; comment lines ignored), with `.plan-not-book-allow.txt` regex allowlist.
- `npm run lint:plan-not-book` added; wired into `.github/workflows/node.js.yml` before the build step, so a regression blocks deploy.
