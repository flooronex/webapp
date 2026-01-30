"use client";

import { useState, useEffect } from "react";

const LAST_UPDATED = "2026-01-30";
const COMPANY_NAME = "Functional Flooring Ltd";
const WEBSITE = "www.flooronex.co.uk";
const CONTACT_EMAIL = "agreements@flooronex.com";

const sections = [
  {
    id: "introduction",
    title: "Introduction",
    emoji: "📋",
    content:
      "This Service Provider Agreement (Agreement) establishes the terms and conditions under which Functional Flooring Ltd (Service Provider) will provide services to Client. By engaging our services, you agree to be bound by the terms outlined in this document.",
  },
  {
    id: "scope",
    title: "Scope of Services",
    emoji: "🎯",
    content:
      "The Service Provider agrees to deliver services as specified in the Statement of Work (SOW) or service schedule provided separately. Services include but are not limited to flooring consultation, installation services, maintenance support, and project management.",
    details: [
      "Initial consultation and site assessment",
      "Project planning and timeline development",
      "Installation of flooring solutions",
      "Quality assurance and inspections",
      "Post-installation support and maintenance",
    ],
  },
  {
    id: "term",
    title: "Term and Termination",
    emoji: "📅",
    content:
      "This Agreement commences on the date of signature and continues until the completion of services as defined in the SOW. Either party may terminate this Agreement with 30 days written notice. Immediate termination is permitted in cases of material breach.",
    warning: true,
    warningText:
      "Termination requires written notice to the email address listed in this agreement.",
  },
  {
    id: "compensation",
    title: "Compensation and Payment Terms",
    emoji: "💰",
    content:
      "Client agrees to pay the Service Provider according to the pricing schedule agreed upon. Payment terms are net 30 days from invoice date. Late payments incur a 1.5% monthly interest charge.",
    details: [
      "Invoices issued upon project milestones",
      "Deposits required before service commencement",
      "Final payment due upon project completion",
      "Payment methods: Bank transfer, Card, Cheque",
    ],
  },
  {
    id: "obligations",
    title: "Service Provider Obligations",
    emoji: "✅",
    content:
      "The Service Provider commits to delivering services with professionalism, competence, and in accordance with all applicable laws and industry standards. All work will be performed by qualified and trained personnel.",
    warning: true,
    warningColor: "amber",
    warningText: "All personnel will carry valid identification and insurance.",
  },
  {
    id: "client-obligations",
    title: "Client Obligations",
    emoji: "🤝",
    content:
      "Client agrees to provide reasonable access to the service location, timely feedback on project requirements, and prompt payment as per agreed terms. Client is responsible for ensuring the site is prepared and safe for service delivery.",
  },
  {
    id: "warranty",
    title: "Warranty and Guarantees",
    emoji: "🛡️",
    content:
      "The Service Provider warrants that services will be performed in a professional manner. Materials supplied are guaranteed against defects for 12 months from installation. Labor warranty extends to 24 months for manufacturing defects in installation.",
    warning: true,
    warningColor: "amber",
    warningText: "Warranty excludes normal wear and tear, accidents, and misuse.",
  },
  {
    id: "liability",
    title: "Limitation of Liability",
    emoji: "⚖️",
    content:
      "The Service Provider's total liability for damages arising from this Agreement shall not exceed the total fees paid in the preceding 12 months. Neither party is liable for indirect, incidental, or consequential damages.",
    warning: true,
    warningColor: "red",
  },
  {
    id: "indemnity",
    title: "Indemnification",
    emoji: "🔒",
    content:
      "Each party agrees to indemnify and hold harmless the other from third-party claims arising from its breach of this Agreement. The indemnifying party agrees to defend, indemnify, and hold harmless from any claims, damages, or costs.",
  },
  {
    id: "confidentiality",
    title: "Confidentiality",
    emoji: "🤐",
    content:
      "Both parties agree to maintain the confidentiality of proprietary information shared during service delivery. This includes project details, pricing, client lists, and technical specifications. Confidentiality obligations survive termination for 2 years.",
  },
  {
    id: "ip-rights",
    title: "Intellectual Property Rights",
    emoji: "©️",
    content:
      "Original work product and designs created by the Service Provider remain the property of the Service Provider unless otherwise specified in writing. Client owns all materials provided and information specific to their project.",
  },
  {
    id: "insurance",
    title: "Insurance and Compliance",
    emoji: "📜",
    content:
      "Service Provider maintains comprehensive liability insurance, workers compensation, and professional indemnity coverage. All services comply with UK Building Regulations, Health & Safety legislation, and industry standards.",
    details: [
      "Public Liability Insurance: £10 million",
      "Employer's Liability Insurance: £10 million",
      "Professional Indemnity: £5 million",
      "All certificates available upon request",
    ],
  },
  {
    id: "dispute",
    title: "Dispute Resolution",
    emoji: "⚠️",
    content:
      "In case of disputes, parties agree to first attempt amicable resolution through negotiation. If unresolved within 14 days, disputes shall be escalated to mediation before pursuing legal action.",
    warning: true,
    warningColor: "amber",
    warningText: "Governing law: England and Wales.",
  },
  {
    id: "amendments",
    title: "Amendments and Changes",
    emoji: "✏️",
    content:
      "Any changes to the scope of services, timeline, or fees must be documented in writing and signed by authorized representatives. Verbal agreements are not binding unless confirmed in writing.",
  },
  {
    id: "contact",
    title: "Contact & Support",
    emoji: "📧",
    content:
      "For questions regarding this Service Provider Agreement, contract terms, or service-related inquiries, please contact our agreements team.",
  },
];

export default function EULAPage() {
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-white dark:bg-neutral-950">
      {/* Hero Header */}
      <div className="bg-white dark:bg-neutral-950 px-4 py-16 md:py-24 border-b border-neutral-200 dark:border-neutral-800">
        <div className="mx-auto max-w-6xl">
          <div className="space-y-6">
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-1.5 text-sm font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                📄 Service Agreement
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-1.5 text-sm font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                ✓ Legally Binding
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-1.5 text-sm font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                All Clients
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
              Service Provider Agreement
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              {COMPANY_NAME}
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Last updated: {LAST_UPDATED}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content with Sidebar */}
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-[300px_1fr]">
          {/* Sticky Sidebar TOC */}
          <aside className="md:sticky md:top-24 md:h-fit md:self-start">
            <div className="rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
              <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">
                Sections
              </h3>
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className="flex items-start gap-3 rounded-lg px-3 py-2 text-left text-sm hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors w-full text-slate-700 dark:text-slate-300"
                  >
                    <span className="mt-0.5 flex-shrink-0">{section.emoji}</span>
                    <span>{section.title}</span>
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Article */}
          <article className="prose prose-sm dark:prose-invert max-w-none">
            {sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-24 mb-8"
              >
                <div className="mb-4">
                  <h2 className="flex items-center gap-3 text-2xl font-bold text-slate-900 dark:text-white mb-3">
                    <span className="text-3xl">{section.emoji}</span>
                    {section.title}
                  </h2>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    {section.content}
                  </p>

                  {section.details && (
                    <ul className="mt-4 space-y-2 ml-4">
                      {section.details.map((detail, idx) => (
                        <li
                          key={idx}
                          className="text-slate-600 dark:text-slate-400 flex items-start gap-2"
                        >
                          <span className="text-slate-500 dark:text-slate-500 font-bold mt-1">
                            •
                          </span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {section.warning && (
                    <div
                      className={`mt-4 rounded-lg border-l-4 px-4 py-3 ${
                        section.warningColor === "red"
                          ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                          : section.warningColor === "amber"
                          ? "border-amber-500 bg-amber-50 dark:bg-amber-900/20"
                          : "border-slate-500 bg-slate-50 dark:bg-slate-800"
                      }`}
                    >
                      <p
                        className={
                          section.warningColor === "red"
                            ? "text-red-700 dark:text-red-300"
                            : section.warningColor === "amber"
                            ? "text-amber-700 dark:text-amber-300"
                            : "text-slate-700 dark:text-slate-300"
                        }
                      >
                        {section.warningText ||
                          "Important information"}
                      </p>
                    </div>
                  )}
                </div>
              </section>
            ))}

            {/* Contact Information */}
            <section className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                Get in Touch
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg bg-gradient-to-br from-slate-600 to-slate-700 p-6 text-white">
                  <h3 className="font-semibold mb-2">Company Name</h3>
                  <p>{COMPANY_NAME}</p>
                </div>
                <div className="rounded-lg bg-gradient-to-br from-slate-600 to-slate-700 p-6 text-white">
                  <h3 className="font-semibold mb-2">Agreements Team</h3>
                  <p>
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="hover:underline"
                    >
                      {CONTACT_EMAIL}
                    </a>
                  </p>
                </div>
                <div className="rounded-lg bg-gradient-to-br from-slate-600 to-slate-700 p-6 text-white">
                  <h3 className="font-semibold mb-2">Website</h3>
                  <p>{WEBSITE}</p>
                </div>
                <div className="rounded-lg bg-gradient-to-br from-slate-600 to-slate-700 p-6 text-white">
                  <h3 className="font-semibold mb-2">Legal Inquiries</h3>
                  <p>
                    For contract questions:{" "}
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="hover:underline"
                    >
                      {CONTACT_EMAIL}
                    </a>
                  </p>
                </div>
              </div>
            </section>
          </article>
        </div>
      </div>

      {/* Sticky Scroll to Top Button */}
      {showScrollButton && (
        <button
          onClick={scrollToTop}
          aria-label="Go to top"
          title="Go to top"
          className="fixed bottom-8 right-8 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-slate-700 text-white shadow-lg hover:bg-slate-800 dark:bg-slate-600 dark:hover:bg-slate-500 transition-colors animate-in fade-in slide-in-from-bottom-4 duration-300"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      )}
    </main>
  );
}
