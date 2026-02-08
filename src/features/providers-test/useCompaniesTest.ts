"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import supabase from "@/lib/supabase/client";

export type Company = {
  id: string;
  display_name: string | null;
  name: string | null;
  city: string | null;
  postcode: string | null;
  cover_url: string | null;
  logo_url: string | null;
};

type SortKey = "newest" | "oldest" | "name";

const TEST_OWNER_ID = "00000000-0000-0000-0000-000000000001";

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function safeUrl(input: string) {
  const v = input.trim();
  if (!v) return "";
  try {
    const u = new URL(v);
    return u.toString();
  } catch {
    return "";
  }
}

async function uploadCoverToSupabase(file: File, companySlug: string) {
  const ext = file.name.split(".").pop() || "jpg";
  const path = `covers/${companySlug}-${Date.now()}.${ext}`;

  const { error } = await supabase.storage
    .from("comps_test_covers")
    .upload(path, file, {
      upsert: false,
      contentType: file.type || "image/jpeg",
    });

  if (error) throw error;

  const { data } = supabase.storage.from("comps_test_covers").getPublicUrl(path);
  return data.publicUrl;
}

export function useCompaniesTest(params: {
  q: string;
  city: string;
  sort: SortKey;
  pageSize: number;
}) {
  const { q, city, sort, pageSize } = params;

  const [companies, setCompanies] = useState<Company[]>([]);
  const [totalCount, setTotalCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const requestIdRef = useRef(0);

  const fetchCompanies = useCallback(
    async (opts: { reset: boolean }) => {
      const myRequestId = ++requestIdRef.current;

      if (opts.reset) {
        setLoading(true);
        setError(null);
        setHasMore(true);
        setTotalCount(null);
      } else {
        setLoadingMore(true);
        setError(null);
      }

      const offset = opts.reset ? 0 : companies.length;

      try {
        let query = supabase
          .from("companies_test")
          .select(
            "id, display_name, name, city, postcode, cover_url, logo_url",
            opts.reset ? { count: "exact" } : undefined
          )
          .eq("active", true);

        if (q.length > 0) {
          const safe = q.replace(/[%_]/g, "\\$&");
          query = query.or(
            `display_name.ilike.%${safe}%,name.ilike.%${safe}%,city.ilike.%${safe}%,postcode.ilike.%${safe}%`
          );
        }

        if (city.length > 0) {
          const safeCity = city.replace(/[%_]/g, "\\$&");
          query = query.ilike("city", `%${safeCity}%`);
        }

        if (sort === "oldest") query = query.order("created_at", { ascending: true });
        else if (sort === "name") query = query.order("display_name", { ascending: true, nullsFirst: false });
        else query = query.order("created_at", { ascending: false });

        const from = offset;
        const to = offset + pageSize - 1;

        const { data, error, count } = await query.range(from, to);

        if (myRequestId !== requestIdRef.current) return;

        if (error) {
          setError(error.message);
          setHasMore(false);
          setTotalCount(null);
          return;
        }

        const rows = (data ?? []) as Company[];

        if (opts.reset) {
          setCompanies(rows);
          setTotalCount(typeof count === "number" ? count : null);
        } else {
          setCompanies((prev) => [...prev, ...rows]);
        }

        if (opts.reset && typeof count === "number") setHasMore(rows.length + offset < count);
        else if (totalCount != null) setHasMore(rows.length + offset < totalCount);
        else setHasMore(rows.length >= pageSize);
      } catch (e: unknown) {
        if (myRequestId !== requestIdRef.current) return;
        setError(e instanceof Error ? e.message : String(e));
        setHasMore(false);
        setTotalCount(null);
      } finally {
        if (myRequestId !== requestIdRef.current) return;
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [q, city, sort, pageSize, companies.length, totalCount]
  );

  useEffect(() => {
    void fetchCompanies({ reset: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, city, sort, pageSize]);

  const loadMore = useCallback(async () => {
    if (loading || loadingMore || !hasMore) return;
    await fetchCompanies({ reset: false });
  }, [fetchCompanies, loading, loadingMore, hasMore]);

  const createCompany = useCallback(
    async (input: {
      displayName: string;
      legalName?: string;
      city?: string;
      postcode?: string;
      logoUrl?: string;
      coverFile?: File | null;
    }) => {
      const name = (input.displayName || input.legalName || "").trim();
      if (!name) throw new Error("Company name is required.");

      const baseSlug = slugify(name) || "company";
      const uniqueSlug = `${baseSlug}-${Math.random().toString(16).slice(2, 8)}`;

      const logoUrlVal = input.logoUrl ? safeUrl(input.logoUrl) : "";

      // 1) upload cover if provided
      let coverUrlFinal: string | null = null;
      if (input.coverFile) {
        coverUrlFinal = await uploadCoverToSupabase(input.coverFile, uniqueSlug);
      }

      // 2) insert
      const payload: Record<string, unknown> = {
        name: (input.legalName || name).trim(),
        display_name: input.displayName.trim() || null,
        city: (input.city || "").trim() || null,
        postcode: (input.postcode || "").trim() || null,
        cover_url: coverUrlFinal,
        logo_url: logoUrlVal || null,
        active: true,
        owner_id: TEST_OWNER_ID,
        company_slug: uniqueSlug,
      };

      const { data, error } = await supabase
        .from("companies_test")
        .insert(payload)
        .select("id, display_name, name, city, postcode, cover_url, logo_url")
        .single();

      if (error) throw error;

      // 3) optimistic update
      if (data) {
        setCompanies((prev) => [data as Company, ...prev]);
        setTotalCount((prev) => (typeof prev === "number" ? prev + 1 : prev));
      }

      return data as Company;
    },
    []
  );

  return {
    companies,
    totalCount,
    loading,
    loadingMore,
    hasMore,
    error,
    loadMore,
    createCompany,
  };
}