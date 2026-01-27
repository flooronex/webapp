"use client";

import { DetailMetric } from "../types";

interface StatusMessages {
  analyzing: string;
  complete: string;
  metricsTitle: (tab: string) => string;
}

interface MetricsDetailsProps {
  activeTab: string;
  tabMetrics: Record<string, DetailMetric[]>;
  statusMessages: StatusMessages;
}

export function MetricsDetails({
  activeTab,
  tabMetrics,
  statusMessages,
}: MetricsDetailsProps) {
  const details = tabMetrics[activeTab];

  return (
    <div className="bg-(--surface-secondary) p-1.5 sm:p-2 rounded-lg border border-(--border-primary)/50 flex-1 h-22.5 sm:h-30 overflow-y-auto">
      <h4 className="text-[10px] sm:text-xs font-semibold text-(--text-primary) mb-1 sm:mb-2 uppercase">
        {statusMessages.metricsTitle(activeTab)}
      </h4>
      <div className="flex flex-col gap-1">
        {details.map((detail) => (
          <div
            key={detail.name}
            className="flex justify-between items-center text-[9px] sm:text-[10px]"
          >
            <div className="flex items-center gap-1">
              <div
                className={`w-1.5 h-1.5 rounded-full ${
                  detail.score === "Fast"
                    ? "bg-(--text-muted)"
                    : detail.score === "Moderate"
                    ? "bg-(--status-warning-dot)"
                    : "bg-(--text-muted)"
                }`}
              ></div>
              <span className="text-(--text-secondary)">{detail.name}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-(--text-tertiary)">{detail.value}</span>
              <span
                className={`text-[9px] sm:text-[10px] font-medium px-1 py-0.5 rounded ${
                  detail.score === "Fast"
                    ? "bg-(--text-muted)/20 text-(--text-tertiary)"
                    : detail.score === "Moderate"
                    ? "bg-(--status-warning-bg) text-(--status-warning-text)"
                    : "bg-(--text-muted)/20 text-(--text-tertiary)"
                }`}
              >
                {detail.score}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
