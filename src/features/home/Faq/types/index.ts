export type FaqCategory = "templates" | "components" | "licensing" | "support";

export interface FaqItem {
    question: string;
    answer: string;
    category: FaqCategory;
}

export interface FaqLabels {
    badge: string;
    title: string;
    description: string;
    searchPlaceholder: string;
    categories: {
        all: string;
        templates: string;
        components: string;
        licensing: string;
        support: string;
    };
    noResults: string;
    showMore: string;
    showLess: string;
}
