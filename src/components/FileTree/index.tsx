"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { getFileSystem, getLabels } from "./config";
import { FileTreeContent } from "./components";

export function FileTree() {
  const t = useTranslations("home.features.fileStructure");
  const [fileSystem] = useState(getFileSystem);
  const labels = getLabels(t);

  return (
    <div className="flex flex-col h-full">
      <FileTreeContent fileSystem={fileSystem} labels={labels} />
    </div>
  );
}
