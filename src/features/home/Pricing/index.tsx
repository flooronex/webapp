"use client";

import { useTranslations } from "next-intl";
import { GridBg } from "@/components";
import { FeatureCategory } from "./types";
import { testimonials, getPlans, getLabels } from "./config";
import { usePricingState } from "./hooks";
import {
  PricingHeader,
  PricingGrid,
  FeatureFilter,
  PricingFooter,
} from "./components";

export default function PricesSection() {
  const t = useTranslations("home.pricing");
  const { selectedCategory, setSelectedCategory } = usePricingState();

  // Get translated data
  const plans = getPlans(t);
  const labels = getLabels(t);

  // Get all unique categories from features
  const allCategories = Array.from(
    new Set(
      plans.flatMap((plan) => plan.features.map((feature) => feature.category))
    )
  ) as FeatureCategory[];

  return (
    <section className="relative z-10 overflow-hidden flex flex-col items-center justify-center w-full py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-10 mx-auto bg-(--surface-secondary-alt)/70">
      <GridBg
        pattern_type="grid"
        pattern_size={90}
        mask_size={2000}
        opacity={0.6}
        top="-1px"
      />

      {/* Section content */}
      <div className="relative z-10 container mx-auto max-w-6xl">
        {/* Header */}
        <PricingHeader labels={labels} />

        {/* Feature filter */}
        <FeatureFilter
          allCategories={allCategories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          labels={labels}
        />

        {/* Pricing grid */}
        <PricingGrid
          plans={plans}
          testimonials={testimonials}
          selectedCategory={selectedCategory}
          labels={labels}
        />

        {/* Footer */}
        <PricingFooter labels={labels} />
      </div>
    </section>
  );
}
