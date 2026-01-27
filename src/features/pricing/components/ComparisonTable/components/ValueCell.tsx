"use client";

import React from "react";
import { IconCheck, IconX } from "@tabler/icons-react";

type FeatureValue = boolean | string;

interface ValueCellProps {
  value: FeatureValue;
  highlighted?: boolean;
}

export function ValueCell({ value, highlighted }: ValueCellProps) {
  const renderValue = () => {
    if (typeof value === "boolean") {
      return value ? (
        <div className="w-6 h-6 rounded-full bg-(--foreground)/10 flex items-center justify-center mx-auto">
          <IconCheck className="w-4 h-4 text-(--text-primary)" />
        </div>
      ) : (
        <div className="w-6 h-6 rounded-full bg-(--border-secondary)/30 flex items-center justify-center mx-auto">
          <IconX className="w-4 h-4 text-(--text-muted)/50" />
        </div>
      );
    }
    return (
      <span className="text-(--text-primary) font-medium text-sm">{value}</span>
    );
  };

  return (
    <div
      className={`p-4 text-center border-s border-(--border-secondary)/50 ${
        highlighted ? "bg-(--foreground)/5" : ""
      }`}
    >
      {renderValue()}
    </div>
  );
}
