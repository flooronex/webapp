# Publino - Next.js Landing Page Template

Modern, production-ready landing page template built with Next.js 16, React 19, and Tailwind CSS 4. A fully responsive, SEO-optimized, high-performance template with premium components and dark mode support.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Scripts](#project-scripts)
- [Project Structure](#project-structure)
- [Content & Customization](#content--customization)
- [UI Toolkit & Utilities](#ui-toolkit--utilities)
- [Styling & Assets](#styling--assets)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Support](#support)
- [License](#license)

## Features

### Experience Highlights

- **Engaging hero section** with animated background shapes and compelling call-to-action buttons for immediate user engagement.
- **Interactive dashboard mockup** featuring deployment tables, KPI cards, and charts built with Recharts inside a polished glass UI.
- **Why Choose Us section** showcasing key benefits with performance metrics and animated number displays.
- **Templates showcase** with responsive design previews demonstrating cross-device compatibility.

### Conversion Sections

- **Filterable pricing grid** (`src/features/home/Pricing`) with plan comparisons and clear CTAs.
- **Features showcase** highlighting performance metrics, one-click deployment, scalable environments, and global deployments.
- **Smart FAQ section** with expandable answers and category organization.
- **Contact page** with form validation using React Hook Form and Zod.

### Technical Highlights

- **Internationalization (i18n)** with next-intl supporting English and Arabic (RTL) out of the box.
- **Dark/Light mode** with system preference detection via ThemeProvider.
- **SEO optimized** with proper meta tags, Open Graph, and structured data.
- **Performance focused** with Turbopack dev server and optimized builds.

## Tech Stack

- Next.js 16 App Router with React 19 and TypeScript.
- Yarn 4 (node-modules linker) for dependency management (`packageManager` pinned in `package.json`).
- Tailwind CSS 4 with the design system defined via `@theme` in `src/styles/globals.css`.
- Motion (Framer Motion), @dnd-kit, Recharts, and Tabler Icons for animations, drag-and-drop, data visualization, and icons.
- next-intl for internationalization (English & Arabic support).
- React Hook Form + Zod for form handling and validation.
- Radix UI primitives for accessible component foundations.

## Getting Started

### Prerequisites

- Node.js 18.18 or newer.
- Yarn 4.x (Berry) installed globally (`corepack enable` recommended).

### Installation & Local Development

1. Install dependencies:

   ```bash
   yarn install
   ```

   or, if you prefer npm:

   ```bash
   npm install
   ```

2. Start the development server with Turbopack:

   ```bash
   yarn dev
   ```

   or with npm:

   ```bash
   npm run dev
   ```

3. Visit `http://localhost:3000` to view the site. Updates are hot-reloaded as you edit.

Yarn 4 remains the supported workflow for this template, but npm users can follow the equivalents shown above.

### Adding a New Page

1. **Create the page route** – Add a new folder under `src/app/[locale]/`:

   ```
   src/app/[locale]/about/
   └── page.tsx
   ```

   ```tsx
   // src/app/[locale]/about/page.tsx
   import { Metadata } from "next";
   import { getTranslations, setRequestLocale } from "next-intl/server";
   import { AboutPageContent } from "@/features/about";

   type Props = {
     params: Promise<{ locale: string }>;
   };

   export async function generateMetadata({
     params,
   }: Props): Promise<Metadata> {
     const { locale } = await params;
     const t = await getTranslations({ locale, namespace: "AboutPage.meta" });

     return {
       title: t("title"),
       description: t("description"),
     };
   }

   export default async function AboutPage({ params }: Props) {
     const { locale } = await params;

     // Enable static rendering
     setRequestLocale(locale);

     return <AboutPageContent />;
   }
   ```

2. **Create translation files** – Add a new folder under `messages/` with translations for each locale:

   ```
   messages/about/
   ├── en.json
   └── ar.json
   ```

   ```json
   // messages/about/en.json
   {
     "AboutPage": {
       "meta": {
         "title": "About Us - Our Story",
         "description": "Learn more about our company and mission."
       },
       "hero": {
         "badge": "About Us",
         "title": "Our Story",
         "description": "Learn more about who we are and what we do."
       }
     }
   }
   ```

   ```json
   // messages/about/ar.json
   {
     "AboutPage": {
       "meta": {
         "title": "من نحن - قصتنا",
         "description": "تعرف على المزيد حول شركتنا ومهمتنا."
       },
       "hero": {
         "badge": "من نحن",
         "title": "قصتنا",
         "description": "تعرف على المزيد حول من نحن وماذا نفعل."
       }
     }
   }
   ```

3. **Register translations** – Update `src/i18n/request.ts` to import the new translation files:

   ```tsx
   // Add import for new messages
   const aboutMessages = (await import(`../../messages/about/${locale}.json`))
     .default;

   // Add to messages object (spread to merge)
   return {
     locale,
     messages: {
       common: commonMessages,
       home: homeMessages,
       ...contactMessages,
       ...pricingMessages,
       ...aboutMessages, // Add this line
     },
   };
   ```

4. **Create feature module** – Add a feature folder with page content component:

   ```
   src/features/about/
   ├── index.ts              # Export barrel file
   ├── AboutPageContent.tsx  # Main page content component
   ├── components/           # Page-specific components
   ├── hooks/                # Page-specific hooks
   └── config/               # Page-specific configuration
   ```

   ```tsx
   // src/features/about/AboutPageContent.tsx
   "use client";
   import { useTranslations } from "next-intl";

   export default function AboutPageContent() {
     const t = useTranslations("AboutPage");

     return (
       <main>
         <h1>{t("hero.title")}</h1>
         <p>{t("hero.description")}</p>
       </main>
     );
   }
   ```

   ```tsx
   // src/features/about/index.ts
   export { default as AboutPageContent } from "./AboutPageContent";
   ```

5. **Add navigation link** (optional) – Update `src/config/nav.config.ts` to include the new page in the navbar.

   ```
   src/features/about/
   ├── index.ts
   ├── Hero/
   ├── Team/
   └── Mission/
   ```

## Project Scripts

- `yarn dev` / `npm run dev` – Run Next.js locally with Turbopack for fast refresh.
- `yarn build` / `npm run build` – Create a production build of the app.
- `yarn start` / `npm run start` – Serve the production build locally.
- `yarn lint` / `npm run lint` – Lint the codebase with the configured ESLint rules.

## Project Structure

```
├── messages/                    # i18n translation files
│   ├── common/                  # Shared translations (ar.json, en.json)
│   ├── contact/                 # Contact page translations
│   ├── home/                    # Home page translations
│   └── pricing/                 # Pricing page translations
├── public/                      # Static assets
│   └── assets/
│       ├── images/              # Avatar and template images
│       └── fonts/               # Custom font files
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Root layout wrapper
│   │   └── [locale]/            # Locale-based routing (i18n)
│   │       ├── layout.tsx       # Locale layout with SEO metadata
│   │       ├── page.tsx         # Home page
│   │       ├── contact/         # Contact page
│   │       └── pricing/         # Pricing page
│   ├── components/              # Shared UI components
│   │   ├── ui/                  # Reusable primitives (Button, Input, Tabs, etc.)
│   │   ├── FileTree/            # File tree visualization
│   │   ├── GlobalDeployments/   # Global deployments map
│   │   ├── LanguageSwitcher/    # Language toggle (EN/AR)
│   │   ├── LighthouseMetrics/   # Performance metrics gauges
│   │   ├── OneClickDeployment/  # Deployment flow animation
│   │   ├── PricingCard/         # Pricing card component
│   │   ├── ScalableEnvironments/# Environment scaling visualization
│   │   └── WorldMap/            # Interactive globe component
│   ├── config/                  # App configuration
│   │   ├── nav.config.ts        # Navigation links
│   │   └── site.config.ts       # Site metadata and settings
│   ├── features/                # Feature-based page sections
│   │   ├── home/                # Hero, Features, Pricing, FAQ, Footer
│   │   ├── contact/             # Contact form and info
│   │   └── pricing/             # Pricing plans detail
│   ├── hooks/                   # Custom React hooks
│   ├── i18n/                    # Internationalization config
│   ├── layouts/                 # Layout components (Navbar)
│   ├── lib/                     # Utilities (cn helper)
│   ├── providers/               # Context providers (Theme, ProgressBar)
│   ├── styles/                  # CSS files (globals, theme, base)
│   └── types/                   # TypeScript definitions
├── next.config.mjs              # Next.js configuration
├── postcss.config.mjs           # PostCSS/Tailwind pipeline
└── tsconfig.json                # TypeScript compiler settings
```

## Content & Customization

- **Hero section** – Update copy and CTAs in `messages/home/en.json` under the `hero` key; modify layout in `src/features/home/Hero/`.
- **Dashboard mockup** – Adjust KPI data, table content, and charts in `src/features/home/DashboardMockup/`.
- **Features grid** – Modify feature cards in `src/features/home/Features/` with Lighthouse metrics, deployment flows, and more.
- **Pricing plans** – Edit plan tiers and features in `src/features/home/Pricing/` and `messages/home/en.json`.
- **FAQ section** – Update questions and answers in `src/features/home/Faq/` and translation files.
- **Navigation** – Edit menu items in `src/config/nav.config.ts`.
- **Site metadata** – Update title, description, and URLs in `src/config/site.config.ts`.
- **Translations** – Edit `messages/` files for English (`en.json`) and Arabic (`ar.json`).

## UI Toolkit & Utilities

- `src/components/ui/` hosts reusable building blocks: `Button`, `Input`, `Select`, `Tabs`, `Badge`, `Toggle`, `Tooltip`, `FormField`, and `Collapsible`.
- `src/components/` provides specialized components: `Globe`, `WorldMap`, `AnimatedTooltip`, `TextGenerateEffect`, `Gauge`, `ShineBorder`, `RetroGrid`, and more.
- `src/hooks/` contains custom hooks: `useDebounce`, `useLocalStorage`, `useMediaQuery`, `useScrollPosition`.
- `src/lib/utils.ts` exports the `cn` helper (clsx + tailwind-merge) for ergonomic class composition.

## Styling & Assets

- Tailwind CSS 4 theme tokens, custom properties, and animations are defined in `src/styles/globals.css` using the `@theme` directive.
- Theme variables for light/dark mode are in `src/styles/theme.css`.
- Base reset styles are in `src/styles/base.css`.
- Images are stored in `public/assets/images/` (avatars, templates).
- Fonts are in `public/fonts/` with Open Font License.

## Environment Variables

Create a `.env.local` file (values are read at build time):

```
NEXT_PUBLIC_SITE_URL=https://your-domain.com     # Used for SEO canonical URLs
NEXT_PUBLIC_BUY_URL=https://your-checkout-link   # Optional "Buy Template" CTA
```

If `NEXT_PUBLIC_BUY_URL` is omitted, the "Buy This Template" strip is hidden automatically.

## Deployment

- **Vercel (recommended)**: Push the repo, import it into Vercel, and use the default Next.js build command (`yarn build`). Set environment variables in the Vercel dashboard before deploying.
- **Other platforms**: Netlify, AWS Amplify, Render, Railway, and DigitalOcean all support Next.js. Use `yarn build` for the build step and `yarn start` (or the platform's Next.js adapter) to serve the app.
- Remember to add any required environment variables in your hosting provider before triggering the production build.

## Support

- [Next.js Documentation](https://nextjs.org/docs) for framework guides.
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) for styling utilities.
- [TypeScript Handbook](https://www.typescriptlang.org/docs) for language reference.
- [next-intl Documentation](https://next-intl-docs.vercel.app/) for internationalization.
- [Radix UI Documentation](https://www.radix-ui.com/docs) for accessible primitives.

## License

This template is distributed as a commercial product. Review your purchase agreement for permitted usage, redistribution, and resale terms.
