import { ChartDataPoint, Scenario, ScalableLabels } from "../types";

type TranslationFunction = (key: string) => string;

const generateInitialData = (): ChartDataPoint[] => [
    { name: "00:00", cpu: 15, memory: 20, servers: 1 },
    { name: "04:00", cpu: 20, memory: 30, servers: 1 },
    { name: "08:00", cpu: 30, memory: 35, servers: 1 },
    { name: "12:00", cpu: 40, memory: 45, servers: 2 },
    { name: "16:00", cpu: 35, memory: 40, servers: 2 },
    { name: "20:00", cpu: 25, memory: 30, servers: 1 },
    { name: "24:00", cpu: 15, memory: 25, servers: 1 },
];

export const getScenarios = (): Scenario[] => [
    {
        name: "Normal Traffic",
        data: generateInitialData(),
        message: "Systems Normal",
        serverCount: 2,
    },
    {
        name: "Traffic Spike",
        data: [
            { name: "00:00", cpu: 15, memory: 20, servers: 1 },
            { name: "04:00", cpu: 20, memory: 30, servers: 1 },
            { name: "08:00", cpu: 45, memory: 50, servers: 2 },
            { name: "12:00", cpu: 75, memory: 80, servers: 4 },
            { name: "16:00", cpu: 90, memory: 85, servers: 5 },
            { name: "20:00", cpu: 60, memory: 70, servers: 3 },
            { name: "24:00", cpu: 30, memory: 40, servers: 2 },
        ],
        message: "Auto-scaling Activated",
        serverCount: 5,
    },
    {
        name: "Scheduled Scale",
        data: [
            { name: "00:00", cpu: 20, memory: 25, servers: 1 },
            { name: "04:00", cpu: 25, memory: 30, servers: 1 },
            { name: "08:00", cpu: 60, memory: 55, servers: 3 },
            { name: "12:00", cpu: 65, memory: 60, servers: 3 },
            { name: "16:00", cpu: 70, memory: 65, servers: 3 },
            { name: "20:00", cpu: 40, memory: 45, servers: 2 },
            { name: "24:00", cpu: 20, memory: 30, servers: 1 },
        ],
        message: "Scheduled Scaling Active",
        serverCount: 3,
    },
];

export const getLabels = (t: TranslationFunction): ScalableLabels => ({
    resourceUsage: t("resourceUsage"),
    activeServers: t("activeServers"),
    footerLeft: t("footerLeft"),
    footerRight: t("footerRight"),
    loading: t("loading"),
});
