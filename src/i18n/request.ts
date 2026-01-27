import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import { hasLocale } from "next-intl";

export default getRequestConfig(async ({ requestLocale }) => {
    // Typically corresponds to the `[locale]` segment
    const requested = await requestLocale;
    const locale = hasLocale(routing.locales, requested)
        ? requested
        : routing.defaultLocale;

    // Load messages using folder-per-page structure
    // Each folder (common, home, etc.) contains en.json and ar.json
    const commonMessages = (await import(`../../messages/common/${locale}.json`))
        .default;

    const homeMessages = (await import(`../../messages/home/${locale}.json`))
        .default;

    const contactMessages = (await import(`../../messages/contact/${locale}.json`))
        .default;

    const pricingMessages = (await import(`../../messages/pricing/${locale}.json`))
        .default;

    return {
        locale,
        messages: {
            common: commonMessages,
            home: homeMessages,
            ...contactMessages,
            ...pricingMessages,
        },
    };
});
