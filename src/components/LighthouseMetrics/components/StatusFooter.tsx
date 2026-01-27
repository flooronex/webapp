"use client";

interface StatusMessages {
  analyzing: string;
  complete: string;
  metricsTitle: (tab: string) => string;
}

interface StatusFooterProps {
  isVisible: boolean;
  statusMessages: StatusMessages;
}

export function StatusFooter({ isVisible, statusMessages }: StatusFooterProps) {
  return (
    <div className="mt-1 pt-1 flex justify-between items-center text-[9px] sm:text-[10px]">
      <span className="text-(--text-tertiary)">
        {isVisible ? statusMessages.complete : statusMessages.analyzing}
      </span>
      <span className="text-(--text-tertiary) font-medium">
        {isVisible ? new Date().toLocaleDateString() : ""}
      </span>
    </div>
  );
}
