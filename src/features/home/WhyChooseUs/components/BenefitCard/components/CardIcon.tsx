"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { CardIconProps } from "../types";

export default function CardIcon({ icon, isHovered }: CardIconProps) {
  return (
    <div className="relative mb-6 perspective">
      <div className="relative z-10">
        <div
          className={cn(
            "p-4 w-max rounded-lg inline-flex",
            "bg-(--surface-secondary)"
          )}
        >
          <div className="text-(--text-primary)">{icon}</div>
        </div>
      </div>

      {/* Icon shadow */}
      <motion.div
        className="absolute -bottom-2 inset-inline-start-0 inset-inline-end-0 mx-auto w-2/3 h-1.5 rounded-full bg-(--accent-1)/10 blur-md"
        animate={{
          scale: isHovered ? 1.1 : 0.9,
          opacity: isHovered ? 0.5 : 0.2,
        }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
}
