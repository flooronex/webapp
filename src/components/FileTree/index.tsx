"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { getFileSystem, getLabels } from "./config";
import { FileTreeContent } from "./components";
import Image from "next/image";

export function FileTree() {
  const t = useTranslations("home.features.fileStructure");
  const [fileSystem] = useState(getFileSystem);
  const labels = getLabels(t);

  return (
    <div className="flex flex-col h-full">
      {/* AICI PUNEM IMAGINEA APLICATIE*/}
      {/* <FileTreeContent fileSystem={fileSystem} labels={labels} /> */}
      <div className="relative w-full h-80 sm:h-80 md:h-80 rounded-2xl overflow-hidden">
        <Image
          src="/assets/images/app_show.png"
          alt="FloorOneX service"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}
