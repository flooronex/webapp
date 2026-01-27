export interface MetricProps {
    title: string;
    value: number;
    color: string;
    description?: string;
}

export interface DetailMetric {
    name: string;
    value: string;
    score: "Fast" | "Good" | "Moderate";
}

export type TabType = "performance" | "accessibility" | "best practices" | "seo";
