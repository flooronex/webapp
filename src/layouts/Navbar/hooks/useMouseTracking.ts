"use client";

import { useEffect, useRef, RefObject } from "react";

interface UseMouseTrackingProps {
    onMouseLeaveNav: () => void;
}

export function useMouseTracking({
    onMouseLeaveNav,
}: UseMouseTrackingProps): RefObject<HTMLDivElement | null> {
    const navRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout>(null);

    useEffect(() => {
        const nav = navRef.current;

        const handleMouseMove = (e: MouseEvent) => {
            if (nav) {
                const rect = nav.getBoundingClientRect();
                const isOutside =
                    e.clientX < rect.left ||
                    e.clientX > rect.right ||
                    e.clientY < rect.top ||
                    e.clientY > rect.bottom;

                if (isOutside) {
                    onMouseLeaveNav();
                }
            }
        };

        document.addEventListener("mousemove", handleMouseMove);
        const timeout = timeoutRef.current;
        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            if (timeout) clearTimeout(timeout);
        };
    }, [onMouseLeaveNav]);

    return navRef;
}
