"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { ValueCell } from "./ValueCell";
import type { ComparisonFeature } from "../../../config/types";

interface FeatureRowProps {
  feature: ComparisonFeature;
  featureLabel: string;
  isOdd: boolean;
}

export function FeatureRow({ feature, featureLabel, isOdd }: FeatureRowProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-4 border-b border-(--border-secondary)/50",
        isOdd ? "bg-(--surface-tertiary)/20" : "bg-transparent"
      )}
    >
      <div className="p-4 ps-8">
        <span className="text-(--text-secondary) text-sm">{featureLabel}</span>
      </div>
      <ValueCell value={feature.starter} />
      <ValueCell value={feature.growth} highlighted />
      <ValueCell value={feature.enterprise} />
    </div>
  );
}
