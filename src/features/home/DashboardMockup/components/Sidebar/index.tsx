"use client";

import React from "react";
import { Route } from "../../types";
import { NavElement } from "./types";
import { navElements } from "./config/navigation";
import { useAnimations } from "./hooks/useAnimations";
import NavItem from "./components/NavItem";
import NavSection from "./components/NavSection";
import BrandHeader from "./components/BrandHeader";
import SidebarFooter from "./components/SidebarFooter";

interface SidebarProps {
  currentRoute: Route;
  onNavigate: (route: Route) => void;
  isRtl?: boolean;
}

export default function Sidebar({
  currentRoute,
  onNavigate,
  isRtl = false,
}: SidebarProps) {
  const totalElements = navElements.length + 2;
  const {
    getInitialAnimationValues,
    getTransitionProps,
    animateTo,
    getBrandHeaderAnimation,
  } = useAnimations(totalElements, isRtl);

  const brandAnimation = getBrandHeaderAnimation();

  const renderNavElement = (element: NavElement, index: number) => {
    if (element.type === "section") {
      return (
        <NavSection
          key={element.sectionKey}
          sectionKey={element.sectionKey}
          initialAnimation={getInitialAnimationValues(index)}
          animateTo={animateTo}
          transition={getTransitionProps(index)}
        />
      );
    }

    const isActive = currentRoute === element.route;

    return (
      <NavItem
        key={element.route}
        icon={element.icon}
        route={element.route}
        badge={element.badge}
        isActive={isActive}
        onNavigate={onNavigate}
        initialAnimation={getInitialAnimationValues(index)}
        animateTo={animateTo}
        transition={getTransitionProps(index)}
      />
    );
  };

  return (
    <div
      className="w-50 flex flex-col bg-(--surface-primary) rounded-t-lg"
      style={{
        zIndex: 5,
        perspective: "1000px",
        WebkitPerspective: "1000px",
        transformStyle: "preserve-3d",
      }}
    >
      <BrandHeader
        initialAnimation={brandAnimation.initial}
        animateTo={animateTo}
        transition={brandAnimation.transition}
      />

      <div
        className="flex flex-1 flex-col gap-2"
        style={{ transformStyle: "preserve-3d" }}
      >
        {navElements.map((element, index) => renderNavElement(element, index))}
      </div>

      <SidebarFooter
        initialAnimation={getInitialAnimationValues(navElements.length)}
        animateTo={animateTo}
        transition={getTransitionProps(navElements.length)}
      />
    </div>
  );
}
