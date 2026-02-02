"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { ResponsiveLabels } from "../types";
import { FeatureList } from "./FeatureList";
import { Link } from "@/i18n/navigation";

interface ResponsiveContentProps {
  labels: ResponsiveLabels;
}

export function ResponsiveContent({ labels }: ResponsiveContentProps) {
  const features = [
    labels.features.adaptsToScreenSize,
    labels.features.touchFriendly,
    labels.features.optimizedOrientation,
  ];

  return (
    <div className="w-full md:w-1/2 text-center md:text-start md:ps-4 lg:ps-8">
      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold py-2 text-(--text-primary)">
        {labels.title}
      </h2>

      <motion.div
        initial={{ width: "0%" }}
        whileInView={{ width: "60px" }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="h-1 bg-(--text-muted) mt-2 sm:mt-3 mb-3 sm:mb-5 md:mb-6 mx-auto md:mx-0"
        style={{
          transform: "translateZ(0)",
          WebkitTransform: "translateZ(0)",
        }}
      />

      <p className="mt-3 sm:mt-4 text-sm sm:text-base text-(--text-tertiary) max-w-lg mx-auto md:mx-0">
        {labels.description}
      </p>

      <FeatureList features={features} />

      <Button
        variant="default"
        size="default"
        className="w-full sm:w-auto max-w-xs mt-5 sm:mt-8"
        onClick={() => {
          console.log("CTA clicked: Browse services");
        }}
      >

        <Link href="/services">
          {labels.ctaButton}
        </Link>
        {/* {labels.ctaButton} */}
      </Button>
    </div>
  );
}
