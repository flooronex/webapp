"use client";

import React from "react";
import {
  IconChevronDown,
  IconUser,
  IconMail,
  IconSettings2,
  IconLogout,
} from "@tabler/icons-react";

interface UserDropdownProps {
  isOpen: boolean;
  onToggle: () => void;
  dropdownRef: React.RefObject<HTMLDivElement>;
  translations: {
    userInitials: string;
    userName: string;
    userEmail: string;
    profile: string;
    messages: string;
    settings: string;
    logout: string;
  };
}

export default function UserDropdown({
  isOpen,
  onToggle,
  dropdownRef,
  translations,
}: UserDropdownProps) {
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={onToggle}
        className="flex items-center gap-2 hover:bg-(--surface-hover) rounded-full p-1 transition-colors"
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label={translations.profile}
      >
        <div className="h-9 w-9 rounded-full border-2 border-(--border-secondary) flex items-center justify-center bg-(--surface-tertiary)">
          <span className="text-sm font-medium text-(--text-primary)">
            {translations.userInitials}
          </span>
        </div>
        <IconChevronDown
          size={16}
          className={`transition-transform text-(--text-tertiary) ${
            isOpen ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div
          className="absolute end-0 z-50 mt-2 w-48 bg-(--surface-primary) rounded-md shadow-lg border border-(--border-primary) py-1"
          role="menu"
          aria-label={translations.profile}
        >
          <div className="px-4 py-2 border-b border-(--border-primary)">
            <div className="font-medium text-(--text-primary)">
              {translations.userName}
            </div>
            <div className="text-sm text-(--text-tertiary)">
              {translations.userEmail}
            </div>
          </div>
          <div className="py-1">
            <button
              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-(--text-secondary) hover:bg-(--surface-hover)"
              role="menuitem"
            >
              <IconUser size={16} />
              {translations.profile}
            </button>
            <button
              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-(--text-secondary) hover:bg-(--surface-hover)"
              role="menuitem"
            >
              <IconMail size={16} />
              {translations.messages}
            </button>
            <button
              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-(--text-secondary) hover:bg-(--surface-hover)"
              role="menuitem"
            >
              <IconSettings2 size={16} />
              {translations.settings}
            </button>
          </div>
          <div className="border-t border-(--border-primary) py-1">
            <button
              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-(--danger-text) hover:bg-(--danger-bg-hover)"
              role="menuitem"
            >
              <IconLogout size={16} />
              {translations.logout}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
