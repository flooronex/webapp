"use client";

import React from "react";
import { motion, Transition } from "framer-motion";
import { useTranslations } from "next-intl";
import { IconLogout } from "@tabler/icons-react";

interface SidebarFooterProps {
  initialAnimation: any;
  animateTo: any;
  transition: Transition;
}

export default function SidebarFooter({
  initialAnimation,
  animateTo,
  transition,
}: SidebarFooterProps) {
  const t = useTranslations("home.dashboard");

  return (
    <div style={{ transformStyle: "preserve-3d" }} className="rounded-bl-sm">
      <motion.button
        className="w-full flex items-center gap-3 p-4 text-sm bg-(--surface-primary) text-(--text-tertiary) hover:text-(--danger-text)"
        style={{ transformStyle: "preserve-3d" }}
        initial={initialAnimation}
        animate={animateTo}
        transition={transition}
        aria-label={t("menu.logout")}
      >
        <IconLogout size={20} className="shrink-0" />
        <span className="font-medium">{t("menu.logout")}</span>
      </motion.button>
    </div>
  );
}
