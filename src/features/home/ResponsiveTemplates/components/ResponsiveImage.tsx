"use client";

import Image from "next/image";

export function ResponsiveImage() {
  return (
    <div className="w-full md:w-1/2 max-w-md mx-auto">
      <Image
        src="/assets/images/responsive.webp"
        alt="Responsive design illustration"
        className="w-full h-auto object-contain"
        width={500}
        height={350}
        priority={false}
        loading="lazy"
        fetchPriority="low"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </div>
  );
}
