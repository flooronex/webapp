"use client";

import React from "react";
import { motion, Transition } from "framer-motion";
import { IconRocket } from "@tabler/icons-react";

interface BrandHeaderProps {
  initialAnimation: any;
  animateTo: any;
  transition: Transition;
}

export default function BrandHeader({
  initialAnimation,
  animateTo,
  transition,
}: BrandHeaderProps) {
  return (
    <motion.div
      className="h-16 flex items-center py-5 px-6 bg-(--surface-primary) rounded-t-lg"
      style={{ transformStyle: "preserve-3d" }}
      initial={initialAnimation}
      animate={animateTo}
      transition={transition}
    >
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-sm bg-(--surface-primary)">
          <span className="text-(--text-primary)">
            <IconRocket />
          </span>
        </div>
        <h1 className="text-(--text-primary) font-semibold">Publino</h1>
      </div>
    </motion.div>
  );
}
