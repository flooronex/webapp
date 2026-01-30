/**
 * Site Configuration
 * Central place for all site-wide configuration values
 */

export const siteConfig = {
    name: "FloorOneX",
    title: "FloorOneX | Site",
    description:
        "Modern Next.js landing page template: Responsive, dark mode, SEO optimized, high-performance. Includes premium components.",
    url: "https://publino-template.vercel.app",
    author: {
        name: "Dorin Buraca",
        email: "buracant@gmail.com",
    },
    keywords: [
        "next.js",
        "landing page",
        "template",
        "Publino",
        "responsive",
        "modern design",
        "high-performance",
    ],
    social: {
        twitter: "",
        github: "",
        linkedin: "",
    },
    links: {
        docs: "/docs",
        github: "https://github.com",
    },
} as const;

export type SiteConfig = typeof siteConfig;
