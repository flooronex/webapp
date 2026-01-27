import { ReactNode } from "react";
import { Route } from "../../../types";

export interface SidebarItem {
    type: "item";
    icon: ReactNode;
    route: Route;
    badge?: string;
}

export interface SidebarSection {
    type: "section";
    sectionKey: "main" | "management" | "resources";
}

export type NavElement = SidebarItem | SidebarSection;