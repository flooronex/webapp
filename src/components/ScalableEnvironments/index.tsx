"use client";

import { useTranslations } from "next-intl";
import { ResourceChart, ServerScaling } from "./components";
import { useVisibility, useScenarios } from "./hooks";
import { getScenarios, getLabels } from "./config";

export function ScalableEnvironments() {
  const t = useTranslations("home.features.scalableEnvironments");
  const { isVisible, containerRef } = useVisibility(0.2);

  const scenarios = getScenarios();
  const labels = getLabels(t);

  const { data, serverCount } = useScenarios(isVisible, scenarios);

  return (
    <div ref={containerRef} className="flex flex-col h-full">
      {/* Resource usage chart */}
      <ResourceChart data={data} labels={labels} isVisible={isVisible} />

      {/* Server scaling visualization */}
      <ServerScaling serverCount={serverCount} label={labels.activeServers} />

      <div className="mt-1 sm:mt-2 text-[9px] sm:text-[10px] text-(--text-muted) flex items-center justify-between">
        <span>{labels.footerLeft}</span>
        <span className="text-(--text-tertiary)">{labels.footerRight}</span>
      </div>
    </div>
  );
}
