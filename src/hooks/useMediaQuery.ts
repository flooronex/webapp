"use client";

import { useState, useEffect } from "react";

/**
 * Custom hook for responsive media queries
 * @param query - CSS media query string
 * @returns boolean indicating if the query matches
 */
export function useMediaQuery(query: string): boolean {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const media = window.matchMedia(query);
        if (media.matches !== matches) {
            setMatches(media.matches);
        }

        const listener = (event: MediaQueryListEvent) => {
            setMatches(event.matches);
        };

        media.addEventListener("change", listener);
        return () => media.removeEventListener("change", listener);
    }, [matches, query]);

    return matches;
}

// Predefined breakpoint hooks
export function useIsMobile(): boolean {
    return useMediaQuery("(max-width: 767px)");
}

export function useIsTablet(): boolean {
    return useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
}

export function useIsDesktop(): boolean {
    return useMediaQuery("(min-width: 1024px)");
}
