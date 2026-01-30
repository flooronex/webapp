"use client";

import { useState, useEffect } from "react";

const LAST_UPDATED = "2026-01-30";
const COMPANY_NAME = "Functional Flooring Ltd";
const WEBSITE = "www.flooronex.co.uk";
const CONTACT_EMAIL = "security@flooronex.com";

const sections = [
  {
    id: "introduction",
    title: "Introduction",
    emoji: "📋",
    content:
      "At Functional Flooring Ltd, we are committed to protecting your data and respecting your privacy. This Security Policy outlines how we maintain the security of our systems, protect sensitive information, and comply with applicable data protection regulations.",
  },
  {
    id: "commitment",
    title: "Our Security Commitment",
    emoji: "🛡️",
    content:
      "We implement industry-standard security measures to ensure that your data is protected against unauthorized access, alteration, and disclosure. Our security protocols are regularly reviewed and updated to meet current best practices and regulatory requirements.",
  },
  {
    id: "data-collection",
    title: "Data Collection & Purpose",
    emoji: "📊",
    content:
      "We collect personal data only for specific, lawful purposes. This includes information necessary to provide our services, improve user experience, and comply with legal obligations. All data collection is transparent and complies with GDPR and UK data protection laws.",
    details: [
      "Customer account information",
      "Transaction and billing data",
      "Communication preferences",
      "Usage analytics and behavior data",
    ],
  },
  {
    id: "data-storage",
    title: "Data Storage & Retention",
    emoji: "💾",
    content:
      "We store data in secure, encrypted databases with restricted access. Data is retained only for as long as necessary to fulfill the purposes for which it was collected, unless longer retention is required by law.",
    warning: true,
    warningText: "All backups are encrypted and stored in secure locations.",
  },
  {
    id: "encryption",
    title: "Encryption & Transmission",
    emoji: "🔐",
    content:
      "All sensitive data is encrypted both in transit and at rest using industry-standard encryption protocols (TLS 1.2 and above). This ensures that your information cannot be intercepted or read by unauthorized parties.",
    warning: true,
    warningColor: "blue",
  },
  {
    id: "access-control",
    title: "Access Control & Authentication",
    emoji: "🔑",
    content:
      "We implement strict access controls limiting employee access to personal data on a need-to-know basis. Multi-factor authentication is required for all administrative accounts, and all access is logged and monitored.",
    details: [
      "Role-based access control (RBAC)",
      "Multi-factor authentication (MFA)",
      "Comprehensive audit logging",
      "Regular access reviews",
    ],
  },
  {
    id: "vulnerability",
    title: "Vulnerability Management",
    emoji: "🔍",
    content:
      "We conduct regular security assessments, penetration testing, and code reviews to identify and address vulnerabilities. All security issues are prioritized and remediated promptly.",
    warning: true,
    warningColor: "amber",
    warningText: "Critical vulnerabilities are addressed within 24-48 hours.",
  },
  {
    id: "incident-response",
    title: "Incident Response Plan",
    emoji: "🚨",
    content:
      "We maintain a comprehensive incident response plan to quickly address any security breaches. In the event of a data breach, we notify affected individuals and relevant authorities within required timeframes.",
    warning: true,
    warningColor: "red",
  },
  {
    id: "employee-training",
    title: "Employee Training & Awareness",
    emoji: "👥",
    content:
      "All employees receive mandatory security and data protection training upon onboarding and annually thereafter. We maintain a culture of security awareness throughout the organization.",
  },
  {
    id: "third-party",
    title: "Third-Party Security",
    emoji: "🤝",
    content:
      "We carefully vet all third-party vendors and service providers for security compliance. All vendor agreements include data protection and security requirements. Regular audits ensure ongoing compliance.",
  },
  {
    id: "compliance",
    title: "Regulatory Compliance",
    emoji: "📜",
    content:
      "We comply with GDPR, UK Data Protection Act 2018, and other applicable privacy regulations. Our security practices are aligned with ISO 27001 standards and industry best practices.",
  },
  {
    id: "user-rights",
    title: "Your Rights",
    emoji: "✋",
    content:
      "You have the right to access, rectify, and delete your personal data. You can request a copy of your information, object to processing, or request data portability. To exercise these rights, contact us at the address below.",
  },
  {
    id: "cookies",
    title: "Cookies & Tracking",
    emoji: "🍪",
    content:
      "We use cookies to enhance user experience and analyze website traffic. You can control cookie preferences in your browser settings. For detailed information, see our Cookie Policy.",
  },
  {
    id: "contact",
    title: "Contact Us",
    emoji: "📧",
    content:
      "If you have security concerns, data protection questions, or wish to report a vulnerability, please contact our security team immediately.",
  },
];

export default function SecurityPolicyPage() {
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
                🔒 Security Document
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-1.5 text-sm font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                ✓ UK Compliant
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-1.5 text-sm font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                All Users
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
              Security Policy
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
                          "Important security information"}
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
                  <h3 className="font-semibold mb-2">Contact</h3>
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
                  <h3 className="font-semibold mb-2">Report a Vulnerability</h3>
                  <p>
                    Report security issues confidentially to:{" "}
                    <a
                      href={`mailto:security@flooronex.com`}
                      className="hover:underline"
                    >
                      security@flooronex.com
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
