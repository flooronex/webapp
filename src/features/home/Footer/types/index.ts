export interface FooterLabels {
    title: string;
    description: string;
    form: {
        name: string;
        namePlaceholder: string;
        email: string;
        emailPlaceholder: string;
        message: string;
        messagePlaceholder: string;
        submit: string;
        submitting: string;
    };
    captcha: {
        title: string;
        error: string;
        back: string;
        confirm: string;
    };
    success: {
        title: string;
        description: string;
        button: string;
    };
    errors: {
        name: string;
        email: string;
        message: string;
    };
}

export interface MapPoint {
    x: number;
    y: number;
}
