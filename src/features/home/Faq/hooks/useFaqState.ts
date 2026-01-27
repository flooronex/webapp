"use client";

import { useState } from "react";
import { FaqCategory } from "../types";

export function useFaqState() {
    const [selectedCategory, setSelectedCategory] = useState<FaqCategory | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [showAllFaqs, setShowAllFaqs] = useState(false);

    return {
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        showAllFaqs,
        setShowAllFaqs,
    };
}
