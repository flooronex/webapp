"use client";

import { useMemo, useState } from "react";
import { Link } from "@/i18n/navigation";

type Service = {
  id: string;
  name: string;
  category:
    | "Installation"
    | "Repairs"
    | "Preparation"
    | "Commercial"
    | "Finishing";
  short: string;
  tags: string[];
  emoji: string;
  href: string; // where to go next (request a quote)
};

const SERVICES: Service[] = [
  {
    id: "laminate-installation",
    name: "Laminate Flooring Installation",
    category: "Installation",
    short:
      "Supply & fit or fit-only laminate with clean edges and professional finish.",
    tags: ["laminate", "underlay", "skirting", "floating floor"],
    emoji: "🧩",
    href: "/request-a-quote?service=Laminate%20Flooring%20Installation",
  },
  {
    id: "lvt-vinyl",
    name: "Vinyl / LVT Installation",
    category: "Installation",
    short:
      "Luxury Vinyl Tile (LVT) and sheet vinyl fitting, aligned and durable.",
    tags: ["vinyl", "lvt", "wet rooms", "kitchens"],
    emoji: "🟦",
    href: "/request-a-quote?service=Vinyl%20%2F%20LVT%20Installation",
  },
  {
    id: "carpet",
    name: "Carpet Fitting",
    category: "Installation",
    short: "Carpet install with grippers, underlay, and tidy transitions.",
    tags: ["carpet", "underlay", "stairs", "bedrooms"],
    emoji: "🧶",
    href: "/request-a-quote?service=Carpet%20Fitting",
  },
  {
    id: "tile-stone",
    name: "Tile / Stone Flooring",
    category: "Installation",
    short: "Floor tiling and natural stone installation with precise leveling.",
    tags: ["tiles", "stone", "grout", "bathrooms"],
    emoji: "🧱",
    href: "/request-a-quote?service=Tile%20%2F%20Stone%20Flooring",
  },
  {
    id: "floor-repair",
    name: "Floor Repairs",
    category: "Repairs",
    short: "Fix squeaks, loose boards, damaged areas, and worn transitions.",
    tags: ["repair", "squeaks", "boards", "patch"],
    emoji: "🛠️",
    href: "/request-a-quote?service=Floor%20Repairs",
  },
  {
    id: "subfloor-prep",
    name: "Subfloor Preparation",
    category: "Preparation",
    short: "Leveling, screeding, moisture checks, and prep for a perfect base.",
    tags: ["leveling", "screed", "dpm", "primer"],
    emoji: "🧰",
    href: "/request-a-quote?service=Subfloor%20Preparation",
  },
  {
    id: "skirting-trims",
    name: "Skirting Boards & Trims",
    category: "Finishing",
    short: "Skirting, beading, thresholds, and neat finishing touches.",
    tags: ["skirting", "trims", "thresholds", "finish"],
    emoji: "📏",
    href: "/request-a-quote?service=Skirting%20Boards%20%26%20Trims",
  },
  {
    id: "commercial-flooring",
    name: "Commercial Flooring",
    category: "Commercial",
    short: "Durable installs for offices, retail, and high-traffic areas.",
    tags: ["commercial", "office", "retail", "durable"],
    emoji: "🏢",
    href: "/request-a-quote?service=Commercial%20Flooring",
  },
];

const CATEGORIES: Array<Service["category"] | "All"> = [
  "All",
  "Installation",
  "Repairs",
  "Preparation",
  "Finishing",
  "Commercial",
];

export default function ServicesClient() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] =
    useState<(typeof CATEGORIES)[number]>("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return SERVICES.filter((s) => {
      const categoryOk = activeCategory === "All" || s.category === activeCategory;
      if (!categoryOk) return false;

      if (!q) return true;

      const hay = `${s.name} ${s.category} ${s.short} ${s.tags.join(" ")}`.toLowerCase();
      return hay.includes(q);
    });
  }, [query, activeCategory]);

  return (
    <main className="min-h-screen">
      {/* Header */}
      <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white px-6 py-12 shadow-sm dark:border-slate-800 dark:bg-slate-950 md:px-10 md:py-14">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-100/70 to-transparent dark:from-white/5" />

        <div className="relative mx-auto max-w-6xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-1.5 text-sm font-semibold text-slate-700 dark:bg-slate-900 dark:text-slate-300">
                🔎 Browse all services
              </div>
              <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
                Find the right flooring service
              </h1>
              <p className="mt-3 max-w-2xl text-base text-slate-600 dark:text-slate-300 md:text-lg">
                Search by keyword, filter by category, then request a quote in minutes.
              </p>
            </div>

            <Link
              href="/request-a-quote"
              className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
            >
              Request a Quote
            </Link>
          </div>

          {/* Search */}
          <div className="mt-8 grid gap-3 md:grid-cols-[1fr_auto] md:items-center">
            <div className="relative">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                ⌕
              </span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search: laminate, carpet, leveling, repair, commercial…"
                className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-300 focus:ring-2 focus:ring-slate-900/10 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-500 dark:focus:ring-white/10"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((c) => {
                const active = c === activeCategory;
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setActiveCategory(c)}
                    className={[
                      "rounded-full px-4 py-2 text-sm font-semibold transition",
                      active
                        ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                        : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 dark:hover:bg-slate-900",
                    ].join(" ")}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Result count */}
          <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
            Showing <span className="font-semibold">{filtered.length}</span>{" "}
            {filtered.length === 1 ? "service" : "services"}
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="mx-auto mt-10 max-w-6xl">
        {filtered.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center text-slate-700 shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
            <p className="text-lg font-semibold">No results</p>
            <p className="mt-2 text-sm">
              Try a different keyword or clear filters.
            </p>
            <button
              className="mt-5 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
              onClick={() => {
                setQuery("");
                setActiveCategory("All");
              }}
            >
              Reset
            </button>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((s) => (
              <div
                key={s.id}
                className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-950"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-2xl dark:bg-slate-900">
                    {s.emoji}
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                        {s.category}
                      </p>
                      <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                        FloorOneX
                      </p>
                    </div>
                    <h3 className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">
                      {s.name}
                    </h3>
                  </div>
                </div>

                <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                  {s.short}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {s.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-900 dark:text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-between gap-3">
                  <Link
                    href={s.href}
                    className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
                  >
                    Request quote
                  </Link>

                  <button
                    type="button"
                    onClick={() => {
                      // quick fill search
                      setQuery(s.name);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="text-sm font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                  >
                    Search similar →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-lg font-semibold text-slate-900 dark:text-white">
                Not sure what you need?
              </p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                Submit a quote request with a description — we’ll guide you to the right service.
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
