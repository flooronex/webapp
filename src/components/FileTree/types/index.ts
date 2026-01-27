export interface FileSystemItem {
    name: string;
    type: "file" | "folder";
    children?: FileSystemItem[];
    language?: string;
    open?: boolean;
}

export interface FileTreeItemProps {
    item: FileSystemItem;
    depth?: number;
}

export interface FileTreeLabels {
    explorer: string;
    projectName: string;
    footerLeft: string;
    footerRight: string;
}
