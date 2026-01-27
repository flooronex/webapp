"use client";

import { Gauge } from "@/components/Gauge";
import { MetricProps } from "../types";

interface MetricsGaugesProps {
  metrics: MetricProps[];
  animatedValues: number[];
  activeTab: string;
  isVisible: boolean;
}

export function MetricsGauges({
  metrics,
  animatedValues,
  activeTab,
  isVisible,
}: MetricsGaugesProps) {
  return (
    <div className="bg-(--surface-secondary) p-1.5 sm:p-2 rounded-lg border border-(--border-primary) mb-1 sm:mb-2">
      <div className="flex flex-wrap gap-1">
        {metrics.map((metric, index) => (
          <div
            key={metric.title}
            className={`flex-1 min-w-12 sm:min-w-15 flex flex-col items-center p-1 rounded-lg ${
              activeTab.toLowerCase() === metric.title.toLowerCase()
                ? "bg-(--surface-tertiary)"
                : ""
            }`}
          >
            <div className="w-9 h-9 sm:w-12 sm:h-12 mb-1">
              <Gauge
                value={animatedValues[index]}
                primary={metric.color}
                secondary="#d1d5db"
                strokeWidth={6}
                showValue={true}
                size="100%"
                className={{
                  textClassName:
                    "text-[18px] sm:text-[25px] font-bold text-(--text-primary)",
                  svgClassName: `transition-opacity duration-500 ${
                    isVisible ? "opacity-100" : "opacity-0"
                  }`,
                  primaryClassName: "dark:stroke-white",
                  secondaryClassName: "stroke-(--border-primary)",
                }}
              />
            </div>
            <span className="text-[7px] sm:text-[8px] font-medium text-(--text-tertiary) mt-0.5 text-center">
              {metric.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
