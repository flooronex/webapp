"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { IconPlus } from "@tabler/icons-react";
import { useMainAnimations } from "./hooks/useMainAnimations";
import SectionHeader from "./components/SectionHeader";
import KpiSection from "./components/KpiSection";
import TableSection from "./components/TableSection";

interface MainProps {
  isRtl?: boolean;
}

export default function Main({ isRtl = false }: MainProps) {
  const t = useTranslations("home.dashboard.main");
  const { initialAnimation, animateTo, transitionProps } =
    useMainAnimations(isRtl);

  const newDeploymentButton = (
    <Button
      variant="default"
      size="sm"
      className="inline-flex items-center gap-1"
      startIcon={<IconPlus size={14} />}
    >
      {t("newDeployment")}
    </Button>
  );

  return (
    <motion.main
      style={{ transformStyle: "preserve-3d", zIndex: "0", overflow: "hidden" }}
      initial={initialAnimation}
      animate={animateTo}
      transition={transitionProps}
    >
      <div
        className="flex-1 p-6 pb-14 bg-(--surface-primary)"
        style={{ overflow: "visible" }}
      >
        <SectionHeader
          title={t("recentDeployments")}
          action={newDeploymentButton}
        />
        <KpiSection isRtl={isRtl} />
        <TableSection isRtl={isRtl} />
      </div>
    </motion.main>
  );
}
