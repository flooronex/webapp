"use client";

import { useTranslations } from "next-intl";
import { getFaqItems, getLabels } from "./config";
import { useFaqState } from "./hooks";
import { FaqHeader, SearchBox, CategoryTabs, FaqList } from "./components";
import { FaqCategory } from "./types";

export default function FaqSection() {
  const t = useTranslations("home.faq");
  const {
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    showAllFaqs,
    setShowAllFaqs,
  } = useFaqState();

  // Get translated data
  const faqData = getFaqItems(t);
  const labels = getLabels(t);

  // Filter FAQs based on selected category and search query
  const filteredFaqs = faqData.filter((faq) => {
    const matchesCategory =
      !selectedCategory || faq.category === selectedCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Determine how many FAQs to display
  const initialFaqCount = 6;
  const displayedFaqs = showAllFaqs
    ? filteredFaqs
    : filteredFaqs.slice(0, initialFaqCount);
  const hasMoreFaqs = filteredFaqs.length > initialFaqCount;

  // Get unique categories with their counts
  const categories: (FaqCategory | "all")[] = [
    "all",
    ...Array.from(new Set(faqData.map((faq) => faq.category))),
  ];

  // Count FAQs in each category
  const categoryCounts = categories.reduce((counts, category) => {
    if (category !== "all") {
      counts[category] = faqData.filter(
        (faq) => faq.category === category
      ).length;
    } else {
      counts[category] = faqData.length;
    }
    return counts;
  }, {} as Record<string, number>);

  return (
    <section
      id="faq"
      className="relative z-10 overflow-hidden flex flex-col items-center justify-center w-full py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-10 mx-auto bg-gray-50/60 dark:bg-neutral-950/50"
    >
      <div className="relative z-10 container mx-auto max-w-4xl">
        {/* Header */}
        <FaqHeader labels={labels} />

        {/* Search box */}
        <SearchBox
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          placeholder={labels.searchPlaceholder}
        />

        {/* Categories */}
        <CategoryTabs
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categoryCounts={categoryCounts}
          labels={labels}
        />

        {/* FAQ items */}
        <div className="mt-8 sm:mt-12">
          <FaqList
            displayedFaqs={displayedFaqs}
            showAllFaqs={showAllFaqs}
            setShowAllFaqs={setShowAllFaqs}
            hasMoreFaqs={hasMoreFaqs}
            labels={labels}
          />
        </div>
      </div>
    </section>
  );
}
