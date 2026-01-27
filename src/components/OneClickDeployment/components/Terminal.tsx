import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { TerminalProps } from "../types";

export default function Terminal({
  stage,
  deploymentCount,
  messages,
  successInfo,
}: TerminalProps) {
  const [typingComplete, setTypingComplete] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const [wrappedLines, setWrappedLines] = useState<string[]>([""]);

  const currentMessage = stage !== "reset" ? messages[stage] : messages.reset;
  const commandText = currentMessage.command;

  // Terminal width properties
  const charsPerLine = 45;

  useEffect(() => {
    // For success message, display instantly without typing effect
    if (stage === "success") {
      setTypingComplete(true);
      setWrappedLines([""]);
      return;
    }

    // For other stages, use typing effect
    setTypingComplete(false);
    setWrappedLines([""]);

    let typingTimer: NodeJS.Timeout;
    let currentPosition = 0;

    const typeNextChar = () => {
      if (currentPosition < commandText.length) {
        currentPosition++;
        const newText = commandText.substring(0, currentPosition);
        updateWrappedLines(newText);
        const randomDelay = Math.floor(Math.random() * 30) + 30;
        typingTimer = setTimeout(typeNextChar, randomDelay);
      } else {
        setTypingComplete(true);
      }
    };

    typingTimer = setTimeout(typeNextChar, 300);

    return () => clearTimeout(typingTimer);
  }, [commandText, stage]);

  const updateWrappedLines = (text: string) => {
    const lines: string[] = [];
    let remainingText = text;

    while (remainingText.length > 0) {
      if (remainingText.length <= charsPerLine) {
        lines.push(remainingText);
        break;
      }

      let breakPoint = charsPerLine;
      const lastSpaceIndex = remainingText
        .substring(0, charsPerLine)
        .lastIndexOf(" ");
      if (lastSpaceIndex > 0 && lastSpaceIndex > charsPerLine - 10) {
        breakPoint = lastSpaceIndex + 1;
      }

      lines.push(remainingText.substring(0, breakPoint));
      remainingText = remainingText.substring(breakPoint);
    }

    setWrappedLines(lines);
  };

  const getOutputColor = (stageId: string) => {
    if (stageId === "building") return "text-(--status-warning-text)";
    return "text-(--text-tertiary)";
  };

  return (
    <div
      dir="ltr"
      className="bg-(--surface-secondary) rounded-lg border border-(--border-secondary) overflow-hidden mb-1"
    >
      {/* Terminal header */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-(--surface-secondary) border-b border-(--border-secondary)">
        <div className="flex items-center">
          <div className="flex gap-1.5 me-3">
            <div className="w-2.5 h-2.5 rounded-full bg-(--status-error-text)"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-(--status-warning-dot)"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-(--text-muted)"></div>
          </div>
          <div className="text-xs text-(--text-tertiary)">terminal</div>
        </div>
      </div>
      {/* Terminal content */}
      <div
        ref={terminalRef}
        className="p-3 h-28 font-mono text-xs relative overflow-hidden bg-(--surface-secondary) text-(--text-primary)"
      >
        {stage !== "success" ? (
          <div>
            <div className="flex">
              <span className="text-(--text-tertiary) mr-1.5">&gt;</span>
              <span className="whitespace-pre-wrap">
                {wrappedLines[0]}
                {!typingComplete && wrappedLines.length === 1 && (
                  <motion.span
                    className="inline-block w-1.5 h-3.5 bg-(--text-primary) ml-0.5 align-middle"
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                  />
                )}
              </span>
            </div>

            {wrappedLines.slice(1).map((line, index) => (
              <div key={index} className="ml-4">
                <span>{line}</span>
                {!typingComplete && index === wrappedLines.length - 2 && (
                  <motion.span
                    className="inline-block w-1.5 h-3.5 bg-(--text-primary) ml-0.5 align-middle"
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                  />
                )}
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-(--text-tertiary)">
              {messages.success.command}
            </div>
          </motion.div>
        )}

        {/* Command outputs - shown after typing is complete */}
        {typingComplete &&
          stage !== "success" &&
          stage !== "reset" &&
          currentMessage.outputs.length > 0 && (
            <motion.div
              className="mt-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {currentMessage.outputs.map((output: string, index: number) => (
                <div key={index} className={getOutputColor(stage)}>
                  {stage === "preparing" ? output : `→ ${output}`}
                </div>
              ))}
            </motion.div>
          )}

        {/* Success message and status */}
        {stage === "success" && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-2 text-(--text-secondary)"
          >
            <div className="flex items-center">
              <div className="mr-2 text-(--text-primary)">✓</div>
              <span>
                {successInfo.deploymentComplete} #00{deploymentCount + 1}
              </span>
            </div>
            <div className="flex items-center mt-1">
              <div className="mr-2 text-(--text-primary)">ℹ</div>
              <span>
                {successInfo.urlLabel}:{" "}
                <span className="text-(--text-tertiary) underline">
                  {successInfo.sampleUrl}
                </span>
              </span>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
