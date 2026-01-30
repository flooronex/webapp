export const metadata = {
  title: "About Us | FloorOneX",
  description:
    "Learn about FloorOneX — a UK marketplace connecting homeowners with verified flooring professionals.",
};

const COMPANY_NAME = "FloorOneX";
const COMPANY_LEGAL = "Functional Flooring Ltd";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-neutral-950">
      {/* Top glow / subtle background */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-gradient-to-b from-neutral-100/80 to-transparent dark:from-white/5" />

      <div className="relative mx-auto w-full max-w-5xl px-4 py-12 md:py-16">
        {/* Header */}
        <header className="text-center">
          {/* Logo / Image */}
          <div className="mx-auto mb-6 flex h-55 w-55 items-center justify-center rounded-2xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
            <img
              src="/assets/images/Fox_logo_gradient.png"
              alt={`${COMPANY_NAME} logo`}
              className="h-50 w-50 rounded-2xl object-contain animate-pulse"
            />
          </div>

          <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/70 px-4 py-1.5 text-sm font-semibold text-neutral-700 shadow-sm backdrop-blur dark:border-neutral-800 dark:bg-neutral-900/60 dark:text-neutral-200">
            About {COMPANY_NAME}
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-neutral-900 md:text-5xl dark:text-white">
            Built for trust, clarity, and better flooring projects.
          </h1>

          <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-neutral-600 md:text-lg dark:text-neutral-300">
            {COMPANY_NAME} is a UK-based marketplace operated by{" "}
            <span className="font-semibold text-neutral-900 dark:text-white">
              {COMPANY_LEGAL}
            </span>
            . We connect homeowners and businesses with verified flooring
            professionals, making it easier to request quotes, compare options,
            and manage projects with confidence.
          </p>
        </header>

        {/* Divider */}
        <div className="my-10 h-px w-full bg-neutral-200 dark:bg-neutral-800" />

        {/* Content */}
        <section className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-neutral-200 bg-white/70 p-6 shadow-sm backdrop-blur dark:border-neutral-800 dark:bg-neutral-900/50">
            <p className="text-sm font-semibold text-neutral-900 dark:text-white">
              ✅ Verified professionals
            </p>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
              We promote higher standards by encouraging transparent profiles,
              credentials, and clear communication between clients and service
              providers.
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-white/70 p-6 shadow-sm backdrop-blur dark:border-neutral-800 dark:bg-neutral-900/50">
            <p className="text-sm font-semibold text-neutral-900 dark:text-white">
              🔎 Compare quotes with confidence
            </p>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
              Request a job, receive offers, and compare price, timeline, and
              experience — all in one place, with a consistent workflow.
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-white/70 p-6 shadow-sm backdrop-blur dark:border-neutral-800 dark:bg-neutral-900/50">
            <p className="text-sm font-semibold text-neutral-900 dark:text-white">
              🧾 Transparent project workflow
            </p>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
              From request to completion, FloorOneX is designed to reduce
              misunderstandings and keep project details organized.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="mt-10 rounded-3xl border border-neutral-200 bg-gradient-to-br from-neutral-50 to-white p-8 shadow-sm dark:border-neutral-800 dark:from-neutral-900 dark:to-neutral-950">
          <h2 className="text-center text-2xl font-semibold text-neutral-900 dark:text-white">
            Our mission
          </h2>
          <p className="mx-auto mt-3 max-w-3xl text-center text-sm leading-relaxed text-neutral-600 md:text-base dark:text-neutral-300">
            To make flooring services easier to access and easier to trust —
            helping clients find reliable professionals, and helping great
            installers grow through a modern, transparent platform.
          </p>

          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl border border-neutral-200 bg-white px-5 py-2.5 text-sm font-semibold text-neutral-900 shadow-sm hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800"
            >
              Contact us
            </a>

            <a
              href="/pricing"
              className="inline-flex items-center justify-center rounded-xl bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
            >
              View pricing
            </a>
          </div>

          <p className="mt-6 text-center text-xs text-neutral-500 dark:text-neutral-400">
            {COMPANY_NAME} is operated by {COMPANY_LEGAL} in the United Kingdom.
          </p>
        </section>
      </div>
    </main>
  );
}