/**
 * Global Types
 * Define all shared TypeScript types here
 */

// Common component props
export interface BaseComponentProps {
    className?: string;
    children?: React.ReactNode;
}

// Theme types
export type Theme = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

// Navigation types
export interface NavigationItem {
    title: string;
    href: string;
    description?: string;
    disabled?: boolean;
    external?: boolean;
}

// Generic API response type
export interface ApiResponse<T> {
    data: T;
    success: boolean;
    message?: string;
    error?: string;
}

// Pagination type
export interface PaginationParams {
    page: number;
    limit: number;
    total?: number;
}

// Form status type
export type FormStatus = "idle" | "loading" | "success" | "error";

// Media query breakpoints (matching Tailwind)
export const breakpoints = {
    xs: 480,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    "2xl": 1536,
} as const;

export type Breakpoint = keyof typeof breakpoints;

// Common size variants
export type Size = "xs" | "sm" | "md" | "lg" | "xl";

// Common color variants
export type ColorVariant =
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "error"
    | "info";
