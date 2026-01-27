"use client";

import { Globe } from "@/components/Globe";
import { GlobeConfig } from "../types";

interface GlobeDisplayProps {
  config: GlobeConfig;
}

export function GlobeDisplay({ config }: GlobeDisplayProps) {
  return (
    <div className="flex-1 relative min-h-45 sm:min-h-65 overflow-hidden">
      {/* The globe visualization */}
      <div className="absolute inset-0 flex items-center justify-center scale-100 sm:scale-110">
        <div className="w-45 h-45 sm:w-80 sm:h-80">
          <Globe config={{ ...config, width: 320, height: 320 }} />
        </div>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-white/0 via-white/5 to-white/20 dark:from-neutral-900/0 dark:via-neutral-900/10 dark:to-neutral-900/30 pointer-events-none"></div>
    </div>
  );
}
