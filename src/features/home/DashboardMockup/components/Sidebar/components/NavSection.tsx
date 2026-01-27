"use client";

import React from "react";
import { motion, Transition } from "framer-motion";
import { useTranslations } from "next-intl";

interface NavSectionProps {
  sectionKey: string;
  initialAnimation: any;
  animateTo: any;
  transition: Transition;
}

export default function NavSection({
  sectionKey,
  initialAnimation,
  animateTo,
  transition,
}: NavSectionProps) {
  const t = useTranslations("home.dashboard");

  return (
    <motion.div
      className="px-3 ps-5 pt-3 text-[11px] font-medium uppercase tracking-wider bg-(--surface-primary) text-(--text-muted)"
      style={{ transformStyle: "preserve-3d" }}
      initial={initialAnimation}
      animate={animateTo}
      transition={transition}
    >
      {t(`sidebar.sections.${sectionKey}`)}
    </motion.div>
  );
}
