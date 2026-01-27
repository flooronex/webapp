"use client";

import { useTranslations } from "next-intl";
import SectionHeader from "@/components/SectionHeader";

export function FaqHeader() {
  const t = useTranslations("ContactSection.faq");

  return (
    <SectionHeader
      title={t("title")}
      description={t("description")}
      useAnimatedBackground
    />
  );
}
