import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";

export const metadata: Metadata = {
  title: "Get Started | FloorOneX",
  description:
    "Get started with FloorOneX. Choose your path: request a quote as a homeowner or join as a flooring professional.",
};

export default function GetStartedPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white px-6 py-14 shadow-sm dark:border-slate-800 dark:bg-slate-950 md:px-10 md:py-16">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-100/70 to-transparent dark:from-white/5" />

        <div className="relative mx-auto max-w-5xl">
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-1.5 text-sm font-semibold text-slate-700 dark:bg-slate-900 dark:text-slate-300">
              🚀 Get Started
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-1.5 text-sm font-semibold text-slate-700 dark:bg-slate-900 dark:text-slate-300">
              UK Marketplace
            </span>
          </div>

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
            Start your flooring project with confidence.
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-300 md:text-lg">
            FloorOneX helps you connect with verified flooring professionals.
            Pick what you want to do next — we’ll guide you.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {/* Homeowner path */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/40">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-xl dark:bg-slate-800">
                  🏠
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                    I’m a homeowner / client
                  </h2>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                    Request quotes, compare offers, and choose a trusted installer.
                  </p>
                </div>
              </div>

              <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                <li>• Get matched to relevant installers</li>
                <li>• Compare pricing & availability</li>
                <li>• Manage the project from one place</li>
              </ul>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/request-a-quote"
                  className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
                >
                  Request a Quote
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:hover:bg-slate-900"
                >
                  View Pricing
                </Link>
              </div>
            </div>

            {/* Pro path */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/40">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-xl dark:bg-slate-800">
                  🛠️
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                    I’m a flooring professional
                  </h2>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                    Get leads, manage jobs, and grow your business with FloorOneX.
                  </p>
                </div>
              </div>

              <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                <li>• Receive relevant job requests</li>
                <li>• Send quotes & manage bookings</li>
                <li>• Build trust with reviews</li>
              </ul>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
                >
                  Join as a Pro
                </Link>
                <Link
                  href="/learn-more"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:hover:bg-slate-900"
                >
                  How it works
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-900/30 dark:text-slate-300">
            <span className="font-semibold">Tip:</span> If you’re not sure what you need,
            pick “Request a Quote” and describe the project — we’ll help you choose the right service.
          </div>
        </div>
      </section>
    </main>
  );
}
