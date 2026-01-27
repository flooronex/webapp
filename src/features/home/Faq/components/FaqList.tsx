"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { FaqItem, FaqLabels } from "../types";
import { FaqItemCard } from "./FaqItemCard";

interface FaqListProps {
  displayedFaqs: FaqItem[];
  showAllFaqs: boolean;
  setShowAllFaqs: (show: boolean) => void;
  hasMoreFaqs: boolean;
  labels: FaqLabels;
}

export function FaqList({
  displayedFaqs,
  showAllFaqs,
  setShowAllFaqs,
  hasMoreFaqs,
  labels,
}: FaqListProps) {
  if (displayedFaqs.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12 text-(--text-muted)"
      >
        {labels.noResults}
      </motion.div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-3 sm:gap-5">
        {displayedFaqs.map((faq, index) => (
          <FaqItemCard
            key={`faq-${index}`}
            question={faq.question}
            answer={faq.answer}
            category={faq.category}
            index={index}
            labels={labels}
          />
        ))}
      </div>

      {hasMoreFaqs && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="flex justify-center mt-6 sm:mt-8"
        >
          <Button
            onClick={() => setShowAllFaqs(!showAllFaqs)}
            variant="outline"
            className="px-6 py-3"
          >
            {showAllFaqs ? labels.showLess : labels.showMore}
          </Button>
        </motion.div>
      )}
    </>
  );
}
