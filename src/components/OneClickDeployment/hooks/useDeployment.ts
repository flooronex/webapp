import { useState, useEffect, useRef } from "react";
import { DeploymentStage, PipelineStage } from "../types";

interface UseDeploymentProps {
    isVisible: boolean;
    stages: PipelineStage[];
}

interface UseDeploymentReturn {
    stage: DeploymentStage;
    showSuccessEffects: boolean;
    deploymentCount: number;
}

export function useDeployment({ isVisible, stages }: UseDeploymentProps): UseDeploymentReturn {
    const [stage, setStage] = useState<DeploymentStage>("preparing");
    const [showSuccessEffects, setShowSuccessEffects] = useState(false);
    const [deploymentCount, setDeploymentCount] = useState(0);
    const autoAnimationRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (isVisible) {
            runDeploymentDemo();
        }

        return () => {
            if (autoAnimationRef.current) {
                clearTimeout(autoAnimationRef.current);
            }
        };
    }, [isVisible, deploymentCount]);

    const runDeploymentDemo = () => {
        setStage("preparing");
        setShowSuccessEffects(false);

        let cumulativeTime = 0;

        stages.forEach((stageConfig) => {
            autoAnimationRef.current = setTimeout(() => {
                setStage(stageConfig.id);

                if (stageConfig.id === "success") {
                    setShowSuccessEffects(true);

                    autoAnimationRef.current = setTimeout(() => {
                        setStage("reset");

                        autoAnimationRef.current = setTimeout(() => {
                            setDeploymentCount((prev) => prev + 1);
                        }, 50);
                    }, stageConfig.duration);
                }
            }, cumulativeTime);

            cumulativeTime += stageConfig.duration;
        });
    };

    return { stage, showSuccessEffects, deploymentCount };
}
