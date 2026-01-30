"use client";

import { useState, useEffect } from "react";

const LAST_UPDATED = "2026-01-30";
const COMPANY_NAME = "Functional Flooring Ltd";
const WEBSITE = "www.flooronex.co.uk";
const CONTACT_EMAIL = "privacy@flooronex.com";

const sections = [
  {
    id: "introduction",
    title: "Introduction",
    emoji: "📋",
    content:
      "Functional Flooring Ltd is committed to protecting your privacy and ensuring transparent data practices. This Privacy Policy explains how we collect, use, disclose, and process your personal information in compliance with GDPR, UK Data Protection Act 2018, and other applicable privacy laws.",
  },
  {
    id: "what-we-collect",
    title: "What Information We Collect",
    emoji: "📊",
    content:
      "We collect information necessary to provide our services and improve your experience. This includes data you provide directly and information collected automatically through your interactions with us.",
    details: [
      "Contact information (name, email, phone, address)",
      "Service request and project details",
      "Payment and billing information",
      "Communication preferences and history",
      "Website usage data and analytics",
      "Device and IP address information",
    ],
  },
  {
    id: "how-we-use",
    title: "How We Use Your Information",
    emoji: "🎯",
    content:
      "We use your information to deliver services, fulfill contracts, comply with legal obligations, and improve our offerings. Your data helps us personalize your experience and provide relevant communications.",
    details: [
      "Providing and managing services",
      "Processing payments and invoicing",
      "Customer support and communication",
      "Marketing and promotional materials",
      "Analytics and service improvement",
      "Fraud prevention and security",
    ],
  },
  {
    id: "legal-basis",
    title: "Legal Basis for Processing",
    emoji: "⚖️",
    content:
      "We process your personal data based on legitimate business interests, contract performance, legal compliance, or your explicit consent. We maintain transparency about our legal basis for each data processing activity.",
    warning: true,
    warningText: "You have the right to withdraw consent at any time.",
  },
  {
    id: "sharing",
    title: "Data Sharing & Third Parties",
    emoji: "🤝",
    content:
      "We do not sell your personal data. We may share information with trusted service providers, contractors, and when legally required. All third parties are contractually bound to protect your data.",
    details: [
      "Payment processors and financial institutions",
      "Cloud service providers and hosting platforms",
      "Law enforcement and regulatory authorities (as required)",
      "Professional advisors (accountants, solicitors)",
      "Service delivery partners",
    ],
  },
  {
    id: "retention",
    title: "Data Retention",
    emoji: "📅",
    content:
      "We retain personal data for as long as necessary to fulfill the purposes outlined in this policy or as required by law. Once data is no longer needed, we securely delete or anonymize it.",
    warning: true,
    warningColor: "amber",
    warningText: "Retention periods vary based on data type and legal requirements.",
  },
  {
    id: "security",
    title: "Data Security",
    emoji: "🔐",
    content:
      "We implement industry-standard security measures to protect your data against unauthorized access, loss, or misuse. This includes encryption, access controls, secure storage, and regular security assessments.",
    warning: true,
    warningColor: "amber",
    warningText: "No data transmission is 100% secure. We cannot guarantee absolute security.",
  },
  {
    id: "rights",
    title: "Your Privacy Rights",
    emoji: "✋",
    content:
      "You have the right to access, correct, delete, port, and object to processing of your personal data. Under GDPR, you also have rights to restrict processing and be informed of data breaches.",
    details: [
      "Right of access to your personal data",
      "Right to rectification of inaccurate data",
      "Right to erasure (right to be forgotten)",
      "Right to restrict processing",
      "Right to data portability",
      "Right to object to processing",
    ],
  },
  {
    id: "cookies",
    title: "Cookies & Tracking Technologies",
    emoji: "🍪",
    content:
      "We use cookies to enhance user experience, track website analytics, and remember preferences. You can control cookie settings in your browser. For detailed information, see our Cookie Policy.",
    warning: true,
    warningText: "Essential cookies are necessary for website functionality.",
  },
  {
    id: "marketing",
    title: "Marketing Communications",
    emoji: "📧",
    content:
      "We may send marketing communications if you opt-in. You can unsubscribe from marketing emails at any time by clicking the unsubscribe link or contacting us. We respect all marketing preference choices.",
  },
  {
    id: "children",
    title: "Children's Privacy",
    emoji: "👶",
    content:
      "Our services are not directed to individuals under 18 years old. We do not knowingly collect personal data from children. If we become aware of such collection, we will promptly delete the information.",
    warning: true,
    warningColor: "red",
    warningText: "Parents should monitor their children's internet usage.",
  },
  {
    id: "international",
    title: "International Data Transfers",
    emoji: "🌍",
    content:
      "If we transfer your data internationally, we ensure appropriate safeguards are in place, such as standard contractual clauses or adequacy decisions. EU-to-UK transfers follow post-Brexit regulations.",
  },
  {
    id: "dpo",
    title: "Data Protection Officer",
    emoji: "👤",
    content:
      "We have appointed a Data Protection Officer to oversee our privacy practices and compliance with applicable laws. You can contact our DPO with any privacy concerns or requests.",
  },
  {
    id: "changes",
    title: "Policy Changes",
    emoji: "✏️",
    content:
      "We may update this Privacy Policy periodically to reflect regulatory changes or operational improvements. We will notify you of significant changes by posting updates on our website.",
  },
  {
    id: "contact",
    title: "Contact Us",
    emoji: "📞",
    content:
      "If you have questions about our privacy practices, wish to exercise your rights, or have a privacy complaint, please contact us using the information below.",
  },
];

export default function PrivacyPolicyPage() {
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
                🔒 Privacy Information
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-1.5 text-sm font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                ✓ GDPR Compliant
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-1.5 text-sm font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                All Users
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
              Privacy Policy
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
                Contact Us
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg bg-gradient-to-br from-slate-600 to-slate-700 p-6 text-white">
                  <h3 className="font-semibold mb-2">Company Name</h3>
                  <p>{COMPANY_NAME}</p>
                </div>
                <div className="rounded-lg bg-gradient-to-br from-slate-600 to-slate-700 p-6 text-white">
                  <h3 className="font-semibold mb-2">Privacy Team</h3>
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
                  <h3 className="font-semibold mb-2">Data Requests</h3>
                  <p>
                    Exercise your privacy rights:{" "}
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
