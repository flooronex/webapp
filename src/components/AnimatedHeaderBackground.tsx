interface AnimatedHeaderBackgroundProps {
  className?: string;
  enableTopFade?: boolean;
  enableBottomFade?: boolean;
  enableSvgBackground?: boolean;
}

export default function AnimatedHeaderBackground({
  className = "",
  enableTopFade = true,
  enableBottomFade = true,
  enableSvgBackground = true,
}: AnimatedHeaderBackgroundProps) {
  return (
    <div
      className={`absolute inset-0 ${className}`}
      style={{ pointerEvents: "none" }}
    >
      {/* SVG Background - inverts in light mode for visibility */}
      {enableSvgBackground && (
        <div
          className="absolute inset-0 bg-center bg-cover bg-no-repeat dark:invert-0 invert"
          style={{
            backgroundImage: "url('/assets/images/HeaderBgPattern.svg')",
          }}
        />
      )}
      {/* Center glow */}
      <div
        className="absolute inset-0 hidden dark:block"
        style={{
          background:
            "radial-gradient(ellipse 40% 100% at 50% 50%, color-mix(in srgb, var(--foreground) 12%, transparent) 0%, color-mix(in srgb, var(--foreground) 6%, transparent) 40%, color-mix(in srgb, var(--foreground) 2%, transparent) 70%, transparent 100%)",
        }}
      />
      {/* Top fade */}
      {enableTopFade && (
        <div
          className="absolute inset-x-0 top-0 h-[40%]"
          style={{
            background:
              "linear-gradient(to bottom, var(--background) 0%, color-mix(in srgb, var(--background) 50%, transparent) 50%, transparent 100%)",
          }}
        />
      )}
      {/* Bottom fade */}
      {enableBottomFade && (
        <div
          className="absolute inset-x-0 bottom-0 h-[40%]"
          style={{
            background:
              "linear-gradient(to top, var(--background) 0%, color-mix(in srgb, var(--background) 50%, transparent) 50%, transparent 100%)",
          }}
        />
      )}
    </div>
  );
}
