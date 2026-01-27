"use client";

import React from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { GridBg } from "@/components";
import { BenefitCard } from "./components";
import { getBenefitsData } from "./config";

// Modern grid container for cards
const CardGrid = ({ children }: { children: React.ReactNode }) => (
  <div className="relative z-10">
    <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5 xs:gap-6 sm:gap-8">
      {children}
    </div>
  </div>
);

export default function WhyChooseUs() {
  const t = useTranslations("home.whyChooseUs");
  const locale = useLocale();
  const isRtl = locale === "ar";

  const benefits = getBenefitsData(t);

  return (
    <section className="py-16 sm:py-20 md:py-28 mt-[-550px] sm:mt-[-200px] px-4 xs:px-6 sm:px-10 md:px-16 relative bg-(--surface-tertiary)/50 overflow-hidden">
      <GridBg
        pattern_type="grid"
        pattern_size={90}
        mask_size={1200}
        opacity={0.05}
        top="-1px"
      />

      {/* Section header with animations */}
      <div className="text-center mb-14 sm:mb-20 relative z-10">
        <span className="px-4 py-1.5 text-xs font-semibold tracking-wider uppercase bg-(--interactive-primary) text-(--text-inverted) rounded-full inline-block mb-4 sm:mb-6 shadow-sm">
          {t("badge")}
        </span>

        <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold text-(--foreground) mb-4 sm:mb-6 tracking-tight">
          {t("title")}
        </h2>

        <motion.p
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-sm xs:text-base sm:text-lg text-(--text-tertiary) max-w-2xl mx-auto"
        >
          {t("description")}
        </motion.p>
      </div>

      {/* Card grid */}
      <div className="container mx-auto px-0 xs:px-2">
        <div className="w-full relative">
          <CardGrid>
            {benefits.map((benefit, index) => (
              <BenefitCard
                key={benefit.id}
                benefit={benefit}
                index={index}
                isRtl={isRtl}
                performanceLabel={t("performanceLabel")}
              />
            ))}
          </CardGrid>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mt-10 sm:mt-14">
          <Button
            variant="default"
            size="lg"
            className="w-full sm:w-auto max-w-xs"
          >
            {t("buttons.exploreTemplates")}
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto max-w-xs"
          >
            {t("buttons.requestCustom")}
          </Button>
        </div>
      </div>
    </section>
  );
}
