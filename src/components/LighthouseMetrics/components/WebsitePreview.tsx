"use client";

import Image from "next/image";

interface WebsitePreviewProps {
  isVisible: boolean;
}

export function WebsitePreview({ isVisible }: WebsitePreviewProps) {
  return (
    <div className="w-full md:w-[65%] h-40 sm:h-55 md:h-auto relative rounded-md overflow-hidden border border-(--border-primary)">
      <div className="absolute inset-0 z-10 flex items-start justify-start">
        {isVisible && (
          <Image
            src="/image.png"
            alt="Website Screenshot"
            fill
            className="object-cover object-top-left"
            style={{ objectPosition: "top left" }}
            priority
          />
        )}
      </div>
      <div
        className={`absolute inset-0 bg-linear-to-br from-(--surface-tertiary) to-(--surface-secondary) transition-opacity duration-1000 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      ></div>
    </div>
  );
}
