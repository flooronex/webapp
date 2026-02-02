import type { Metadata } from "next";
import { Suspense } from "react";
import EarlyAccessClient from "./EarlyAccessClient";

export const metadata: Metadata = {
  title: "Early Access | FloorOneX",
  description:
    "FloorOneX is currently in development. Request early access to be among the first to try the platform when it launches.",
};

export default function EarlyAccessPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-slate-500">Loading…</div>}>
      <EarlyAccessClient />
    </Suspense>
  );
}