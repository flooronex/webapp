"use client";

interface Tab {
  key: string;
  label: string;
}

interface MetricsTabsProps {
  tabs: readonly Tab[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function MetricsTabs({
  tabs,
  activeTab,
  onTabChange,
}: MetricsTabsProps) {
  return (
    <div className="flex border-b border-(--border-primary) mb-1 sm:mb-2 overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          className={`py-1 px-1.5 sm:py-1.5 sm:px-2 cursor-pointer text-[10px] sm:text-[11px] font-medium whitespace-nowrap ${
            activeTab === tab.key
              ? "text-(--text-tertiary) border-b-[1px] border-(--text-tertiary)"
              : "text-(--text-tertiary) border-b-[1px] border-transparent hover:text-(--text-secondary)"
          }`}
          onClick={() => onTabChange(tab.key)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
