export type DeploymentStage = "preparing" | "building" | "deploying" | "success" | "reset";

export interface PipelineStage {
    id: DeploymentStage;
    name: string;
    duration: number;
}

export interface TerminalMessage {
    command: string;
    outputs: string[];
}

export interface TerminalMessages {
    preparing: TerminalMessage;
    building: TerminalMessage;
    deploying: TerminalMessage;
    success: TerminalMessage;
    reset: TerminalMessage;
}

export interface SuccessInfo {
    deploymentComplete: string;
    urlLabel: string;
    sampleUrl: string;
}

export interface TerminalProps {
    stage: DeploymentStage;
    deploymentCount: number;
    messages: TerminalMessages;
    successInfo: SuccessInfo;
}

export interface DeploymentProgressProps {
    stage: DeploymentStage;
    stages: PipelineStage[];
}

export interface SuccessEffectsProps {
    showSuccessEffects: boolean;
}
