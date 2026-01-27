import {
  IconGauge,
  IconBuildingStore,
  IconDeviceMobile,
  IconRocket,
} from "@tabler/icons-react";
import { Benefit } from "../types";

export const getBenefitsData = (t: (key: string) => string): Benefit[] => [
  {
    id: "benefit-1",
    key: "lightningFast",
    icon: <IconGauge className="w-10 h-10" />,
    title: t("items.lightningFast.title"),
    description: t("items.lightningFast.description"),
    percentage: 100,
  },
  {
    id: "benefit-2",
    key: "modular",
    icon: <IconBuildingStore className="w-10 h-10" />,
    title: t("items.modular.title"),
    description: t("items.modular.description"),
    percentage: 100,
  },
  {
    id: "benefit-3",
    key: "responsive",
    icon: <IconDeviceMobile className="w-10 h-10" />,
    title: t("items.responsive.title"),
    description: t("items.responsive.description"),
    percentage: 100,
  },
  {
    id: "benefit-4",
    key: "performance",
    icon: <IconRocket className="w-10 h-10" />,
    title: t("items.performance.title"),
    description: t("items.performance.description"),
    percentage: 100,
  },
];
