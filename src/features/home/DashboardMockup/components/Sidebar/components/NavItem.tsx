"use client";

import React from "react";
import { motion, Transition } from "framer-motion";
import { useTranslations } from "next-intl";
import { Route } from "../../../types";

interface NavItemProps {
  icon: React.ReactNode;
  route: Route;
  badge?: string;
  isActive: boolean;
  onNavigate: (route: Route) => void;
  initialAnimation: any;
  animateTo: any;
  transition: Transition;
}

export default function NavItem({
  icon,
  route,
  badge,
  isActive,
  onNavigate,
  initialAnimation,
  animateTo,
  transition,
}: NavItemProps) {
  const t = useTranslations("home.dashboard");

  return (
    <motion.div
      onClick={() => onNavigate(route)}
      className={`flex items-center gap-3 px-3 ps-5 py-2.5 text-sm cursor-pointer bg-(--surface-primary) rounded-t-lg ${
        isActive
          ? "font-medium text-(--text-primary)"
          : "text-(--text-tertiary) hover:bg-(--surface-hover) hover:text-(--text-primary)"
      }`}
      style={{ transformStyle: "preserve-3d" }}
      initial={initialAnimation}
      animate={animateTo}
      transition={transition}
    >
      {icon}
      <span className="flex-1">{t(`sidebar.items.${route}`)}</span>
      {badge && (
        <span
          className={`px-2 py-0.5 rounded-full text-xs font-medium ${
            isActive
              ? "bg-(--surface-primary) text-(--text-primary)"
              : "bg-(--surface-tertiary) text-(--text-tertiary)"
          }`}
        >
          {badge}
        </span>
      )}
    </motion.div>
  );
}
