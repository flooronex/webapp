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
import { legalLinks } from "@/lib/legalLinks";
import { Link } from "@/i18n/navigation";

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
  title: "FloorOneX – Flooring Installation Marketplace UK",
  description:
    "FloorOneX connects homeowners with verified flooring installers across the UK. Get quotes, compare professionals, and manage flooring projects with transparency and speed.",
  keywords: [
    "FloorOneX",
    "flooring installation UK",
    "floor fitters marketplace",
    "laminate installation",
    "vinyl flooring installers",
    "flooring contractors UK",
    "home renovation platform",
    "compare flooring quotes",
    "verified installers",
    "property improvement UK",
  ],
  authors: [{ name: "Dorin Buraca" }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "FloorOneX | Flooring Installation Marketplace UK",
    description:
      "FloorOneX is a UK-based marketplace connecting homeowners with verified flooring installers. Compare quotes, manage projects, and choose trusted professionals with confidence.",
    type: "website",
    locale: "en_GB",
    url: "https://flooronex.co.uk",
    siteName: "FloorOneX",
    images: [
      {
        url: "/assets/images/Fox_logo_gradient.png",
        width: 1200,
        height: 630,
        alt: "FloorOneX Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FloorOneX | Flooring Installation Marketplace UK",
    description:
      "Connect with verified flooring installers across the UK. Compare quotes, manage projects, and choose trusted professionals with FloorOneX.",
    images: ["/assets/images/flooronex-og.png"],
    creator: "@flooronex",
    site: "@flooronex",
  },
  metadataBase: new URL("https://flooronex.co.uk"),
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
                    <div className="container mx-auto max-w-350 px-4">
                      <div className="flex flex-col items-center gap-4">

                        {/* APP DOWNLOAD BUTTONS */}
                        <div className="flex flex-wrap justify-center gap-4">
                          <a
                            href="https://play.google.com/store/apps/details?id=com.flooronex"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:opacity-80 transition-opacity"
                          >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M3.609 1.814L13.798 12 3.609 22.186a1.5 1.5 0 0 1-2.117-2.117L10.564 12 1.492 2.931A1.5 1.5 0 0 1 3.609 1.814zm16.782 0a1.5 1.5 0 0 1 2.117 2.117L13.436 12l9.072 9.069a1.5 1.5 0 0 1-2.117 2.117L11.202 12 21.391 1.814z"/>
                            </svg>
                            <span className="text-sm font-semibold">Google Play</span>
                          </a>
                          <a
                            href="https://apps.apple.com/app/flooronex/id1234567890"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:opacity-80 transition-opacity"
                          >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.3-3.14-2.53C4.25 17.12 2.94 12.6 4.9 9.12c.9-1.41 2.05-2.48 3.56-2.51 1.31-.03 2.55.87 3.83.87 1.27 0 2.24-.88 3.85-.84 1.63.05 2.85 1.025 3.74 2.65.54.87.7 1.46 1.07 2.42-2.86 1.3-2.95 4.7-.88 5.53zm-2.68-10.26c.12-1.47-.55-2.86-1.44-3.6-.72-.54-1.93-.94-2.88-.81-.13 1.39.44 2.86 1.31 3.63.96.79 2.26.82 3.02 1.91.02-.04.06-.08.08-.12z"/>
                            </svg>
                            <span className="text-sm font-semibold">App Store</span>
                          </a>
                        </div>

                        {/* LEGAL LINKS */}
                        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
                          {legalLinks.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition">
                              {item.label}
                            </Link>
                          ))}
                        </div>
                        {/* COPYRIGHT */}
                        <p className="text-sm text-gray-400 dark:text-gray-600 text-center">
                          © 2026 FloorOneX. All rights reserved.
                        </p>
                      </div>
                      {/* <BuyStrip /> */}
                    </div>

                    {/* Buy Template CTA Strip - only show if URL exists */}
                    {/* <BuyStrip /> */}
                  </div>
                </footer>
              </div>
            </ProgressBarProvider>
          </ThemeProvider>
        </NextIntlClientProvider>

        {/* Structured Data for SEO */}
        <Script id="schema-org" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify(
            [
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "FloorOneX",
                url: "https://flooronex.com",
                logo: "https://flooronex.com/assets/images/logo.png",
                sameAs: [
                  "https://x.com/flooronex",
                  "https://www.linkedin.com/company/flooronex"
                ]
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: "FloorOneX",
                url: "https://flooronex.com",
                inLanguage: "en-GB",
                potentialAction: {
                  "@type": "SearchAction",
                  target: "https://flooronex.com/search?q={search_term_string}",
                  "query-input": "required name=search_term_string"
                }
              },
              {
                "@context": "https://schema.org",
                "@type": "Service",
                name: "FloorOneX Flooring Installation Marketplace",
                description:
                  "Marketplace connecting homeowners with verified flooring installers across the UK. Compare quotes, manage projects, and choose trusted professionals.",
                provider: {
                  "@type": "Organization",
                  name: "FloorOneX",
                  url: "https://flooronex.com"
                },
                areaServed: "GB",
                serviceType: "Flooring installation marketplace"
              }
            ],
            null,
            2
          )}
        </Script>
      </body>
    </html>
  );
}
