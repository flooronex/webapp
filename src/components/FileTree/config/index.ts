import { FileSystemItem, FileTreeLabels } from "../types";

type TranslationFunction = (key: string) => string;

export const getFileSystem = (): FileSystemItem[] => [
    {
        name: "src",
        type: "folder",
        open: true,
        children: [
            {
                name: "components",
                type: "folder",
                open: true,
                children: [
                    {
                        name: "common",
                        type: "folder",
                        children: [
                            { name: "Button.tsx", type: "file", language: "tsx" },
                            { name: "Card.tsx", type: "file", language: "tsx" },
                        ],
                    },

                    {
                        name: "pages",
                        type: "folder",
                        children: [
                            { name: "Home.tsx", type: "file", language: "tsx" },
                            { name: "About.tsx", type: "file", language: "tsx" },
                        ],
                    },
                ],
            },
            {
                name: "lib",
                type: "folder",
                children: [
                    { name: "utils.ts", type: "file", language: "ts" },
                ],
            },
            {
                name: "app",
                type: "folder",
                open: true,
                children: [
                    { name: "layout.tsx", type: "file", language: "tsx" },
                    { name: "page.tsx", type: "file", language: "tsx" },
                    {
                        name: "about",
                        type: "folder",
                        children: [{ name: "page.tsx", type: "file", language: "tsx" }],
                    },
                ],
            },
        ],
    },
];

export const getLabels = (t: TranslationFunction): FileTreeLabels => ({
    explorer: t("explorer"),
    projectName: t("projectName"),
    footerLeft: t("footerLeft"),
    footerRight: t("footerRight"),
});
