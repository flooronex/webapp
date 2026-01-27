import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const textareaVariants = cva(
  "w-full transition-all text-sm disabled:pointer-events-none disabled:opacity-50 resize-none",
  {
    variants: {
      variant: {
        default:
          "border border-(--border-primary) bg-(--surface-primary) text-(--text-primary) placeholder:text-(--text-muted) focus:outline-none focus:border-(--border-tertiary)",
        outline:
          "border border-(--border-secondary) bg-transparent text-(--text-primary) placeholder:text-(--text-muted) focus:outline-none focus:border-(--border-tertiary)",
        ghost:
          "border-none bg-(--surface-tertiary) text-(--text-primary) placeholder:text-(--text-muted) focus:outline-none focus:border-(--border-tertiary)",
        filled:
          "border-none bg-(--surface-tertiary) text-(--text-primary) placeholder:text-(--text-tertiary) focus:outline-none focus:border-(--border-tertiary)",
      },
      textareaSize: {
        default: "min-h-30 px-4 py-3",
        sm: "min-h-20 px-3 py-2 text-xs",
        lg: "min-h-40 px-5 py-4",
        xl: "min-h-50 px-6 py-5 text-base",
      },
      rounded: {
        default: "rounded-lg",
        sm: "rounded-md",
        lg: "rounded-xl",
        full: "rounded-3xl",
        none: "rounded-none",
      },
    },
    defaultVariants: {
      variant: "default",
      textareaSize: "default",
      rounded: "lg",
    },
  }
);

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size">,
    VariantProps<typeof textareaVariants> {
  error?: boolean;
  errorMessage?: string;
  maxLength?: number;
  showCounter?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      variant,
      textareaSize,
      rounded,
      error,
      errorMessage,
      maxLength,
      showCounter = true,
      value,
      defaultValue,
      onChange,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState(
      defaultValue?.toString() || ""
    );

    // Use controlled value if provided, otherwise use internal state
    const currentValue = value !== undefined ? value.toString() : internalValue;
    const currentLength = currentValue.length;
    const charPercentage = maxLength ? (currentLength / maxLength) * 100 : 0;

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (value === undefined) {
        setInternalValue(e.target.value);
      }
      onChange?.(e);
    };

    return (
      <div className="w-full">
        {/* Textarea wrapper - counter positioned relative to this */}
        <div className="relative">
          <textarea
            className={cn(
              textareaVariants({ variant, textareaSize, rounded }),
              error &&
                "border-red-500 dark:border-red-500 focus:ring-red-500 dark:focus:ring-red-500",
              showCounter && maxLength && "pb-10",
              className
            )}
            ref={ref}
            maxLength={maxLength}
            value={value}
            defaultValue={defaultValue}
            onChange={handleChange}
            {...props}
          />

          {/* Character counter - inside textarea wrapper */}
          {showCounter && maxLength && (
            <div
              className="absolute bottom-3 end-3 flex items-center gap-2 pointer-events-none"
              aria-live="polite"
              aria-atomic="true"
            >
              {/* Progress bar */}
              <div
                className="w-16 h-1 rounded-full bg-(--border-secondary)/30 overflow-hidden"
                role="progressbar"
                aria-valuenow={currentLength}
                aria-valuemin={0}
                aria-valuemax={maxLength}
                aria-label="Character count"
              >
                <div
                  className={cn(
                    "h-full rounded-full transition-all duration-300",
                    charPercentage >= 90
                      ? "bg-red-500"
                      : charPercentage >= 70
                      ? "bg-amber-500"
                      : "bg-(--interactive-primary)"
                  )}
                  style={{ width: `${Math.min(charPercentage, 100)}%` }}
                />
              </div>
              {/* Counter text */}
              <span
                className={cn(
                  "text-xs font-dm-sans tabular-nums",
                  charPercentage >= 90
                    ? "text-red-400"
                    : charPercentage >= 70
                    ? "text-amber-400"
                    : "text-(--text-muted)"
                )}
              >
                {currentLength}/{maxLength}
              </span>
            </div>
          )}
        </div>

        {/* Error message - outside textarea wrapper */}
        {error && errorMessage && (
          <p className="mt-1 text-xs text-red-500">{errorMessage}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea, textareaVariants };
