"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { IconX } from "@tabler/icons-react";

interface ComingSoonModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  ctaText?: string;
  continueText?: string;
  contactFormId?: string;
  ariaLabels?: {
    closeButton?: string;
    contactButton?: string;
    continueButton?: string;
  };
}

export function ComingSoonModal({
  isOpen,
  onClose,
  title = "Coming Soon",
  description = "This feature is currently under development. We'll notify you as soon as it's available.",
  ctaText = "Contact Us",
  continueText = "Continue Browsing",
  contactFormId = "contact",
  ariaLabels = {
    closeButton: "Close modal",
    contactButton: "Go to contact form",
    continueButton: "Continue browsing",
  },
}: ComingSoonModalProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const scrollToContactForm = () => {
    const contactForm = document.getElementById(contactFormId);
    if (contactForm) {
      onClose();
      setTimeout(() => {
        contactForm.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-(--overlay-bg) backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{
              type: "spring",
              damping: 30,
              stiffness: 400,
              duration: 0.3,
            }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-md"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <div className="bg-(--surface-secondary-alt) rounded-xl border border-(--border-primary) shadow-xl overflow-hidden">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-(--surface-hover) transition-colors"
                aria-label={ariaLabels.closeButton}
              >
                <IconX className="h-4 w-4 text-(--text-muted)" />
              </button>

              {/* Content */}
              <div className="p-6 sm:p-8">
                {/* Pattern background */}
                <div className="absolute top-0 left-0 right-0 h-24 bg-linear-to-r from-(--foreground)/10 to-(--foreground)/5 -z-10"></div>

                {/* Icon */}
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-(--status-info-bg) flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-(--text-primary)"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </div>

                <h3
                  id="modal-title"
                  className="text-xl sm:text-2xl font-bold text-center text-(--text-primary) mb-2"
                >
                  {title}
                </h3>

                <p className="text-(--text-tertiary) text-center mb-6">
                  {description}
                </p>

                <div className="flex flex-col md:flex-row gap-3 justify-center">
                  <Button
                    variant="default"
                    onClick={scrollToContactForm}
                    aria-label={ariaLabels.contactButton}
                    className="w-full md:w-[48%]"
                  >
                    {ctaText}
                  </Button>

                  <Button
                    variant="outline"
                    onClick={onClose}
                    aria-label={ariaLabels.continueButton}
                    className="w-full md:w-[48%]"
                  >
                    {continueText}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
