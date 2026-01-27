"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { GridBg } from "@/components";
import { useTemplates } from "./hooks";
import { getTemplates, getLabels } from "./config";
import { SectionHeader, TemplatesGrid } from "./components";

function TemplatesShowcaseContent() {
  const t = useTranslations("home.templates");

  const templates = useMemo(() => getTemplates(), []);
  const labels = useMemo(() => getLabels(t), [t]);
  const { displayTemplates, hasMore, loadMore } = useTemplates(templates);

  return (
    <section className="relative overflow-hidden max-w-360 mx-auto py-10 sm:py-14 md:py-20 px-2 xs:px-4 sm:px-6 md:px-10 bg-(--surface-secondary-alt)/50 border-(--border-primary)">
      <GridBg
        pattern_type="grid"
        pattern_size={90}
        mask_size={1000}
        opacity={0.6}
        top="-1px"
      />

      <div className="relative z-10">
        <SectionHeader labels={labels} />

        <TemplatesGrid templates={displayTemplates} labels={labels} />

        {/* Load more button if needed */}
        {hasMore && (
          <div className="text-center mt-6 md:mt-8">
            <Button
              variant="default"
              size="default"
              className="w-full xs:w-auto max-w-xs"
              onClick={loadMore}
            >
              {labels.loadMore}
            </Button>
          </div>
        )}

        {/* Browse All Templates Link */}
        <div className="mt-8 sm:mt-12 md:mt-16 text-center">
          <Button
            variant="outline"
            size="default"
            className="w-full xs:w-auto max-w-xs"
          >
            {labels.browseAll}
          </Button>
        </div>
      </div>
    </section>
  );
}

const TemplatesShowcase = dynamic(
  () => Promise.resolve(TemplatesShowcaseContent),
  {
    ssr: false,
    loading: () => (
      <div className="relative overflow-hidden max-w-360 mx-auto py-10 sm:py-14 md:py-20 px-2 xs:px-4 sm:px-6 md:px-10 bg-(--surface-primary) min-h-100">
        <div className="animate-pulse">
          <div className="h-10 bg-(--surface-tertiary) rounded w-64 mb-4"></div>
          <div className="h-4 bg-(--surface-tertiary) rounded w-96 mb-8"></div>
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-65 bg-(--surface-tertiary) rounded-xl"
              />
            ))}
          </div>
        </div>
      </div>
    ),
  }
);

export default TemplatesShowcase;
