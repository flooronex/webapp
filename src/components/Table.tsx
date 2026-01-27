import React, { ReactNode } from "react";
import { motion, Transition, Target } from "framer-motion";

export interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T, index: number) => ReactNode);
  align?: "left" | "center" | "right";
}

export interface RowAnimation {
  getInitial: (index: number, totalItems: number) => Target;
  animate: Target;
  getTransition: (index: number, totalItems: number) => Transition;
}

export interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
  rowClassName?: (item: T, index: number) => string;
  rowAnimation?: RowAnimation;
}

// Helper function to safely convert any value to a ReactNode
const toReactNode = (value: unknown): ReactNode => {
  // null and undefined are valid ReactNodes
  if (value === null || value === undefined) {
    return value;
  }

  // If it's a primitive type, convert to string
  if (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean" ||
    typeof value === "bigint"
  ) {
    return String(value);
  }

  // If it's already a valid ReactNode (like a JSX element), return it
  // This check isn't perfect but handles common cases
  if (
    React.isValidElement(value) ||
    Array.isArray(value) ||
    typeof value === "function"
  ) {
    return value as ReactNode;
  }

  // For objects, convert to string representation
  return String(value);
};

export default function Table<T extends object>({
  columns,
  data,
  className = "",
  headerClassName = "",
  bodyClassName = "",
  rowClassName = () => "",
  rowAnimation,
}: TableProps<T>) {
  return (
    <div
      className={`bg-(--surface-primary) rounded-sm border border-(--border-primary) overflow-visible ${className}`}
      style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
    >
      <div
        className="overflow-visible"
        style={{ transformStyle: "preserve-3d" }}
      >
        <table
          className="w-full border-collapse"
          style={{ transformStyle: "preserve-3d" }}
        >
          <thead>
            <tr
              className={`border-b border-(--border-primary) bg-(--surface-secondary) ${headerClassName}`}
            >
              {columns.map((column, index) => (
                <th
                  key={index}
                  className={`p-4 font-semibold text-(--text-secondary) text-xs ${
                    column.align === "right"
                      ? "text-end"
                      : column.align === "center"
                      ? "text-center"
                      : "text-start"
                  }`}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody
            className={`text-xs ${bodyClassName}`}
            style={{ transformStyle: "preserve-3d" }}
          >
            {data.map((item, rowIndex) => {
              const rowContent = (
                <>
                  {columns.map((column, colIndex) => {
                    // Get the cell value
                    const rawValue =
                      typeof column.accessor === "function"
                        ? column.accessor(item, rowIndex)
                        : item[column.accessor as keyof T];

                    // Convert to a safe ReactNode
                    const cellValue = toReactNode(rawValue);

                    return (
                      <td
                        key={colIndex}
                        className={`p-4 text-(--text-secondary) ${
                          column.align === "right"
                            ? "text-end"
                            : column.align === "center"
                            ? "text-center"
                            : "text-start"
                        }`}
                      >
                        {cellValue}
                      </td>
                    );
                  })}
                </>
              );

              if (rowAnimation) {
                return (
                  <motion.tr
                    key={rowIndex}
                    className={`border-b border-(--border-primary) hover:bg-(--surface-hover) ${rowClassName(
                      item,
                      rowIndex
                    )}`}
                    style={{ transformStyle: "preserve-3d" }}
                    initial={rowAnimation.getInitial(rowIndex, data.length)}
                    animate={rowAnimation.animate}
                    transition={rowAnimation.getTransition(
                      rowIndex,
                      data.length
                    )}
                  >
                    {rowContent}
                  </motion.tr>
                );
              }

              return (
                <tr
                  key={rowIndex}
                  className={`border-b border-(--border-primary) hover:bg-(--surface-hover) transition-colors duration-200 ${rowClassName(
                    item,
                    rowIndex
                  )}`}
                >
                  {rowContent}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
