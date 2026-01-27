import {
  IconServer,
  IconCheck,
  IconX,
  IconClock,
  IconTrendingUp,
} from "@tabler/icons-react";
import { Kpi } from "../types";

export const kpiData: Kpi[] = [
  {
    id: "kpi-1",
    key: "totalDeployments",
    title: "Total Deployments",
    value: "6",
    icon: <IconServer size={16} />,
    trend: "+2",
    trendDirection: "up",
  },
  {
    id: "kpi-2",
    key: "successfulDeployments",
    title: "Successful Deployments",
    value: "3",
    icon: <IconCheck size={16} />,
    trend: "+1",
    trendDirection: "up",
  },
  {
    id: "kpi-3",
    key: "failedDeployments",
    title: "Failed Deployments",
    value: "1",
    icon: <IconX size={16} />,
    trend: "-2",
    trendDirection: "down",
  },
  {
    id: "kpi-4",
    key: "averageDeployTime",
    title: "Average Deploy Time",
    value: "5m 32s",
    icon: <IconClock size={16} />,
    trend: "0%",
    trendDirection: "up",
  },
  {
    id: "kpi-5",
    key: "uptime",
    title: "Uptime",
    value: "99.9%",
    icon: <IconTrendingUp size={16} />,
    trend: "+0.2%",
    trendDirection: "up",
  },
];
