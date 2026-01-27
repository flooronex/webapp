import { ReactNode, ComponentType } from "react";

export interface Feature {
    title: string;
    description: string;
    icon?: ReactNode;
    footer?: string;
    size: string;
    customComponent?: ComponentType;
}

export interface FeatureCardProps {
    feature: Feature;
    index: number;
    isRtl?: boolean;
}
