import { Template, TemplateLabels } from "../types";

export const getTemplates = (): Template[] => [
    {
        id: 1,
        name: "Admin Dashboard",
        category: "Dashboard",
        price: 49,
        label: "Popular",
        image: "https://cdn-aniq-ui.com/templates/images/d8a40397-1e84-45d9-b566-ee0f7dfbfc12.jpg",
        url: "https://www.aniq-ui.com/en/templates/next-js-admin-dashboard-template-2",
        features: ["Responsive", "Dark Mode", "Analytics"],
    },
    {
        id: 2,
        name: "Dashboard Pro",
        category: "Dashboard",
        price: 69,
        label: "New",
        image: "https://cdn-aniq-ui.com/templates/images/7cd65860-b276-476d-b610-9dd567845278.jpg",
        url: "https://www.aniq-ui.com/en/templates/next-js-dashboard-template",
        features: ["Charts", "Tables", "Forms"],
    },
    {
        id: 3,
        name: "SaaS Landing",
        category: "Landing",
        price: 59,
        label: "Featured",
        image: "https://cdn-aniq-ui.com/templates/images/4f5d3f60-455f-49bf-8268-322bf81c62ad.jpg",
        url: "https://www.aniq-ui.com/en/templates/saas-landing-page-nextjs-template-2",
        features: ["Hero", "Pricing", "Features"],
    },
    {
        id: 4,
        name: "Business Landing",
        category: "Business",
        price: 49,
        label: "Bestseller",
        image: "https://cdn-aniq-ui.com/templates/images/f0d55f43-cf07-4385-8b11-46d5d72282dc.jpg",
        url: "https://www.aniq-ui.com/en/templates/business-landing-page-nextjs-template",
        features: ["Contact", "About", "Services"],
    },
];

export const getLabels = (t: (key: string) => string): TemplateLabels => ({
    sectionTitle: t("sectionTitle"),
    sectionDescription: t("sectionDescription"),
    viewAll: t("viewAll"),
    preview: t("preview"),
    useTemplate: t("useTemplate"),
    loadMore: t("loadMore"),
    browseAll: t("browseAll"),
});
