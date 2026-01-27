export type FeatureCategory = "Core" | "Support" | "Customization" | "License";

export interface PlanFeature {
    text: string;
    category: FeatureCategory;
    tooltip?: string;
    highlighted?: boolean;
}

export interface PricingFeature {
    key: string;
    label: string;
    tooltip?: string;
    highlighted?: boolean;
}

export interface Testimonial {
    id: number;
    name: string;
    designation: string;
    image: string;
}

export interface PricingPlan {
    name: string;
    description: string;
    price: number;
    priceLabel: string;
    socialProof: string;
    featuresTitle: string;
    features: PlanFeature[];
    featured: boolean;
    cta: string;
    badge: string | null;
    accentColor: string;
    companies: string;
}

export interface PricingCardLabels {
    modal: {
        title: string;
        description: string;
        cta: string;
        continue: string;
    };
}

export interface PricingCardProps {
    // Basic info
    id?: string;
    name: string;
    description: string;
    price: number;
    priceLabel?: string;
    priceSuffix?: string;
    billingNote?: string;

    // Styling
    featured?: boolean;
    badge?: string | null;
    index?: number;

    // CTA
    cta?: string;
    ctaText?: string;
    ctaHref?: string;

    // Social proof
    companies?: string;
    companiesCount?: string;
    socialProof?: string;
    socialProofText?: string;
    testimonials?: Testimonial[];

    // Features
    featuresTitle?: string;
    features?: PlanFeature[] | PricingFeature[];
    selectedCategory?: FeatureCategory | null;

    // Modal labels
    labels?: PricingCardLabels;
}
