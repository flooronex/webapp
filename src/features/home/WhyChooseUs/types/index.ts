import { ReactNode } from "react";

export interface Benefit {
    id: string;
    key: string; // Translation key
    icon: ReactNode;
    title: string;
    description: string;
    percentage: number;
}