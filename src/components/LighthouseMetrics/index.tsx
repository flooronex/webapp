"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useVisibility, useAnimatedValues } from "./hooks";
import {
  getMetrics,
  getTabs,
  getTabMetrics,
  getStatusMessages,
} from "./config";
import {
  WebsitePreview,
  MetricsTabs,
  MetricsGauges,
  MetricsDetails,
  StatusFooter,
} from "./components";

export function LighthouseMetrics() {
  const t = useTranslations("home.features.performanceMetrics");
  const [activeTab, setActiveTab] = useState("performance");
  const { isVisible, containerRef } = useVisibility(0.2);

  const metrics = getMetrics(t);
  const tabs = getTabs(t);
  const tabMetrics = getTabMetrics(t);
  const statusMessages = getStatusMessages(t);
  const animatedValues = useAnimatedValues(isVisible, metrics);

  return (
    <div ref={containerRef} className="flex flex-col h-full">
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Chrome Lighthouse-style UI with 2-column layout */}
        <div className="flex flex-col md:flex-row gap-2 sm:gap-3 mt-1 flex-1">
          {/* Left column - Website Screenshot */}
          <WebsitePreview isVisible={isVisible} />

          {/* Right column - Metrics */}
          <div className="flex-1 flex flex-col mt-2 md:mt-0">
            {/* Chrome-like tabs */}
            <MetricsTabs
              tabs={tabs}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />

            {/* Main metrics display */}
            <MetricsGauges
              metrics={metrics}
              animatedValues={animatedValues}
              activeTab={activeTab}
              isVisible={isVisible}
            />

            {/* Additional details */}
            <MetricsDetails
              activeTab={activeTab}
              tabMetrics={tabMetrics}
              statusMessages={statusMessages}
            />

            {/* Status footer */}
            <StatusFooter
              isVisible={isVisible}
              statusMessages={statusMessages}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
