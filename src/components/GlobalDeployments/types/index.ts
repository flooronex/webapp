export interface RegionData {
    name: string;
    location: [number, number];
    uptime: string;
    latency: string;
    deployments: number;
    status: "active" | "maintenance" | "issue";
    size: number;
}

export interface GlobalStats {
    totalDeployments: number;
    averageUptime: string;
    activeRegions: number;
}

export interface GlobalDeploymentsLabels {
    liveStatus: string;
    deployments: string;
    uptime: string;
    regions: string;
    footerLeft: string;
    footerRight: string;
}

export interface GlobeConfig {
    width: number;
    height: number;
    devicePixelRatio: number;
    phi: number;
    theta: number;
    dark: number;
    diffuse: number;
    mapSamples: number;
    mapBrightness: number;
    baseColor: [number, number, number];
    markerColor: [number, number, number];
    glowColor: [number, number, number];
    markers: { location: [number, number]; size: number }[];
    onRender: () => void;
}
