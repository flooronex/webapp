"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "./button";
import type { VariantProps } from "class-variance-authority";

// ============================================================================
// Select Root
// ============================================================================

interface SelectContextValue {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  value: string;
  onValueChange: (value: string) => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}

const SelectContext = React.createContext<SelectContextValue | null>(null);

function useSelectContext() {
  const context = React.useContext(SelectContext);
  if (!context) {
    throw new Error("Select components must be used within a Select");
  }
  return context;
}

interface SelectProps {
  children: React.ReactNode;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

function Select({
  children,
  value: controlledValue,
  defaultValue = "",
  onValueChange,
}: SelectProps) {
  const [open, setOpen] = React.useState(false);
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const triggerRef = React.useRef<HTMLButtonElement>(null);

  const value = controlledValue !== undefined ? controlledValue : internalValue;

  const handleValueChange = React.useCallback(
    (newValue: string) => {
      if (controlledValue === undefined) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
      setOpen(false);
    },
    [controlledValue, onValueChange]
  );

  return (
    <SelectContext.Provider
      value={{
        open,
        setOpen,
        value,
        onValueChange: handleValueChange,
        triggerRef,
      }}
    >
      <div className="relative">{children}</div>
    </SelectContext.Provider>
  );
}

// ============================================================================
// Select Trigger
// ============================================================================

interface SelectTriggerProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "size">,
    VariantProps<typeof buttonVariants> {
  children?: React.ReactNode;
  hideIcon?: boolean;
}

const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
  (
    {
      className,
      variant = "ghost",
      size = "sm",
      children,
      hideIcon = false,
      ...props
    },
    ref
  ) => {
    const { open, setOpen, triggerRef } = useSelectContext();

    // Merge refs
    const mergedRef = React.useCallback(
      (node: HTMLButtonElement | null) => {
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
        (
          triggerRef as React.MutableRefObject<HTMLButtonElement | null>
        ).current = node;
      },
      [ref, triggerRef]
    );

    return (
      <Button
        ref={mergedRef}
        variant={variant}
        size={size}
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen(!open)}
        className={cn("justify-between gap-2", className)}
        endIcon={
          !hideIcon ? (
            <svg
              className={cn(
                "w-4 h-4 text-(--text-tertiary) transition-transform duration-200 shrink-0",
                open && "rotate-180"
              )}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          ) : undefined
        }
        {...props}
      >
        {children}
      </Button>
    );
  }
);
SelectTrigger.displayName = "SelectTrigger";

// ============================================================================
// Select Value
// ============================================================================

interface SelectValueProps {
  placeholder?: string;
  children?: React.ReactNode;
}

function SelectValue({ placeholder, children }: SelectValueProps) {
  const { value } = useSelectContext();

  if (children) {
    return <span className="truncate">{children}</span>;
  }

  return (
    <span className={cn("truncate", !value && "text-(--text-tertiary)")}>
      {value || placeholder}
    </span>
  );
}

// ============================================================================
// Select Content
// ============================================================================

interface SelectContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  align?: "start" | "center" | "end";
}

const SelectContent = React.forwardRef<HTMLDivElement, SelectContentProps>(
  ({ className, children, align = "end", ...props }, ref) => {
    const { open, setOpen, triggerRef } = useSelectContext();
    const contentRef = React.useRef<HTMLDivElement>(null);
    const [minWidth, setMinWidth] = React.useState<number | undefined>(
      undefined
    );

    // Merge refs
    React.useImperativeHandle(ref, () => contentRef.current!);

    // Get trigger width
    React.useEffect(() => {
      if (open && triggerRef.current) {
        setMinWidth(triggerRef.current.offsetWidth);
      }
    }, [open, triggerRef]);

    // Close on click outside
    React.useEffect(() => {
      if (!open) return;

      const handleClickOutside = (event: MouseEvent) => {
        const content = contentRef.current;
        if (content && !content.contains(event.target as Node)) {
          // Check if click is on the trigger button
          const trigger =
            content.parentElement?.querySelector('[role="combobox"]');
          if (trigger && trigger.contains(event.target as Node)) {
            return;
          }
          setOpen(false);
        }
      };

      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          setOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("keydown", handleEscape);
      };
    }, [open, setOpen]);

    if (!open) return null;

    return (
      <div
        ref={contentRef}
        role="listbox"
        style={{ minWidth }}
        className={cn(
          "absolute top-full mt-2 py-1 z-50",
          "bg-(--surface-primary)",
          "border border-(--border-primary)",
          "rounded-lg shadow-lg",
          "animate-in fade-in-0 zoom-in-95 duration-100",
          align === "start" && "start-0",
          align === "center" && "start-1/2 -translate-x-1/2",
          align === "end" && "end-0",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
SelectContent.displayName = "SelectContent";

// ============================================================================
// Select Item
// ============================================================================

interface SelectItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  children: React.ReactNode;
}

const SelectItem = React.forwardRef<HTMLButtonElement, SelectItemProps>(
  ({ className, value, children, ...props }, ref) => {
    const { value: selectedValue, onValueChange } = useSelectContext();
    const isSelected = value === selectedValue;

    return (
      <Button
        ref={ref}
        variant="ghost"
        role="option"
        aria-selected={isSelected}
        onClick={() => onValueChange(value)}
        className={cn(
          "w-full justify-start gap-3 rounded-none",
          "text-(--text-secondary)",
          isSelected && "bg-(--surface-hover)",
          className
        )}
        {...props}
      >
        {children}
      </Button>
    );
  }
);
SelectItem.displayName = "SelectItem";

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem };
