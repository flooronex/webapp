# Copilot Instructions for flooronex-web

## Project Overview
- **Framework:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4
- **Purpose:** Modern, production-ready landing page template with i18n, dark mode, and premium UI components
- **Key Directories:**
  - `src/app/` – App entry, routing, and layouts (locale-based under `[locale]/`)
  - `src/features/` – Feature modules for each page/section (e.g., home, contact, pricing)
  - `src/components/` – Shared and specialized UI components (see `ui/` for primitives)
  - `messages/` – i18n translation files, organized by feature and locale
  - `src/config/` – Navigation and site metadata
  - `src/styles/` – Tailwind theme, base, and dark mode CSS

## Developer Workflows
- **Install:** `yarn install` (Yarn 4.x preferred; npm supported)
- **Dev server:** `yarn dev` (uses Turbopack, hot reload)
- **Build:** `yarn build` (production build)
- **Lint:** `yarn lint`
- **Start (prod):** `yarn start`
- **Environment:** Set variables in `.env.local` (see README)

## Patterns & Conventions
- **i18n:**
  - Add new pages under `src/app/[locale]/<page>/`
  - Add translations in `messages/<page>/<locale>.json`
  - Register new translations in `src/i18n/request.ts`
- **Feature Modules:**
  - Each feature/page has a folder in `src/features/<feature>/` with `index.ts`, main component, and subfolders for `components/`, `hooks/`, `config/`
- **UI Components:**
  - Use primitives from `src/components/ui/` for consistency
  - Compose specialized components in `src/components/`
- **Styling:**
  - Use Tailwind classes; theme tokens in `src/styles/globals.css`
  - Light/dark mode via `ThemeProvider` and `theme.css`
- **TypeScript:**
  - Types in `src/types/`
  - Prefer explicit types for props and hooks
- **SEO:**
  - Use Next.js metadata in page components for SEO (see `generateMetadata` pattern)

## Integration & Data Flow
- **Forms:** Use React Hook Form + Zod for validation (see contact page)
- **Charts:** Use Recharts for dashboard visualizations
- **Animations:** Use Framer Motion and @dnd-kit for UI effects
- **Global State:** Use context providers in `src/providers/` (e.g., Theme, ProgressBar)

## Examples
- **Add a new page:**
  1. Create `src/app/[locale]/about/page.tsx` (see README for template)
  2. Add `messages/about/en.json`, `messages/about/ar.json`
  3. Register in `src/i18n/request.ts`
  4. Add feature module in `src/features/about/`
- **Edit navigation:** Update `src/config/nav.config.ts`
- **Update pricing:** Edit `src/features/home/Pricing/` and `messages/home/en.json`

## References
- See `README.md` for detailed setup, structure, and customization
- Key config: `next.config.mjs`, `tsconfig.json`, `postcss.config.mjs`, `eslint.config.mjs`

---
For questions about project-specific patterns, review the README or ask for examples from `src/features/` and `src/components/`.
