"use client";

import React from "react";
import { Kpi, TrendDirection } from "../types";
import {
  IconArrowRight,
  IconGripHorizontal,
  IconTrendingDown,
  IconTrendingUp,
} from "@tabler/icons-react";

interface SortableKpiCardProps {
  kpi: Kpi;
}

const getTrendIcon = (direction: TrendDirection) => {
  switch (direction) {
    case "up":
      return <IconTrendingUp size={14} className="me-1" />;
    case "down":
      return <IconTrendingDown size={14} className="me-1" />;
    case "stable":
      return <IconArrowRight size={14} className="me-1" />;
  }
};

const getTrendClass = (direction: TrendDirection) => {
  switch (direction) {
    case "up":
      return "text-(--trend-positive)";
    case "down":
      return "text-(--trend-negative)";
    case "stable":
      return "text-(--trend-positive)";
  }
};

export default function SortableKpiCard({ kpi }: SortableKpiCardProps) {
  return (
    <div
      className="bg-(--surface-secondary) p-4 rounded-lg border border-(--border-primary) shadow-xs hover:shadow-md transition-all h-full"
      data-kpi-id={kpi.id}
      tabIndex={0}
      role="article"
      aria-label={`${kpi.title}: ${kpi.value}${
        kpi.trend ? `, trend ${kpi.trendDirection} ${kpi.trend}` : ""
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <div
            className="me-2 text-(--text-tertiary) bg-(--surface-tertiary) p-1.5 rounded-lg"
            aria-hidden="true"
          >
            {kpi.icon}
          </div>
          <div className="text-xs font-medium text-(--text-muted)">
            {kpi.title}
          </div>
        </div>
        <div
          className="opacity-30 hover:opacity-100 transition-opacity cursor-grab"
          aria-hidden="true"
          title="Drag handle"
        >
          <IconGripHorizontal size={16} />
        </div>
      </div>

      <div className="flex items-baseline justify-between">
        <div className="text-xl font-bold text-(--text-primary)">
          {kpi.value}
        </div>
        {kpi.trend && (
          <div
            className={`flex items-center text-xs ${getTrendClass(
              kpi.trendDirection
            )}`}
            aria-label={`Trend: ${kpi.trendDirection} ${kpi.trend}`}
          >
            {getTrendIcon(kpi.trendDirection)}
            <span>{kpi.trend}</span>
          </div>
        )}
      </div>
    </div>
  );
}
