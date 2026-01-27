"use client";

import dynamic from "next/dynamic";
import { ChartDataPoint, ScalableLabels } from "../types";

const Chart = dynamic(
  () => import("./ChartComponent").then((mod) => mod.ChartComponent),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full flex items-center justify-center text-xs text-(--text-muted)">
        Loading chart...
      </div>
    ),
  }
);

interface ResourceChartProps {
  data: ChartDataPoint[];
  labels: ScalableLabels;
  isVisible: boolean;
}

export function ResourceChart({ data, labels, isVisible }: ResourceChartProps) {
  return (
    <div className="flex-1 bg-(--surface-secondary) rounded-lg border border-(--border-primary) p-2 sm:p-3">
      <div className="text-[11px] sm:text-xs text-(--text-tertiary) mb-2 sm:mb-3">
        {labels.resourceUsage}
      </div>
      <div className="h-17.5 sm:h-25">
        {isVisible ? (
          <Chart data={data} />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-xs text-(--text-muted)">
            {labels.loading}
          </div>
        )}
      </div>
    </div>
  );
}
