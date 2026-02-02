"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { TemplateCardProps } from "../types";

export function TemplateCard({
  id,
  name,
  category,
  price,
  label,
  image,
  url,
  index = 0,
  labels,
}: TemplateCardProps) {
  const [rippleEffect, setRippleEffect] = useState({
    active: false,
    x: 0,
    y: 0,
  });

  const handleRipple = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setRippleEffect({ active: true, x, y });

    setTimeout(() => {
      setRippleEffect({ active: false, x: 0, y: 0 });
    }, 500);
  };

  return (
    <motion.div
      key={id}
      className="relative overflow-hidden rounded-xl border border-(--border-primary) bg-(--surface-secondary) shadow-sm hover:shadow-md transition-all min-h-55 xs:min-h-65 sm:min-h-95 flex flex-col group"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeInOut",
      }}
    >
      {/* Background Video */}
      <div className="absolute inset-0">
        <video
          src={image}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          controls={false}
          disablePictureInPicture
          disableRemotePlayback
          tabIndex={-1}
          aria-hidden="true"
          className="w-full h-full object-cover object-top pointer-events-none select-none"
        />

        {/* <Image
          src={image}
          alt={`${name} template preview`}
          fill
          className="object-cover object-top"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          loading="lazy"
        /> */}
      </div>

      {/* Label */}
      {label && (
        <div className="absolute top-2 end-2 text-[10px] sm:text-xs font-mono text-white px-2 py-0.5 rounded bg-primary/80 z-20">
          {label}
        </div>
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black/80 to-black/10 z-10 pointer-events-none" />

      {/* Details */}
      <div className="absolute bottom-0 start-0 end-0 p-3 sm:p-4 z-20">
        <div className="mb-1">
          <span className="text-[10px] sm:text-xs text-white/80 font-mono">
            {category}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <h3 className="text-base sm:text-lg font-semibold text-white">
            {name}
          </h3>
          <span className="text-xs sm:text-sm font-medium text-white ms-2 font-mono">
            ${price}
          </span>
        </div>
      </div>

      {/* Preview link with ripple effect */}
      <Link
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-0 cursor-pointer flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50 z-30"
        onClick={handleRipple}
      >
        <span className="px-4 py-2 bg-primary text-white text-xs sm:text-sm font-medium rounded shadow">
          {labels.preview}
        </span>
        {rippleEffect.active && (
          <span
            className="absolute rounded-full bg-white/10 w-25 h-25 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{
              left: rippleEffect.x,
              top: rippleEffect.y,
              animation: "ripple 0.5s linear",
            }}
          />
        )}
        <style jsx>{`
          @keyframes ripple {
            to {
              transform: scale(6);
              opacity: 0;
            }
          }
        `}</style>
      </Link>
    </motion.div>
  );
}
