"use client";

import { motion } from "motion/react";
import { IconSearch } from "@tabler/icons-react";
import { Input } from "@/components/ui/input";

interface SearchBoxProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  placeholder: string;
}

export function SearchBox({
  searchQuery,
  setSearchQuery,
  placeholder,
}: SearchBoxProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="mt-6 sm:mt-8 mb-6 sm:mb-10"
    >
      <div className="max-w-xl mx-auto">
        <Input
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          inputSize="lg"
          variant="filled"
          startIcon={<IconSearch className="h-5 w-5" />}
        />
      </div>
    </motion.div>
  );
}
