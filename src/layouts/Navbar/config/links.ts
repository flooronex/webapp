/**
 * Navigation links configuration
 * Each link has a translation key and href
 */
export interface NavLinkConfig {
    /** Translation key under common.navigation.links */
    translationKey: string;
    /** Link destination - can be hash link (#section) or path (/page) */
    href: string;
}

/**
 * Main navigation links
 * Labels are resolved via translations in the component
 */
export const navLinks: NavLinkConfig[] = [
    { translationKey: "features", href: "/#features" },
    { translationKey: "contact", href: "/contact" },
    { translationKey: "pricing", href: "/pricing" },
];

/**
 * Action buttons configuration
 */
export interface NavActionConfig {
    /** Translation key under common.navigation.actions */
    translationKey: string;
    /** Button variant */
    variant?: "default" | "outline" | "ghost";
}

export const navActions = {
    login: {
        translationKey: "login",
    },
    cta: {
        translationKey: "bookCall",
        variant: "default" as const,
    },
} satisfies Record<string, NavActionConfig>;
