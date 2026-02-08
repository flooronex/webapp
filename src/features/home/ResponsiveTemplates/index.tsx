"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { LampContainer, RetroGrid } from "@/components";
import { getLabels } from "./config";
import { ResponsiveImage, ResponsiveContent } from "./components";

function ResponsiveTemplates() {
  const t = useTranslations("home.responsiveTemplates");

  const labels = useMemo(() => getLabels(t), [t]);

  return (
    <section className="relative">
      <RetroGrid />
      //!TODO: AICI SA FACEM FAIN
      <LampContainer className="p-0 sm:p-12 md:p-16 lg:p-24 border-0">
        <div className="mx-auto px-4 sm:px-6 md:px-8 relative z-50 flex flex-col md:flex-row items-center md:justify-between gap-8 sm:gap-10 md:gap-12 mt-2 sm:mt-3">
          <ResponsiveImage />
          <ResponsiveContent labels={labels} />
        </div>
      </LampContainer>
    </section>
  );
}

export default ResponsiveTemplates;
