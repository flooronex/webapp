"use client";

import { Template, TemplateLabels } from "../types";
import { TemplateCard } from "./TemplateCard";

interface TemplatesGridProps {
  templates: Template[];
  labels: TemplateLabels;
}

export function TemplatesGrid({ templates, labels }: TemplatesGridProps) {
  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mt-8">
      {templates.map((template, index) => (
        <TemplateCard
          key={template.id}
          {...template}
          index={index}
          labels={labels}
        />
      ))}
    </div>
  );
}
