import { PricingPlan, Testimonial, PricingLabels } from "../types";

export const testimonials: Testimonial[] = [
    {
        id: 1,
        name: "Michael Doe",
        designation: "Frontend Developer",
        image: "/assets/images/avatar/person/person.png",
    },
    {
        id: 2,
        name: "Emily Rodriguez",
        designation: "Creative Director",
        image: "/assets/images/avatar/person/person-female.png",
    },
    {
        id: 3,
        name: "David Smith",
        designation: "Product Manager",
        image: "/assets/images/avatar/person/person-2.png",
    },
    {
        id: 4,
        name: "Jessica Lee",
        designation: "Software Engineer",
        image: "/assets/images/avatar/person/person-female-2.png",
    },
];

export const getPlans = (t: (key: string) => string): PricingPlan[] => [
    {
        name: t("plans.components.name"),
        description: t("plans.components.description"),
        price: 59,
        priceLabel: t("plans.components.priceLabel"),
        socialProof: t("plans.components.socialProof"),
        featuresTitle: t("plans.components.featuresTitle"),
        features: [
            {
                text: t("plans.components.features.access"),
                category: "Core",
            },
            {
                text: t("plans.components.features.updates"),
                category: "Support",
            },
            {
                text: t("plans.components.features.support"),
                category: "Support",
            },
            {
                text: t("plans.components.features.license"),
                category: "License",
                tooltip: t("plans.components.tooltips.license"),
            },
            {
                text: t("plans.components.features.downloads"),
                category: "Core",
            },
            {
                text: t("plans.components.features.code"),
                category: "Core",
                tooltip: t("plans.components.tooltips.code"),
            },
            {
                text: t("plans.components.features.tailwind"),
                category: "Customization",
            },
            {
                text: t("plans.components.features.documentation"),
                category: "Support",
            },
        ],
        featured: false,
        cta: t("plans.components.cta"),
        badge: null,
        accentColor:
            "from-neutral-200 to-neutral-300 dark:from-neutral-800 dark:to-neutral-600",
        companies: "2.5k",
    },
    {
        name: t("plans.templates.name"),
        description: t("plans.templates.description"),
        price: 159,
        priceLabel: t("plans.templates.priceLabel"),
        socialProof: t("plans.templates.socialProof"),
        featuresTitle: t("plans.templates.featuresTitle"),
        features: [
            {
                text: t("plans.templates.features.components"),
                category: "Core",
                highlighted: true,
            },
            {
                text: t("plans.templates.features.templates"),
                category: "Core",
                highlighted: true,
            },
            {
                text: t("plans.templates.features.updates"),
                category: "Support",
            },
            {
                text: t("plans.templates.features.support"),
                category: "Support",
                highlighted: true,
            },
            {
                text: t("plans.templates.features.license"),
                category: "License",
                tooltip: t("plans.templates.tooltips.license"),
                highlighted: true,
            },
            {
                text: t("plans.templates.features.downloads"),
                category: "Core",
            },
            {
                text: t("plans.templates.features.frameworks"),
                category: "Customization",
                tooltip: t("plans.templates.tooltips.frameworks"),
            },
            {
                text: t("plans.templates.features.figma"),
                category: "Core",
            },
            {
                text: t("plans.templates.features.examples"),
                category: "Support",
            },
            {
                text: t("plans.templates.features.customization"),
                category: "Customization",
            },
        ],
        featured: true,
        cta: t("plans.templates.cta"),
        badge: "Most Popular",
        accentColor:
            "from-neutral-400 to-neutral-700 dark:from-neutral-400 dark:to-white",
        companies: "5.5k",
    },
    {
        name: t("plans.enterprise.name"),
        description: t("plans.enterprise.description"),
        price: 399,
        priceLabel: t("plans.enterprise.priceLabel"),
        socialProof: t("plans.enterprise.socialProof"),
        featuresTitle: t("plans.enterprise.featuresTitle"),
        features: [
            {
                text: t("plans.enterprise.features.everything"),
                category: "Core",
                highlighted: true,
            },
            {
                text: t("plans.enterprise.features.support"),
                category: "Support",
                highlighted: true,
            },
            {
                text: t("plans.enterprise.features.training"),
                category: "Support",
            },
            {
                text: t("plans.enterprise.features.consulting"),
                category: "Support",
                tooltip: t("plans.enterprise.tooltips.consulting"),
            },
            {
                text: t("plans.enterprise.features.customComponents"),
                category: "Customization",
                tooltip: t("plans.enterprise.tooltips.customComponents"),
            },
            {
                text: t("plans.enterprise.features.earlyAccess"),
                category: "Core",
            },
            {
                text: t("plans.enterprise.features.license"),
                category: "License",
                highlighted: true,
            },
            {
                text: t("plans.enterprise.features.integration"),
                category: "Support",
            },
            {
                text: t("plans.enterprise.features.priority"),
                category: "Support",
            },
            {
                text: t("plans.enterprise.features.sla"),
                category: "Support",
                highlighted: true,
            },
        ],
        featured: false,
        cta: t("plans.enterprise.cta"),
        badge: null,
        accentColor:
            "from-neutral-200 to-neutral-300 dark:from-neutral-800 dark:to-neutral-600",
        companies: "12.5k",
    },
];

export const getLabels = (t: (key: string) => string): PricingLabels => ({
    badge: t("badge"),
    title: t("title"),
    description: t("description"),
    filter: {
        allFeatures: t("filter.allFeatures"),
        showButton: t("filter.showButton"),
        hideButton: t("filter.hideButton"),
        categories: {
            core: t("filter.categories.core"),
            support: t("filter.categories.support"),
            customization: t("filter.categories.customization"),
            license: t("filter.categories.license"),
        },
    },
    testimonials: {
        title: t("testimonials.title"),
        description: t("testimonials.description"),
        author: t("testimonials.author"),
        role: t("testimonials.role"),
        quote: t("testimonials.quote"),
        stats: {
            developers: t("testimonials.stats.developers"),
            developersLabel: t("testimonials.stats.developersLabel"),
            satisfaction: t("testimonials.stats.satisfaction"),
            satisfactionLabel: t("testimonials.stats.satisfactionLabel"),
            components: t("testimonials.stats.components"),
            componentsLabel: t("testimonials.stats.componentsLabel"),
            support: t("testimonials.stats.support"),
            supportLabel: t("testimonials.stats.supportLabel"),
        },
    },
    footer: {
        title: t("footer.title"),
        description: t("footer.description"),
        cta: t("footer.cta"),
    },
    modal: {
        title: t("modal.title"),
        description: t("modal.description"),
        cta: t("modal.cta"),
        continue: t("modal.continue"),
    },
});
