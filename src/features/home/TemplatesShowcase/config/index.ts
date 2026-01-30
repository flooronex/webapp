import { Template, TemplateLabels } from "../types";

export const getTemplates = (): Template[] => [
    {
        id: 1,
        name: "Floor Repair Services",
        category: "Classic",
        price: 500,
        label: "Popular",
        image: "/assets/videos/repair.mp4",
        url: "/",
        features: ["Fast inspection & repair",
            "Fix cracks, gaps & uneven areas",],
    },
    {
        id: 2,
        name: "Carpet Installation Services",
        category: "Carpeting",
        price: 750,
        label: "New",
        image: "/assets/videos/carpet.mp4",
        url: "#",
        features: [
            "Accurate measuring & fitting",
            "Wide range of carpet types",
            "Underlay supply & installation",
            "Clean edges and seamless finish",
            "Professional, dust-free installation",
        ],
    },
    {
        id: 5,
        name: "Laminate Flooring Installation",
        category: "Laminate",
        price: 850,
        label: "Popular",
        image: "/assets/videos/parquet.mp4",
        url: "#",
        features: [
            "Professional laminate floor fitting",
            "Subfloor preparation & levelling",
            "Underlay supply & installation",
            "Precision cutting & clean joints",
            "Durable, seamless finish",
        ],
    },
    {
        id: 4,
        name: "Tile Installation Services",
        category: "Tiling",
        price: 950,
        label: "Bestseller",
        image: "/assets/videos/sandstone.mp4",
        url: "#",
        features: [
            "Precise tile layout & alignment",
            "Wall and floor tile installation",
            "Grouting & finishing included",
            "Natural stone, porcelain & ceramic",
            "Clean, durable professional finish",
        ],
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
