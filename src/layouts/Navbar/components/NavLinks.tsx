"use client";

import { useRef, RefObject } from "react";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import { navStyles } from "../config/styles";
import type { SliderStyle } from "../hooks";

interface NavLinksProps {
  links: Array<{ label: string; href: string }>;
  sliderStyle: SliderStyle;
  activeLink: number | null;
  navLinksRef: RefObject<HTMLUListElement | null>;
  onLinkHover: (e: React.MouseEvent<HTMLLIElement>, index: number) => void;
}

export function NavLinks({
  links,
  sliderStyle,
  activeLink,
  navLinksRef,
  onLinkHover,
}: NavLinksProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="relative">
      {/* Slider Background */}
      <div
        style={{
          left: sliderStyle.left,
          width: sliderStyle.width,
          opacity: sliderStyle.width === 0 ? 0 : 1,
          transform: `scaleX(${sliderStyle.width === 0 ? 0 : 1})`,
          transformOrigin: sliderStyle.transformOrigin,
          transition: sliderStyle.transition,
        }}
        className="absolute  top-0 h-full bg-(--foreground)/5 rounded-full pointer-events-none"
        aria-hidden="true"
      />

      {/* Links */}
      <ul ref={navLinksRef} className="hidden md:flex text-sm font-medium">
        {links.map((link, index) => (
          <li
            key={link.label}
            onMouseEnter={(e) => onLinkHover(e, index)}
            className={cn(
              "relative z-10 px-3 whitespace-nowrap text-center py-2 rounded-full font-medium",
              activeLink === index ? "text-(--foreground)" : ""
            )}
          >
            <Link href={link.href || "/"} className={navStyles.link}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
