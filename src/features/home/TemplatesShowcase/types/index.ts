export interface Template {
    id: number;
    name: string;
    category: string;
    price: number;
    label?: string;
    image: string;
    url: string;
    features?: string[];
}

export interface TemplateCardProps extends Template {
    index: number;
    labels: TemplateLabels;
}

export interface TemplateLabels {
    sectionTitle: string;
    sectionDescription: string;
    viewAll: string;
    preview: string;
    useTemplate: string;
    loadMore: string;
    browseAll: string;
}
