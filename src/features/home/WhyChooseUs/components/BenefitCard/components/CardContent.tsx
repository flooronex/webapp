"use client";

import CardIcon from "./CardIcon";
import ProgressBar from "./ProgressBar";
import { CardContentProps } from "../types";

interface CardContentComponentProps extends CardContentProps {
  icon: React.ReactNode;
  isHovered: boolean;
}

export default function CardContent({
  icon,
  title,
  description,
  percentage,
  performanceLabel,
  isRtl,
  index,
  isHovered,
}: CardContentComponentProps) {
  return (
    <>
      <CardIcon icon={icon} isHovered={isHovered} />

      <div className="z-10 relative flex flex-col flex-1">
        <h3 className="text-lg md:text-xl font-bold text-(--text-primary) mb-2">
          {title}
        </h3>

        <p className="text-(--text-tertiary) text-sm mb-6 flex-1">
          {description}
        </p>

        <ProgressBar
          percentage={percentage}
          performanceLabel={performanceLabel}
          isRtl={isRtl}
          index={index}
        />
      </div>
    </>
  );
}
