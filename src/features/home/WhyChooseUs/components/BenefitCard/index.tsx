"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useCardHover } from "../../hooks";
import { BenefitCardProps } from "./types";
import { CardContent, BackgroundElements, Spotlight } from "./components";

export default function BenefitCard({
  benefit,
  index,
  isRtl = false,
  performanceLabel,
}: BenefitCardProps) {
  const {
    cardRef,
    isHovered,
    rotateX,
    rotateY,
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave,
  } = useCardHover();

  return (
    <motion.div
      ref={cardRef}
      className="relative h-full group perspective-1000"
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: 0.1 + index * 0.1,
      }}
      whileHover={{ z: 10 }}
    >
      {/* Card background with 3D effect */}
      <motion.div
        className={cn(
          "relative z-10 p-6 sm:p-8 flex flex-col h-full rounded-xl ",
          "bg-(--surface-secondary-alt-2)",
          "transition-all duration-300"
        )}
        style={{
          transformStyle: "preserve-3d",
        }}
        animate={{
          rotateX: rotateX,
          rotateY: isRtl ? -rotateY : rotateY, // Invert rotation for RTL
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 15,
        }}
      >
        <Spotlight isHovered={isHovered} rotateX={rotateX} rotateY={rotateY} />

        <CardContent
          icon={benefit.icon}
          title={benefit.title}
          description={benefit.description}
          percentage={benefit.percentage}
          performanceLabel={performanceLabel}
          isRtl={isRtl}
          index={index}
          isHovered={isHovered}
        />

        <BackgroundElements isHovered={isHovered} isRtl={isRtl} />
      </motion.div>
    </motion.div>
  );
}
