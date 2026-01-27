"use client";

import { cn } from "@/lib/utils";

interface SpotlightProps {
  isHovered: boolean;
  rotateX: number;
  rotateY: number;
}

export default function Spotlight({
  isHovered,
  rotateX,
  rotateY,
}: SpotlightProps) {
  return (
    <div
      className={cn(
        "absolute inset-0 rounded-xl pointer-events-none",
        "bg-[radial-gradient(circle_at_var(--x)_var(--y),rgba(255,255,255,0.1)_10%,transparent_80%)]",
        "dark:bg-[radial-gradient(circle_at_var(--x)_var(--y),rgba(255,255,255,0.06)_10%,transparent_80%)]",
        isHovered ? "opacity-60" : "opacity-0"
      )}
      style={
        {
          "--x": `${rotateY * 20 + 50}%`,
          "--y": `${rotateX * -20 + 50}%`,
        } as React.CSSProperties
      }
    />
  );
}
