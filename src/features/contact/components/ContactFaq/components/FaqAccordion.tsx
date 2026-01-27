"use client";

import { Collapsible } from "@/components/ui";
import { useFaqItems } from "../hooks";

export function FaqAccordion() {
  const { translatedFaqs } = useFaqItems();

  return (
    <div className="flex flex-col gap-3">
      {translatedFaqs.map((faq, index) => (
        <Collapsible
          key={faq.id}
          title={faq.question}
          defaultOpen={index === 0}
        >
          <p className="text-(--text-tertiary) text-sm sm:text-base leading-relaxed">
            {faq.answer}
          </p>
        </Collapsible>
      ))}
    </div>
  );
}
