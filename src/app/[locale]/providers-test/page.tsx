import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";

type Company = {
  id: string;
  display_name: string | null;
  name: string | null;
  city: string | null;
  postcode: string | null;
  cover_url: string | null;
  logo_url: string | null;
};

export const dynamic = "force-dynamic"; // ca să nu-ți cache-uiască în build

export default async function ProvidersTestPage() {
  const { data, error } = await supabase
    .from("companies_test")
    .select("id, display_name, name, city, postcode, cover_url, logo_url")
    .eq("active", true)
    .order("created_at", { ascending: false })
    .limit(48);

  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-semibold">Providers</h1>
        <p className="mt-2 text-sm opacity-80">Supabase error: {error.message}</p>
      </div>
    );
  }

  const companies = (data ?? []) as Company[];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="flex items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Browse Providers</h1>
          <p className="mt-1 text-sm opacity-80">
            Showing {companies.length} companies (test dataset)
          </p>
        </div>

        <Link
          href="/request-a-quote"
          className="rounded-lg px-4 py-2 text-sm font-medium border hover:opacity-80 transition"
        >
          Request a Quote
        </Link>
      </div>

      {/* Grid */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {companies.map((c) => {
          const title = c.display_name || c.name || "Company";
          const location = [c.city, c.postcode].filter(Boolean).join(" • ");

          return (
            <Link
              key={c.id}
              href={`/providers-test/${c.id}`}
              className="group overflow-hidden rounded-2xl border bg-white/60 dark:bg-white/5 hover:shadow-lg transition"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                <Image
                  src={
                    c.cover_url ||
                    "https://gcoxlhjaijczrxnmynfr.supabase.co/storage/v1/object/public/comps_test_covers/covers/laminate-wood-floor.jpg"
                  }
                  alt={title}
                  fill
                  className="object-cover group-hover:scale-[1.02] transition"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  priority={false}
                />
              </div>

              <div className="p-4">
                <div className="flex items-center gap-3">
                  {/* Optional logo */}
                  <div className="relative h-10 w-10 overflow-hidden rounded-xl border bg-white/80 dark:bg-white/10">
                    {c.logo_url ? (
                      <Image
                        src={c.logo_url}
                        alt={`${title} logo`}
                        fill
                        className="object-contain p-1"
                        sizes="40px"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-xs opacity-60">
                        FX
                      </div>
                    )}
                  </div>

                  <div className="min-w-0">
                    <div className="truncate font-semibold">{title}</div>
                    <div className="truncate text-sm opacity-75">{location}</div>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between text-sm">
                  <span className="opacity-70">View profile</span>
                  <span className="opacity-70 group-hover:translate-x-0.5 transition">
                    →
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}