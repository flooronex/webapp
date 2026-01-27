import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const inputVariants = cva(
  "w-full transition-all text-sm disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border border-(--border-primary) bg-(--surface-primary) text-(--text-primary) placeholder:text-(--text-muted) focus:outline-none  focus:border-(--border-tertiary) ",
        outline:
          "border border-(--border-secondary) bg-transparent text-(--text-primary) placeholder:text-(--text-muted) focus:outline-none focus:border-(--border-tertiary) ",
        ghost:
          "border-none bg-(--surface-tertiary) text-(--text-primary) placeholder:text-(--text-muted) focus:outline-none focus:border-(--border-tertiary) ",
        filled:
          "border-none bg-(--surface-tertiary) text-(--text-primary) placeholder:text-(--text-tertiary) focus:outline-none focus:border-(--border-tertiary) ",
      },
      inputSize: {
        default: "h-10 px-4 py-2",
        sm: "h-8 px-3 py-1.5 text-xs",
        lg: "h-12 px-5 py-3",
        xl: "h-14 px-6 py-4 text-base",
      },
      rounded: {
        default: "rounded-lg",
        sm: "rounded-md",
        lg: "rounded-xl",
        full: "rounded-full",
        none: "rounded-none",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "default",
      rounded: "full",
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  error?: boolean | string;
  errorMessage?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant,
      inputSize,
      rounded,
      type = "text",
      startIcon,
      endIcon,
      error,
      errorMessage,
      ...props
    },
    ref
  ) => {
    const hasStartIcon = !!startIcon;
    const hasEndIcon = !!endIcon;
    const hasError = Boolean(error);
    const displayErrorMessage =
      typeof error === "string" ? error : errorMessage;

    return (
      <div className="w-full">
        {/* Input wrapper - icons positioned relative to this */}
        <div className="relative">
          {startIcon && (
            <div className="absolute start-4 top-1/2 -translate-y-1/2 text-(--text-muted) pointer-events-none">
              {startIcon}
            </div>
          )}
          <input
            type={type}
            className={cn(
              inputVariants({ variant, inputSize, rounded }),
              hasStartIcon && "ps-12",
              hasEndIcon && "pe-12",
              hasError &&
                "border-red-500 dark:border-red-500 focus:ring-red-500 dark:focus:ring-red-500",
              className
            )}
            ref={ref}
            {...props}
          />
          {endIcon && (
            <div className="absolute end-4 top-1/2 -translate-y-1/2 text-(--text-muted) pointer-events-none">
              {endIcon}
            </div>
          )}
        </div>
        {/* Error message - outside input wrapper */}
        {hasError && displayErrorMessage && (
          <p className="mt-1 text-xs text-red-500">{displayErrorMessage}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input, inputVariants };
