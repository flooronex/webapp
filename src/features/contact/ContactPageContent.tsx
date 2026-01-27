"use client";

import { useTranslations } from "next-intl";
import {
  ContactForm,
  ContactInfo,
  ContactFaq,
} from "@/features/contact/components";
import PageHeader from "@/components/PageHeader";

export default function ContactPageContent() {
  const t = useTranslations("ContactPage.hero");

  return (
    <main className="relative w-full min-h-screen bg-(--background) overflow-hidden">
      {/* Hero Section with PageHeader */}
      <PageHeader
        badge={t("badge")}
        title={t("title")}
        description={t("description")}
        breadcrumbItems={[{ label: t("badge") }]}
      />

      {/* Main Contact Section */}
      <section className="relative pb-2">
        <div className="container mx-auto max-w-[95vw] sm:max-w-[90vw] md:max-w-312.5 px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Contact Form - Takes 3/5 width */}
            <div className="flex-1 lg:flex-3">
              <ContactForm />
            </div>

            {/* Contact Info - Takes 2/5 width */}
            <div className="flex-1 lg:flex-2">
              <ContactInfo />
            </div>
          </div>

          {/* FAQ Section */}
          <ContactFaq />
        </div>
      </section>
    </main>
  );
}
