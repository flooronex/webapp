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
                  className="py-1 relative bg-white dark:bg-black"
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
                            aria-label="Download on Google Play"
                            className="inline-block rounded-lg overflow-hidden hover:opacity-90 transition-opacity"
                          >
                            <img
                              src="/assets/images/googleplay.png"
                              alt="Google Play"
                              className="w-40 sm:w-44 md:w-48 h-auto object-contain block"
                            />
                          </a>
                          <a
                            href="https://apps.apple.com/app/flooronex/id1234567890"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Download on the App Store"
                            className="inline-block rounded-lg overflow-hidden hover:opacity-90 transition-opacity"
                          >
                            <img
                              src="/assets/images/appstore.png"
                              alt="App Store"
                              className="w-40 sm:w-44 md:w-48 h-auto object-contain block"
                            />
                          </a>
                        </div>

                        {/* LEGAL LINKS */}
                        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs mt-5">
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
