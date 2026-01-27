"use client";

interface LiveStatusBadgeProps {
  label: string;
}

export function LiveStatusBadge({ label }: LiveStatusBadgeProps) {
  return (
    <div className="absolute top-0 end-0 z-20">
      <div className="bg-(--surface-primary)/60 text-(--text-tertiary) text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 rounded-full backdrop-blur-xs border border-(--border-primary) flex items-center gap-1.5">
        <div className="w-1.5 h-1.5 rounded-full bg-(--status-info-text) animate-pulse"></div>
        {label}
      </div>
    </div>
  );
}
