# DOX — src/app/

## Purpose

Application source code for the JarvisTravel marketing website. Contains all
React components, pages, routing, and auth state. This is where all UI work
happens.

## Ownership

| Area | Files |
|------|-------|
| Shared layout components | `components/Navigation.tsx`, `components/Footer.tsx`, `components/index.ts` |
| Page components | `pages/HomePage.tsx`, `pages/FeaturesPage.tsx`, `pages/PricingPage.tsx`, `pages/AboutPage.tsx`, `pages/ContactPage.tsx`, `pages/PrivacyPage.tsx`, `pages/TermsPage.tsx`, `pages/DataSecurityPage.tsx`, `pages/SignInPage.tsx`, `pages/SignUpPage.tsx`, `pages/ForgotPasswordPage.tsx`, `pages/AppDashboard.tsx`, `pages/index.ts` |
| Routing | `router/PageRouter.tsx`, `router/ProtectedRoute.tsx`, `router/RouterContext.tsx` (deprecated), `router/ScrollToTop.tsx` |
| Auth | `context/auth.ts` (context creation), `context/AuthProvider.tsx` (provider component), `context/useAuth.ts` (hook) |

## Local Contracts

### Component patterns

- **Page components** live in `pages/`, one file per page. Each page accepts no props — it reads routing/auth state from hooks (`useNavigate`, `useAuth`, etc.).
- **Layout components** (`Navigation`, `Footer`) are in `components/`. They are shared across all marketing pages via `MarketingLayout` in `PageRouter.tsx`.
- **Barrel exports** — `pages/index.ts` and `components/index.ts` re-export all public symbols. Always add new exports there.
- **Icons** — import from `lucide-react` directly (e.g. `import { MapPin } from 'lucide-react'`). Do not install additional icon libraries.

### Routing

- All routes are defined in `PageRouter.tsx` at root (`/`) paths
- Every marketing route wraps its page in `<MarketingLayout>` (provides Navigation + Footer)
- `ProtectedRoute` in `router/ProtectedRoute.tsx` gates authenticated pages — redirects to `/signin` if not logged in
- `ScrollToTop` in `router/ScrollToTop.tsx` scrolls to top on route change — included in the root component tree
- `RouterContext.tsx` is kept for backward compatibility but is deprecated; use `react-router-dom` hooks directly
- The catch-all `Route path="*"` redirects to `/`

### Auth

- Context and types live in `context/auth.ts` — exports `AuthContext`, `AuthContextValue`, `MarketingUser`
- `AuthProvider` component in `context/AuthProvider.tsx` provides `login`, `logout`, `isAuthenticated`, and `user` via React context
- `useAuth()` hook in `context/useAuth.ts` must be called within `<AuthProvider>` — throws if used outside
- `auth.ts`, `AuthProvider.tsx`, and `useAuth.ts` are split to satisfy Fast Refresh constraints (only component exports in component files)
- Auth is purely client-side/simulated — there is no backend session, JWT, or persistent storage

### Global entry points (outside `src/app/`)

- `src/main.tsx` — renders the React tree into `#root` with `BrowserRouter` > `PlasmicRootProvider` > `AuthProvider` > `ScrollToTop` + `PageRouter`
- `src/index.css` — Tailwind directives (`@tailwind base; @tailwind components; @tailwind utilities`)
- `src/plasmic-init.ts` — Plasmic loader configuration (project ID and API token)

## Work Guidance

1. **New pages** — create the file in `pages/`, export from `pages/index.ts`, add a route in `PageRouter.tsx`. Use `MarketingLayout` for public pages.
2. **Auth pages** — `SignInPage`, `SignUpPage`, `ForgotPasswordPage`, `AppDashboard` exist but their routes aren't wired in `PageRouter.tsx`. If activating, decide whether they sit inside or outside `MarketingLayout`.
3. **Simulated auth** — to test auth flows, call `login({ email: '...', name: '...' })` from browser console or a dev-only UI toggle.
4. **Type safety** — `strict: true` in tsconfig. No `any`, no `// @ts-expect-error` without justification. Keep TypeScript errors at zero.
5. **Tailwind** — use utility classes directly in JSX. Avoid custom CSS unless the design system requires it. The `tailwind.config.js` `theme.extend` block is where project-specific tokens go.

## Verification

Before changing any file in `src/app/`:
- [ ] Read the root `AGENTS.md` plus this file (the full DOX chain)
- [ ] After changes: `npm run type-check` passes
- [ ] After changes: `npm run lint` passes (zero warnings)
- [ ] If routes changed: verify all root (`/`) paths work

## Child DOX Index

No child AGENTS.md files exist under `src/app/`. This leaf node owns all files
in this subtree directly.
