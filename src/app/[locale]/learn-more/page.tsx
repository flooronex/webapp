import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";

export const metadata: Metadata = {
  title: "Learn More | FloorOneX",
  description:
    "Learn how FloorOneX works. Request quotes, compare professionals, and manage flooring projects with transparency.",
};

const steps = [
  {
    title: "Describe your project",
    text: "Tell us what you need — service type, location, timeline, and budget.",
    icon: "📝",
  },
  {
    title: "Get matched with pros",
    text: "We connect you with relevant flooring professionals based on your request.",
    icon: "🤝",
  },
  {
    title: "Compare and choose",
    text: "Review quotes, availability, and profiles before deciding.",
    icon: "✅",
  },
  {
    title: "Manage the job",
    text: "Keep everything in one place: updates, communication, and next steps.",
    icon: "📦",
  },
];

const faqs = [
  {
    q: "Is FloorOneX free for homeowners?",
    a: "Requesting quotes is designed to be simple and accessible. Pricing may vary by features and service type — see the pricing page for the latest details.",
  },
  {
    q: "Are professionals verified?",
    a: "We aim to maintain a trusted marketplace by encouraging verification and transparent profiles. Verification requirements can evolve as the platform grows.",
  },
  {
    q: "How fast will I receive quotes?",
    a: "Response times depend on location and availability. Many requests receive replies within 24–48 business hours.",
  },
];

export default function LearnMorePage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white px-6 py-14 shadow-sm dark:border-slate-800 dark:bg-slate-950 md:px-10 md:py-16">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-100/70 to-transparent dark:from-white/5" />

        <div className="relative mx-auto max-w-5xl">
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-1.5 text-sm font-semibold text-slate-700 dark:bg-slate-900 dark:text-slate-300">
              📘 Learn More
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-1.5 text-sm font-semibold text-slate-700 dark:bg-slate-900 dark:text-slate-300">
              Transparency-first
            </span>
          </div>

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
            How FloorOneX works.
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-300 md:text-lg">
            FloorOneX is a marketplace designed to make flooring projects easier.
            Request quotes, compare professionals, and manage the journey from start to finish.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/request-a-quote"
              className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
            >
              Request a Quote
            </Link>
            <Link
              href="/get-started"
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:hover:bg-slate-900"
            >
              Get Started
            </Link>
          </div>

          {/* Steps */}
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {steps.map((s) => (
              <div
                key={s.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/40"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-xl dark:bg-slate-800">
                    {s.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                      {s.title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                      {s.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Trust block */}
          <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-900/30 dark:text-slate-300">
            <p className="font-semibold text-slate-900 dark:text-white">
              Built for trust and clarity
            </p>
            <p className="mt-2">
              We promote transparent profiles, clear communication, and a smooth
              quote process — so you can choose professionals with confidence.
            </p>
          </div>

          {/* FAQ */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              FAQ
            </h2>
            <div className="mt-4 space-y-3">
              {faqs.map((f) => (
                <div
                  key={f.q}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/40"
                >
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {f.q}
                  </p>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                    {f.a}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA bottom */}
          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/40">
            <div>
              <p className="text-lg font-semibold text-slate-900 dark:text-white">
                Ready to start?
              </p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                Submit a quote request — it only takes a couple of minutes.
              </p>
            </div>
            <Link
              href="/request-a-quote"
              className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
            >
              Request a Quote
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
