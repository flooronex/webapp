export interface BenefitCardProps {
    benefit: {
        icon: React.ReactNode;
        title: string;
        description: string;
        percentage: number;
    };
    index: number;
    isRtl?: boolean;
    performanceLabel: string;
}

export interface CardContentProps {
    title: string;
    description: string;
    percentage: number;
    performanceLabel: string;
    isRtl: boolean;
    index: number;
}

export interface CardIconProps {
    icon: React.ReactNode;
    isHovered: boolean;
}

export interface ProgressBarProps {
    percentage: number;
    performanceLabel: string;
    isRtl: boolean;
    index: number;
}
