"use client";
import { BackgroundShapes } from "@/components";
import { Content } from "./components";

export default function HomeSection1() {
  return (
    <div className="relative flex flex-col min-h-132.5 sm:min-h-127.5 items-start justify-start pt-4 sm:pt-3 sm:pb-4">
      <BackgroundShapes />
      <Content />
    </div>
  );
}
