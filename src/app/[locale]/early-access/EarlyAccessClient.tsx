"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

type Role = "Homeowner" | "Professional" | "Company" | "Other";

type EarlyAccessForm = {
  fullName: string;
  email: string;
  role: Role | "";
  postcode: string;
  message: string;
  consent: boolean;
};

const ROLES: Role[] = ["Homeowner", "Professional", "Company", "Other"];

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

export default function EarlyAccessClient() {
  const [form, setForm] = useState<EarlyAccessForm>({
    fullName: "",
    email: "",
    role: "",
    postcode: "",
    message: "",
    consent: false,
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const errors = useMemo(() => {
    const e: Partial<Record<keyof EarlyAccessForm, string>> = {};
    if (!form.fullName.trim()) e.fullName = "Please enter your name.";
    if (!isEmail(form.email)) e.email = "Please enter a valid email.";
    if (!form.role) e.role = "Please select a role.";
    if (!form.consent) e.consent = "Please confirm you agree to be contacted.";
    return e;
  }, [form]);

  const canSubmit = useMemo(() => Object.keys(errors).length === 0, [errors]);

  const update = <K extends keyof EarlyAccessForm>(key: K, value: EarlyAccessForm[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    try {
      setStatus("submitting");

      // TODO: Replace with real API call later
      // await fetch("/api/early-access", { method: "POST", body: JSON.stringify(form) })

      await new Promise((r) => setTimeout(r, 800));
      setStatus("success");
    } catch {
      setStatus("idle");
    }
  }

  return (
    <main className="min-h-screen">
      <section className="mx-auto max-w-6xl">
        <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr]">
          {/* Left: Explanation */}
          <div className="rounded-3xl border border-slate-200 bg-white p-2 shadow-sm dark:border-slate-800 dark:bg-slate-950 md:p-10">
            <div className="flex justify-center">
              <div className="rounded-2xl bg-white/90 p-3 shadow-lg dark:bg-black/10">
                <Image
                  src="/assets/images/Fox_logo_gradient.png"
                  alt="FloorOneX"
                  width={86}
                  height={86}
                  className="rounded-xl object-contain animate-pulse [animation-duration:2.4s]"
                  priority
                />
              </div>
            </div>

            {/* Status badge */}
            <div className="mt-6 flex justify-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-1.5 text-xs font-semibold text-slate-700 dark:border-slate-800 dark:bg-slate-900/40 dark:text-slate-300">
                <span className="inline-flex h-2 w-2 rounded-full bg-amber-400" />
                Platform in development • Early access available soon
              </span>
            </div>

            <h1 className="mt-4 text-center text-3xl font-bold tracking-tight text-slate-900 dark:text-white md:text-4xl">
              FloorOneX is coming soon
            </h1>

            <p className="mt-3 text-center text-slate-600 dark:text-slate-300">
              We’re actively building FloorOneX — a UK marketplace that connects homeowners with verified flooring
              professionals. The platform isn’t fully live yet, but you can request early access to be among the first
              to try it when it launches.
            </p>

            {/* What this means */}
            <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900/40">
              <p className="font-semibold text-slate-900 dark:text-white">What “in development” means</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-slate-400 dark:bg-slate-500" />
                  <span>Some features are still being built and refined based on real feedback.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-slate-400 dark:bg-slate-500" />
                  <span>Early access invites will be sent gradually as modules become stable.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-slate-400 dark:bg-slate-500" />
                  <span>We’ll use your input to shape service flows, profiles, and trust features.</span>
                </li>
              </ul>
            </div>

            {/* What you get */}
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Benefit
                emoji="⚡"
                title="Early access invite"
                desc="Get notified first and receive access when your area/role is enabled."
              />
              <Benefit
                emoji="🧾"
                title="Better quote experience"
                desc="Help us make quoting faster and clearer for both homeowners and professionals."
              />
              <Benefit
                emoji="✅"
                title="Verified profiles"
                desc="We’re building trust features to showcase professional experience and reliability."
              />
              <Benefit
                emoji="🇬🇧"
                title="UK-first approach"
                desc="Designed around UK postcodes, common services, and real project needs."
              />
            </div>

            {/* Optional navigation */}
            <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                Want to explore what’s already available?
              </p>
              <div className="mt-3 flex flex-wrap gap-3">
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
                >
                  Browse services
                </Link>
                <Link
                  href="/request-a-quote"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:hover:bg-slate-900"
                >
                  Request a quote
                </Link>
              </div>
              <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
                Note: Some parts may be in testing while we prepare the full launch.
              </p>
            </div>
          </div>

          {/* Right: Form */}
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-950 md:p-10">
            {status === "success" ? (
              <SuccessCard email={form.email} />
            ) : (
              <>
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                    Request Early Access
                  </h2>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                    Share a few details — we’ll email you when early access opens.
                  </p>
                </div>

                <form onSubmit={onSubmit} className="space-y-4">
                  <Field label="Full name" error={errors.fullName}>
                    <input
                      value={form.fullName}
                      onChange={(e) => update("fullName", e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-300 focus:ring-2 focus:ring-slate-900/10 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:focus:ring-white/10"
                      placeholder="Your name"
                      autoComplete="name"
                    />
                  </Field>

                  <Field label="Email address" error={errors.email}>
                    <input
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-300 focus:ring-2 focus:ring-slate-900/10 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:focus:ring-white/10"
                      placeholder="you@email.com"
                      autoComplete="email"
                      inputMode="email"
                    />
                  </Field>

                  <Field label="I am a…" error={errors.role}>
                    <select
                      value={form.role}
                      onChange={(e) => update("role", e.target.value as Role)}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-300 focus:ring-2 focus:ring-slate-900/10 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:focus:ring-white/10"
                    >
                      <option value="">Select a role…</option>
                      {ROLES.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field label="Postcode (optional)">
                    <input
                      value={form.postcode}
                      onChange={(e) => update("postcode", e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-300 focus:ring-2 focus:ring-slate-900/10 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:focus:ring-white/10"
                      placeholder="e.g., SW1A 1AA"
                      autoComplete="postal-code"
                    />
                  </Field>

                  <Field label="Anything you want us to prioritize? (optional)">
                    <textarea
                      value={form.message}
                      onChange={(e) => update("message", e.target.value)}
                      className="min-h-[110px] w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-300 focus:ring-2 focus:ring-slate-900/10 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:focus:ring-white/10"
                      placeholder="Example: faster quotes, verified installers, reviews, pricing clarity..."
                    />
                  </Field>

                  <div className="pt-2">
                    <label className="flex gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-900/40 dark:text-slate-300">
                      <input
                        type="checkbox"
                        checked={form.consent}
                        onChange={(e) => update("consent", e.target.checked)}
                        className="mt-0.5 h-4 w-4"
                      />
                      <span>
                        I agree to be contacted about FloorOneX early access updates.
                        <span className="block mt-1 text-xs text-slate-500 dark:text-slate-400">
                          You can unsubscribe anytime.
                        </span>
                      </span>
                    </label>
                    {errors.consent ? (
                      <p className="mt-2 text-xs font-semibold text-red-600 dark:text-red-400">
                        {errors.consent}
                      </p>
                    ) : null}
                  </div>

                  <button
                    type="submit"
                    disabled={!canSubmit || status === "submitting"}
                    className={[
                      "mt-2 w-full rounded-xl px-4 py-3 text-sm font-semibold shadow-sm transition",
                      !canSubmit || status === "submitting"
                        ? "cursor-not-allowed bg-slate-200 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                        : "bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200",
                    ].join(" ")}
                  >
                    {status === "submitting" ? "Submitting…" : "Request Early Access"}
                  </button>

                  <p className="pt-2 text-center text-xs text-slate-500 dark:text-slate-400">
                    By joining, you agree to our{" "}
                    <Link href="/legal/terms-conditions" className="font-semibold hover:underline">
                      Terms
                    </Link>{" "}
                    and{" "}
                    <Link href="/legal/privacy-policy" className="font-semibold hover:underline">
                      Privacy Policy
                    </Link>
                    .
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

function Benefit({ emoji, title, desc }: { emoji: string; title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-lg dark:bg-slate-900">
          {emoji}
        </div>
        <div>
          <p className="font-semibold text-slate-900 dark:text-white">{title}</p>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{desc}</p>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label className="text-sm font-semibold text-slate-900 dark:text-white">{label}</label>
        {error ? (
          <span className="text-xs font-semibold text-red-600 dark:text-red-400">{error}</span>
        ) : null}
      </div>
      {children}
    </div>
  );
}

function SuccessCard({ email }: { email: string }) {
  return (
    <div className="flex h-full flex-col justify-center">
      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 text-center dark:border-slate-800 dark:bg-slate-900/40">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm dark:bg-slate-950">
          🎉
        </div>
        <h2 className="mt-4 text-xl font-semibold text-slate-900 dark:text-white">
          Request received
        </h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Thanks! We’ll email you at <span className="font-semibold">{email}</span> when early access is available.
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
          >
            Back home
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:hover:bg-slate-900"
          >
            Browse services
          </Link>
        </div>
      </div>

      <p className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400">
        We respect your inbox. Unsubscribe anytime.
      </p>
    </div>
  );
}