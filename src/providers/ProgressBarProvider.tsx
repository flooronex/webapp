"use client";

import { ProgressProvider } from "@bprogress/next/app";

interface ProgressBarProviderProps {
  children: React.ReactNode;
}

export function ProgressBarProvider({ children }: ProgressBarProviderProps) {
  return (
    <ProgressProvider
      height="2px"
      color="var(--foreground)"
      options={{ showSpinner: false }}
      shallowRouting
    >
      {children}
    </ProgressProvider>
  );
}
