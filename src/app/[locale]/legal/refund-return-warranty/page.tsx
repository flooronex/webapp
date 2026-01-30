"use client";

import { useState, useEffect } from "react";

const LAST_UPDATED = "2026-01-30";
const COMPANY_NAME = "Functional Flooring Ltd";
const WEBSITE = "www.flooronex.co.uk";
const CONTACT_EMAIL = "support@flooronex.com";

const sections = [
  {
    id: "overview",
    title: "Overview",
    emoji: "📋",
    content:
      "This Refund, Return, and Warranty Policy outlines the terms under which customers may return products, request refunds, and utilize warranty protections. We stand behind our products and services with comprehensive coverage to ensure customer satisfaction.",
  },
  {
    id: "return-window",
    title: "Return Window",
    emoji: "📅",
    content:
      "Customers have 30 days from the date of purchase to return items or request a refund. The return window is strictly enforced to protect both our business and ensure inventory management. Items returned after 30 days will not be eligible for full refunds.",
    warning: true,
    warningText: "30-day return period starts from the invoice date.",
  },
  {
    id: "return-conditions",
    title: "Return Conditions",
    emoji: "✅",
    content:
      "Items must be returned in original condition with all packaging, documentation, and accessories. Used or damaged items may be subject to restocking fees. Custom or made-to-order items are non-returnable unless defective.",
    details: [
      "Original packaging and materials intact",
      "All accessories and documentation included",
      "No signs of use or installation",
      "Original receipt or proof of purchase",
      "Items not damaged by customer misuse",
    ],
  },
  {
    id: "refund-process",
    title: "Refund Process",
    emoji: "💰",
    content:
      "Once your return is approved, we will process the refund within 14 business days. Refunds are issued to the original payment method. Customers are responsible for return shipping costs unless the return is due to our error or defect.",
    warning: true,
    warningColor: "amber",
    warningText: "Return shipping is the customer's responsibility.",
  },
  {
    id: "exclusions",
    title: "Non-Returnable Items",
    emoji: "🚫",
    content:
      "Certain items are excluded from our return policy due to their nature or hygiene considerations. Custom flooring installations, clearance items, and final sale products cannot be returned.",
    details: [
      "Custom or made-to-order flooring",
      "Installed/fitted products",
      "Clearance or final sale items",
      "Digital downloads or licenses",
      "Items marked as non-returnable",
    ],
  },
  {
    id: "warranty-coverage",
    title: "Warranty Coverage",
    emoji: "🛡️",
    content:
      "All products come with a manufacturer warranty covering defects in materials and workmanship. The standard warranty period is 12 months from purchase date. Extended warranty options are available at additional cost.",
    details: [
      "12-month standard warranty included",
      "Coverage for manufacturing defects",
      "Excludes normal wear and tear",
      "Extended warranty plans available",
      "Transferable to subsequent owners",
    ],
  },
  {
    id: "warranty-exclusions",
    title: "Warranty Exclusions",
    emoji: "⚠️",
    content:
      "The warranty does not cover damage from improper installation, misuse, accidents, or normal wear and tear. Environmental factors such as humidity and temperature fluctuations may also void warranty coverage in certain cases.",
    warning: true,
    warningColor: "amber",
    warningText: "Professional installation is recommended to maintain warranty validity.",
  },
  {
    id: "installation-warranty",
    title: "Installation Warranty",
    emoji: "🔨",
    content:
      "If installation is provided by Functional Flooring Ltd, workmanship is guaranteed for 24 months. This covers improper installation, misalignment, or defects resulting from our installation service.",
    warning: true,
    warningText: "Installation warranty only applies to services performed by our certified installers.",
  },
  {
    id: "defect-claims",
    title: "Defect Claims Process",
    emoji: "📢",
    content:
      "To file a warranty claim, customers must contact us within 14 days of discovering the defect. Documentation such as photos and proof of purchase will be required. We will assess the claim and determine appropriate remediation.",
    details: [
      "Report defect within 14 days of discovery",
      "Provide photos and detailed description",
      "Submit proof of purchase",
      "Allow 5-7 business days for assessment",
      "Receive repair or replacement decision",
    ],
  },
  {
    id: "repair-replacement",
    title: "Repair vs. Replacement",
    emoji: "🔧",
    content:
      "For warranted defects, we may choose to repair the item or provide a replacement. If the same defect occurs twice, a full refund may be issued at our discretion. All repairs and replacements are provided at no cost to the customer.",
  },
  {
    id: "maintenance",
    title: "Maintenance Requirements",
    emoji: "🧹",
    content:
      "Proper maintenance is essential to maintain warranty coverage. Customers must follow manufacturer guidelines for cleaning, sealing, and protection. Failure to maintain the product may void warranty protection.",
    warning: true,
    warningColor: "amber",
    warningText: "Warranty requires adherence to maintenance guidelines.",
  },
  {
    id: "commercial-warranty",
    title: "Commercial Use Warranty",
    emoji: "🏢",
    content:
      "Products used in commercial settings have different warranty terms. Commercial warranty periods are typically shorter and may have additional exclusions. Contact us for specific commercial warranty details.",
  },
  {
    id: "extended-warranty",
    title: "Extended Warranty Options",
    emoji: "⭐",
    content:
      "Extended warranty plans are available for an additional fee and provide coverage beyond the standard warranty period. Plans can extend coverage to 24, 36, or 60 months depending on the product.",
    details: [
      "Extended coverage for accidental damage",
      "Priority replacement and repair service",
      "Coverage extensions up to 60 months",
      "Transferable to new owners",
      "Competitive pricing available",
    ],
  },
  {
    id: "dispute-resolution",
    title: "Dispute Resolution",
    emoji: "⚖️",
    content:
      "If there is a dispute regarding warranty claims or refunds, we encourage customers to contact our customer service team. Disputes that cannot be resolved informally may be escalated to formal dispute resolution or mediation.",
    warning: true,
    warningColor: "red",
  },
  {
    id: "contact",
    title: "Contact & Support",
    emoji: "📞",
    content:
      "For questions about refunds, returns, or warranty coverage, please contact our customer support team. We are available to assist with all warranty claims and return requests.",
  },
];

export default function RefundReturnWarrantyPage() {
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
                🔄 Return Policy
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-1.5 text-sm font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                💵 Refund Eligible
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-1.5 text-sm font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                30 Days
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
              Refund, Return & Warranty Policy
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
                  <h3 className="font-semibold mb-2">Customer Support</h3>
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
                  <h3 className="font-semibold mb-2">Return Requests</h3>
                  <p>
                    Initiate a return:{" "}
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
