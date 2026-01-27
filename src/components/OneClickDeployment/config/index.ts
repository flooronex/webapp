import { PipelineStage, TerminalMessages, SuccessInfo } from "../types";

type TranslationFunction = (key: string) => string;

export const getPipelineStages = (t: TranslationFunction): PipelineStage[] => [
    { id: "preparing", name: t("stages.preparing"), duration: 3000 },
    { id: "building", name: t("stages.building"), duration: 3000 },
    { id: "deploying", name: t("stages.deploying"), duration: 3000 },
    { id: "success", name: t("stages.success"), duration: 4000 }
];

export const getTerminalMessages = (t: TranslationFunction): TerminalMessages => ({
    preparing: {
        command: t("terminal.commands.preparing"),
        outputs: [
            t("terminal.outputs.checkingDependencies"),
            t("terminal.outputs.initializingEnvironment")
        ]
    },
    building: {
        command: t("terminal.commands.building"),
        outputs: [
            t("terminal.outputs.bundlingAssets"),
            t("terminal.outputs.optimizingCode")
        ]
    },
    deploying: {
        command: t("terminal.commands.deploying"),
        outputs: [
            t("terminal.outputs.uploadingToCdn"),
            t("terminal.outputs.settingUpRouting")
        ]
    },
    success: {
        command: t("terminal.commands.success"),
        outputs: []
    },
    reset: {
        command: t("terminal.commands.reset"),
        outputs: []
    }
});

export const getSuccessInfo = (t: TranslationFunction): SuccessInfo => ({
    deploymentComplete: t("terminal.success.deploymentComplete"),
    urlLabel: t("terminal.success.urlLabel"),
    sampleUrl: "https://example.com"
});

// Utility functions
export const isStageComplete = (
    currentStage: string,
    stageId: string,
    stages: PipelineStage[]
): boolean => {
    const stageIndex = stages.findIndex(s => s.id === stageId);
    const currentIndex = stages.findIndex(s => s.id === currentStage);
    return currentIndex > stageIndex || currentStage === "success";
};

export const isStageActive = (currentStage: string, stageId: string): boolean =>
    currentStage === stageId;
