"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import PageHeader from "@/components/PageHeader";
import {
  PricingCards,
  BillingToggle,
  ComparisonTable,
  PricingFaq,
} from "./components";

export default function PricingPageContent() {
  const [isAnnual, setIsAnnual] = useState(false);
  const t = useTranslations("PricingPage");

  return (
    <main className="relative w-full min-h-screen bg-bg-dark overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Radial glow */}
        <div className="absolute top-1/3 start-1/4 w-125 h-125 bg-brand-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 end-1/4 w-100 h-100 bg-brand-primary/5 rounded-full blur-[100px]" />
      </div>

      {/* Hero Section with PageHeader */}
      <PageHeader
        badge={t("hero.badge")}
        title={t("hero.title")}
        description={t("hero.description")}
        breadcrumbItems={[{ label: t("hero.badge") }]}
      />

      {/* Billing Toggle & Cards Section */}
      <section className="relative py-6 sm:py-8">
        <div className="container mx-auto max-w-[95vw] sm:max-w-[90vw] md:max-w-312.5 px-4 sm:px-6">
          <BillingToggle isAnnual={isAnnual} onToggle={setIsAnnual} />
          <PricingCards isAnnual={isAnnual} />
        </div>
      </section>

      {/* Comparison Table Section */}
      <section className="relative py-8 sm:py-12">
        <div className="container mx-auto max-w-[95vw] sm:max-w-[90vw] md:max-w-312.5 px-4 sm:px-6">
          <ComparisonTable />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-8 sm:py-12">
        <div className="container mx-auto max-w-[95vw] sm:max-w-[90vw] md:max-w-312.5 px-4 sm:px-6">
          <PricingFaq />
        </div>
      </section>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-linear-to-t from-bg-dark to-transparent pointer-events-none" />
    </main>
  );
}
