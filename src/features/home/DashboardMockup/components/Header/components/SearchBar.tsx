"use client";

import React from "react";
import { IconSearch } from "@tabler/icons-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  ariaLabel: string;
}

export default function SearchBar({
  value,
  onChange,
  placeholder,
  ariaLabel,
}: SearchBarProps) {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-72 h-10 ps-10 pe-4 py-2 rounded-md bg-(--surface-secondary) border border-(--border-primary) 
          focus:border-(--interactive-focus)
          transition-colors outline-hidden text-(--text-primary)"
        aria-label={ariaLabel}
      />
      <IconSearch
        className="absolute start-3 top-1/2 transform -translate-y-1/2 text-(--text-muted)"
        size={16}
      />
    </div>
  );
}
