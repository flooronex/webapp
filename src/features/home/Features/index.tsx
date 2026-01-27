"use client";

import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { getFeaturesData } from "./config/features";
import { FeatureCard } from "./components";

function FeaturesContent() {
  const t = useTranslations("home.features");

  const features = getFeaturesData(t);

  return (
    <section
      className="relative z-10 flex flex-col items-center justify-center w-full p-6 md:p-20 px-2 md:px-10 mx-auto bg-(--surface-primary)"
      aria-label="Platform features"
    >
      <div className="container px-2 md:px-4 mx-auto">
        <div className="mb-8 md:mb-12 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-(--foreground) mb-2 md:mb-3">
            {t("title")}
          </h2>
          <p className="text-base md:text-lg text-(--text-tertiary) max-w-2xl mx-auto">
            {t("description")}
          </p>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-min min-[400px]:auto-rows-[minmax(100px,auto)]"
          role="list"
          aria-label="Platform feature list"
        >
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Export with dynamic loading for better performance
const Features = dynamic(() => Promise.resolve(FeaturesContent), {
  ssr: false,
  loading: () => (
    <div className="relative z-10 flex flex-col items-center justify-center w-full p-6 md:p-20 px-2 md:px-10 mx-auto mt-25 md:mt-47.5 border bg-(--surface-primary) border-(--border-primary) rounded-lg min-h-75">
      <div className="animate-pulse text-center">
        <div className="h-8 bg-(--surface-tertiary) rounded w-64 mx-auto mb-4"></div>
        <div className="h-4 bg-(--surface-tertiary) rounded w-96 mx-auto"></div>
      </div>
    </div>
  ),
});

export default Features;
