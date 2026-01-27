"use client";

import { motion } from "motion/react";

interface FeatureListProps {
  features: string[];
}

export function FeatureList({ features }: FeatureListProps) {
  return (
    <motion.ul
      className="flex flex-col mt-4 sm:mt-6 gap-2 sm:gap-3 text-start max-w-md mx-auto md:mx-0"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      {features.map((feature, index) => (
        <motion.li
          key={index}
          className="flex items-center text-(--text-tertiary)"
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
        >
          <span className="flex items-center justify-center h-5 sm:h-6 w-5 sm:w-6 rounded-full bg-(--surface-tertiary) me-2 sm:me-3">
            <svg
              className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-(--text-muted)"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </span>
          <span className="text-xs sm:text-sm">{feature}</span>
        </motion.li>
      ))}
    </motion.ul>
  );
}
