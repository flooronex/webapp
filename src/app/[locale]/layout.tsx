import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { ThemeProvider, ProgressBarProvider } from "@/providers";
import { Navbar } from "@/layouts";
import Script from "next/script";
import BuyStrip from "@/components/BuyStrip";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export const metadata: Metadata = {
  title: "FloorOneX",
  description:
    "Modern Next.js landing page template: Responsive, dark mode, SEO optimized, high-performance. Includes premium components.",
  keywords: [
    "next.js",
    "landing page",
    "template",
    "FloorOneX",
    "responsive",
    "modern design",
    "high-performance",
  ],
  authors: [{ name: "Mohammed Djoudir" }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "FloorOneX | Next.js Landing Page Template",
    description:
      "Modern Next.js landing page template: Responsive, dark mode, SEO optimized, high-performance. Includes premium components.",
    type: "website",
    locale: "en_US",
    url: "https://publino-template.vercel.app",
    siteName: "FloorOneX Templates",
    images: [
      {
        url: "/image.png",
        width: 1200,
        height: 630,
        alt: "Publino Next.js Template Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Publino | Next.js Landing Page Template",
    description:
      "Modern Next.js landing page template: Responsive, dark mode, SEO optimized, high-performance. Includes premium components.",
    images: ["/image.png"],
    creator: "@aniq_ui",
    site: "@aniq_ui",
  },
  metadataBase: new URL("https://publino-template.vercel.app"),
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as "en" | "ar")) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Providing all messages to the client
  const messages = await getMessages();

  // Determine text direction based on locale
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <head>
        {/* Favicon and Manifest Links */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        {/* Inline script to prevent theme flash - runs before React hydration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var savedTheme = localStorage.getItem('theme');
                  var theme = savedTheme || 'dark';
                  var resolvedTheme = theme;
                  if (theme === 'system') {
                    resolvedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  }
                  document.documentElement.classList.toggle('dark', resolvedTheme === 'dark');
                  document.documentElement.dataset.theme = resolvedTheme;
                } catch (e) {
                  document.documentElement.classList.add('dark');
                  document.documentElement.dataset.theme = 'dark';
                }
              })();
            `,
          }}
        />
      </head>
      <body
        className={`bg-(--background) text-(--foreground) transition-colors duration-200 antialiased overflow-hidden overflow-y-auto`}
      >
        {/* Skip to main content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-white focus:text-black"
        >
          Skip to main content
        </a>

        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <ProgressBarProvider>
              <div className="flex flex-col ">
                <Navbar />
                <main
                  id="main-content"
                  className="flex-1 container mx-auto max-w-350 px-4 py-8"
                >
                  {children}
                </main>
                <footer
                  id="site-footer"
                  className="py-8 relative bg-white dark:bg-black"
                >
                  <div className="container mx-auto max-w-350 px-4">
                    <div className="flex justify-center">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        © 2026 Floor One X. All rights reserved.
                      </p>
                    </div>
                    {/* Buy Template CTA Strip - only show if URL exists */}
                    <BuyStrip />
                  </div>
                </footer>
              </div>
            </ProgressBarProvider>
          </ThemeProvider>
        </NextIntlClientProvider>

        {/* Structured Data for SEO */}
        <Script
          id="schema-org"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {`
            {
              "@context": "https://schema.org",
              "@type": "Product",
              "name": "Publino Next.js Template",
              "description": "Modern Next.js landing page template: Responsive, dark mode, SEO optimized, high-performance. Includes premium components.",
              "image": "https://publino-template.vercel.app/image.png",
              "url": "https://publino-template.vercel.app",
              "brand": {
                "@type": "Brand",
                "name": "Publino Templates"
              },
              "offers": {
                "@type": "Offer",
                "url": "http://aniq-ui.com/templates/publino",
                "availability": "https://schema.org/InStock"
              },
              "category": "Web Templates",
              "sku": "publino-next-template",
              "potentialAction": {
                "@type": "BuyAction",
                "target": "http://aniq-ui.com/templates/publino"
              }
            }
          `}
        </Script>
      </body>
    </html>
  );
}
