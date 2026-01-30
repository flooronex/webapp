/**
 * Navigation Configuration
 * Define all navigation items here
 */

export interface NavItem {
    title: string;
    href: string;
    description?: string;
    disabled?: boolean;
    external?: boolean;
    children?: NavItem[];
}

export const navConfig: NavItem[] = [
    {
        title: "Home",
        href: "/",
    },
    {
        title: "Features",
        href: "#features",
    },
    {
        title: "Templates",
        href: "#templates",
    },
    {
        title: "Pricing",
        href: "#pricing",
    },
    {
        title: "FAQ",
        href: "#faq",
    },
    {
        title: "Contact",
        href: "#contact",
    },
    {
        title: "About Us",
        href: "/about",
    },
];

export const footerConfig = {
    links: [
        {
            title: "Product",
            items: [
                { title: "Features", href: "#features" },
                { title: "Templates", href: "#templates" },
                { title: "Pricing", href: "#pricing" },
            ],
        },
        {
            title: "Support",
            items: [
                { title: "FAQ", href: "#faq" },
                { title: "Contact", href: "#contact" },
            ],
        },
        {
            title: "Legal",
            items: [
                { title: "Privacy", href: "/privacy" },
                { title: "Terms", href: "/terms" },
            ],
        },
    ],
};
