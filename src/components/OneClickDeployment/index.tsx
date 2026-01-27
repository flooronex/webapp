"use client";

import { useTranslations } from "next-intl";
import { useVisibility, useDeployment } from "./hooks";
import {
  getPipelineStages,
  getTerminalMessages,
  getSuccessInfo,
} from "./config";
import Terminal from "./components/Terminal";
import DeploymentProgress from "./components/DeploymentProgress";
import SuccessEffects from "./components/SuccessEffects";

export function OneClickDeployment() {
  const t = useTranslations("home.features.oneClickDeployment");

  // Get translated config data
  const stages = getPipelineStages(t);
  const messages = getTerminalMessages(t);
  const successInfo = getSuccessInfo(t);

  // Use custom hooks
  const [containerRef, isVisible] = useVisibility<HTMLDivElement>();
  const { stage, showSuccessEffects, deploymentCount } = useDeployment({
    isVisible,
    stages,
  });

  return (
    <div ref={containerRef} className="flex flex-col h-full overflow-hidden">
      <Terminal
        stage={stage}
        deploymentCount={deploymentCount}
        messages={messages}
        successInfo={successInfo}
      />

      {/* Deployment progress visualization */}
      <div className="flex-1 flex flex-col pt-2 sm:pt-4">
        <DeploymentProgress stage={stage} stages={stages} />
      </div>

      <SuccessEffects showSuccessEffects={showSuccessEffects} />
    </div>
  );
}
