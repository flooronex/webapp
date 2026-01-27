"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Route } from "../../types";
import { useHeaderAnimations } from "./hooks/useHeaderAnimations";
import { useClickOutside } from "./hooks/useClickOutside";
import SearchBar from "./components/SearchBar";
import UserDropdown from "./components/UserDropdown";

interface HeaderProps {
  currentRoute: Route;
  isRtl?: boolean;
}

export default function Header({ currentRoute, isRtl = false }: HeaderProps) {
  const t = useTranslations("home.dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null!);

  const { initialAnimation, animateTo, transitionProps } =
    useHeaderAnimations(isRtl);

  useClickOutside(
    dropdownRef,
    () => setIsUserDropdownOpen(false),
    isUserDropdownOpen
  );

  const userDropdownTranslations = {
    userInitials: t("user.initials"),
    userName: t("user.name"),
    userEmail: t("user.email"),
    profile: t("menu.profile"),
    messages: t("menu.messages"),
    settings: t("menu.settings"),
    logout: t("menu.logout"),
  };

  return (
    <motion.header
      style={{ transformStyle: "preserve-3d", zIndex: "1" }}
      initial={initialAnimation}
      animate={animateTo}
      transition={transitionProps}
    >
      <div className="h-16 border-b rounded-tr-lg border-(--border-primary) flex items-center justify-between bg-(--surface-primary) py-4 px-6">
        <h2 className="text-xl font-semibold capitalize text-(--text-primary)">
          {t(`sidebar.items.${currentRoute}`)}
        </h2>
        <div className="flex items-center gap-4">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder={t("search")}
            ariaLabel={t("search")}
          />
          <UserDropdown
            isOpen={isUserDropdownOpen}
            onToggle={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
            dropdownRef={dropdownRef}
            translations={userDropdownTranslations}
          />
        </div>
      </div>
    </motion.header>
  );
}
