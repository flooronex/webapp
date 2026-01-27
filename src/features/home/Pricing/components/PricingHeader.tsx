"use client";

import { motion } from "motion/react";
import { PricingLabels } from "../types";

interface PricingHeaderProps {
  labels: PricingLabels;
}

export function PricingHeader({ labels }: PricingHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="text-center mb-8 sm:mb-12 md:mb-16"
    >
      <motion.span
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="inline-block px-3 py-1 mb-4 text-xs font-medium rounded-full bg-(--surface-tertiary) text-(--text-primary)"
      >
        {labels.badge}
      </motion.span>

      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-(--text-primary) mb-3 sm:mb-4">
        {labels.title}
      </h2>

      <p className="text-sm sm:text-base md:text-lg text-(--text-tertiary) max-w-2xl mx-auto px-4">
        {labels.description}
      </p>
    </motion.div>
  );
}
