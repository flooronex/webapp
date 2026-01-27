import { ResponsiveLabels } from "../types";

export const getLabels = (t: (key: string) => string): ResponsiveLabels => ({
    title: t("title"),
    description: t("description"),
    ctaButton: t("ctaButton"),
    features: {
        adaptsToScreenSize: t("features.adaptsToScreenSize"),
        touchFriendly: t("features.touchFriendly"),
        optimizedOrientation: t("features.optimizedOrientation"),
    },
});
