"use client";

import { motion } from "motion/react";
import { PricingCard } from "@/components";
import type { PricingPlan, Testimonial, FeatureCategory } from "@/components";
import type { PricingLabels } from "../types";

interface PricingGridProps {
  plans: PricingPlan[];
  testimonials: Testimonial[];
  selectedCategory: FeatureCategory | null;
  labels: PricingLabels;
}

export function PricingGrid({
  plans,
  testimonials,
  selectedCategory,
  labels,
}: PricingGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-5 max-w-7xl mx-auto">
      {plans.map((plan, index) => (
        <motion.div
          key={plan.name}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="max-w-sm mx-auto w-full md:max-w-none"
        >
          <PricingCard
            name={plan.name}
            description={plan.description}
            price={plan.price}
            priceLabel={plan.priceLabel}
            featured={plan.featured}
            badge={plan.badge}
            testimonials={testimonials}
            socialProof={plan.socialProof}
            featuresTitle={plan.featuresTitle}
            features={plan.features}
            selectedCategory={selectedCategory}
            cta={plan.cta}
            labels={{ modal: labels.modal }}
          />
        </motion.div>
      ))}
    </div>
  );
}
