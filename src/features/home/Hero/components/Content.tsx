"use client";
import { TextGenerateEffect } from "@/components";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import React from "react";
import { Link } from "@/i18n/navigation";

export default function HomeSection1Content() {
  const t = useTranslations("home.hero");

  return (
    <div className="relative flex items-center justify-center pt-6 pb-10 sm:pt-20 sm:pb-22.5 w-full">
      <div className="relative z-10 text-start ps-4 pe-4 md:ps-6 md:pe-6 w-full mx-auto max-w-325">
        {/* Use proper heading structure - h1 for main page heading */}
        <motion.div
          layout
          className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-start"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <h1 aria-label={`${t("title.line1")} ${t("title.line2")}`}>
            <TextGenerateEffect
              duration={0.3}
              speed={0.05}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[62px] lg:leading-[100%] tracking-tight text-(--foreground)"
              words={t("title.line1")}
            />
          </h1>
        </motion.div>

        <motion.div
          layout
          className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-start"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.3,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <TextGenerateEffect
            duration={0.5}
            speed={0.2}
            className="text-4xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-[62px] lg:leading-[70%] mb-4 sm:mb-6 tracking-tight text-(--foreground)"
            words={t("title.line2")}
          />
        </motion.div>

        <motion.p
          layout
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="max-w-full sm:max-w-165 text-base xs:text-lg md:text-xl text-(--text-secondary) mb-6 sm:mb-8"
        >
          {t("description")}
        </motion.p>

        <div className="mt-6 sm:mt-8 flex flex-row gap-3 sm:gap-4 justify-start items-start">
          <Button
            variant="default"
            aria-label={t("cta.getStarted")}
            className="min-w-27.5"
          >
            <Link href="/get-started">
              {t("cta.getStarted")}
            </Link>
            {/* {t("cta.getStarted")} */}
          </Button>

          <Button
            variant="outline"
            aria-label={t("cta.learnMore")}
            className="min-w-27.5"
          >
            <Link href="/learn-more">
              {t("cta.learnMore")}
            </Link>
            {/* {t("cta.learnMore")} */}
          </Button>
        </div>
      </div>
    </div>
  );
}
