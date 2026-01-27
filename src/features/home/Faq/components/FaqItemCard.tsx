"use client";

import { motion } from "motion/react";
import { Collapsible } from "@/components/ui/collapsible";
import { FaqCategory, FaqLabels } from "../types";

interface FaqItemCardProps {
  question: string;
  answer: string;
  category: FaqCategory;
  index: number;
  labels: FaqLabels;
}

export function FaqItemCard({
  question,
  answer,
  category,
  index,
  labels,
}: FaqItemCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.3) }}
    >
      <Collapsible
        title={question}
        badge={labels.categories[category]}
        duration={0.3}
      >
        <p className="text-sm sm:text-base text-(--text-tertiary)">{answer}</p>
        <div className="block sm:hidden mt-3 text-xs px-2 py-1 rounded-full w-fit bg-(--surface-tertiary) text-(--text-tertiary)">
          {labels.categories[category]}
        </div>
      </Collapsible>
    </motion.div>
  );
}
