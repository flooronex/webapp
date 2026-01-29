"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { TextHoverEffect } from "@/components";
import { mapPoints, getLabels } from "./config";
import { FooterForm, FooterHeader } from "./components";

// Defer map loading until viewport is reached
const WorldMap = dynamic(() => import("@/components/WorldMap"));

export default function FooterSection() {
  const t = useTranslations("home.footer");
  const sectionRef = useRef<HTMLElement>(null);

  // Get translated labels
  const labels = getLabels(t);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-12 sm:py-16 md:py-24 relative w-full px-4 sm:px-6 overflow-hidden bg-(--surface-primary)"
    >
      {/* WorldMap - absolute cover on mobile, relative contained on desktop */}
      <WorldMap
        points={mapPoints}
        pointColor="var(--interactive-focus)"
        containerClassName="absolute inset-0 min-h-full min-w-full z-0  md:mx-auto md:max-w-7xl md:h-125 md:min-h-0 md:min-w-0 md:z-10 opacity-70"
        imgClassName="object-cover  md:object-contain"
      />

      <div className="relative z-10">
        {/* Header */}
        <FooterHeader labels={labels} />

        <div className="relative mx-auto max-w-7xl z-20 w-full">
          {/* Contact Form - positioned above map on mobile, floating centered on desktop */}
          <div className="mb-10 flex justify-center md:absolute md:mb-0 md:start-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:z-20 md:rtl:translate-x-1/2">
            <FooterForm labels={labels} />
          </div>

          {/* Text effect container */}
          <div className="relative h-2.5 md:h-125">
            <TextHoverEffect
              text="FloorOneX"
              className="absolute w-full h-37.5 md:h-62.5 translate-y-[55%] bottom-0 pointer-events-none md:pointer-events-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
