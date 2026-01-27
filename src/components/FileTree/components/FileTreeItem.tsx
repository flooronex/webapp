"use client";

import { FileSystemItem } from "../types";
import { FileIcon } from "./FileIcon";
import { FolderIcon } from "./FolderIcon";

interface FileTreeItemProps {
  item: FileSystemItem;
  depth?: number;
}

export function FileTreeItem({ item, depth = 0 }: FileTreeItemProps) {
  return (
    <div className="select-none">
      <div
        className={`flex items-center py-0.5 px-1 rounded-sm ${
          item.type === "folder" ? "" : "cursor-default"
        }`}
        style={{ paddingLeft: `${depth * 10}px` }}
      >
        <div className="w-4 h-4 flex items-center justify-center mr-1">
          {item.type === "folder" ? (
            <FolderIcon isOpen={!!item.open} />
          ) : (
            <FileIcon language={item.language} />
          )}
        </div>
        <span
          className={`text-xs ${
            item.type === "folder"
              ? "font-medium text-(--text-secondary)"
              : "text-(--text-tertiary)"
          }`}
        >
          {item.name}
        </span>
      </div>

      {item.type === "folder" && item.open && item.children && (
        <div className="transition-all duration-200 ease-in-out">
          {item.children.map((child, index) => (
            <FileTreeItem
              key={`${child.name}-${index}`}
              item={child}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}
