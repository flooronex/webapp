/* eslint-disable @next/next/no-img-element */
"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";

interface MapProps {
  points?: Array<{
    x: number;
    y: number;
  }>;
  pointColor?: string;
  className?: string;
  containerClassName?: string;
  imgClassName?: string;
}

export default function WorldMap({
  points = [],
  pointColor = "var(--accent-1)",
  className = "",
  containerClassName = "",
  imgClassName = "",
}: MapProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  return (
    <div
      className={cn(
        "w-full aspect-2/1 rounded-lg",
        containerClassName,
        className
      )}
      style={{ backgroundColor: "var(--map-bg)" }}
    >
      <img
        src="/assets/images/world-map.svg"
        className={cn(
          "h-full w-full pointer-events-none select-none",
          imgClassName
        )}
        alt="world map"
        height="495"
        width="1056"
        draggable={false}
        style={{
          filter: "var(--map-filter)",
          opacity: "var(--map-opacity)",
        }}
      />
      <svg
        ref={svgRef}
        viewBox="0 0 800 400"
        className="w-full h-full absolute inset-0 pointer-events-none select-none"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="point-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={pointColor} stopOpacity="1" />
            <stop offset="100%" stopColor={pointColor} stopOpacity="0.5" />
          </linearGradient>
        </defs>

        {points.map((point, i) => (
          <g key={`point-${i}`}>
            <circle cx={point.x} cy={point.y} r="2" fill={pointColor} />
            <circle
              cx={point.x}
              cy={point.y}
              r="8"
              fill={pointColor}
              opacity="0.2"
            >
              <animate
                attributeName="r"
                from="2"
                to="8"
                dur="1.5s"
                begin="0s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                from="0.5"
                to="0"
                dur="1.5s"
                begin="0s"
                repeatCount="indefinite"
              />
            </circle>
          </g>
        ))}
      </svg>
    </div>
  );
}
