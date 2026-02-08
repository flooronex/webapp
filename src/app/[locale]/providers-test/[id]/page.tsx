"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import supabase from "@/lib/supabase/client";

type Company = {
  id: string;
  display_name: string | null;
  name: string | null;
  city: string | null;
  postcode: string | null;
  cover_url: string | null;
  logo_url: string | null;
};

const FALLBACK_COVER =
  "https://gcoxlhjaijczrxnmynfr.supabase.co/storage/v1/object/public/comps_test_covers/covers/laminate-wood-floor.jpg";

export default function ProviderCompanyPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;

  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function run() {
      if (!id) return;

      setLoading(true);
      setErr(null);

      const { data, error } = await supabase
        .from("companies_test")
        .select("id, display_name, name, city, postcode, cover_url, logo_url")
        .eq("id", id)
        .single();

      if (!mounted) return;

      if (error) {
        setErr(error.message);
        setCompany(null);
      } else {
        setCompany((data ?? null) as Company | null);
      }

      setLoading(false);
    }

    void run();
    return () => {
      mounted = false;
    };
  }, [id]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="flex items-center justify-between gap-3">
        <Link
          href="../"
          className="rounded-lg border px-3 py-2 text-sm font-medium hover:opacity-80 transition"
        >
          ← Back
        </Link>

        <div className="text-sm opacity-70">Company ID: {id}</div>
      </div>

      {loading ? (
        <div className="mt-6 rounded-2xl border p-6">Loading…</div>
      ) : err ? (
        <div className="mt-6 rounded-2xl border p-6">
          <div className="font-medium">Could not load company</div>
          <div className="mt-1 text-sm opacity-80">{err}</div>
        </div>
      ) : !company ? (
        <div className="mt-6 rounded-2xl border p-6">Not found.</div>
      ) : (
        <div className="mt-6 overflow-hidden rounded-2xl border bg-white/60 dark:bg-white/5">
          <div className="relative aspect-[16/9] w-full">
            <Image
              src={company.cover_url || FALLBACK_COVER}
              alt={company.display_name || company.name || "Company"}
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>

          <div className="p-5">
            <div className="flex items-center gap-4">
              <div className="relative h-14 w-14 overflow-hidden rounded-2xl border bg-white/80 dark:bg-white/10">
                {company.logo_url ? (
                  <Image src={company.logo_url} alt="Logo" fill className="object-contain p-2" sizes="56px" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-xs opacity-60">FX</div>
                )}
              </div>

              <div className="min-w-0">
                <div className="text-xl font-semibold truncate">
                  {company.display_name || company.name || "Company"}
                </div>
                <div className="text-sm opacity-75">
                  {[company.city, company.postcode].filter(Boolean).join(" • ") || "—"}
                </div>
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border p-4">
                <div className="text-xs opacity-70">Legal name</div>
                <div className="mt-1 text-sm font-medium">{company.name || "—"}</div>
              </div>

              <div className="rounded-xl border p-4">
                <div className="text-xs opacity-70">Display name</div>
                <div className="mt-1 text-sm font-medium">{company.display_name || "—"}</div>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <Link
                href="/request-a-quote"
                className="rounded-lg border px-4 py-2 text-sm font-medium hover:opacity-80 transition"
              >
                Request a Quote
              </Link>

              <Link
                href="../"
                className="rounded-lg border px-4 py-2 text-sm font-medium hover:opacity-80 transition"
              >
                Back to list
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}