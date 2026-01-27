"use client";

import React from "react";
import { useLocale } from "next-intl";
import { Route } from "../types";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Main from "./Main";

// Barrel exports for DashboardMockup components
export { default as Sidebar } from "./Sidebar";
export { default as Header } from "./Header";
export { default as Main } from "./Main";

interface LayoutProps {
  currentRoute: Route;
  onRouteChange: (route: Route) => void;
}

export default function Layout({ currentRoute, onRouteChange }: LayoutProps) {
  const locale = useLocale();
  const isRtl = locale === "ar";

  const containerClassName =
    "relative w-[100%] scale-[0.5] sm:scale-[1] translate-y-[-70px] xs:translate-y-[-50px] sm:translate-y-[-40px] shadow-2xl/15 min-w-375 h-197.5 sm:h-185 mx-auto mt-[-20px] border border-(--border-primary) rounded-lg";

  // RTL-aware transform - flip the rotation on Y axis for RTL
  const containerStyle = {
    inset: 0,
    transform: isRtl
      ? "rotateX(45deg) rotateY(-15deg) rotate(-340deg)"
      : "rotateX(45deg) rotateY(15deg) rotate(340deg)",
    transformOrigin: isRtl ? "top right" : "top left",
    backfaceVisibility: "hidden" as const,
    perspective: "1000px",
    transition: "transform 0.7s ease-out",
    transformStyle: "preserve-3d" as const,
  };

  return (
    <div className={containerClassName} style={containerStyle}>
      <div className="flex h-full">
        <Sidebar
          currentRoute={currentRoute}
          onNavigate={onRouteChange}
          isRtl={isRtl}
        />
        <div className="flex-1 flex flex-col bg-(--surface-secondary) rounded-t-lg">
          <Header currentRoute={currentRoute} isRtl={isRtl} />
          <Main isRtl={isRtl} />
        </div>
        {/* Bottom gradient overlay - RTL aware */}
        <div
          className="absolute h-[130%] dark:w-full top-[30%] inset-0 pointer-events-none z-10 
                bg-linear-to-b from-transparent to-(--surface-primary)"
        />
        {/* Side gradient overlay - RTL aware using logical properties */}
        <div
          className={`absolute h-full w-[130%] dark:w-full inset-0 pointer-events-none rounded-t-lg z-10 
                 ${
                   isRtl
                     ? "end-[30%] bg-linear-to-l from-transparent to-(--surface-primary)"
                     : "start-[30%] bg-linear-to-r from-transparent to-(--surface-primary)"
                 }`}
        />
      </div>
    </div>
  );
}
