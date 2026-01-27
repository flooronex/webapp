/**
 * Components exports
 * Main entry point for all component exports
 */

// UI primitives (button, tooltip, tabs)
export * from "./ui";

// Animated/Effect components
export { AnimatedTooltip } from "./AnimatedTooltip";
export { AnimatedNumber } from "./AnimatedNumber";
export { TextHoverEffect } from "./TextHoverEffect";
export { TextGenerateEffect } from "./TextGenerateEffect";

// Background effects
export { BackgroundShapes } from "./BackgroundShapes";
export { GridBg } from "./GridBg";
export { RetroGrid } from "./RetroGrid";

// Cards and containers
export { LampContainer } from "./LampContainer";
export { ShineBorder } from "./ShineBorder";

// Modals
export { ComingSoonModal } from "./ComingSoonModal";

// Language Switcher
export { LanguageSwitcher } from "./LanguageSwitcher";

// Pricing Card
export { PricingCard } from "./PricingCard";
export type {
    PricingPlan,
    PlanFeature,
    PricingFeature,
    Testimonial,
    FeatureCategory,
    PricingCardLabels,
    PricingCardProps,
} from "./PricingCard/types";

// Complex/Feature-specific components
export { default as BuyStrip } from "./BuyStrip";
export { FileTree } from "./FileTree";
export { Gauge, GaugeDemo } from "./Gauge";
export { GlobalDeployments } from "./GlobalDeployments";
export { Globe } from "./Globe";
export { LighthouseMetrics } from "./LighthouseMetrics";
export { default as Table } from "./Table";
export * from "./WorldMap";
export * from "./OneClickDeployment";
export * from "./ScalableEnvironments";

// Note: ThemeProvider and useTheme are exported from @/providers
