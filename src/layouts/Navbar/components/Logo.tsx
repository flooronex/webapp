"use client";

import type { ReactNode } from "react";
import { Link } from "@/i18n/navigation";

interface LogoProps {
  icon: ReactNode;
  text: string;
}

export function Logo({ icon, text }: LogoProps) {
  return (
    <div className="min-w-[30%]">
      <Link href="/" className="flex items-center gap-1.5 w-max">
        {icon}
        <div className="text-lg font-bold">{text}</div>
      </Link>
    </div>
  );
}
