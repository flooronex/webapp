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
          <video
            src="/assets/videos/vid1.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover rounded-xl"
          />

          // <Image
          //   src="/assets/images/logo_full.png"
          //   alt="FloorOneX Website"
          //   fill
          //   className="object-cover object-top-left"
          //   style={{ objectPosition: "top left" }}
          //   priority
          // />
        )}
      </div>
      <div
        className={`absolute inset-0 bg-linear-to-br from-(--surface-tertiary) to-(--surface-secondary) transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"
          }`}
      ></div>
    </div>
  );
}
