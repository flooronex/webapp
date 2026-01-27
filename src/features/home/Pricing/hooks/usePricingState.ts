"use client";

import { useState, useEffect } from "react";
import { FeatureCategory } from "../types";

export function usePricingState() {
    const [selectedCategory, setSelectedCategory] = useState<FeatureCategory | null>(null);
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return {
        selectedCategory,
        setSelectedCategory,
        scrollPosition,
    };
}
