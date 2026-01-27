"use client";

import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { motion } from "framer-motion";
import { Kpi } from "../types";
import { getKpiCardAnimation, kpiCardAnimateTo } from "../config";
import SortableKpiCard from "./SortableKpiCard";

interface SortableKpiItemProps {
  kpi: Kpi;
  isActive?: boolean;
  animationIndex: number;
  totalItems: number;
  isRtl?: boolean;
}

export default function SortableKpiItem({
  kpi,
  isActive = false,
  animationIndex,
  totalItems,
  isRtl = false,
}: SortableKpiItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: kpi.id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
    opacity: isDragging ? 0.8 : 1,
    width: "calc(20% - 13px)",
    flexShrink: 0,
    position: "relative",
    touchAction: "none",
  };

  const { initial, transition: appearTransition } = getKpiCardAnimation(
    animationIndex,
    totalItems,
    isRtl
  );

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={`${isDragging || isActive ? "scale-105 shadow-lg" : ""}`}
      data-dragging={isDragging || undefined}
    >
      <motion.div
        style={{ transformStyle: "preserve-3d" }}
        initial={initial}
        animate={kpiCardAnimateTo}
        transition={appearTransition}
      >
        <div
          {...listeners}
          className="h-full cursor-grab active:cursor-grabbing transition-all duration-200"
        >
          <SortableKpiCard kpi={kpi} />
        </div>
      </motion.div>
    </div>
  );
}
