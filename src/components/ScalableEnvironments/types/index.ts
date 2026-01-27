export interface ChartDataPoint {
    name: string;
    cpu: number;
    memory: number;
    servers: number;
}

export interface Scenario {
    name: string;
    data: ChartDataPoint[];
    message: string;
    serverCount: number;
}

export interface ScalableLabels {
    resourceUsage: string;
    activeServers: string;
    footerLeft: string;
    footerRight: string;
    loading: string;
}
