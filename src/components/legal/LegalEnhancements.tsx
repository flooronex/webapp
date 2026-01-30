"use client";

import { useEffect, useMemo, useState } from "react";

type Section = { id: string; title: string };

export default function LegalEnhancements({
  sections,
}: {
  sections: Section[];
}) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? "");
  const [showTop, setShowTop] = useState(false);

  const ids = useMemo(() => sections.map((s) => s.id), [sections]);

  useEffect(() => {
    // Show "Back to top" after some scroll
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!ids.length) return;

    const headings = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!headings.length) return;

    // IntersectionObserver for Scroll Spy
    const observer = new IntersectionObserver(
      (entries) => {
        // pick the heading that is most visible (or closest to top)
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0));

        if (visible[0]?.target?.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        root: null,
        // "top-24" scroll-mt offset feel; tweak if needed
        rootMargin: "-25% 0px -60% 0px",
        threshold: [0.1, 0.2, 0.35, 0.5, 0.75],
      }
    );

    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [ids]);

  const handlePrint = () => window.print();

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      {/* Action bar (Print / PDF) */}
      <div className="mb-4 flex flex-wrap items-center gap-2 md:justify-end print:hidden">
        <button
          onClick={handlePrint}
          className="inline-flex items-center rounded-xl border border-gray-200 bg-white/60 px-3 py-2 text-sm font-semibold text-gray-800 shadow-sm backdrop-blur hover:bg-white dark:border-gray-800 dark:bg-black/40 dark:text-gray-100 dark:hover:bg-black/60"
        >
          Print / Download PDF
        </button>
      </div>

      {/* TOC with active highlight */}
      <div className="rounded-2xl border border-gray-200 bg-white/60 p-4 shadow-sm backdrop-blur dark:border-gray-800 dark:bg-black/40 print:hidden">
        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
          On this page
        </p>

        <nav className="mt-3 space-y-1">
          {sections.map((s) => {
            const isActive = s.id === activeId;
            return (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={[
                  "block rounded-lg px-3 py-2 text-sm transition",
                  isActive
                    ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-900/50 dark:hover:text-gray-100",
                ].join(" ")}
                aria-current={isActive ? "true" : undefined}
              >
                {s.title}
              </a>
            );
          })}
        </nav>
      </div>

      {/* Back to top */}
      {showTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 rounded-full border border-gray-200 bg-white/70 px-4 py-2 text-sm font-semibold text-gray-800 shadow-lg backdrop-blur hover:bg-white dark:border-gray-800 dark:bg-black/60 dark:text-gray-100 dark:hover:bg-black/80 print:hidden"
          aria-label="Back to top"
          title="Back to top"
        >
          ↑ Top
        </button>
      )}
    </>
  );
}