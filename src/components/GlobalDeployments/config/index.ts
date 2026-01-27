import { RegionData, GlobalStats, GlobalDeploymentsLabels, GlobeConfig } from "../types";

type TranslationFunction = (key: string) => string;

export const getRegions = (): RegionData[] => [
    {
        name: "Manila",
        location: [14.5995, 120.9842],
        uptime: "99.9%",
        latency: "44ms",
        deployments: 23,
        status: "active",
        size: 0.03,
    },
    {
        name: "Mumbai",
        location: [19.076, 72.8777],
        uptime: "99.8%",
        latency: "51ms",
        deployments: 157,
        status: "active",
        size: 0.1,
    },
    {
        name: "Dhaka",
        location: [23.8103, 90.4125],
        uptime: "99.7%",
        latency: "73ms",
        deployments: 42,
        status: "active",
        size: 0.05,
    },
    {
        name: "Cairo",
        location: [30.0444, 31.2357],
        uptime: "99.5%",
        latency: "88ms",
        deployments: 67,
        status: "maintenance",
        size: 0.07,
    },
    {
        name: "Beijing",
        location: [39.9042, 116.4074],
        uptime: "99.9%",
        latency: "63ms",
        deployments: 184,
        status: "active",
        size: 0.08,
    },
    {
        name: "São Paulo",
        location: [-23.5505, -46.6333],
        uptime: "99.6%",
        latency: "110ms",
        deployments: 95,
        status: "active",
        size: 0.1,
    },
    {
        name: "Mexico City",
        location: [19.4326, -99.1332],
        uptime: "99.7%",
        latency: "67ms",
        deployments: 78,
        status: "active",
        size: 0.1,
    },
    {
        name: "New York",
        location: [40.7128, -74.006],
        uptime: "99.99%",
        latency: "24ms",
        deployments: 231,
        status: "active",
        size: 0.1,
    },
    {
        name: "Tokyo",
        location: [34.6937, 135.5022],
        uptime: "99.95%",
        latency: "48ms",
        deployments: 156,
        status: "issue",
        size: 0.05,
    },
    {
        name: "Istanbul",
        location: [41.0082, 28.9784],
        uptime: "99.6%",
        latency: "92ms",
        deployments: 61,
        status: "active",
        size: 0.06,
    },
];

export const getGlobalStats = (regions: RegionData[]): GlobalStats => {
    const totalDeployments = regions.reduce(
        (sum, region) => sum + region.deployments,
        0
    );
    const activeRegions = regions.filter((r) => r.status === "active").length;

    return {
        totalDeployments,
        averageUptime: "99.8%",
        activeRegions,
    };
};

export const getLabels = (t: TranslationFunction): GlobalDeploymentsLabels => ({
    liveStatus: t("liveStatus"),
    deployments: t("deployments"),
    uptime: t("uptime"),
    regions: t("regions"),
    footerLeft: t("footerLeft"),
    footerRight: t("footerRight"),
});

export const getGlobeConfig = (
    theme: string,
    regions: RegionData[]
): GlobeConfig => ({
    width: 320,
    height: 320,
    devicePixelRatio: 2,
    phi: 0,
    theta: 0.3,
    dark: theme === "dark" ? 0.9 : 0,
    diffuse: theme === "dark" ? 0.2 : 1.2,
    mapSamples: 16000,
    mapBrightness: theme === "dark" ? 2 : 6,
    baseColor:
        theme === "dark"
            ? [0.5, 0.5, 0.5] as [number, number, number]
            : [1, 1, 1] as [number, number, number],
    markerColor: [0.1, 0.5, 1] as [number, number, number],
    glowColor:
        theme === "dark"
            ? [0.11, 0.11, 0.11] as [number, number, number]
            : [1, 1, 1] as [number, number, number],
    markers: regions.map((region) => ({
        location: region.location,
        size: region.size,
    })),
    onRender: () => { },
});
