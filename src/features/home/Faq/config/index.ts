import { FaqItem, FaqLabels } from "../types";

export const getFaqItems = (t: (key: string) => string): FaqItem[] => [
    {
        question: t("items.download.question"),
        answer: t("items.download.answer"),
        category: "templates",
    },
    {
        question: t("items.updates.question"),
        answer: t("items.updates.answer"),
        category: "licensing",
    },
    {
        question: t("items.clientProjects.question"),
        answer: t("items.clientProjects.answer"),
        category: "licensing",
    },
    {
        question: t("items.framework.question"),
        answer: t("items.framework.answer"),
        category: "components",
    },
    {
        question: t("items.support.question"),
        answer: t("items.support.answer"),
        category: "support",
    },
    {
        question: t("items.custom.question"),
        answer: t("items.custom.answer"),
        category: "templates",
    },
    {
        question: t("items.commercial.question"),
        answer: t("items.commercial.answer"),
        category: "licensing",
    },
    {
        question: t("items.responsive.question"),
        answer: t("items.responsive.answer"),
        category: "templates",
    },
    {
        question: t("items.refund.question"),
        answer: t("items.refund.answer"),
        category: "support",
    },
    {
        question: t("items.import.question"),
        answer: t("items.import.answer"),
        category: "components",
    },
];

export const getLabels = (t: (key: string) => string): FaqLabels => ({
    badge: t("badge"),
    title: t("title"),
    description: t("description"),
    searchPlaceholder: t("searchPlaceholder"),
    categories: {
        all: t("categories.all"),
        templates: t("categories.templates"),
        components: t("categories.components"),
        licensing: t("categories.licensing"),
        support: t("categories.support"),
    },
    noResults: t("noResults"),
    showMore: t("showMore"),
    showLess: t("showLess"),
});
