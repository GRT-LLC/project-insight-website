# JarvisTravel Marketing Website

The public marketing site for JarvisTravel, a standalone React + TypeScript SPA.

## Stack

- **React 18** + **TypeScript** (strict)
- **Vite 5** for dev and builds
- **Tailwind CSS 3** (utility-first, Meridian design tokens)
- **react-router-dom v7** for client-side routing
- **lucide-react** for icons

## Getting started

```bash
npm install
npm run dev          # dev server
npm run build        # tsc + vite build -> dist/
npm run preview      # preview the production build
npm run type-check   # tsc --noEmit
npm run lint         # eslint, zero-warnings policy
npm run lint:plan-not-book   # brand lexicon guard
```

## Project structure

```
src/
├── app/
│   ├── components/   # Shared layout (Navigation, Footer)
│   ├── pages/        # One file per marketing page
│   └── router/       # PageRouter, ScrollToTop
├── main.tsx          # Entry point
└── index.css         # Tailwind directives + global styles
```

## Pages

Home, How it works (`/features`), Pricing, About, Contact, Privacy, Terms,
Data Security. This is a pre-launch marketing site with no authentication;
"Sign up" routes to Contact until the app and payment flow are live.

## Contributing

Read the `AGENTS.md` chain (root and `src/app/AGENTS.md`) before editing.
All copy follows the JarvisTravel brand voice; the plan-not-book lexicon is
enforced in CI.

Private. JarvisTravel.
