import { FooterLabels, MapPoint } from "../types";

export const mapPoints: MapPoint[] = [
    { x: 72.23622222222225, y: 30.66488888888889 },
    { x: 141.68066666666667, y: 130.99511111111113 },
    { x: 298.01800000000003, y: 252.88333333333335 },
    { x: 576.02, y: 154.19133333333335 },
    { x: 697.5806666666666, y: 121.92622222222222 },
    { x: 486.2708888888889, y: 220.6491111111113 },
    { x: 408.64066666666667, y: 114.21466666666667 },
    { x: 408.132444444445, y: 155.4802222222222 },
];

export const getLabels = (t: (key: string) => string): FooterLabels => ({
    title: t("title"),
    description: t("description"),
    form: {
        name: t("form.name"),
        namePlaceholder: t("form.namePlaceholder"),
        email: t("form.email"),
        emailPlaceholder: t("form.emailPlaceholder"),
        message: t("form.message"),
        messagePlaceholder: t("form.messagePlaceholder"),
        submit: t("form.submit"),
        submitting: t("form.submitting"),
    },
    captcha: {
        title: t("captcha.title"),
        error: t("captcha.error"),
        back: t("captcha.back"),
        confirm: t("captcha.confirm"),
    },
    success: {
        title: t("success.title"),
        description: t("success.description"),
        button: t("success.button"),
    },
    errors: {
        name: t("errors.name"),
        email: t("errors.email"),
        message: t("errors.message"),
    },
});
