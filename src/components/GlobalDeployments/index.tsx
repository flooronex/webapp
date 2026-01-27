"use client";

import { useTranslations } from "next-intl";
import { useTheme } from "@/providers";
import { useVisibility } from "./hooks";
import {
  getRegions,
  getGlobalStats,
  getLabels,
  getGlobeConfig,
} from "./config";
import { LiveStatusBadge, StatsOverlay, GlobeDisplay } from "./components";

export function GlobalDeployments() {
  const t = useTranslations("home.features.globalDeployments");
  const { theme } = useTheme();
  const { containerRef } = useVisibility(0.2);

  const regions = getRegions();
  const stats = getGlobalStats(regions);
  const labels = getLabels(t);
  const globeConfig = getGlobeConfig(theme, regions);

  return (
    <div className="flex flex-col h-full relative" ref={containerRef}>
      <LiveStatusBadge label={labels.liveStatus} />

      <div className="flex-1 relative min-h-45 sm:min-h-65 overflow-hidden">
        <GlobeDisplay config={globeConfig} />
        <StatsOverlay stats={stats} labels={labels} />
      </div>

      <div className="mt-1 sm:mt-2 text-[9px] sm:text-[10px] text-(--text-muted) flex items-center justify-between">
        <span>{labels.footerLeft}</span>
        <span className="text-(--text-muted)">{labels.footerRight}</span>
      </div>
    </div>
  );
}
