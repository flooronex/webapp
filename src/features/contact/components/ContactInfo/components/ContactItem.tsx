"use client";

import type { Icon } from "@tabler/icons-react";

interface ContactItemProps {
  icon: Icon;
  label: string;
  value: string;
  href?: string;
}

export function ContactItem({
  icon: Icon,
  label,
  value,
  href,
}: ContactItemProps) {
  return (
    <div className="group flex items-start gap-4">
      <div className="shrink-0 w-12 h-12 rounded-xl bg-(--surface-tertiary)/60 border border-(--border-secondary)/40 flex items-center justify-center group-hover:bg-(--surface-tertiary) group-hover:border-(--border-secondary)/60 transition-all duration-300">
        <Icon className="w-5 h-5 text-(--text-primary)" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-(--text-tertiary)/80 font-dm-sans mb-0.5">
          {label}
        </p>
        {href ? (
          <a
            href={href}
            className="text-(--text-primary) font-medium font-dm-sans hover:text-(--text-secondary) transition-colors duration-200 break-all"
          >
            {value}
          </a>
        ) : (
          <p className="text-(--text-primary) font-medium font-dm-sans">
            {value}
          </p>
        )}
      </div>
    </div>
  );
}
