# DOX framework — JarvisTravel Marketing Website

DOX is a performant AGENTS.md hierarchy. This file is the root contract for the
JarvisTravel Marketing Website repository. Every AGENTS.md in the tree is a
binding work contract for its subtree.

## Core Contract

- AGENTS.md files are binding work contracts for their subtrees
- Work products, source materials, instructions, records, assets, and durable docs must stay understandable from the nearest applicable AGENTS.md plus every parent AGENTS.md above it
- Read the full DOX chain from root to target path before editing any file in this repo
- After every meaningful change, run a DOX closeout pass (update nearest owning docs, refresh Child DOX Index entries, remove stale/contradictory text)

## Purpose

React TypeScript marketing website for JarvisTravel — a standalone SPA deployed
to the production Droplet (mktg.jarvistravel.com) and GitHub Pages. Serves as the public-facing landing experience: marketing pages for a
pre-launch product (no auth; "Sign up" routes to contact).

## Ownership

| Area | Owner |
|------|-------|
| Root config & build | `AGENTS.md` (this file) |
| Deployment & CI | `.github/workflows/node.js.yml`, `.github/workflows/deploy-droplet.yml` |
| Application source | `src/app/` — see `src/app/AGENTS.md` |
| Entry point & global styles | `src/main.tsx`, `src/index.css` |

## Local Contracts

### Build & run

```bash
npm install          # install dependencies
npm run dev          # dev server at http://localhost:3000
npm run build        # tsc + vite build → dist/
npm run preview      # preview production build
npm run type-check   # tsc --noEmit
npm run lint         # eslint with zero-warnings policy
```

### Pricing (single source of truth — JAR-660)

The only place this site knows what anything costs is `src/app/data/pricing.ts`,
which mirrors Stripe (the org sandbox `acct_1ToBK0ABsvYNMJZ0`; at live launch
the catalogue is re-minted in the org's live account and the pins move with
it — keyed by the same
`lookup_key` the backend resolves at checkout). The `lint:prices` guard fails
CI when the site and Stripe disagree; `check-prices.mjs` also fails when a
dollar amount reappears as a literal in a component.

**Changing a price or adding a plan (runbook):**
1. Edit/create the price in the Stripe dashboard (test mode; same lookup_key
   in live mode at launch).
2. `STRIPE_API_KEY=rk_test_... npm run sync:prices` — regenerates the
   generated block in `pricing.ts` from Stripe (the `Price` type + the guard's
   `EXPECTED_KEYS` fail loudly if the catalogue shape changes; `interval_count
   != 1` is refused — the site cannot render it).
3. Update `PriceLookupKey` + `EXPECTED_KEYS` in `check-prices.mjs` if the key
   set changed.
4. Open the PR — `pr-checks` runs the guard (literal scan + Stripe
   reconciliation). The droplet + Pages deploys re-run it immediately before
   shipping (`--network-warn`: a Stripe outage warns; a verified mismatch
   fails).
5. The daily `pr-checks` schedule (06:00 UTC) catches Stripe-side edits that
   make no PR.

### Base path & routing

- Routes are served at the domain root (`/`) on both deployments (configured in `vite.config.ts` and `tsconfig.json`)
- The Droplet deployment serves from mktg.jarvistravel.com/, GitHub Pages from the /project-insight-website/ subdirectory
- `tsconfig.json` `baseUrl` and `paths` (`@/*`) — keep in sync with `vite.config.ts` resolve alias

### UI stack

- **React 18** + **TypeScript** (strict mode, `strict: true`)
- **Vite 5** with `@vitejs/plugin-react`
- **Tailwind CSS 3** via PostCSS — utility-first styling, no CSS modules
- **Lucide React** for icons (import individual icons from `lucide-react`)
- **react-router-dom v7** for client-side routing

### Architectural invariants

- **SPA** — no server-side rendering. All pages are client-rendered React.
- **Marketing layout** — `MarketingLayout` in `PageRouter.tsx` wraps all public-facing pages with `<Navigation />` + `<Footer />`. New marketing routes should follow the same pattern.
- **No auth** — pre-launch marketing site; the simulated client-side auth stack was removed as dead code (JAR-429). "Sign up" routes to `/contact`.
- **Static output** — `npm run build` produces `dist/`. The GitHub Actions workflow uploads `dist/` to GitHub Pages or rsyncs it to the Droplet.
- **Sourcemaps enabled** in production builds (`vite.config.ts` `sourcemap: true`).

## Work Guidance

1. **Stale README** — The README references `src/marketing/` but the code lives in `src/app/`. Update it when making other changes.
2. **Barrel exports** — `src/app/components/index.ts` and `src/app/pages/index.ts` re-export their contents. Follow the same pattern.
3. **New pages** — create the page component in `src/app/pages/`, add a barrel export to `src/app/pages/index.ts`, and wire the route in `src/app/router/PageRouter.tsx` inside a `MarketingLayout` wrapper.
4. **Lint discipline** — `npm run lint` enforces `--max-warnings 0`. Zero warnings is the bar.
5. **Before editing any file in `src/app/`**, read `src/app/AGENTS.md` first.
6. **Before any code editing**, load the `code-workflow` skill and follow its standard engineering workflow (branching, TDD, conventional commits, quality gates, PRs)

## Verification

Before merging to `main`:
- [ ] `npm run type-check` passes (zero errors)
- [ ] `npm run lint` passes (zero warnings, zero errors)
- [ ] `npm run build` succeeds
- [ ] Stale text removed from AGENTS.md chain if anything changed
- [ ] Child DOX Index updated if docs were added/removed

## Child DOX Index

| Path | Scope |
|------|-------|
| `src/app/AGENTS.md` | Application source code: components, pages, router |

## User Preferences

- Routes are served at the domain root (`/`); the old `/project-insight-website/` GitHub Pages prefix is deprecated
- React Router is the routing library; use its hooks directly
- Tailwind CSS is the only styling approach — no CSS modules, no styled-components
