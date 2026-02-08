"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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

const DEBOUNCE_MS = 350;

// Later: replace with logged-in user id.
const TEST_OWNER_ID = "00000000-0000-0000-0000-000000000001";

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

export default function ProvidersTestClient() {
  const router = useRouter();
  const sp = useSearchParams();

  // URL params
  const q = (sp.get("q") ?? "").trim();
  const city = (sp.get("city") ?? "").trim();
  const sort = (sp.get("sort") ?? "newest").trim() || "newest";

  // Paging
  const pageSize = useMemo(() => {
    const raw = Number.parseInt(sp.get("pageSize") ?? "20", 10);
    return Number.isFinite(raw) ? Math.min(60, Math.max(8, raw)) : 20;
  }, [sp]);

  const [companies, setCompanies] = useState<Company[]>([]);
  const [totalCount, setTotalCount] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Filters form state
  const [qInput, setQInput] = useState(q);
  const [cityInput, setCityInput] = useState(city);
  const [sortInput, setSortInput] = useState(sort);

  // Add New Company (drawer)
  const [addOpen, setAddOpen] = useState(false);
  const [savingCompany, setSavingCompany] = useState(false);
  const [addError, setAddError] = useState<string | null>(null);

  const [newName, setNewName] = useState("");
  const [newDisplayName, setNewDisplayName] = useState("");
  const [newCity, setNewCity] = useState("");
  const [newPostcode, setNewPostcode] = useState("");
  const [newLogoUrl, setNewLogoUrl] = useState("");

  // Cover upload state (client-only preview)
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreviewUrl, setCoverPreviewUrl] = useState<string | null>(null);

  // Simple toast
  const [toast, setToast] = useState<string>("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Delete confirm modal
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Company | null>(null);

  const requestIdRef = useRef(0);

  // Scroll restoration key (per filter set)
  const scrollKey = useMemo(() => {
    return `providers-test:scroll:q=${q}|city=${city}|sort=${sort}|pageSize=${pageSize}`;
  }, [q, city, sort, pageSize]);

  const scrollRafRef = useRef<number | null>(null);

  const buildHref = (next: { q?: string; city?: string; sort?: string; pageSize?: number }) => {
    const params = new URLSearchParams();
    const nq = (next.q ?? q).trim();
    const nc = (next.city ?? city).trim();
    const ns = (next.sort ?? sort).trim() || "newest";
    const nps = next.pageSize ?? pageSize;

    if (nq) params.set("q", nq);
    if (nc) params.set("city", nc);
    if (ns) params.set("sort", ns);
    params.set("pageSize", String(nps));

    const qs = params.toString();
    return qs ? `?${qs}` : "";
  };

  const fetchCompanies = async (opts: { reset: boolean }) => {
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
  };

  // Reset list on filter changes
  useEffect(() => {
    setQInput(q);
    setCityInput(city);
    setSortInput(sort);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, city, sort]);

  // Debounce search + city -> update URL after user stops typing
  useEffect(() => {
    const nextQ = qInput.trim();
    const nextCity = cityInput.trim();
    if (nextQ === q && nextCity === city) return;

    const t = window.setTimeout(() => {
      router.replace(buildHref({ q: nextQ, city: nextCity, sort: sortInput }));
    }, DEBOUNCE_MS);

    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qInput, cityInput]);

  // Apply sort instantly
  useEffect(() => {
    if (sortInput.trim() === sort) return;
    router.replace(buildHref({ q: qInput, city: cityInput, sort: sortInput }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortInput]);

  useEffect(() => {
    void fetchCompanies({ reset: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, city, sort, pageSize]);

  // Restore scroll
  useLayoutEffect(() => {
    const raw = typeof window !== "undefined" ? window.sessionStorage.getItem(scrollKey) : null;
    const y = raw ? Number.parseInt(raw, 10) : 0;
    if (!Number.isFinite(y) || y <= 0) return;

    requestAnimationFrame(() => {
      window.scrollTo({ top: y, left: 0, behavior: "auto" });
    });
  }, [scrollKey]);

  // Save scroll (RAF)
  useEffect(() => {
    const onScroll = () => {
      if (scrollRafRef.current != null) return;
      scrollRafRef.current = window.requestAnimationFrame(() => {
        scrollRafRef.current = null;
        window.sessionStorage.setItem(scrollKey, String(window.scrollY || 0));
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (scrollRafRef.current != null) {
        window.cancelAnimationFrame(scrollRafRef.current);
        scrollRafRef.current = null;
      }
      window.sessionStorage.setItem(scrollKey, String(window.scrollY || 0));
    };
  }, [scrollKey]);

  const onApply = (e: React.FormEvent) => {
    e.preventDefault();
    router.replace(buildHref({ q: qInput, city: cityInput, sort: sortInput }));
  };

  const onReset = () => {
    setQInput("");
    setCityInput("");
    setSortInput("newest");
    router.replace("?pageSize=20");
  };

  const onLoadMore = async () => {
    if (loading || loadingMore || !hasMore) return;
    await fetchCompanies({ reset: false });
  };

  const onGoTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Cover file picker
  const onPickCover: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0] ?? null;

    if (coverPreviewUrl) URL.revokeObjectURL(coverPreviewUrl);

    setCoverFile(file);
    setCoverPreviewUrl(file ? URL.createObjectURL(file) : null);
  };

  // cleanup preview on unmount
  useEffect(() => {
    return () => {
      if (coverPreviewUrl) URL.revokeObjectURL(coverPreviewUrl);
    };
  }, [coverPreviewUrl]);

  const resetAddForm = useCallback(() => {
    setAddError(null);
    setNewName("");
    setNewDisplayName("");
    setNewCity("");
    setNewPostcode("");
    setNewLogoUrl("");
    setCoverFile(null);

    if (coverPreviewUrl) URL.revokeObjectURL(coverPreviewUrl);
    setCoverPreviewUrl(null);
  }, [coverPreviewUrl]);

  const onOpenAdd = useCallback(() => {
    resetAddForm();
    setAddOpen(true);
  }, [resetAddForm]);

  const onCloseAdd = useCallback(() => {
    setAddOpen(false);
    setAddError(null);
  }, []);

  const onCreateCompany = useCallback(async () => {
    if (savingCompany) return;

    const name = (newDisplayName || newName).trim();
    if (!name) {
      setAddError("Company name is required.");
      return;
    }

    const logoUrlVal = safeUrl(newLogoUrl);

    setSavingCompany(true);
    setAddError(null);

    try {
      const fd = new FormData();
      fd.set("display_name", newDisplayName.trim());
      fd.set("name", newName.trim());
      fd.set("city", newCity.trim());
      fd.set("postcode", newPostcode.trim());
      fd.set("logo_url", logoUrlVal);
      fd.set("owner_id", TEST_OWNER_ID);
      if (coverFile) fd.set("cover", coverFile);

      const res = await fetch("/api/providers-test/create", { method: "POST", body: fd });
      const raw = await res.text();

      let json: any = null;
      try { json = JSON.parse(raw); } catch {}

      if (!res.ok) {
        setAddError(json?.error ?? raw ?? "Failed to create company.");
        return;
      }

      if (!json?.data) {
        setAddError(raw || "Missing JSON data from server.");
        return;
      }

      const created = json.data as Company;

      setCompanies((prev) => [created, ...prev]);
      setTotalCount((prev) => (typeof prev === "number" ? prev + 1 : prev));

      setToast("Company created ✅");
      window.setTimeout(() => setToast(""), 2200);

      setAddOpen(false);
      resetAddForm();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (e: unknown) {
      setAddError(e instanceof Error ? e.message : String(e));
    } finally {
      setSavingCompany(false);
    }
  }, [savingCompany, newName, newDisplayName, newCity, newPostcode, newLogoUrl, coverFile, resetAddForm]);

  const openDeleteModal = useCallback((e: React.MouseEvent, company: Company) => {
    e.preventDefault();
    e.stopPropagation();
    if (deletingId) return;
    setDeleteTarget(company);
    setDeleteOpen(true);
  }, [deletingId]);

  const closeDeleteModal = useCallback(() => {
    if (deletingId) return;
    setDeleteOpen(false);
    setDeleteTarget(null);
  }, [deletingId]);

  const confirmDelete = useCallback(async () => {
    if (!deleteTarget) return;

    const company = deleteTarget;
    const prevCompanies = companies;
    const prevTotal = totalCount;

    setDeletingId(company.id);
    setCompanies((prev) => prev.filter((c) => c.id !== company.id));
    setTotalCount((prev) => (typeof prev === "number" ? Math.max(0, prev - 1) : prev));

    setDeleteOpen(false);
    setDeleteTarget(null);

    try {
      const res = await fetch("/api/providers-test/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: company.id }),
      });

      const raw = await res.text();
      let json: any = null;
      try { json = JSON.parse(raw); } catch {}

      if (!res.ok) {
        setCompanies(prevCompanies);
        setTotalCount(prevTotal);
        const msg = json?.error ?? raw ?? "Failed to delete company.";
        setToast(`Delete failed: ${msg}`);
        window.setTimeout(() => setToast(""), 2600);
        return;
      }

      setToast("Company deleted ✅");
      window.setTimeout(() => setToast(""), 2200);
    } catch (err: unknown) {
      setCompanies(prevCompanies);
      setTotalCount(prevTotal);
      const msg = err instanceof Error ? err.message : String(err);
      setToast(`Delete failed: ${msg}`);
      window.setTimeout(() => setToast(""), 2600);
    } finally {
      setDeletingId(null);
    }
  }, [deleteTarget, companies, totalCount]);

  const onDeleteCompany = useCallback((e: React.MouseEvent, company: Company) => {
    openDeleteModal(e, company);
  }, [openDeleteModal]);

  // UI (identic cu ce ai acum)
  return (
    <div id="top" className="mx-auto max-w-6xl px-4 py-8">
      {/* ... TOT JSX-ul tău rămâne la fel ... */}
      {/* (nu l-am mai repetat aici ca să nu-ți dublez 500 de linii) */}
    </div>
  );
}