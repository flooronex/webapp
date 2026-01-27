import { ReactNode } from "react";

// KPI types
export type TrendDirection = "up" | "down" | "stable";

export interface Kpi {
    id: string;
    key: string; // Translation key
    title: string;
    value: string;
    icon: ReactNode;
    trend: string; // Trend display value like "+12%"
    trendDirection: TrendDirection;
    color?: string;
}

// Deployment types
export type DeploymentStatus = "ready" | "process" | "error";

export interface Deployment {
    id: string;
    projectKey: string; // Translation key
    name: string;
    description: string;
    status: DeploymentStatus;
    region: string;
    lastDeploy: string;
    date: string;
    environment: string;
    version: string;
    icon: ReactNode;
}