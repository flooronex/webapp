"use client";

import { motion } from "motion/react";
import { FooterLabels } from "../types";

interface FooterHeaderProps {
  labels: FooterLabels;
}

export function FooterHeader({ labels }: FooterHeaderProps) {
  return (
    <div className="text-center mb-8 sm:mb-12">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-(--text-primary)"
      >
        {labels.title}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-sm sm:text-base max-w-2xl mx-auto text-(--text-tertiary)"
      >
        {labels.description}
      </motion.p>
    </div>
  );
}
