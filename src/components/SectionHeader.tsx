"use client";

import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";

const AnimatedHeaderBackground = dynamic(
  () => import("@/components/AnimatedHeaderBackground"),
  { ssr: false }
);

interface SectionHeaderProps {
  badge?: string;
  title: string;
  description: string;
  useAnimatedBackground?: boolean;
  enableTopFade?: boolean;
  enableBottomFade?: boolean;
  enableSvgBackground?: boolean;
  className?: string;
}

export default function SectionHeader({
  badge,
  title,
  description,
  useAnimatedBackground = false,
  enableTopFade = true,
  enableBottomFade = true,
  enableSvgBackground = true,
  className = "",
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "text-center sm:mb-10 relative py-3 sm:py-10",
        useAnimatedBackground && "pt-5 pb-8",
        className
      )}
    >
      {/* Animated Background */}
      {useAnimatedBackground && (
        <AnimatedHeaderBackground
          enableTopFade={enableTopFade}
          enableBottomFade={enableBottomFade}
          enableSvgBackground={enableSvgBackground}
        />
      )}

      {/* Feature Badge */}
      {badge && (
        <div className="mb-4 sm:mb-3 relative z-10">
          <Badge variant="glass" size="md" enableGlassEffect>
            {badge}
          </Badge>
        </div>
      )}

      {/* Title */}
      <h2 className="text-(--text-primary) text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal mb-4 sm:mb-6 relative z-10 font-clash-display leading-tight">
        {title}
      </h2>

      {/* Description */}
      <p className="text-(--text-tertiary) text-sm sm:text-base md:text-lg max-w-sm sm:max-w-lg md:max-w-2xl mx-auto leading-relaxed relative z-10 font-dm-sans">
        {description}
      </p>
    </div>
  );
}
