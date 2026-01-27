"use client";

import * as React from "react";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import { motion, AnimatePresence } from "motion/react";
import { IconChevronDown } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

// Base Radix primitives
const CollapsibleRoot = CollapsiblePrimitive.Root;
const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger;
const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent;

// Reusable Collapsible component with smooth animation
interface CollapsibleProps {
  title: string;
  children: React.ReactNode;
  badge?: string;
  defaultOpen?: boolean;
  className?: string;
  triggerClassName?: string;
  contentClassName?: string;
  showIcon?: boolean;
  icon?: React.ReactNode;
  duration?: number;
}

function Collapsible({
  title,
  children,
  badge,
  defaultOpen = false,
  className,
  triggerClassName,
  contentClassName,
  showIcon = true,
  icon,
  duration = 0.3,
}: CollapsibleProps) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);

  return (
    <CollapsibleRoot open={isOpen} onOpenChange={setIsOpen}>
      <div
        className={cn(
          "rounded-lg border border-(--border-primary)/40 overflow-hidden transition-all",
          isOpen ? "bg-(--surface-tertiary)" : "bg-(--surface-tertiary)/50",
          className
        )}
      >
        <CollapsibleTrigger
          className={cn(
            "flex justify-between items-center w-full p-4 sm:p-6 text-start",
            triggerClassName
          )}
        >
          <h3 className="font-medium text-base sm:text-lg text-(--text-primary) pe-2">
            {title}
          </h3>
          <span className="flex items-center ms-2 sm:ms-4 shrink-0">
            {badge && (
              <span className="hidden sm:block text-xs px-2 py-1 rounded-full me-3 bg-(--surface-tertiary) text-(--text-tertiary)">
                {badge}
              </span>
            )}

            {showIcon && (
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: duration * 0.7, ease: "easeInOut" }}
                className="flex items-center justify-center h-6 w-6 rounded-full bg-(--surface-tertiary)"
              >
                {icon || (
                  <IconChevronDown className="h-3.5 w-3.5 text-(--text-tertiary) cursor-pointer" />
                )}
              </motion.div>
            )}
          </span>
        </CollapsibleTrigger>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                height: { duration, ease: "easeInOut" },
                opacity: { duration: duration * 0.8, ease: "easeInOut" },
              }}
              className="overflow-hidden"
            >
              <div
                className={cn(
                  "px-4 sm:px-6 pb-4 sm:pb-6 pt-0",
                  contentClassName
                )}
              >
                <div className="h-px bg-(--border-primary) mb-3 sm:mb-4" />
                {children}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </CollapsibleRoot>
  );
}

export { Collapsible, CollapsibleRoot, CollapsibleTrigger, CollapsibleContent };
