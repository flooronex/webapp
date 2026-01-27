"use client";

import { useState, useCallback } from "react";
import { Template } from "../types";

export function useTemplates(templates: Template[], initialCount = 4) {
    const [visibleCount, setVisibleCount] = useState(initialCount);

    const displayTemplates = templates.slice(0, visibleCount);
    const hasMore = visibleCount < templates.length;

    const loadMore = useCallback(() => {
        setVisibleCount((prev) => Math.min(prev + 4, templates.length));
    }, [templates.length]);

    return {
        displayTemplates,
        hasMore,
        loadMore,
    };
}
