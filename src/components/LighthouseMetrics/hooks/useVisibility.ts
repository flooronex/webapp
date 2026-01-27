"use client";

import { useEffect, useRef, useState } from "react";

export function useVisibility(threshold = 0.2) {
    const [isVisible, setIsVisible] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const observerRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        const element = containerRef.current;
        if (!element) return;

        // Check if already visible immediately
        const checkVisibility = () => {
            const rect = element.getBoundingClientRect();
            return rect.top < window.innerHeight && rect.bottom > 0;
        };

        // Use requestAnimationFrame to ensure DOM is fully rendered
        const rafId = requestAnimationFrame(() => {
            if (checkVisibility()) {
                setIsVisible(true);
                return;
            }

            // If not visible, set up observer
            observerRef.current = new IntersectionObserver(
                (entries) => {
                    if (entries[0].isIntersecting) {
                        setIsVisible(true);
                        observerRef.current?.disconnect();
                        observerRef.current = null;
                    }
                },
                { threshold }
            );

            observerRef.current.observe(element);
        });

        return () => {
            cancelAnimationFrame(rafId);
            if (observerRef.current) {
                observerRef.current.disconnect();
                observerRef.current = null;
            }
        };
    }, [threshold]);

    return { isVisible, containerRef };
}
