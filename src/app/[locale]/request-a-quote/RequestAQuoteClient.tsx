"use client";

import { useMemo, useState } from "react";

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  postcode: string;
  city: string;
  serviceType: string;
  propertyType: string;
  areaSqm: string;
  budget: string;
  preferredStart: string;
  notes: string;
  consent: boolean;
};

const SERVICE_TYPES = [
  "Laminate Flooring",
  "Vinyl / LVT",
  "Carpet Installation",
  "Tile / Stone (Tiling)",
  "Floor Repair",
  "Subfloor Preparation",
  "Commercial Flooring",
];

const PROPERTY_TYPES = ["House", "Flat / Apartment", "Office", "Retail", "Other"];

const BUDGETS = ["Under £500", "£500–£1,000", "£1,000–£2,500", "£2,500+"];

function FieldLabel({
  children,
  required,
}: {
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <div className="mb-1.5 flex items-center gap-2">
      <span className="text-sm font-semibold text-neutral-900 dark:text-white">
        {children}
      </span>
      {required ? (
        <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
          (required)
        </span>
      ) : null}
    </div>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={[
        "w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900",
        "placeholder:text-neutral-400 shadow-sm",
        "focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-300",
        "dark:border-neutral-800 dark:bg-neutral-950 dark:text-white dark:placeholder:text-neutral-600",
        "dark:focus:ring-white/10 dark:focus:border-neutral-700",
        props.className ?? "",
      ].join(" ")}
    />
  );
}

function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={[
        "w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900",
        "shadow-sm",
        "focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-300",
        "dark:border-neutral-800 dark:bg-neutral-950 dark:text-white",
        "dark:focus:ring-white/10 dark:focus:border-neutral-700",
        props.className ?? "",
      ].join(" ")}
    >
      {props.children}
    </select>
  );
}

function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={[
        "w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900",
        "placeholder:text-neutral-400 shadow-sm",
        "focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-300",
        "dark:border-neutral-800 dark:bg-neutral-950 dark:text-white dark:placeholder:text-neutral-600",
        "dark:focus:ring-white/10 dark:focus:border-neutral-700",
        props.className ?? "",
      ].join(" ")}
    />
  );
}

export default function RequestAQuoteClient() {
  const [form, setForm] = useState<FormState>({
    fullName: "",
    email: "",
    phone: "",
    postcode: "",
    city: "",
    serviceType: "",
    propertyType: "",
    areaSqm: "",
    budget: "",
    preferredStart: "",
    notes: "",
    consent: false,
  });

  const [files, setFiles] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const errors = useMemo(() => {
    const e: Partial<Record<keyof FormState, string>> = {};

    if (!form.fullName.trim()) e.fullName = "Please enter your full name.";

    if (!form.email.trim()) {
      e.email = "Please enter your email.";
    } else {
      // simple email format check
      const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());
      if (!ok) e.email = "Please enter a valid email address.";
    }

    if (!form.phone.trim()) e.phone = "Please enter your phone number.";
    if (!form.postcode.trim()) e.postcode = "Please enter a postcode.";
    if (!form.serviceType) e.serviceType = "Please choose a service type.";
    if (!form.propertyType) e.propertyType = "Please choose a property type.";
    if (!form.consent) e.consent = "Consent is required to submit.";

    // numeric hint (optional)
    if (form.areaSqm.trim()) {
      const n = Number(form.areaSqm);
      if (Number.isNaN(n) || n <= 0) e.areaSqm = "Please enter a valid area.";
    }

    return e;
  }, [form]);

  const hasErrors = Object.keys(errors).length > 0;

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    setSubmitted(false);

    if (hasErrors) {
      const firstKey = Object.keys(errors)[0] as keyof FormState;
      const el = document.querySelector(
        `[data-field="${firstKey}"]`
      ) as HTMLElement | null;
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setSubmitting(true);

    try {
      // TODO: Connect to Firestore/Supabase/API route.
      // Example payload for later:
      // const payload = { ...form, attachments: files.map(f => ({ name: f.name, size: f.size })) };

      await new Promise((r) => setTimeout(r, 800));

      setSubmitted(true);
      setFiles([]);
      setForm({
        fullName: "",
        email: "",
        phone: "",
        postcode: "",
        city: "",
        serviceType: "",
        propertyType: "",
        areaSqm: "",
        budget: "",
        preferredStart: "",
        notes: "",
        consent: false,
      });

      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-white dark:bg-neutral-950">
      {/* top subtle accent */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-gradient-to-b from-neutral-100/80 to-transparent dark:from-white/5" />

      <div className="relative mx-auto w-full max-w-6xl px-4 py-12 md:py-16">
        {/* header */}
        <header className="mx-auto max-w-3xl text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
            <span className="text-2xl">🧾</span>
          </div>

          <h1 className="text-4xl font-semibold tracking-tight text-neutral-900 md:text-5xl dark:text-white">
            Request a Quote
          </h1>

          <p className="mt-4 text-base leading-relaxed text-neutral-600 md:text-lg dark:text-neutral-300">
            Share your project details and receive quotes from flooring
            professionals. The more details you provide, the more accurate the
            quote.
          </p>

          {submitted && (
            <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-900 dark:border-emerald-900/40 dark:bg-emerald-900/20 dark:text-emerald-100">
              ✅ Request submitted! We’ll get back to you shortly.
            </div>
          )}
        </header>

        {/* content */}
        <div className="mt-10 grid gap-8 md:grid-cols-[1fr_360px]">
          {/* form */}
          <section className="rounded-3xl border border-neutral-200 bg-white/70 p-6 shadow-sm backdrop-blur dark:border-neutral-800 dark:bg-neutral-900/40 md:p-8">
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">
              Project details
            </h2>
            <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">
              Fields marked “required” help us match you with the right
              professionals.
            </p>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <div data-field="fullName">
                <FieldLabel required>Full name</FieldLabel>
                <Input
                  value={form.fullName}
                  onChange={(e) => update("fullName", e.target.value)}
                  placeholder="John Smith"
                  autoComplete="name"
                />
                {errors.fullName && (
                  <p className="mt-1 text-xs font-semibold text-red-600">
                    {errors.fullName}
                  </p>
                )}
              </div>

              <div data-field="email">
                <FieldLabel required>Email</FieldLabel>
                <Input
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="john@email.com"
                  type="email"
                  autoComplete="email"
                />
                {errors.email && (
                  <p className="mt-1 text-xs font-semibold text-red-600">
                    {errors.email}
                  </p>
                )}
              </div>

              <div data-field="phone">
                <FieldLabel required>Phone</FieldLabel>
                <Input
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  placeholder="+44 7xxx xxxxxx"
                  autoComplete="tel"
                />
                {errors.phone && (
                  <p className="mt-1 text-xs font-semibold text-red-600">
                    {errors.phone}
                  </p>
                )}
              </div>

              <div>
                <FieldLabel>City</FieldLabel>
                <Input
                  value={form.city}
                  onChange={(e) => update("city", e.target.value)}
                  placeholder="London"
                  autoComplete="address-level2"
                />
              </div>

              <div data-field="postcode">
                <FieldLabel required>Postcode</FieldLabel>
                <Input
                  value={form.postcode}
                  onChange={(e) => update("postcode", e.target.value)}
                  placeholder="E1 6AN"
                  autoComplete="postal-code"
                />
                {errors.postcode && (
                  <p className="mt-1 text-xs font-semibold text-red-600">
                    {errors.postcode}
                  </p>
                )}
              </div>

              <div data-field="serviceType">
                <FieldLabel required>Service type</FieldLabel>
                <Select
                  value={form.serviceType}
                  onChange={(e) => update("serviceType", e.target.value)}
                >
                  <option value="">Select a service…</option>
                  {SERVICE_TYPES.map((x) => (
                    <option key={x} value={x}>
                      {x}
                    </option>
                  ))}
                </Select>
                {errors.serviceType && (
                  <p className="mt-1 text-xs font-semibold text-red-600">
                    {errors.serviceType}
                  </p>
                )}
              </div>

              <div data-field="propertyType">
                <FieldLabel required>Property type</FieldLabel>
                <Select
                  value={form.propertyType}
                  onChange={(e) => update("propertyType", e.target.value)}
                >
                  <option value="">Select a property…</option>
                  {PROPERTY_TYPES.map((x) => (
                    <option key={x} value={x}>
                      {x}
                    </option>
                  ))}
                </Select>
                {errors.propertyType && (
                  <p className="mt-1 text-xs font-semibold text-red-600">
                    {errors.propertyType}
                  </p>
                )}
              </div>

              <div data-field="areaSqm">
                <FieldLabel>Approx. area (m²)</FieldLabel>
                <Input
                  value={form.areaSqm}
                  onChange={(e) => update("areaSqm", e.target.value)}
                  placeholder="e.g. 35"
                  inputMode="decimal"
                />
                {errors.areaSqm && (
                  <p className="mt-1 text-xs font-semibold text-red-600">
                    {errors.areaSqm}
                  </p>
                )}
              </div>

              <div>
                <FieldLabel>Budget</FieldLabel>
                <Select
                  value={form.budget}
                  onChange={(e) => update("budget", e.target.value)}
                >
                  <option value="">Select a range…</option>
                  {BUDGETS.map((x) => (
                    <option key={x} value={x}>
                      {x}
                    </option>
                  ))}
                </Select>
              </div>

              <div className="md:col-span-2">
                <FieldLabel>Preferred start date</FieldLabel>
                <Input
                  value={form.preferredStart}
                  onChange={(e) => update("preferredStart", e.target.value)}
                  type="date"
                />
              </div>

              <div className="md:col-span-2">
                <FieldLabel>Notes</FieldLabel>
                <Textarea
                  value={form.notes}
                  onChange={(e) => update("notes", e.target.value)}
                  rows={5}
                  placeholder="Tell us more: floor type, current condition, access, parking, timeline…"
                />
              </div>

              <div className="md:col-span-2">
                <FieldLabel>Photos / documents (optional)</FieldLabel>
                <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
                  <input
                    type="file"
                    multiple
                    accept="image/*,.pdf"
                    onChange={(e) => {
                      const next = Array.from(e.target.files ?? []);
                      setFiles(next);
                    }}
                    className="block w-full text-sm text-neutral-700 file:mr-4 file:rounded-xl file:border-0 file:bg-neutral-900 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-neutral-800 dark:text-neutral-200 dark:file:bg-white dark:file:text-neutral-900 dark:hover:file:bg-neutral-200"
                  />

                  {files.length > 0 && (
                    <div className="mt-3 text-xs text-neutral-600 dark:text-neutral-300">
                      <p className="font-semibold">Attached:</p>
                      <ul className="mt-1 list-disc pl-4">
                        {files.map((f) => (
                          <li key={`${f.name}-${f.size}`}>
                            {f.name}{" "}
                            <span className="opacity-70">
                              ({Math.round(f.size / 1024)} KB)
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              <div data-field="consent" className="md:col-span-2">
                <label className="flex items-start gap-3 rounded-2xl border border-neutral-200 bg-white/70 p-4 text-sm text-neutral-700 shadow-sm dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-200">
                  <input
                    type="checkbox"
                    checked={form.consent}
                    onChange={(e) => update("consent", e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900/20 dark:border-neutral-700 dark:bg-neutral-950 dark:text-white"
                  />
                  <span>
                    I agree that FloorOneX may use the information provided to
                    contact me about my request and match me with professionals.
                  </span>
                </label>
                {errors.consent && (
                  <p className="mt-1 text-xs font-semibold text-red-600">
                    {errors.consent}
                  </p>
                )}
              </div>

              <div className="md:col-span-2">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={submitting}
                  className={[
                    "w-full rounded-2xl px-5 py-3 text-sm font-semibold shadow-sm transition",
                    "bg-neutral-900 text-white hover:bg-neutral-800 disabled:opacity-60",
                    "dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200",
                  ].join(" ")}
                >
                  {submitting ? "Submitting…" : "Submit request"}
                </button>

                <p className="mt-3 text-center text-xs text-neutral-500 dark:text-neutral-400">
                  Typical response time: within 24 hours (business days).
                </p>
              </div>
            </div>
          </section>

          {/* side panel */}
          <aside className="space-y-4">
            <div className="rounded-3xl border border-neutral-200 bg-white/70 p-6 shadow-sm backdrop-blur dark:border-neutral-800 dark:bg-neutral-900/40">
              <p className="text-sm font-semibold text-neutral-900 dark:text-white">
                What happens next
              </p>
              <ul className="mt-3 space-y-2 text-sm text-neutral-600 dark:text-neutral-300">
                <li>1) We review your request.</li>
                <li>2) We match you with relevant professionals.</li>
                <li>3) You receive quotes to compare.</li>
                <li>4) You choose the best option.</li>
              </ul>
            </div>

            <div className="rounded-3xl border border-neutral-200 bg-white/70 p-6 shadow-sm backdrop-blur dark:border-neutral-800 dark:bg-neutral-900/40">
              <p className="text-sm font-semibold text-neutral-900 dark:text-white">
                Tips for a better quote
              </p>
              <ul className="mt-3 space-y-2 text-sm text-neutral-600 dark:text-neutral-300">
                <li>Include floor area and material type.</li>
                <li>Add photos of the current condition.</li>
                <li>Mention access/parking constraints.</li>
                <li>Share your ideal timeline.</li>
              </ul>
            </div>

            <div className="rounded-3xl border border-neutral-200 bg-gradient-to-br from-neutral-50 to-white p-6 shadow-sm dark:border-neutral-800 dark:from-neutral-900 dark:to-neutral-950">
              <p className="text-sm font-semibold text-neutral-900 dark:text-white">
                Need help?
              </p>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
                If you’re unsure what service to choose, submit the form with
                notes and we’ll guide you.
              </p>
              <a
                href="/contact"
                className="mt-4 inline-flex w-full items-center justify-center rounded-2xl border border-neutral-200 bg-white px-4 py-2.5 text-sm font-semibold text-neutral-900 shadow-sm hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-950 dark:text-white dark:hover:bg-neutral-900"
              >
                Contact support
              </a>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
