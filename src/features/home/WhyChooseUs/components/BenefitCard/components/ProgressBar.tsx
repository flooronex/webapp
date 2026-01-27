"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { ProgressBarProps } from "../types";

export default function ProgressBar({
  percentage,
  performanceLabel,
  isRtl,
  index,
}: ProgressBarProps) {
  return (
    <div className="mt-auto">
      <div className="flex justify-between text-xs mb-2">
        <span className="font-medium text-(--text-secondary)">
          {performanceLabel}
        </span>
        <span className="font-bold text-(--text-primary)">{percentage}%</span>
      </div>

      {/* Animated progress bar */}
      <div className="h-1.5 w-full bg-(--progress-inactive-bg) rounded-full overflow-hidden">
        <motion.div
          className={cn(
            "h-full rounded-full from-(--progress-active-bg)/80 to-(--progress-active-bg)",
            isRtl ? "bg-linear-to-l" : "bg-linear-to-r"
          )}
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
        />
      </div>
    </div>
  );
}
