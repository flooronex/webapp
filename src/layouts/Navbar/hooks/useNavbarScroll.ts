"use client";

import { useEffect, useState } from "react";

export function useNavbarScroll() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        setScrolled(window.scrollY > 0);

        const handleScroll = () => {
            setScrolled(window.scrollY > 0);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return scrolled;
}
