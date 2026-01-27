"use client";
import type React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export const LampContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center overflow-hidden w-full z-0 border border-(--border-primary)/30 bg-(--surface-secondary)/50 shadow-lg shadow-(--border-primary)/20",
        className
      )}
    >
      <div className="absolute flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0 top-0 ">
        <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-(--glow-bg) blur-2xl"></div>
        <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md"></div>
        <div className="absolute inset-auto z-50 h-36 w-[28rem] rounded-full bg-(--glow-primary) opacity-50 blur-3xl"></div>
        <motion.div
          initial={{ width: "8rem" }}
          whileInView={{ width: "16rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-30 h-36 w-64 rounded-full bg-(--glow-secondary) blur-2xl"
          style={{
            WebkitBackdropFilter: "blur(20px)",
            WebkitFilter: "blur(32px)",
          }}
        />
        <div className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-(--glow-tertiary)"></div>
      </div>

      <div className="relative z-50 flex flex-col items-center px-5">
        {children}
      </div>
    </div>
  );
};
