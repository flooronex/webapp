// src/app/[locale]/legal/terms-conditions/page.tsx

"use client";

import { useState, useEffect } from "react";

const LAST_UPDATED = "2026-01-30"; // <-- schimbă aici când actualizezi
const COMPANY_NAME = "Functional Flooring Ltd";
const WEBSITE = "www.flooronex.co.uk";

// OPTIONAL: completează datele reale (sau lasă placeholders până ai datele finale)
const REGISTERED_ADDRESS = "37b Downhills Park Road, London, N17 6PE, United Kingdom";
const CONTACT_EMAIL = "office@flooronex.com";
const COMPANY_NUMBER = "15195609";

const sections = [
  { id: "introduction", title: "Introduction" },
  { id: "definitions", title: "Definitions" },
  { id: "eligibility", title: "Eligibility" },
  { id: "account-registration", title: "Account Registration" },
  { id: "platform-role", title: "Platform Role and Disclaimer" },
  { id: "service-requests", title: "Service Requests and Bookings" },
  { id: "payments", title: "Payments" },
  { id: "cancellations", title: "Cancellations and Refunds" },
  { id: "conduct", title: "Conduct and Acceptable Use" },
  { id: "professional-obligations", title: "Professional Obligations" },
  { id: "client-obligations", title: "Client Obligations" },
  { id: "intellectual-property", title: "Intellectual Property" },
  { id: "privacy", title: "Data Protection & Privacy" },
  { id: "termination", title: "Termination" },
  { id: "liability", title: "Liability" },
  { id: "disputes", title: "Disputes" },
  { id: "governing-law", title: "Governing Law" },
  { id: "changes", title: "Changes to These Terms" },
  { id: "contact", title: "Contact Information" },
];

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-gray-200 bg-white/60 px-3 py-1 text-xs font-semibold text-gray-700 shadow-sm backdrop-blur dark:border-gray-800 dark:bg-black/40 dark:text-gray-200">
      {children}
    </span>
  );
}

function Placeholder({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-md bg-amber-100 px-1.5 py-0.5 font-semibold text-amber-900 dark:bg-amber-500/20 dark:text-amber-200">
      {children}
    </span>
  );
}

export default function TermsAndConditionsPage() {
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

  return (
    <>
      {/* Sticky Go to Top Button */}
      {showScrollButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-40 flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg transition-all duration-300 dark:bg-blue-700 dark:hover:bg-blue-600 animate-in fade-in slide-in-from-bottom-4"
          aria-label="Go to top"
          title="Go to top"
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7l4-4m0 0l4 4m-4-4v18"
            />
          </svg>
        </button>
      )}
      <main className="w-full">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-black dark:to-gray-900 px-4 py-16 md:py-20">
        <div className="mx-auto w-full max-w-6xl">
          <div className="flex flex-wrap items-center gap-2">
            <Pill>Legal Document</Pill>
            <Pill>UK Jurisdiction</Pill>
            <Pill>All Users</Pill>
          </div>

          <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-5xl text-gray-900 dark:text-white">
            Terms &amp; Conditions
          </h1>

          <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
            <strong>{COMPANY_NAME}</strong> • {WEBSITE}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Pill>
              <span className="text-blue-600 dark:text-blue-400">📅</span>
              <span className="ml-2">Last Updated: {LAST_UPDATED}</span>
            </Pill>
            <Pill>
              <span className="text-green-600 dark:text-green-400">✓</span>
              <span className="ml-2">Applies to Clients &amp; Service Providers</span>
            </Pill>
          </div>

          <p className="mt-6 max-w-3xl text-base text-gray-700 dark:text-gray-300 leading-relaxed">
            These Terms govern your access to and use of the FloorOneX platform,
            including the mobile application, website, related software, and
            associated services. By using this platform, you agree to be bound
            by these Terms.
          </p>
        </div>
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 py-10 md:py-14">
        <div className="grid gap-10 md:grid-cols-[300px_1fr]">
          {/* Sidebar - TOC */}
          <aside className="md:sticky md:top-20 md:h-fit">
            <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-5 shadow-sm backdrop-blur dark:border-gray-800 dark:from-gray-900/50 dark:to-black/30">
              <p className="text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wide">
                📑 Sections
              </p>
              <nav className="mt-4 space-y-1">
                {sections.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="block rounded-lg px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition-colors dark:text-gray-400 dark:hover:bg-blue-900/20 dark:hover:text-blue-400"
                  >
                    {s.title}
                  </a>
                ))}
              </nav>
              
              <div className="mt-6 border-t border-gray-200 pt-4 dark:border-gray-800">
                <a
                  href="#contact"
                  className="flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors dark:bg-blue-700 dark:hover:bg-blue-600"
                >
                  ✉️ Contact Us
                </a>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <article className="prose prose-gray max-w-none dark:prose-invert prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-10 prose-h2:mb-4 prose-li:marker:text-blue-500 prose-li:py-1">
            {sections.map((s) => (
              <section key={s.id} id={s.id} className="mb-12 scroll-mt-24">
                {s.id === "introduction" && (
                  <>
                    <h2 className="flex items-center gap-2">
                      <span>📜</span> Introduction
                    </h2>
                    <div className="rounded-lg border-l-4 border-blue-500 bg-blue-50 p-4 dark:bg-blue-900/20 mb-6">
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        <strong>Important:</strong> By accessing this platform, you acknowledge and agree to these Terms & Conditions. If you don't agree, please don't use the Platform.
                      </p>
                    </div>
                    <ol className="space-y-3">
                      <li>
                        These Terms &amp; Conditions (&quot;Terms&quot;) govern your
                        access to and use of the {COMPANY_NAME} digital platform,
                        including the FloorOneX mobile application, the website{" "}
                        {WEBSITE}, related software, and any associated services
                        (collectively, the &quot;Platform&quot;).
                      </li>
                      <li>
                        The Platform is operated by {COMPANY_NAME}, a company
                        incorporated in the United Kingdom with its registered office
                        at: <Placeholder>{REGISTERED_ADDRESS}</Placeholder>.
                      </li>
                      <li>
                        By accessing, registering, or using the Platform, you agree to
                        be legally bound by these Terms. If you do not agree, you must
                        not use the Platform.
                      </li>
                      <li>
                        These Terms apply to all users, including customers
                        (&quot;Clients&quot;) and service providers (&quot;Professionals&quot; or
                        &quot;Service Providers&quot;).
                      </li>
                    </ol>
                  </>
                )}
                
                {s.id === "definitions" && (
                  <>
                    <h2 className="flex items-center gap-2">
                      <span>📋</span> Definitions
                    </h2>
                    <ol className="space-y-3">
                      <li>
                        <strong>Client</strong> refers to any individual or entity
                        seeking floor installation, repair, consultation, or related
                        services through the Platform.
                      </li>
                      <li>
                        <strong>Professional</strong> refers to any installer,
                        contractor, tradesperson, or flooring specialist registered to
                        offer services through the Platform.
                      </li>
                      <li>
                        <strong>Services</strong> refers to any tasks requested,
                        accepted, or performed through the Platform.
                      </li>
                      <li>
                        <strong>User</strong> or <strong>You</strong> refers to any
                        individual or entity accessing the Platform.
                      </li>
                      <li>
                        <strong>Account</strong> refers to your user profile created on
                        the Platform.
                      </li>
                      <li>
                        <strong>Agreement</strong> refers collectively to these Terms,
                        the Privacy Policy, Cookie Policy, Code of Conduct, and any
                        additional Platform rules.
                      </li>
                    </ol>
                  </>
                )}
                
                {s.id === "eligibility" && (
                  <>
                    <h2 className="flex items-center gap-2">
                      <span>👤</span> Eligibility
                    </h2>
                    <ol className="space-y-3">
                      <li>You must be at least 18 years old to use the Platform.</li>
                      <li>
                        By registering, you confirm that all information provided is
                        accurate, complete, and up to date.
                      </li>
                      <li>
                        Businesses registering as Professionals must be properly
                        licensed, insured, and legally authorised to provide
                        flooring-related services in the UK or relevant jurisdiction.
                      </li>
                    </ol>
                  </>
                )}
                
                {s.id === "account-registration" && (
                  <>
                    <h2 className="flex items-center gap-2">
                      <span>🔐</span> Account Registration
                    </h2>
                    <ol className="space-y-3">
                      <li>Users must create an account to access certain features.</li>
                      <li>
                        You are responsible for maintaining the confidentiality of your
                        login credentials.
                      </li>
                      <li>
                        {COMPANY_NAME} is not liable for any loss arising from
                        unauthorised access due to your failure to secure your account.
                      </li>
                      <li>
                        We may suspend or terminate any account suspected of abusive,
                        fraudulent, or non-compliant activity.
                      </li>
                    </ol>
                  </>
                )}
                
                {s.id === "platform-role" && (
                  <>
                    <h2 className="flex items-center gap-2">
                      <span>🏢</span> Platform Role and Disclaimer
                    </h2>
                    <div className="rounded-lg border-l-4 border-amber-500 bg-amber-50 p-4 dark:bg-amber-900/20 mb-6">
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        <strong>⚠️ Important Disclaimer:</strong> The Platform is a marketplace facilitating connections only. We do not provide services directly or guarantee outcomes.
                      </p>
                    </div>
                    <ol className="space-y-3">
                      <li>
                        The Platform acts as a digital marketplace facilitating
                        connections between Clients and Professionals.
                      </li>
                      <li>
                        {COMPANY_NAME} does not provide flooring services directly
                        unless explicitly stated.
                      </li>
                      <li>
                        Professionals operate as independent contractors, not employees,
                        partners, or agents of {COMPANY_NAME}.
                      </li>
                      <li>
                        We do not guarantee the quality, safety, legality, or completion
                        of services provided by Professionals.
                      </li>
                      <li>
                        Clients acknowledge that any contract for services is solely
                        between the Client and the Professional.
                      </li>
                    </ol>
                  </>
                )}
                
                {s.id === "service-requests" && (
                  <>
                    <h2 className="flex items-center gap-2">
                      <span>📅</span> Service Requests and Bookings
                    </h2>
                    <ol className="space-y-3">
                      <li>
                        Clients may submit service requests with details such as
                        location, service type, budget, availability, and preferences.
                      </li>
                      <li>
                        Professionals may accept or decline service requests at their
                        discretion.
                      </li>
                      <li>
                        A booking is confirmed when both parties accept the terms of
                        service, price, and schedule.
                      </li>
                      <li>
                        {COMPANY_NAME} is not responsible for cancellations, delays, or
                        disputes between Clients and Professionals.
                      </li>
                    </ol>
                  </>
                )}
                
                {s.id === "payments" && (
                  <>
                    <h2 className="flex items-center gap-2">
                      <span>💳</span> Payments
                    </h2>
                    <ol className="space-y-3">
                      <li>Payments may be processed through the Platform.</li>
                      <li>
                        {COMPANY_NAME} may use escrow, wallet systems, or third-party
                        payment processors.
                      </li>
                      <li>
                        Clients agree to pay all applicable service fees, taxes, and
                        charges.
                      </li>
                      <li>
                        Professionals agree to pay any applicable commissions,
                        subscription fees, or transaction fees as outlined on the
                        Platform.
                      </li>
                      <li>
                        Payment release schedules may vary depending on service type,
                        dispute status, or escrow terms.
                      </li>
                    </ol>
                  </>
                )}
                
                {s.id === "cancellations" && (
                  <>
                    <h2 className="flex items-center gap-2">
                      <span>❌</span> Cancellations and Refunds
                    </h2>
                    <ol className="space-y-3">
                      <li>Cancellation policies vary based on booking type and Professional terms.</li>
                      <li>Clients may be charged cancellation fees.</li>
                      <li>
                        Refunds, when applicable, will be processed according to the Refund &amp; Cancellation Policy.
                      </li>
                      <li>
                        {COMPANY_NAME} reserves the right to issue partial, full, or no refunds depending on circumstances.
                      </li>
                    </ol>
                  </>
                )}
                
                {s.id === "conduct" && (
                  <>
                    <h2 className="flex items-center gap-2">
                      <span>👥</span> Conduct and Acceptable Use
                    </h2>
                    <div className="rounded-lg border-l-4 border-red-500 bg-red-50 p-4 dark:bg-red-900/20 mb-6">
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        <strong>Code of Conduct:</strong> Violations of acceptable use policies may result in account suspension or termination.
                      </p>
                    </div>
                    <ol className="space-y-3">
                      <li>
                        Users must comply with the Code of Conduct, Anti-Bullying &amp; Safe Community Policy, and all Platform rules.
                      </li>
                      <li>
                        Prohibited behaviours include harassment, fraud, hate speech, misrepresentation, spam, unsafe practices, and illegal activities.
                      </li>
                      <li>
                        Professionals must maintain professional behaviour, provide accurate service descriptions, and follow industry standards.
                      </li>
                    </ol>
                  </>
                )}
                
                {s.id === "professional-obligations" && (
                  <>
                    <h2 className="flex items-center gap-2">
                      <span>🔨</span> Professional Obligations
                    </h2>
                    <ol className="space-y-3">
                      <li>Professionals must have all required certifications, legal authorisations, and insurance.</li>
                      <li>Professionals must provide services in a safe, compliant, and professional manner.</li>
                      <li>Misrepresentation of skills, qualifications, or identity is strictly prohibited.</li>
                      <li>
                        Professionals are solely responsible for tax obligations, insurance claims, material costs, subcontractors, and workplace safety.
                      </li>
                    </ol>
                  </>
                )}
                
                {s.id === "client-obligations" && (
                  <>
                    <h2 className="flex items-center gap-2">
                      <span>✋</span> Client Obligations
                    </h2>
                    <ol className="space-y-3">
                      <li>Clients must provide accurate information and safe access to premises.</li>
                      <li>Clients must comply with payment terms.</li>
                      <li>Clients must not request illegal, hazardous, or inappropriate tasks.</li>
                      <li>Clients must treat Professionals with respect and dignity.</li>
                    </ol>
                  </>
                )}
                
                {s.id === "intellectual-property" && (
                  <>
                    <h2 className="flex items-center gap-2">
                      <span>©️</span> Intellectual Property
                    </h2>
                    <ol className="space-y-3">
                      <li>
                        The Platform, trademarks, branding, software, and content are owned by {COMPANY_NAME}.
                      </li>
                      <li>
                        Users may not copy, modify, distribute, reverse engineer, or exploit Platform content without written consent.
                      </li>
                      <li>
                        User-generated content may be used by {COMPANY_NAME} for operational and promotional purposes, subject to the Privacy Policy.
                      </li>
                    </ol>
                  </>
                )}
                
                {s.id === "privacy" && (
                  <>
                    <h2 className="flex items-center gap-2">
                      <span>🔒</span> Data Protection &amp; Privacy
                    </h2>
                    <ol className="space-y-3">
                      <li>
                        {COMPANY_NAME} complies with the UK GDPR, EU GDPR, and Data Protection Act 2018.
                      </li>
                      <li>Use of the Platform signifies acceptance of the Privacy Policy and Cookie Policy.</li>
                      <li>
                        We process data for account management, service facilitation, fraud prevention, and legal compliance.
                      </li>
                    </ol>
                  </>
                )}
                
                {s.id === "termination" && (
                  <>
                    <h2 className="flex items-center gap-2">
                      <span>🚫</span> Termination
                    </h2>
                    <ol className="space-y-3">
                      <li>Users may close their accounts at any time.</li>
                      <li>
                        {COMPANY_NAME} may suspend or terminate accounts for violations of these Terms.
                      </li>
                      <li>Data Retention &amp; Account Deletion Policy outlines how data is retained or erased.</li>
                    </ol>
                  </>
                )}
                
                {s.id === "liability" && (
                  <>
                    <h2 className="flex items-center gap-2">
                      <span>⚖️</span> Liability
                    </h2>
                    <div className="rounded-lg border-l-4 border-orange-500 bg-orange-50 p-4 dark:bg-orange-900/20 mb-6">
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        <strong>Limitation of Liability:</strong> To the fullest extent permitted by law, {COMPANY_NAME} is not liable for damages beyond the scope below.
                      </p>
                    </div>
                    <ol className="space-y-3">
                      <li>
                        To the fullest extent permitted by law, {COMPANY_NAME} is not liable for:
                        <ul className="mt-2 space-y-2 ml-5">
                          <li>damages arising from interactions between Clients and Professionals</li>
                          <li>lost data or unauthorised access</li>
                          <li>personal injury or property damage caused by Professionals</li>
                          <li>lost profits or business interruption</li>
                        </ul>
                      </li>
                      <li>
                        Nothing excludes liability for fraud, gross negligence, or mandatory statutory obligations.
                      </li>
                    </ol>
                  </>
                )}
                
                {s.id === "disputes" && (
                  <>
                    <h2 className="flex items-center gap-2">
                      <span>🤝</span> Disputes
                    </h2>
                    <ol className="space-y-3">
                      <li>Users must follow the Dispute Resolution Policy.</li>
                      <li>{COMPANY_NAME} may assist but is not obligated to mediate disputes.</li>
                      <li>Users agree to attempt informal resolution before pursuing legal action.</li>
                    </ol>
                  </>
                )}
                
                {s.id === "governing-law" && (
                  <>
                    <h2 className="flex items-center gap-2">
                      <span>⚔️</span> Governing Law
                    </h2>
                    <ol className="space-y-3">
                      <li>These Terms are governed by the laws of England and Wales.</li>
                      <li>Any legal action must be brought exclusively in UK courts.</li>
                    </ol>
                  </>
                )}
                
                {s.id === "changes" && (
                  <>
                    <h2 className="flex items-center gap-2">
                      <span>📝</span> Changes to These Terms
                    </h2>
                    <ol className="space-y-3">
                      <li>We may update these Terms to reflect legal, technical, or operational changes.</li>
                      <li>Continued use of the Platform constitutes acceptance of the updated Terms.</li>
                    </ol>
                  </>
                )}
                
                {s.id === "contact" && (
                  <>
                    <h2 className="flex items-center gap-2">
                      <span>📬</span> Contact Information
                    </h2>
                    <div className="mt-6 grid gap-4 md:grid-cols-2">
                      <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-blue-50 to-blue-100 p-6 dark:border-gray-800 dark:from-blue-900/20 dark:to-blue-800/20">
                        <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">Company Name</p>
                        <p className="mt-2 text-lg font-bold text-gray-900 dark:text-white">{COMPANY_NAME}</p>
                      </div>
                      
                      <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-green-50 to-green-100 p-6 dark:border-gray-800 dark:from-green-900/20 dark:to-green-800/20">
                        <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">Company Number</p>
                        <p className="mt-2 text-lg font-bold text-gray-900 dark:text-white"><Placeholder>{COMPANY_NUMBER}</Placeholder></p>
                      </div>
                    </div>
                    
                    <div className="mt-4 rounded-xl border border-gray-200 bg-gradient-to-br from-purple-50 to-purple-100 p-6 dark:border-gray-800 dark:from-purple-900/20 dark:to-purple-800/20">
                      <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">Registered Address</p>
                      <p className="mt-2 text-gray-900 dark:text-white"><Placeholder>{REGISTERED_ADDRESS}</Placeholder></p>
                    </div>
                    
                    <div className="mt-4 rounded-xl border border-gray-200 bg-gradient-to-br from-pink-50 to-pink-100 p-6 dark:border-gray-800 dark:from-pink-900/20 dark:to-pink-800/20">
                      <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">Email</p>
                      <p className="mt-2">
                        <a href={`mailto:${CONTACT_EMAIL}`} className="text-lg font-bold text-pink-700 hover:text-pink-800 dark:text-pink-400 dark:hover:text-pink-300">
                          <Placeholder>{CONTACT_EMAIL}</Placeholder>
                        </a>
                      </p>
                    </div>
                  </>
                )}
              </section>
            ))}

            <hr className="my-12 border-gray-200 dark:border-gray-800" />

            <div className="rounded-lg bg-gray-50 p-6 dark:bg-gray-900/50">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Legal Notice:</strong> This document is provided for informational purposes and should be reviewed by legal counsel to ensure compliance with your specific business model and operations. FloorOneX Ltd reserves the right to modify these Terms at any time.
              </p>
            </div>
          </article>
        </div>
      </div>
    </main>
    </>
  );
}