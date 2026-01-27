"use client";

import { motion } from "framer-motion";

interface ServerScalingProps {
  serverCount: number;
  label: string;
}

export function ServerScaling({ serverCount, label }: ServerScalingProps) {
  return (
    <div className="mt-2 sm:mt-2 bg-(--surface-secondary) rounded-lg border border-(--border-primary) p-2 sm:p-3">
      <div className="mb-1 sm:mb-2 flex justify-between items-center">
        <div className="text-[11px] sm:text-xs text-(--text-tertiary)">
          {label}
        </div>
        <div className="text-xs sm:text-sm font-medium text-(--text-secondary)">
          {serverCount}
        </div>
      </div>

      <div dir="ltr" className="flex items-end h-8 sm:h-10 gap-0.5 sm:gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            className={`flex-1 bg-(--surface-tertiary) rounded-xs border border-(--border-primary) relative overflow-hidden ${
              i < serverCount ? "shadow-xs" : ""
            }`}
            animate={{
              height: i < serverCount ? "100%" : "30%",
              opacity: i < serverCount ? 1 : 0.3,
            }}
            transition={{ duration: 0.8 }}
          >
            {i < serverCount && (
              <motion.div
                className="absolute bottom-0 inset-x-0 bg-(--surface-hover)"
                initial={{ height: "0%" }}
                animate={{ height: ["30%", "60%", "40%", "70%", "50%"] }}
                transition={{
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 9,
                  delay: i * 0.8,
                }}
              />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
