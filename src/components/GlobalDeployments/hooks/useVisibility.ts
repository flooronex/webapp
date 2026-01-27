"use client";

import { useEffect, useRef, useState } from "react";

export function useVisibility(threshold = 0.2) {
    const [isVisible, setIsVisible] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const observerRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        const element = containerRef.current;
        if (!element) return;

        const checkVisibility = () => {
            const rect = element.getBoundingClientRect();
            return rect.top < window.innerHeight && rect.bottom > 0;
        };

        const rafId = requestAnimationFrame(() => {
            if (checkVisibility()) {
                setIsVisible(true);
                return;
            }

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
