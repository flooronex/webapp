"use client";

import { IconCheck } from "@tabler/icons-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AnimatedTooltip } from "@/components/AnimatedTooltip";
import { AnimatedNumber } from "@/components/AnimatedNumber";
import { useState } from "react";
import { ComingSoonModal } from "@/components/ComingSoonModal";
import type {
  PlanFeature,
  PricingFeature,
  FeatureCategory,
  PricingCardProps,
} from "./types";

function isPlanFeature(
  feature: PlanFeature | PricingFeature
): feature is PlanFeature {
  return "text" in feature;
}

export function PricingCard({
  name,
  description,
  price,
  priceLabel,
  priceSuffix,
  billingNote,
  featured = false,
  badge,
  testimonials = [],
  companies,
  companiesCount,
  socialProof,
  socialProofText,
  featuresTitle,
  features = [],
  selectedCategory,
  cta,
  ctaText,
  ctaHref,
  labels,
}: PricingCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Format price with appropriate decimal places
  const formatPrice = (price: number) => {
    return price % 1 === 0 ? price : price.toFixed(2);
  };

  // Filter features by selected category (only for PlanFeature type)
  const getFilteredFeatures = (): (PlanFeature | PricingFeature)[] => {
    if (!features.length) return [];
    if (!selectedCategory) return features;

    return features.filter((feature: PlanFeature | PricingFeature) => {
      if (isPlanFeature(feature)) {
        return feature.category === selectedCategory;
      }
      return true; // PricingFeature doesn't have category filtering
    });
  };

  const handlePurchaseClick = () => {
    if (ctaHref) {
      window.location.href = ctaHref;
    } else {
      setIsModalOpen(true);
    }
  };

  const displayedFeatures = getFilteredFeatures();
  const displayCompanies = companiesCount || companies;
  const displaySocialProof = socialProofText || socialProof;
  const displayCta = ctaText || cta;
  const displayPriceLabel = priceSuffix || priceLabel;

  return (
    <>
      <div
        className={cn(
          "relative flex flex-col rounded-2xl rounded-t-0 group bg-(--surface-secondary-alt-2) mx-auto w-full min-h-auto md:min-h-175 border border-(--border-secondary)"
        )}
      >
        {/* Plan accent color bar with integrated badge */}
        <div
          className={
            "h-5 w-full overflow-hidden absolute top-0 start-0 rounded-t-2xl"
          }
        >
          <div
            className={cn(
              "min-h-1.5 w-[calc(100%-1px)] bg-linear-to-r rounded-t-2xl",
              featured
                ? "from-(--text-muted) to-(--text-primary)"
                : "from-(--surface-tertiary) to-(--border-secondary)"
            )}
          />
        </div>

        {/* Badge */}
        {badge && (
          <div className="absolute -top-3 inset-x-0 flex justify-center z-10">
            <span className="px-4 py-1 text-xs font-semibold text-(--text-inverted) bg-(--interactive-primary) rounded-full">
              {badge}
            </span>
          </div>
        )}

        <div
          className={cn(
            "p-5 sm:p-6 md:p-8 flex flex-col grow relative",
            featured ? "z-10" : ""
          )}
        >
          {/* Plan name and description */}
          <h3 className="text-lg sm:text-xl font-bold text-(--text-primary) flex items-center">
            {name}
          </h3>
          <p className="text-xs sm:text-sm text-(--text-tertiary) mt-2 mb-4 sm:mb-6">
            {description}
          </p>

          {/* Price */}
          <div className="mb-2 sm:mb-2">
            <div className="flex items-end">
              <span className="text-4xl font-bold text-(--text-primary)">
                <AnimatedNumber value={price}
                format={{ style: 'currency', currency: 'GBP' }}
                />
              </span>
              {displayPriceLabel && (
                <span className="text-sm text-(--text-muted) mb-1 ms-2">
                  {displayPriceLabel}
                </span>
              )}
            </div>
            {billingNote && (
              <p className="text-xs text-(--text-muted) mt-1">{billingNote}</p>
            )}
          </div>

          {/* Social proof */}
          {(testimonials.length > 0 || displaySocialProof) && (
            <div className="mt-3 flex gap-3 flex-col sm:flex-row items-start sm:items-center mb-6 sm:mb-8">
              {testimonials.length > 0 && (
                <div className="flex me-4">
                  <AnimatedTooltip
                    items={testimonials.slice(
                      0,
                      name === "Components"
                        ? 1
                        : name === "Templates & Components"
                        ? 3
                        : testimonials.length
                    )}
                  />
                </div>
              )}
              {displaySocialProof && (
                <span className="text-xs text-(--text-muted)">
                  {displaySocialProof}
                </span>
              )}
            </div>
          )}

          {/* Features list */}
          {displayedFeatures.length > 0 && (
            <div className="grow mb-6 sm:mb-8">
              {featuresTitle && (
                <h4 className="text-xs font-semibold uppercase tracking-wider text-(--text-muted) mb-3 sm:mb-4">
                  {featuresTitle}
                </h4>
              )}
              <ul className="flex flex-col gap-2">
                {displayedFeatures.map(
                  (feature: PlanFeature | PricingFeature, idx: number) => {
                    const featureText = isPlanFeature(feature)
                      ? feature.text
                      : feature.label;
                    const featureTooltip = feature.tooltip;
                    const featureHighlighted = feature.highlighted;

                    return (
                      <li
                        key={`${name}-feature-${idx}`}
                        className={cn(
                          "flex items-start",
                          featureHighlighted ? "relative" : ""
                        )}
                      >
                        <div
                          className={cn(
                            "shrink-0 h-4 w-4 sm:h-5 sm:w-5 rounded-full flex items-center justify-center",
                            featured
                              ? "text-(--text-primary)"
                              : "text-(--text-secondary)"
                          )}
                        >
                          <IconCheck className="h-3 w-3 sm:h-4 sm:w-4" />
                        </div>

                        <span
                          className={cn(
                            "text-xs sm:text-sm ms-2",
                            featureHighlighted
                              ? "text-(--text-primary) font-medium"
                              : "text-(--text-tertiary)"
                          )}
                        >
                          {featureTooltip ? (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <span className="border-b border-dashed border-(--border-secondary) cursor-help">
                                    {featureText}
                                  </span>
                                </TooltipTrigger>
                                <TooltipContent
                                  side="top"
                                  className="max-w-xs text-xs"
                                >
                                  <p>{featureTooltip}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          ) : (
                            featureText
                          )}
                        </span>
                      </li>
                    );
                  }
                )}
              </ul>
            </div>
          )}

          {/* CTA Button */}
          {displayCta && (
            <Button
              onClick={handlePurchaseClick}
              className={cn("w-full transition-all duration-300")}
              variant={featured ? "default" : "outline"}
            >
              {displayCta}
            </Button>
          )}
        </div>
      </div>

      {labels && (
        <ComingSoonModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={labels.modal.title}
          description={labels.modal.description}
          ctaText={labels.modal.cta}
          continueText={labels.modal.continue}
        />
      )}
    </>
  );
}

export default PricingCard;
