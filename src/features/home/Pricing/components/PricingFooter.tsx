"use client";

import { motion } from "motion/react";
import { PricingLabels } from "../types";
import { Button } from "@/components";

interface PricingFooterProps {
  labels: PricingLabels;
}

export function PricingFooter({ labels }: PricingFooterProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="mt-12 sm:mt-16 md:mt-20 p-6 sm:p-8 md:p-10 rounded-2xl bg-(--surface-secondary-alt-2) text-center"
    >
      <h3 className="text-xl sm:text-2xl font-bold text-(--text-primary) mb-3 sm:mb-4">
        {labels.footer.title}
      </h3>
      <p className="text-sm sm:text-base text-(--text-tertiary) max-w-2xl mx-auto mb-4 sm:mb-6">
        {labels.footer.description}
      </p>

      <Button href="#contact" className="min-w-30">
        {labels.footer.cta}
      </Button>
    </motion.div>
  );
}
