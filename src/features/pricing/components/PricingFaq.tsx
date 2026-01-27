"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Card } from "@/components/Card";
import { Collapsible } from "@/components/ui";
import { pricingFaqItems } from "../config/data";
import SectionHeader from "@/components/SectionHeader";

export function PricingFaq() {
  const t = useTranslations("PricingPage");

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mt-3 sm:mt-5"
    >
      {/* Section Header */}
      <SectionHeader
        title={t("faq.title")}
        description={t("faq.description")}
        useAnimatedBackground
      />

      {/* FAQ Accordion */}
      <div className="max-w-2xl mx-auto">
        <Card animated>
          <div className="flex flex-col gap-3">
            {pricingFaqItems.map((item, index) => (
              <Collapsible
                key={item.id}
                title={t(`faq.items.${item.questionKey}`)}
                defaultOpen={index === 0}
              >
                <p className="text-(--text-tertiary) text-sm sm:text-base leading-relaxed">
                  {t(`faq.items.${item.answerKey}`)}
                </p>
              </Collapsible>
            ))}
          </div>
        </Card>
      </div>
    </motion.div>
  );
}
