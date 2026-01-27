"use client";

import React, { useState, useEffect } from "react";
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  KeyboardSensor,
  MouseSensor,
  PointerSensor,
  rectIntersection,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import {
  restrictToHorizontalAxis,
  restrictToParentElement,
} from "@dnd-kit/modifiers";
import { useTranslations } from "next-intl";
import { Kpi } from "../types";
import { kpiData } from "../config";
import SortableKpiItem from "./SortableKpiItem";

interface KpiSectionProps {
  isRtl?: boolean;
}

export default function KpiSection({ isRtl = false }: KpiSectionProps) {
  const t = useTranslations("home.dashboard.main.kpi");

  // Map kpi data with translations
  const translatedKpiData = kpiData.map((kpi) => ({
    ...kpi,
    title: t(kpi.key),
  }));

  const [items, setItems] = useState<Kpi[]>(translatedKpiData);
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
        tolerance: 5,
        delay: 100,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id as string);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;
    if (active.id === over.id) return;

    setItems((prev) => {
      const oldIndex = prev.findIndex((item) => item.id === active.id);
      const newIndex = prev.findIndex((item) => item.id === over.id);
      return arrayMove(prev, oldIndex, newIndex);
    });
  }

  function handleDragCancel() {
    setActiveId(null);
  }

  // Prevent hydration mismatch by only rendering DnD on client
  if (!isMounted) {
    return (
      <div
        className="mb-6 relative"
        role="region"
        aria-label="Key Performance Indicators"
        style={{
          overflow: "visible",
          zIndex: 1,
          transformStyle: "preserve-3d",
        }}
      >
        <div
          className="flex gap-4 pb-2"
          style={{
            touchAction: "pan-y",
            overscrollBehavior: "none",
            overflow: "visible",
          }}
        >
          {items.map((kpi, index) => (
            <SortableKpiItem
              key={kpi.id}
              kpi={kpi}
              isActive={false}
              animationIndex={index}
              totalItems={items.length}
              isRtl={isRtl}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={rectIntersection}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
      modifiers={[restrictToHorizontalAxis, restrictToParentElement]}
      autoScroll={false}
    >
      <div
        className="mb-6 relative"
        role="region"
        aria-label="Key Performance Indicators"
        style={{
          overflow: "visible",
          zIndex: 1,
          transformStyle: "preserve-3d",
        }}
      >
        <SortableContext
          items={items.map((kpi) => kpi.id)}
          strategy={horizontalListSortingStrategy}
        >
          <div
            className="flex gap-4 pb-2"
            style={{
              touchAction: "pan-y",
              overscrollBehavior: "none",
              overflow: "visible",
            }}
          >
            {items.map((kpi, index) => (
              <SortableKpiItem
                key={kpi.id}
                kpi={kpi}
                isActive={activeId === kpi.id}
                animationIndex={index}
                totalItems={items.length}
                isRtl={isRtl}
              />
            ))}
          </div>
        </SortableContext>
      </div>
    </DndContext>
  );
}
