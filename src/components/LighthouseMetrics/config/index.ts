import { MetricProps, DetailMetric } from "../types";

// Main performance metrics - accepts translation function
export const getMetrics = (t: (key: string) => string): MetricProps[] => [
    {
        title: t("metrics.performance.title"),
        value: 100,
        color: "success",
        description: t("metrics.performance.description"),
    },
    {
        title: t("metrics.accessibility.title"),
        value: 100,
        color: "success",
        description: t("metrics.accessibility.description"),
    },
    {
        title: t("metrics.bestPractices.title"),
        value: 100,
        color: "success",
        description: t("metrics.bestPractices.description"),
    },
    {
        title: t("metrics.seo.title"),
        value: 100,
        color: "success",
        description: t("metrics.seo.description"),
    },
];

// Tab-specific detail metrics - accepts translation function
export const getTabMetrics = (t: (key: string) => string): Record<string, DetailMetric[]> => ({
    performance: [
        { name: t("details.performance.fcp"), value: "0.8s", score: "Fast" },
        { name: t("details.performance.lcp"), value: "1.2s", score: "Fast" },
        { name: t("details.performance.tbt"), value: "0ms", score: "Fast" },
        { name: t("details.performance.cls"), value: "0", score: "Good" },
        { name: t("details.performance.si"), value: "1.4s", score: "Fast" },
    ],
    accessibility: [
        { name: t("details.accessibility.colorContrast"), value: t("values.pass"), score: "Good" },
        { name: t("details.accessibility.ariaAttributes"), value: t("values.pass"), score: "Good" },
        { name: t("details.accessibility.keyboardNav"), value: "100%", score: "Fast" },
        { name: t("details.accessibility.labelsAlt"), value: t("values.pass"), score: "Good" },
        { name: t("details.accessibility.focusIndicators"), value: t("values.pass"), score: "Good" },
    ],
    "best practices": [
        { name: t("details.bestPractices.https"), value: t("values.yes"), score: "Good" },
        { name: t("details.bestPractices.jsErrors"), value: t("values.none"), score: "Fast" },
        { name: t("details.bestPractices.imageRatio"), value: t("values.correct"), score: "Good" },
        { name: t("details.bestPractices.deprecatedApis"), value: t("values.none"), score: "Good" },
        { name: t("details.bestPractices.browserSupport"), value: t("values.modern"), score: "Good" },
    ],
    seo: [
        { name: t("details.seo.metaDescription"), value: t("values.yes"), score: "Good" },
        { name: t("details.seo.crawlableLinks"), value: t("values.pass"), score: "Good" },
        { name: t("details.seo.fontSizes"), value: t("values.pass"), score: "Fast" },
        { name: t("details.seo.searchFriendly"), value: t("values.yes"), score: "Good" },
        { name: t("details.seo.mobileOptimized"), value: t("values.yes"), score: "Fast" },
    ],
});

// Tabs with translation
export const getTabs = (t: (key: string) => string) => [
    { key: "performance", label: t("tabs.performance") },
    { key: "accessibility", label: t("tabs.accessibility") },
    { key: "best practices", label: t("tabs.bestPractices") },
    { key: "seo", label: t("tabs.seo") },
] as const;

// Status messages
export const getStatusMessages = (t: (key: string) => string) => ({
    analyzing: t("status.analyzing"),
    complete: t("status.complete"),
    metricsTitle: (tab: string) => {
        if (tab === "best practices") return t("status.bestPracticesMetrics");
        return t(`status.${tab}Metrics`);
    },
});
