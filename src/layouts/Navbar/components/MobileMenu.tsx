"use client";

import { motion, AnimatePresence } from "motion/react";
import { MobileLanguageSwitcher } from "./MobileLanguageSwitcher";
import type { MobileMenuProps } from "../types";

export function MobileMenu({
  isOpen,
  onClose,
  links,
  actions,
}: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-(--background)/20 backdrop-blur-xs z-40"
            aria-hidden="true"
          />
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-22.5 left-4 right-4 rounded-xl bg-(--foreground) dark:bg-(--surface-tertiary)/80 backdrop-blur-xl p-4 z-50 shadow-xl dark:shadow-2xl border border-(--border-primary)/20"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile menu"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:opacity-70 transition-opacity rounded-full hover:bg-(--surface-hover)"
              aria-label="Close menu"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M1 1L13 13M1 13L13 1" />
              </svg>
              <span className="sr-only">Close menu</span>
            </button>

            <nav className="flex flex-col gap-2">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={onClose}
                  className="text-base font-medium hover:opacity-70 transition-opacity py-2"
                >
                  {link.label}
                </a>
              ))}
              <hr className="border-(--border-primary) my-1" />
              {actions?.login && (
                <button
                  onClick={() => {
                    actions.login?.onClick?.();
                    onClose();
                  }}
                  className="text-base font-medium text-left hover:opacity-70 transition-opacity py-2"
                  aria-label={actions.login.label}
                >
                  {actions.login.label}
                </button>
              )}
              {actions?.cta && (
                <button
                  onClick={() => {
                    actions.cta?.onClick?.();
                    onClose();
                  }}
                  className="w-full bg-(--background) text-(--foreground) rounded-lg py-2 text-base font-medium hover:opacity-90 transition-opacity"
                  aria-label={actions.cta.label}
                >
                  {actions.cta.label}
                </button>
              )}
              <hr className="border-(--border-primary) my-1" />
              <MobileLanguageSwitcher />
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
