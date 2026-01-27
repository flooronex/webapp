"use client";

import { useEffect, useRef, useState } from "react";

export function useVisibility(threshold = 0.1) {
    const [hasBeenVisible, setHasBeenVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);
    const observerRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        const element = sectionRef.current;
        if (!element) return;

        const checkVisibility = () => {
            const rect = element.getBoundingClientRect();
            return rect.top < window.innerHeight && rect.bottom > 0;
        };

        const rafId = requestAnimationFrame(() => {
            if (checkVisibility()) {
                setHasBeenVisible(true);
                return;
            }

            observerRef.current = new IntersectionObserver(
                (entries) => {
                    if (entries[0].isIntersecting) {
                        setHasBeenVisible(true);
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

    return { hasBeenVisible, sectionRef };
}
