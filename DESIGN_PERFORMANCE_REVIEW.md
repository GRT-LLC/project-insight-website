# Design & Performance Review: JarvisTravel Marketing Site

**Reviewed:** July 2026 | **Project:** jarvistravel-marketing | **Stack:** React 18 + Vite 5 + Tailwind CSS 3 + React Router 7

---

## 1. HTML Structure & Semantic Markup

### Issues Found
1. **HIGH** - No <main> landmark element (PageRouter.tsx:13)
2. **HIGH** - No skip-to-content link (All pages)

### What is Done Well
- Valid lang=en, charset, viewport, theme-color, and social meta tags
- Open Graph and Twitter Card tags comprehensive and consistent
- SEO meta description present

---

## 2. Heading Hierarchy

### Critical Issues
1. **CRITICAL: No <h1>** on SignUpPage and ForgotPasswordPage (uses <h2> only)
2. **HIGH: Heading level skipped** h1 > h3 (no h2) on FeaturesPage, PricingPage, ContactPage
3. **MEDIUM: h3 > h4 with missing h2** on ContactPage

### Per-Page Audit
HomePage: h1 + h2 x4 + h3 x6 -- GOOD
FeaturesPage: h1 + h3 (no h2) -- SKIP
PricingPage: h1 + h3 (no h2) -- SKIP
AboutPage: h1 + h2 x4 + h3 x4 -- GOOD
ContactPage: h1 + h3 + h4 (no h2) -- SKIP
PrivacyPage: h1 + h2 x4 -- GOOD
TermsPage: h1 + h2 x4 -- GOOD
DataSecurityPage: h1 + h2 x3 + h3 x5 -- GOOD
SignUpPage: NO H1 (h2 only) -- CRITICAL
SignInPage: h1 -- OK
ForgotPasswordPage: NO H1 (h2 only) -- CRITICAL

---

## 3. ARIA & Accessibility Patterns
1. HIGH: No aria-current="page" on active nav links (Navigation.tsx)
2. HIGH: Mobile menu lacks aria-expanded and aria-controls
3. HIGH: No aria-live="polite" on form error messages
4. MEDIUM: Password toggle buttons lack aria-label
5. MEDIUM: Form labels missing htmlFor attributes
6. MEDIUM: SignUp progress stepper is visual only (no role="progressbar")
7. LOW: Logo MapPin icon should have aria-hidden="true"
8. LOW: No aria-describedby on password inputs

---

## 4. Color Contrast (WCAG AA >= 4.5:1)

### FAILURES
1. Footer copyright: gray-500 on gray-900 -- 3.26:1 FAIL
2. Auth placeholders: white/40 on indigo-950 -- 3.74:1 FAIL

### Borderline (AA only, not AAA)
3. Stats labels: white/50 on indigo-950 -- 5.07:1
4. Forgot pwd labels: white/50 on slate-900 -- 4.76:1
5. Active nav link: sky-500 on white -- 5.36:1

All other combos pass AA (16 pass, 2 fail)

---

## 5. Responsive Layout
1. MEDIUM: ForgotPasswordPage 8-digit code input overflows on <375px screens (376px needed)
2. LOW: Stats grid text can wrap oddly on very narrow screens
3. LOW: ContactPage Press box spacing could be tighter on mobile

Good: Tailwind responsive prefixes used correctly, mobile hamburger menu, consistent max-w-7xl, safe area insets, viewport meta.

---

## 6. Bundle Weight & Performance

### Current Build Stats
- index.js: 226.95 KB (70.44 KB gzip)
- index.css: 31.45 KB (5.53 KB gzip)
- Sourcemap: 879.28 KB LEAKED TO PRODUCTION

### Issues
1. HIGH: 879 KB sourcemaps deployed (vite.config.ts build.sourcemap: true)
2. HIGH: react-router is duplicate dependency (also pulled by react-router-dom)
3. MEDIUM: path npm package is legacy Node polyfill (unnecessary)
4. MEDIUM: No route-level code splitting (all 10 pages in one chunk)
5. MEDIUM: lucide-react dominates bundle (25 of 51 source files = 49%)
6. LOW: tsconfig baseUrl points to /project-insight-website (wrong project)

### Bundle Composition (by source files)
- lucide-react: 25 files (49%)
- source code: 16 files (31%)
- react: 4 files (8%)
- react-dom: 3 files (6%)
- scheduler: 2 files (4%)
- react-router: 1 file (2%)

---

## 7. Action Items

### Critical (fix immediately)
1. Add <h1> to SignUpPage and ForgotPasswordPage
2. Set sourcemap: false in vite.config.ts (line 19)
3. Wrap page content in <main> element in MarketingLayout

### High Priority
4. Fix heading skips (h1>h3) on FeaturesPage, PricingPage, ContactPage
5. Add aria-current="page" to nav links
6. Add aria-expanded/aria-controls to mobile menu toggle
7. Add aria-live="polite" on form error containers
8. Fix footer copyright contrast: gray-500 > gray-400
9. Fix auth placeholder contrast: white/40 > white/50
10. Remove duplicate react-router from dependencies

### Medium Priority
11. Remove path npm package (legacy polyfill)
12. Add route-level code splitting (React.lazy for auth pages)
13. Fix ForgotPassword code input overflow on mobile
14. Add htmlFor to all form labels
15. Add aria-label to password toggle buttons
16. Add progressbar role to SignUp stepper
17. Fix tsconfig baseUrl

### Quick Fixes

up to date, audited 257 packages in 2s

58 packages are looking for funding
  run `npm fund` for details

18 vulnerabilities (1 low, 3 moderate, 14 high)

To address issues that do not require attention, run:
  npm audit fix

To address all issues (including breaking changes), run:
  npm audit fix --force

Run `npm audit` for details.
