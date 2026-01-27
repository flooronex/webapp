"use client";

import { ShineBorder } from "@/components";
import { FeatureCardProps } from "../../types";

export default function FeatureCard({
  feature,
  index,
  isRtl = false,
}: FeatureCardProps) {
  const CustomComponent = feature.customComponent;

  return (
    <div
      className={`mb-2 ${feature.size} bg-(--surface-secondary-alt) dark:bg-(--surface-secondary-alt-2) relative rounded-xl p-4 sm:p-6 flex flex-col`}
      role="listitem"
      aria-labelledby={`feature-title-${index}`}
    >
      <ShineBorder
        shineColor="var(--shineBorder)"
        className="hidden dark:block"
      />

      {/* Header with icon and title */}
      <div className="flex items-center mb-2 sm:mb-3">
        {feature.icon && (
          <div
            className="p-1 sm:p-2 bg-(--surface-hover) rounded-lg me-2"
            aria-hidden="true"
          >
            <div className="text-(--text-tertiary)">{feature.icon}</div>
          </div>
        )}
        <h3
          id={`feature-title-${index}`}
          className="text-sm sm:text-base font-semibold text-(--text-primary)"
        >
          {feature.title}
        </h3>
      </div>

      {/* Custom content */}
      {CustomComponent && (
        <div className="flex-1">
          <CustomComponent />
        </div>
      )}

      {/* Footer */}
      {feature.footer && (
        <div className="mt-1 sm:mt-2 text-[9px] sm:text-[10px] text-(--text-muted)">
          <span>{feature.footer}</span>
        </div>
      )}
    </div>
  );
}
