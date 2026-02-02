import type { Metadata } from "next";
import { Suspense } from "react";
import LoginClient from "./LoginClient";

export const metadata: Metadata = {
  title: "Early Access | FloorOneX",
  description:
    "Request early access to FloorOneX. Join the waitlist for homeowners and flooring professionals across the UK.",
};

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-slate-500">Loading…</div>}>
      <LoginClient />
    </Suspense>
  );
}
