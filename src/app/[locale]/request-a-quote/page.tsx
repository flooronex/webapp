import type { Metadata } from "next";
import { Suspense } from "react";
import RequestAQuoteClient from "./RequestAQuoteClient";

export const metadata: Metadata = {
  title: "Request a Quote | FloorOneX",
  description:
    "Request a flooring quote. Share project details and receive offers from professionals.",
};

export default function RequestAQuotePage() {
  return (
    <Suspense fallback={<RequestAQuoteSkeleton />}>
      <RequestAQuoteClient />
    </Suspense>
  );
}

function RequestAQuoteSkeleton() {
  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <div className="h-7 w-48 rounded bg-slate-200 dark:bg-slate-800" />
        <div className="mt-4 h-4 w-96 max-w-full rounded bg-slate-200 dark:bg-slate-800" />
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="h-11 rounded-xl bg-slate-200 dark:bg-slate-800" />
          <div className="h-11 rounded-xl bg-slate-200 dark:bg-slate-800" />
          <div className="h-11 rounded-xl bg-slate-200 dark:bg-slate-800" />
          <div className="h-11 rounded-xl bg-slate-200 dark:bg-slate-800" />
        </div>
        <div className="mt-6 h-28 rounded-2xl bg-slate-200 dark:bg-slate-800" />
        <div className="mt-6 h-11 w-40 rounded-xl bg-slate-200 dark:bg-slate-800" />
      </div>
    </main>
  );
}
