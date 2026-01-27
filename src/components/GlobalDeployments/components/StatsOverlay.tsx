"use client";

import { GlobalStats, GlobalDeploymentsLabels } from "../types";

interface StatsOverlayProps {
  stats: GlobalStats;
  labels: GlobalDeploymentsLabels;
}

export function StatsOverlay({ stats, labels }: StatsOverlayProps) {
  return (
    <div className="absolute inset-x-0 bottom-0 p-1 sm:p-2 pointer-events-none">
      <div className="flex flex-row justify-between gap-1 sm:gap-0">
        <div className="flex gap-1 sm:gap-3 text-[10px] sm:text-xs">
          <div className="bg-(--surface-primary)/90 backdrop-blur-xs p-1 sm:p-1.5 rounded-md border border-(--border-primary)">
            <span className="block text-(--text-secondary) font-medium">
              {stats.totalDeployments}
            </span>
            <span className="block text-(--text-muted)">
              {labels.deployments}
            </span>
          </div>
          <div className="bg-(--surface-primary)/90 backdrop-blur-xs p-1 sm:p-1.5 rounded-md border border-(--border-primary)">
            <span className="block text-(--text-secondary) font-medium">
              {stats.averageUptime}
            </span>
            <span className="block text-(--text-muted)">{labels.uptime}</span>
          </div>
          <div className="bg-(--surface-primary)/90 backdrop-blur-xs p-1 sm:p-1.5 rounded-md border border-(--border-primary)">
            <span className="block text-(--text-secondary) font-medium">
              {stats.activeRegions}
            </span>
            <span className="block text-(--text-muted)">{labels.regions}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
