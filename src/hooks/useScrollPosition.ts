"use client";

import { useState, useEffect } from "react";

interface ScrollPosition {
    x: number;
    y: number;
    direction: "up" | "down" | null;
    isAtTop: boolean;
}

/**
 * Custom hook to track scroll position
 * @param threshold - Minimum scroll amount before triggering direction change
 * @returns ScrollPosition object with current scroll state
 */
export function useScrollPosition(threshold: number = 10): ScrollPosition {
    const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
        x: 0,
        y: 0,
        direction: null,
        isAtTop: true,
    });

    useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const currentScrollX = window.scrollX;

            let direction: "up" | "down" | null = null;

            if (Math.abs(currentScrollY - lastScrollY) >= threshold) {
                direction = currentScrollY > lastScrollY ? "down" : "up";
                lastScrollY = currentScrollY;
            }

            setScrollPosition({
                x: currentScrollX,
                y: currentScrollY,
                direction,
                isAtTop: currentScrollY < threshold,
            });
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll(); // Initial call

        return () => window.removeEventListener("scroll", handleScroll);
    }, [threshold]);

    return scrollPosition;
}
