"use client";

import { useId } from "react";
import { motion } from "motion/react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { FaqCategory, FaqLabels } from "../types";
import { cn } from "@/lib/utils";

interface CategoryTabsProps {
  categories: (FaqCategory | "all")[];
  selectedCategory: FaqCategory | null;
  setSelectedCategory: (category: FaqCategory | null) => void;
  categoryCounts: Record<string, number>;
  labels: FaqLabels;
}

export function CategoryTabs({
  categories,
  selectedCategory,
  setSelectedCategory,
  categoryCounts,
  labels,
}: CategoryTabsProps) {
  const tabsId = useId();

  const handleValueChange = (value: string) => {
    setSelectedCategory(value === "all" ? null : (value as FaqCategory));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="flex justify-center"
    >
      <Tabs
        id={tabsId}
        value={selectedCategory || "all"}
        onValueChange={handleValueChange}
      >
        <TabsList className="flex flex-wrap rtl:flex-row-reverse gap-2 h-auto p-2 bg-transparent">
          {categories.map((category) => (
            <TabsTrigger
              key={category}
              value={category}
              className={cn(
                "rounded-full border data-[state=active]:border-(--border-tertiary)/50 data-[state=active]:bg-(--surface-tertiary)",
                "data-[state=inactive]:border-(--border-primary)/50"
              )}
            >
              {labels.categories[category as keyof typeof labels.categories]}
              {categoryCounts[category] !== undefined && (
                <span className="ms-1.5 inline-flex items-center justify-center w-5 h-5 text-xs rounded-full bg-(--surface-tertiary) text-(--text-tertiary) data-[state=active]:bg-(--surface-tertiary) data-[state=active]:text-(--text-primary)">
                  {categoryCounts[category]}
                </span>
              )}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </motion.div>
  );
}
