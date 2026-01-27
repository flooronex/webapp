"use client";

import { motion } from "motion/react";
import { FaqLabels } from "../types";

interface FaqHeaderProps {
  labels: FaqLabels;
}

export function FaqHeader({ labels }: FaqHeaderProps) {
  return (
    <div className="mb-8 sm:mb-12 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <span className="inline-block px-3 py-1 mb-4 text-xs font-medium rounded-full bg-(--surface-tertiary) text-(--text-primary)">
          {labels.badge}
        </span>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-(--text-primary) mb-3 sm:mb-4 tracking-tight">
          {labels.title}
        </h2>

        <p className="text-base sm:text-lg text-(--text-tertiary) max-w-2xl mx-auto">
          {labels.description}
        </p>
      </motion.div>
    </div>
  );
}
