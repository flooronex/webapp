# FloorOneX – Flooring Installation Marketplace

**FloorOneX** is a modern digital marketplace that connects homeowners and property managers with **verified flooring professionals across the UK**.  
Users can browse services, request quotes, compare offers, and manage flooring projects transparently and efficiently.

The platform is built with **Next.js 16, React 19, and Tailwind CSS 4**, focusing on performance, scalability, and a premium user experience across web and mobile.

---

## DORIN ADDITIONAL

Rulam:

1. CURAT: ``` 
            rm -rf .next && npm run dev
            ```
2. NORMAL: ```
            npm run dev
          ```

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

<!-- 
"use client";

import Image from "next/image";
import Link from "next/link";
import { Suspense, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import supabase from "@/lib/supabase/client";

type Company = {
  id: string;
  display_name: string | null;
  name: string | null;
  city: string | null;
  postcode: string | null;
  cover_url: string | null;
  logo_url: string | null;
};

const FALLBACK_COVER =
  "https://gcoxlhjaijczrxnmynfr.supabase.co/storage/v1/object/public/comps_test_covers/covers/laminate-wood-floor.jpg";

const DEBOUNCE_MS = 350;

// Later: replace with logged-in user id.
const TEST_OWNER_ID = "00000000-0000-0000-0000-000000000001";

function safeUrl(input: string) {
  const v = input.trim();
  if (!v) return "";
  try {
    const u = new URL(v);
    return u.toString();
  } catch {
    return "";
  }
}

function ProvidersTestInner() {
  const router = useRouter();
  const sp = useSearchParams();

  // URL params
  const q = (sp.get("q") ?? "").trim();
  const city = (sp.get("city") ?? "").trim();
  const sort = (sp.get("sort") ?? "newest").trim() || "newest";

  // Paging
  const pageSize = useMemo(() => {
    const raw = Number.parseInt(sp.get("pageSize") ?? "20", 10);
    return Number.isFinite(raw) ? Math.min(60, Math.max(8, raw)) : 20;
  }, [sp]);

  const [companies, setCompanies] = useState<Company[]>([]);
  const [totalCount, setTotalCount] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Filters form state
  const [qInput, setQInput] = useState(q);
  const [cityInput, setCityInput] = useState(city);
  const [sortInput, setSortInput] = useState(sort);

  // Add New Company (drawer)
  const [addOpen, setAddOpen] = useState(false);
  const [savingCompany, setSavingCompany] = useState(false);
  const [addError, setAddError] = useState<string | null>(null);

  const [newName, setNewName] = useState("");
  const [newDisplayName, setNewDisplayName] = useState("");
  const [newCity, setNewCity] = useState("");
  const [newPostcode, setNewPostcode] = useState("");
  const [newLogoUrl, setNewLogoUrl] = useState("");

  // Cover upload state (client-only preview)
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreviewUrl, setCoverPreviewUrl] = useState<string | null>(null);

  // Simple toast
  const [toast, setToast] = useState<string>("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Delete confirm modal
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Company | null>(null);

  const requestIdRef = useRef(0);

  // Scroll restoration key (per filter set)
  const scrollKey = useMemo(() => {
    return `providers-test:scroll:q=${q}|city=${city}|sort=${sort}|pageSize=${pageSize}`;
  }, [q, city, sort, pageSize]);

  const scrollRafRef = useRef<number | null>(null);

  const buildHref = (next: { q?: string; city?: string; sort?: string; pageSize?: number }) => {
    const params = new URLSearchParams();
    const nq = (next.q ?? q).trim();
    const nc = (next.city ?? city).trim();
    const ns = (next.sort ?? sort).trim() || "newest";
    const nps = next.pageSize ?? pageSize;

    if (nq) params.set("q", nq);
    if (nc) params.set("city", nc);
    if (ns) params.set("sort", ns);
    params.set("pageSize", String(nps));

    const qs = params.toString();
    return qs ? `?${qs}` : "";
  };

  const fetchCompanies = async (opts: { reset: boolean }) => {
    const myRequestId = ++requestIdRef.current;

    if (opts.reset) {
      setLoading(true);
      setError(null);
      setHasMore(true);
      setTotalCount(null);
    } else {
      setLoadingMore(true);
      setError(null);
    }

    const offset = opts.reset ? 0 : companies.length;

    try {
      let query = supabase
        .from("companies_test")
        .select(
          "id, display_name, name, city, postcode, cover_url, logo_url",
          opts.reset ? { count: "exact" } : undefined
        )
        .eq("active", true);

      if (q.length > 0) {
        const safe = q.replace(/[%_]/g, "\\$&");
        query = query.or(
          `display_name.ilike.%${safe}%,name.ilike.%${safe}%,city.ilike.%${safe}%,postcode.ilike.%${safe}%`
        );
      }

      if (city.length > 0) {
        const safeCity = city.replace(/[%_]/g, "\\$&");
        query = query.ilike("city", `%${safeCity}%`);
      }

      if (sort === "oldest") query = query.order("created_at", { ascending: true });
      else if (sort === "name") query = query.order("display_name", { ascending: true, nullsFirst: false });
      else query = query.order("created_at", { ascending: false });

      const from = offset;
      const to = offset + pageSize - 1;

      const { data, error, count } = await query.range(from, to);

      if (myRequestId !== requestIdRef.current) return;

      if (error) {
        setError(error.message);
        setHasMore(false);
        setTotalCount(null);
        return;
      }

      const rows = (data ?? []) as Company[];

      if (opts.reset) {
        setCompanies(rows);
        setTotalCount(typeof count === "number" ? count : null);
      } else {
        setCompanies((prev) => [...prev, ...rows]);
      }

      if (opts.reset && typeof count === "number") setHasMore(rows.length + offset < count);
      else if (totalCount != null) setHasMore(rows.length + offset < totalCount);
      else setHasMore(rows.length >= pageSize);
    } catch (e: unknown) {
      if (myRequestId !== requestIdRef.current) return;
      setError(e instanceof Error ? e.message : String(e));
      setHasMore(false);
      setTotalCount(null);
    } finally {
      if (myRequestId !== requestIdRef.current) return;
      setLoading(false);
      setLoadingMore(false);
    }
  };

  // Reset list on filter changes
  useEffect(() => {
    setQInput(q);
    setCityInput(city);
    setSortInput(sort);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, city, sort]);

  // Debounce search + city -> update URL after user stops typing
  useEffect(() => {
    const nextQ = qInput.trim();
    const nextCity = cityInput.trim();
    if (nextQ === q && nextCity === city) return;

    const t = window.setTimeout(() => {
      router.replace(buildHref({ q: nextQ, city: nextCity, sort: sortInput }));
    }, DEBOUNCE_MS);

    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qInput, cityInput]);

  // Apply sort instantly
  useEffect(() => {
    if (sortInput.trim() === sort) return;
    router.replace(buildHref({ q: qInput, city: cityInput, sort: sortInput }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortInput]);

  useEffect(() => {
    void fetchCompanies({ reset: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, city, sort, pageSize]);

  // Restore scroll
  useLayoutEffect(() => {
    const raw = typeof window !== "undefined" ? window.sessionStorage.getItem(scrollKey) : null;
    const y = raw ? Number.parseInt(raw, 10) : 0;
    if (!Number.isFinite(y) || y <= 0) return;

    requestAnimationFrame(() => {
      window.scrollTo({ top: y, left: 0, behavior: "auto" });
    });
  }, [scrollKey]);

  // Save scroll (RAF)
  useEffect(() => {
    const onScroll = () => {
      if (scrollRafRef.current != null) return;
      scrollRafRef.current = window.requestAnimationFrame(() => {
        scrollRafRef.current = null;
        window.sessionStorage.setItem(scrollKey, String(window.scrollY || 0));
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (scrollRafRef.current != null) {
        window.cancelAnimationFrame(scrollRafRef.current);
        scrollRafRef.current = null;
      }
      window.sessionStorage.setItem(scrollKey, String(window.scrollY || 0));
    };
  }, [scrollKey]);

  const onApply = (e: React.FormEvent) => {
    e.preventDefault();
    router.replace(buildHref({ q: qInput, city: cityInput, sort: sortInput }));
  };

  const onReset = () => {
    setQInput("");
    setCityInput("");
    setSortInput("newest");
    router.replace("?pageSize=20");
  };

  const onLoadMore = async () => {
    if (loading || loadingMore || !hasMore) return;
    await fetchCompanies({ reset: false });
  };

  const onGoTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Cover file picker
  const onPickCover: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0] ?? null;

    if (coverPreviewUrl) URL.revokeObjectURL(coverPreviewUrl);

    setCoverFile(file);
    setCoverPreviewUrl(file ? URL.createObjectURL(file) : null);
  };

  // cleanup preview on unmount
  useEffect(() => {
    return () => {
      if (coverPreviewUrl) URL.revokeObjectURL(coverPreviewUrl);
    };
  }, [coverPreviewUrl]);

  const resetAddForm = useCallback(() => {
    setAddError(null);
    setNewName("");
    setNewDisplayName("");
    setNewCity("");
    setNewPostcode("");
    setNewLogoUrl("");
    setCoverFile(null);

    if (coverPreviewUrl) URL.revokeObjectURL(coverPreviewUrl);
    setCoverPreviewUrl(null);
  }, [coverPreviewUrl]);

  const onOpenAdd = useCallback(() => {
    resetAddForm();
    setAddOpen(true);
  }, [resetAddForm]);

  const onCloseAdd = useCallback(() => {
    setAddOpen(false);
    setAddError(null);
  }, []);

  const onCreateCompany = useCallback(async () => {
    if (savingCompany) return;

    const name = (newDisplayName || newName).trim();
    if (!name) {
      setAddError("Company name is required.");
      return;
    }

    const logoUrlVal = safeUrl(newLogoUrl);

    setSavingCompany(true);
    setAddError(null);

    try {
      // IMPORTANT: server route does upload + insert with Service Role
      const fd = new FormData();
      fd.set("display_name", newDisplayName.trim());
      fd.set("name", newName.trim());
      fd.set("city", newCity.trim());
      fd.set("postcode", newPostcode.trim());
      fd.set("logo_url", logoUrlVal);
      fd.set("owner_id", TEST_OWNER_ID);
      if (coverFile) fd.set("cover", coverFile);

      const res = await fetch("/api/providers-test/create", {
        method: "POST",
        body: fd,
      });

      const raw = await res.text();

      let json: any = null;
      try {
        json = JSON.parse(raw);
      } catch {
        // route did not return JSON
      }

      if (!res.ok) {
        setAddError(json?.error ?? raw ?? "Failed to create company.");
        return;
      }

      if (!json?.data) {
        setAddError(raw || "Missing JSON data from server.");
        return;
      }

      const created = json.data as Company;

      // optimistic prepend (instant in list)
      setCompanies((prev) => [created, ...prev]);
      setTotalCount((prev) => (typeof prev === "number" ? prev + 1 : prev));

      setToast("Company created ✅");
      window.setTimeout(() => setToast(""), 2200);

      setAddOpen(false);
      resetAddForm();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (e: unknown) {
      setAddError(e instanceof Error ? e.message : String(e));
    } finally {
      setSavingCompany(false);
    }
  }, [
    savingCompany,
    newName,
    newDisplayName,
    newCity,
    newPostcode,
    newLogoUrl,
    coverFile,
    resetAddForm,
  ]);

  const openDeleteModal = useCallback((e: React.MouseEvent, company: Company) => {
    e.preventDefault();
    e.stopPropagation();
    if (deletingId) return;
    setDeleteTarget(company);
    setDeleteOpen(true);
  }, [deletingId]);

  const closeDeleteModal = useCallback(() => {
    if (deletingId) return;
    setDeleteOpen(false);
    setDeleteTarget(null);
  }, [deletingId]);

  const confirmDelete = useCallback(async () => {
    if (!deleteTarget) return;

    const company = deleteTarget;
    const prevCompanies = companies;
    const prevTotal = totalCount;

    // Optimistic remove
    setDeletingId(company.id);
    setCompanies((prev) => prev.filter((c) => c.id !== company.id));
    setTotalCount((prev) => (typeof prev === "number" ? Math.max(0, prev - 1) : prev));

    // close modal immediately (feels snappy)
    setDeleteOpen(false);
    setDeleteTarget(null);

    try {
      const res = await fetch("/api/providers-test/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: company.id }),
      });

      const raw = await res.text();
      let json: any = null;
      try {
        json = JSON.parse(raw);
      } catch {
        // ignore
      }

      if (!res.ok) {
        // rollback
        setCompanies(prevCompanies);
        setTotalCount(prevTotal);
        const msg = json?.error ?? raw ?? "Failed to delete company.";
        setToast(`Delete failed: ${msg}`);
        window.setTimeout(() => setToast(""), 2600);
        return;
      }

      setToast("Company deleted ✅");
      window.setTimeout(() => setToast(""), 2200);
    } catch (err: unknown) {
      // rollback
      setCompanies(prevCompanies);
      setTotalCount(prevTotal);
      const msg = err instanceof Error ? err.message : String(err);
      setToast(`Delete failed: ${msg}`);
      window.setTimeout(() => setToast(""), 2600);
    } finally {
      setDeletingId(null);
    }
  }, [deleteTarget, companies, totalCount]);

  const onDeleteCompany = useCallback(
    (e: React.MouseEvent, company: Company) => {
      openDeleteModal(e, company);
    },
    [openDeleteModal]
  );

  return (
    <div id="top" className="mx-auto max-w-6xl px-4 py-8">
      {/* Toast */}
      {toast ? (
        <div className="fixed bottom-4 right-4 z-[60] rounded-xl border bg-white/90 dark:bg-neutral-950/90 px-4 py-3 text-sm shadow-lg">
          {toast}
        </div>
      ) : null}

      {/* Delete confirm modal */}
      {deleteOpen && deleteTarget ? (
        <div className="fixed inset-0 z-[70]">
          <button
            type="button"
            aria-label="Close"
            onClick={closeDeleteModal}
            className="absolute inset-0 bg-black/40"
          />

          <div className="absolute left-1/2 top-1/2 w-[92vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border bg-white p-5 shadow-xl dark:bg-neutral-950">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-base font-semibold">Delete company?</div>
                <div className="mt-1 text-sm opacity-75">
                  This will permanently delete <span className="font-medium opacity-100">{deleteTarget.display_name || deleteTarget.name || "this company"}</span>.
                </div>
              </div>
              <button
                type="button"
                onClick={closeDeleteModal}
                className="rounded-lg px-3 py-2 text-sm font-medium border hover:opacity-80 transition"
              >
                Close
              </button>
            </div>

            <div className="mt-4 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={closeDeleteModal}
                className="rounded-lg px-4 py-2 text-sm font-medium border hover:opacity-80 transition"
                disabled={!!deletingId}
              >
                No, keep it
              </button>

              <button
                type="button"
                onClick={confirmDelete}
                className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium border border-red-700 bg-red-600 text-white hover:bg-red-700 transition disabled:opacity-50"
                disabled={!!deletingId}
              >
                {deletingId ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    <span>Deleting…</span>
                  </>
                ) : (
                  <>
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M3 6h18" />
                      <path d="M8 6V4h8v2" />
                      <path d="M19 6l-1 14H6L5 6" />
                      <path d="M10 11v6" />
                      <path d="M14 11v6" />
                    </svg>
                    <span>Yes, delete</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <div className="flex items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Browse Providers</h1>
          <p className="mt-1 text-sm opacity-80">
            Loaded {companies.length}
            {typeof totalCount === "number" ? ` / ${totalCount}` : ""} companies (test dataset)
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenAdd}
            className="rounded-lg px-4 py-2 text-sm font-medium border border-emerald-700 bg-emerald-600 text-white hover:bg-emerald-700 transition focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
          >
            Add new company
          </button>

          <Link
            href="/request-a-quote"
            className="rounded-lg px-4 py-2 text-sm font-medium border hover:opacity-80 transition"
          >
            Request a Quote
          </Link>
        </div>
      </div>

      {/* Search + Filters */}
      <form onSubmit={onApply} className="mt-6 rounded-2xl border bg-white/60 dark:bg-white/5 p-4">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <label className="block text-xs font-medium opacity-70">Search</label>
            <input
              value={qInput}
              onChange={(e) => setQInput(e.target.value)}
              placeholder="Search providers, city, postcode..."
              className="mt-1 w-full rounded-lg border bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/10"
            />
          </div>

          <div>
            <label className="block text-xs font-medium opacity-70">City</label>
            <input
              value={cityInput}
              onChange={(e) => setCityInput(e.target.value)}
              placeholder="e.g. London"
              className="mt-1 w-full rounded-lg border bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/10"
            />
          </div>

          <div>
            <label className="block text-xs font-medium opacity-70">Sort</label>
            <select
              value={sortInput}
              onChange={(e) => setSortInput(e.target.value)}
              className="mt-1 w-full rounded-lg border bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/10"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="name">Name</option>
            </select>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <button type="submit" className="rounded-lg px-4 py-2 text-sm font-medium border hover:opacity-80 transition">
            Apply
          </button>

          <button
            type="button"
            onClick={onReset}
            className="rounded-lg px-4 py-2 text-sm font-medium border hover:opacity-80 transition"
          >
            Reset
          </button>

          <div className="ml-auto text-sm opacity-70">
            Loaded <span className="font-medium opacity-100">{companies.length}</span>
            {typeof totalCount === "number" ? (
              <>
                {" "}
                / <span className="font-medium opacity-100">{totalCount}</span>
              </>
            ) : null}
            {loadingMore ? " • Loading…" : ""}
          </div>
        </div>
      </form>

      {/* Error */}
      {error ? (
        <div className="mt-6 rounded-2xl border p-4">
          <div className="text-sm font-medium">Supabase error</div>
          <div className="mt-1 text-sm opacity-80">{error}</div>
        </div>
      ) : null}

      {/* Grid */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {loading ? (
          Array.from({ length: Math.min(12, pageSize) }).map((_, i) => (
            <div key={i} className="overflow-hidden rounded-2xl border bg-white/60 dark:bg-white/5">
              <div className="aspect-[16/9] w-full animate-pulse bg-black/5 dark:bg-white/10" />
              <div className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl border animate-pulse bg-black/5 dark:bg-white/10" />
                  <div className="flex-1">
                    <div className="h-4 w-3/4 animate-pulse rounded bg-black/5 dark:bg-white/10" />
                    <div className="mt-2 h-3 w-1/2 animate-pulse rounded bg-black/5 dark:bg-white/10" />
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : companies.length === 0 ? (
          <div className="col-span-full rounded-2xl border p-6 text-sm opacity-80">
            No providers found. Try adjusting search or filters.
          </div>
        ) : (
          companies.map((c) => {
            const title = c.display_name || c.name || "Company";
            const location = [c.city, c.postcode].filter(Boolean).join(" • ");

            return (
              <Link
                key={c.id}
                href={`/providers-test/${c.id}`}
                //href={c.id}
                className="group overflow-hidden rounded-2xl border bg-white/60 dark:bg-white/5 hover:shadow-lg transition"
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  <button
                    type="button"
                    onClick={(e) => onDeleteCompany(e, c)}
                    disabled={deletingId === c.id}
                    className="absolute right-2 top-2 z-10 inline-flex h-8 w-8 items-center justify-center rounded-md border border-red-700 bg-red-600/90 text-white shadow-sm hover:bg-red-700 disabled:opacity-60"
                    aria-label="Delete company"
                    title="Delete"
                  >
                    {deletingId === c.id ? (
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    ) : (
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M3 6h18" />
                        <path d="M8 6V4h8v2" />
                        <path d="M19 6l-1 14H6L5 6" />
                        <path d="M10 11v6" />
                        <path d="M14 11v6" />
                      </svg>
                    )}
                  </button>
                  <Image
                    src={c.cover_url || FALLBACK_COVER}
                    alt={title}
                    fill
                    className="object-cover group-hover:scale-[1.3] transition"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    priority={false}
                  />
                </div>

                <div className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 overflow-hidden rounded-xl border bg-white/80 dark:bg-white/10">
                      {c.logo_url ? (
                        <Image
                          src={c.logo_url}
                          alt={`${title} logo`}
                          fill
                          className="object-contain p-1"
                          sizes="40px"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-xs opacity-60">FX</div>
                      )}
                    </div>

                    <div className="min-w-0">
                      <div className="truncate font-semibold">{title}</div>
                      <div className="truncate text-sm opacity-75">{location}</div>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between text-sm">
                    <span className="opacity-70">View company</span>
                    <span className="opacity-70 group-hover:translate-x-0.5 transition">→</span>
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </div>

      {/* Footer controls */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
        <div className="text-sm opacity-70">
          {hasMore
            ? "Want more results?"
            : companies.length > 0
              ? typeof totalCount === "number"
                ? `All loaded (${companies.length}/${totalCount})`
                : "No more to load"
              : ""}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onLoadMore}
            disabled={loading || loadingMore || !hasMore}
            className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium border hover:opacity-80 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loadingMore ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                <span>Loading more</span>
              </>
            ) : hasMore ? (
              <span>
                Load more
                {typeof totalCount === "number" ? ` (${companies.length}/${totalCount})` : ""}
              </span>
            ) : (
              <span>No more</span>
            )}
          </button>

          <button
            type="button"
            onClick={onGoTop}
            className="rounded-lg px-4 py-2 text-sm font-medium border hover:opacity-80 transition"
          >
            Go to top
          </button>
        </div>
      </div>

      {/* Add New Company Drawer */}
      {addOpen ? (
        <div className="fixed inset-0 z-50">
          <button type="button" aria-label="Close" onClick={onCloseAdd} className="absolute inset-0 bg-black/30" />

          <div className="absolute right-0 top-0 h-full w-full max-w-md border-l bg-white dark:bg-neutral-950 shadow-xl">
            <div className="flex items-center justify-between border-b p-4">
              <div>
                <div className="text-base font-semibold">Add new company</div>
                <div className="mt-0.5 text-xs opacity-70">Uploads cover → inserts row (server route)</div>
              </div>
              <button
                type="button"
                onClick={onCloseAdd}
                className="rounded-lg px-3 py-2 text-sm font-medium border hover:opacity-80 transition"
              >
                Close
              </button>
            </div>

            <div className="p-4 overflow-y-auto h-[calc(100%-140px)]">
              <div className="grid gap-3">
                <div>
                  <label className="block text-xs font-medium opacity-70">Display name *</label>
                  <input
                    value={newDisplayName}
                    onChange={(e) => setNewDisplayName(e.target.value)}
                    placeholder="e.g. Prime Installers"
                    className="mt-1 w-full rounded-lg border bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/10"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium opacity-70">Legal name (optional)</label>
                  <input
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="e.g. Prime Installers Ltd"
                    className="mt-1 w-full rounded-lg border bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/10"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium opacity-70">City</label>
                    <input
                      value={newCity}
                      onChange={(e) => setNewCity(e.target.value)}
                      placeholder="London"
                      className="mt-1 w-full rounded-lg border bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/10"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium opacity-70">Postcode</label>
                    <input
                      value={newPostcode}
                      onChange={(e) => setNewPostcode(e.target.value)}
                      placeholder="SW1A 1AA"
                      className="mt-1 w-full rounded-lg border bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/10"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium opacity-70">Cover image (upload)</label>
                  <input type="file" accept="image/*" onChange={onPickCover} className="mt-1 w-full text-sm" />

                  {coverPreviewUrl ? (
                    <div className="mt-2 overflow-hidden rounded-lg border">
                      <div className="relative aspect-[16/9] w-full">
                        {/* use <img> for blob: preview */}
                        <img src={coverPreviewUrl} alt="Cover preview" className="h-full w-full object-cover" />
                      </div>
                    </div>
                  ) : (
                    <div className="mt-2 text-xs opacity-60">Optional. If not uploaded, fallback cover is used.</div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium opacity-70">Logo URL (optional)</label>
                  <input
                    value={newLogoUrl}
                    onChange={(e) => setNewLogoUrl(e.target.value)}
                    placeholder="https://..."
                    className="mt-1 w-full rounded-lg border bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/10"
                  />
                </div>

                {addError ? (
                  <div className="rounded-xl border p-3 text-sm">
                    <div className="font-medium">Could not create company</div>
                    <div className="mt-1 opacity-80">{addError}</div>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="border-t p-4 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={resetAddForm}
                disabled={savingCompany}
                className="rounded-lg px-4 py-2 text-sm font-medium border hover:opacity-80 transition disabled:opacity-50"
              >
                Clear
              </button>

              <button
                type="button"
                onClick={onCreateCompany}
                disabled={savingCompany}
                className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium border border-emerald-700 bg-emerald-600 text-white hover:bg-emerald-700 transition disabled:opacity-50"
              >
                {savingCompany ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    <span>Creating…</span>
                  </>
                ) : (
                  <span>Create</span>
                )}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default function ProvidersTestPage() {
  return (
    <Suspense
      fallback={<div className="mx-auto max-w-6xl px-4 py-8 text-sm opacity-70">Loading…</div>}
    >
      <ProvidersTestInner />
    </Suspense>
  );
} -->