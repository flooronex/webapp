"use client";

import React, { useEffect, useRef, useState } from "react";
import Table, { Column, RowAnimation } from "@/components/Table";
import {
  IconDotsVertical,
  IconEye,
  IconEdit,
  IconTrash,
} from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import { Deployment } from "../types";
import {
  deploymentData,
  getTableRowAnimation,
  tableRowAnimateTo,
} from "../config";

interface TableSectionProps {
  isRtl?: boolean;
}

export default function TableSection({ isRtl = false }: TableSectionProps) {
  const t = useTranslations("home.dashboard.main");
  const tProjects = useTranslations("home.dashboard.main.projects");
  const tDescriptions = useTranslations("home.dashboard.main.descriptions");
  const tStatuses = useTranslations("home.dashboard.main.statuses");

  const [openActionIndex, setOpenActionIndex] = useState<number | null>(null);
  const actionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        openActionIndex !== null &&
        actionRefs.current[openActionIndex] &&
        !actionRefs.current[openActionIndex]?.contains(event.target as Node)
      ) {
        setOpenActionIndex(null);
      }
    }

    if (openActionIndex !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openActionIndex]);

  const toggleActionMenu = (index: number) => {
    setOpenActionIndex(openActionIndex === index ? null : index);
  };

  // Translate status
  const getTranslatedStatus = (status: string) => {
    return tStatuses(status);
  };

  const columns: Column<Deployment>[] = [
    {
      header: t("table.name"),
      accessor: (deployment) => (
        <div className="flex items-center gap-3">
          <div className="p-1.5 bg-(--surface-tertiary) rounded-md border border-(--border-primary)">
            {deployment.icon}
          </div>
          <div>
            <div className="font-medium text-(--text-primary)">
              {tProjects(deployment.projectKey)}
            </div>
            <div className="text-xs text-(--text-muted) mt-0.5 max-w-52 truncate">
              {tDescriptions(deployment.projectKey)}
            </div>
          </div>
        </div>
      ),
    },
    {
      header: t("table.status"),
      accessor: (deployment) => (
        <span
          className={`
            px-2.5 py-0.5 rounded-full text-[10px] font-medium inline-flex items-center
            ${
              deployment.status === "process"
                ? "bg-(--status-warning-bg) text-(--status-warning-text)"
                : ""
            }
            ${
              deployment.status === "ready"
                ? "bg-(--status-info-bg) border border-(--status-info-border) text-(--status-info-text)"
                : ""
            }
            ${
              deployment.status === "error"
                ? "bg-(--status-error-bg) border border-(--status-error-border) text-(--status-error-text)"
                : ""
            }
          `}
        >
          {deployment.status === "process" && (
            <span className="w-1.5 h-1.5 bg-(--status-warning-dot) rounded-full me-1.5 animate-pulse" />
          )}
          {getTranslatedStatus(deployment.status)}
        </span>
      ),
    },
    { header: t("table.lastDeployed"), accessor: "date" },
    { header: t("table.environment"), accessor: "environment" },
    { header: t("table.version"), accessor: "version" },
    {
      header: t("table.actions"),
      accessor: (_deployment, index) => (
        <div
          className="inline-block relative"
          ref={(el) => {
            actionRefs.current[index] = el;
          }}
        >
          <button
            className="p-2 hover:bg-(--surface-hover) rounded-full text-(--text-muted) hover:text-(--text-primary) transition-colors"
            onClick={() => toggleActionMenu(index)}
            aria-label={t("table.actions")}
            aria-expanded={openActionIndex === index}
            aria-haspopup="menu"
          >
            <IconDotsVertical size={16} />
          </button>
          {openActionIndex === index && (
            <div
              className="absolute end-0 mt-1 w-36 bg-(--surface-primary) rounded-md shadow-lg border border-(--border-primary) py-1 z-20 animate-in fade-in duration-150"
              role="menu"
            >
              <button
                className="flex items-center gap-2 w-full px-3 py-2 text-xs text-(--text-secondary) hover:bg-(--surface-hover) text-start transition-colors"
                role="menuitem"
                aria-label={t("table.viewDetails")}
              >
                <IconEye size={14} />
                {t("table.viewDetails")}
              </button>
              <button
                className="flex items-center gap-2 w-full px-3 py-2 text-xs text-(--text-secondary) hover:bg-(--surface-hover) text-start transition-colors"
                role="menuitem"
                aria-label={t("table.edit")}
              >
                <IconEdit size={14} />
                {t("table.edit")}
              </button>
              <button
                className="flex items-center gap-2 w-full px-3 py-2 text-xs text-(--danger-text) hover:bg-(--danger-bg-hover) text-start transition-colors"
                role="menuitem"
                aria-label={t("table.delete")}
              >
                <IconTrash size={14} />
                {t("table.delete")}
              </button>
            </div>
          )}
        </div>
      ),
      align: "right",
    },
  ];

  const rowAnimation: RowAnimation = {
    getInitial: (index, totalItems) =>
      getTableRowAnimation(index, totalItems, isRtl).initial,
    animate: tableRowAnimateTo,
    getTransition: (index, totalItems) =>
      getTableRowAnimation(index, totalItems, isRtl).transition,
  };

  return (
    <div
      style={{ position: "relative", zIndex: 2, transformStyle: "preserve-3d" }}
    >
      <Table<Deployment>
        className="overflow-visible"
        columns={columns}
        data={deploymentData}
        rowAnimation={rowAnimation}
      />
    </div>
  );
}
