"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { FeatureCategory, PricingLabels } from "../types";
import { Tabs, TabsList, TabsTrigger, Button } from "@/components/ui";
import { cn } from "@/lib/utils";

interface FeatureFilterProps {
  allCategories: FeatureCategory[];
  selectedCategory: FeatureCategory | null;
  setSelectedCategory: (category: FeatureCategory | null) => void;
  labels: PricingLabels;
}

export function FeatureFilter({
  allCategories,
  selectedCategory,
  setSelectedCategory,
  labels,
}: FeatureFilterProps) {
  const [showCategories, setShowCategories] = useState(false);

  // Handler to convert between TabItem value and FeatureCategory
  const handleValueChange = (value: string) => {
    setSelectedCategory(value === "null" ? null : (value as FeatureCategory));
  };

  return (
    <motion.div
      className="mt-8 flex flex-col items-center"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setShowCategories(!showCategories)}
        className="text-sm text-(--text-muted) underline underline-offset-2 mb-4 hover:text-(--text-primary)"
      >
        {showCategories ? labels.filter.hideButton : labels.filter.showButton}
      </Button>

      {showCategories && (
        <Tabs
          value={selectedCategory === null ? "null" : selectedCategory}
          onValueChange={handleValueChange}
          className="mb-6"
        >
          <TabsList className="flex flex-wrap rtl:flex-row-reverse gap-2 h-auto p-2 bg-transparent">
            <TabsTrigger
              value="null"
              className={cn(
                "rounded-full text-sm px-3 py-1.5 border",
                "data-[state=active]:border-(--border-secondary)",
                "data-[state=inactive]:border-(--border-primary)"
              )}
            >
              {labels.filter.allFeatures}
            </TabsTrigger>
            {allCategories.map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                className={cn(
                  "rounded-full text-sm px-3 py-1.5 border",
                  "data-[state=active]:border-(--border-secondary)",
                  "data-[state=inactive]:border-(--border-primary)"
                )}
              >
                {
                  labels.filter.categories[
                    category.toLowerCase() as keyof typeof labels.filter.categories
                  ]
                }
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      )}
    </motion.div>
  );
}
