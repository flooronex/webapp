import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PricingPageContent } from "@/features/pricing";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "PricingPage.meta" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function PricingPage({ params }: Props) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  return <PricingPageContent />;
}
