"use client";

import { useRef } from "react";
import { FileSystemItem, FileTreeLabels } from "../types";
import { FileTreeItem } from "./FileTreeItem";

interface FileTreeContentProps {
  fileSystem: FileSystemItem[];
  labels: FileTreeLabels;
}

export function FileTreeContent({ fileSystem, labels }: FileTreeContentProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div
        dir="ltr"
        className="flex-1 bg-(--surface-primary)/90 rounded-lg border border-(--border-primary) flex flex-col max-h-45 sm:max-h-62.5 h-45 sm:h-62.5 overflow-hidden"
      >
        {/* Sticky header */}
        <div className="sticky top-0 z-10 p-1.5 sm:p-2 bg-(--surface-tertiary)/95 border-b border-(--border-primary)/40">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="flex gap-1 mr-2 sm:gap-1.5 sm:mr-3">
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-(--status-error-text)"></div>
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-(--status-warning-dot)"></div>
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-(--status-success-text)"></div>
              </div>
              <span className="text-[11px] sm:text-xs text-(--text-muted)">
                Explorer
              </span>
            </div>
            <div className="flex text-[11px] sm:text-xs text-(--text-muted)">
              <span>my-project</span>
            </div>
          </div>
        </div>

        {/* Scrollable content area */}
        <div
          ref={scrollContainerRef}
          className="flex-1 bg-(--surface-secondary) p-1.5 min-h-40 sm:p-2 pt-0 overflow-y-auto custom-scrollbar"
        >
          {fileSystem.map((item, index) => (
            <FileTreeItem key={`${item.name}-${index}`} item={item} />
          ))}
        </div>
      </div>

      <div className="mt-1 sm:mt-2 text-[9px] sm:text-[10px] text-(--text-muted) flex items-center justify-between">
        <span>{labels.footerLeft}</span>
        <span className="text-(--text-muted)">{labels.footerRight}</span>
      </div>

      {/* Custom scrollbar styles */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(229, 231, 235, 0.2);
          border-radius: 10px;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(31, 31, 31, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(156, 163, 175, 0.4);
          border-radius: 10px;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(100, 100, 100, 0.4);
          border-radius: 10px;
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(156, 163, 175, 0.4) rgba(229, 231, 235, 0.2);
        }
        .dark .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(100, 100, 100, 0.4) rgba(31, 31, 31, 0.2);
        }
      `}</style>
    </>
  );
}
