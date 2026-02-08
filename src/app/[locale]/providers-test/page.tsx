import { Suspense } from "react";
import ProvidersTestClient from "@/features/providers-test/ProvidersTestClient";

export const dynamic = "force-dynamic"; // important: nu încerca SSG pentru pagina asta

export default function ProvidersTestPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-6xl px-4 py-8 text-sm opacity-70">Loading…</div>}>
      <ProvidersTestClient />
    </Suspense>
  );
}