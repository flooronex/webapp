"use client";

import { TemplateLabels } from "../types";

interface SectionHeaderProps {
  labels: TemplateLabels;
}

export function SectionHeader({ labels }: SectionHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start mb-8 sm:mb-14">
      <div className="mb-4 md:mb-0 w-full md:w-auto">
        <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold mb-2 md:mb-3 text-(--foreground)">
          {labels.sectionTitle}
        </h2>
        <div className="h-0.5 w-16 sm:w-20 md:w-24 border-b border-dashed border-(--border-secondary) mt-1 md:mt-2" />
      </div>
      <div className="w-full md:text-end md:max-w-md mt-2 md:mt-0">
        <p className="text-sm xs:text-base sm:text-lg text-(--text-tertiary)">
          {labels.sectionDescription}
        </p>
      </div>
    </div>
  );
}
