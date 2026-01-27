"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface BackgroundElementsProps {
  isHovered: boolean;
  isRtl: boolean;
}

export default function BackgroundElements({
  isHovered,
  isRtl,
}: BackgroundElementsProps) {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
      <motion.div
        className={cn(
          "absolute w-32 h-32 rounded-full bg-(--accent-1)/1 dark:bg-(--accent-1)/5",
          isRtl ? "-left-8 -bottom-8" : "-right-8 -bottom-8"
        )}
        animate={{
          scale: isHovered ? 1.3 : 1,
          x: isHovered ? (isRtl ? 5 : -5) : 0,
          y: isHovered ? -5 : 0,
        }}
        transition={{ duration: 0.7 }}
      />
      <motion.div
        className={cn(
          "absolute w-28 h-28 rounded-full bg-(--accent-1)/1 dark:bg-(--accent-1)/5",
          isRtl ? "-right-10 -top-10" : "-left-10 -top-10"
        )}
        animate={{
          scale: isHovered ? 1.2 : 1,
          x: isHovered ? (isRtl ? -8 : 8) : 0,
          y: isHovered ? 8 : 0,
        }}
        transition={{ duration: 0.5 }}
      />
    </div>
  );
}
