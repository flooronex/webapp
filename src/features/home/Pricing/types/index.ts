// Re-export shared types from components
export type {
    FeatureCategory,
    PlanFeature,
    Testimonial,
    PricingPlan,
    PricingCardLabels,
    PricingFeature,
    PricingCardProps,
} from "@/components";

// Extended labels interface for home pricing section
export interface PricingLabels {
    badge: string;
    title: string;
    description: string;
    filter: {
        allFeatures: string;
        showButton: string;
        hideButton: string;
        categories: {
            core: string;
            support: string;
            customization: string;
            license: string;
        };
    };
    testimonials: {
        title: string;
        description: string;
        author: string;
        role: string;
        quote: string;
        stats: {
            developers: string;
            developersLabel: string;
            satisfaction: string;
            satisfactionLabel: string;
            components: string;
            componentsLabel: string;
            support: string;
            supportLabel: string;
        };
    };
    footer: {
        title: string;
        description: string;
        cta: string;
    };
    modal: {
        title: string;
        description: string;
        cta: string;
        continue: string;
    };
}
