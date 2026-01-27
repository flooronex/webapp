import { useState, useEffect, useRef, RefObject } from "react";

export function useVisibility<T extends HTMLElement>(): [RefObject<T | null>, boolean] {
    const ref = useRef<T>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        // Use requestAnimationFrame to ensure DOM is fully rendered
        const checkVisibility = () => {
            const rect = element.getBoundingClientRect();
            return rect.top < window.innerHeight && rect.bottom > 0;
        };

        // Check after paint
        const rafId = requestAnimationFrame(() => {
            if (checkVisibility()) {
                setIsVisible(true);
                return;
            }

            // If not visible, set up observer
            const observer = new IntersectionObserver(
                (entries) => {
                    if (entries[0].isIntersecting) {
                        setIsVisible(true);
                        observer.disconnect();
                    }
                },
                { threshold: 0.2 }
            );

            observer.observe(element);
        });

        return () => {
            cancelAnimationFrame(rafId);
        };
    }, []);

    return [ref, isVisible];
}
