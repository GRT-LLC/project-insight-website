# Setup Instructions

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```
   The app will open at `http://localhost:3000`

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Preview production build:**
   ```bash
   npm run preview
   ```

## Project Structure

```
jarvistravel-marketing/
├── src/
│   ├── marketing/
│   │   ├── components/      # Navigation, Footer
│   │   ├── pages/           # All marketing pages
│   │   ├── router/          # Routing logic
│   │   └── index.tsx        # Main export
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
└── tailwind.config.js
```

## Features

- ✅ Modern React 18 with TypeScript
- ✅ Vite for fast development
- ✅ Tailwind CSS for styling
- ✅ Fully typed components
- ✅ Responsive design
- ✅ Context-based routing
- ✅ Lucide React icons

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run type-check` - Run TypeScript type checking
- `npm run lint` - Run ESLint

## Pages

- Home (`/`) - Hero, features, testimonials
- Features (`/features`) - Feature showcase
- Pricing (`/pricing`) - Pricing plans
- About (`/about`) - Team and values
- Contact (`/contact`) - Contact form
- Privacy (`/privacy`) - Privacy policy
- Terms (`/terms`) - Terms of service
- Sign In (`/signin`) - Authentication
- Sign Up (`/signup`) - Registration
- Forgot Password (`/forgot-password`) - Password reset
- Dashboard (`/app`) - Main app (after login)

## Customization

All components are in `src/marketing/` and can be easily customized:
- Update colors in Tailwind config
- Modify components in `src/marketing/components/`
- Add new pages in `src/marketing/pages/`
- Update routing in `src/marketing/router/`
