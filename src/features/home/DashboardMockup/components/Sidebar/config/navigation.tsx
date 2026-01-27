import {
  IconLayoutDashboard,
  IconBox,
  IconTerminal2,
  IconBell,
  IconUsers,
  IconSettings,
  IconFileText,
  IconLifebuoy,
  IconGitBranch,
} from "@tabler/icons-react";
import { NavElement } from "../types";

export const navElements: NavElement[] = [
  { type: "section", sectionKey: "main" },
  {
    type: "item",
    icon: <IconLayoutDashboard size={20} />,
    route: "overview",
  },
  {
    type: "item",
    icon: <IconBox size={20} />,
    route: "projects",
    badge: "12",
  },
  {
    type: "item",
    icon: <IconTerminal2 size={20} />,
    route: "deployments",
    badge: "3",
  },
  { type: "section", sectionKey: "management" },
  {
    type: "item",
    icon: <IconBell size={20} />,
    route: "notifications",
    badge: "9",
  },
  {
    type: "item",
    icon: <IconUsers size={20} />,
    route: "team",
  },
  {
    type: "item",
    icon: <IconSettings size={20} />,
    route: "settings",
  },
  { type: "section", sectionKey: "resources" },
  {
    type: "item",
    icon: <IconFileText size={20} />,
    route: "documentation",
  },
  {
    type: "item",
    icon: <IconLifebuoy size={20} />,
    route: "support",
  },
  {
    type: "item",
    icon: <IconGitBranch size={20} />,
    route: "changelog",
  },
];
