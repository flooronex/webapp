"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  onCreated?: () => void; // ex: scrollToTop
  createCompany: (input: {
    displayName: string;
    legalName?: string;
    city?: string;
    postcode?: string;
    logoUrl?: string;
    coverFile?: File | null;
  }) => Promise<unknown>;
};

export default function AddCompanyDrawer({ open, onClose, onCreated, createCompany }: Props) {
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const [displayName, setDisplayName] = useState("");
  const [legalName, setLegalName] = useState("");
  const [city, setCity] = useState("");
  const [postcode, setPostcode] = useState("");
  const [logoUrl, setLogoUrl] = useState("");

  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);

  const canCreate = useMemo(() => displayName.trim().length > 0, [displayName]);

  const reset = useCallback(() => {
    setErr(null);
    setDisplayName("");
    setLegalName("");
    setCity("");
    setPostcode("");
    setLogoUrl("");
    setCoverFile(null);
    setCoverPreview(null);
  }, []);

  // când se deschide drawer-ul, resetează (opțional)
  useEffect(() => {
    if (open) reset();
  }, [open, reset]);

  // cleanup preview url
  useEffect(() => {
    return () => {
      if (coverPreview) URL.revokeObjectURL(coverPreview);
    };
  }, [coverPreview]);

  const onPickCover: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0] ?? null;
    setCoverFile(file);
    if (coverPreview) URL.revokeObjectURL(coverPreview);
    setCoverPreview(file ? URL.createObjectURL(file) : null);
  };

  const onSubmit = async () => {
    if (saving) return;
    if (!canCreate) {
      setErr("Display name is required.");
      return;
    }

    setSaving(true);
    setErr(null);
    try {
      await createCompany({
        displayName: displayName.trim(),
        legalName: legalName.trim() || undefined,
        city: city.trim() || undefined,
        postcode: postcode.trim() || undefined,
        logoUrl: logoUrl.trim() || undefined,
        coverFile,
      });

      onClose();
      onCreated?.();
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : String(e));
    } finally {
      setSaving(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button type="button" aria-label="Close" onClick={onClose} className="absolute inset-0 bg-black/30" />

      <div className="absolute right-0 top-0 h-full w-full max-w-md border-l bg-white dark:bg-neutral-950 shadow-xl">
        <div className="flex items-center justify-between border-b p-4">
          <div>
            <div className="text-base font-semibold">Add new company</div>
            <div className="mt-0.5 text-xs opacity-70">Uploads cover → saves public URL → inserts row</div>
          </div>
          <button type="button" onClick={onClose} className="rounded-lg px-3 py-2 text-sm font-medium border hover:opacity-80 transition">
            Close
          </button>
        </div>

        <div className="p-4 overflow-y-auto h-[calc(100%-140px)]">
          <div className="grid gap-3">
            <div>
              <label className="block text-xs font-medium opacity-70">Display name *</label>
              <input
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="e.g. Prime Installers"
                className="mt-1 w-full rounded-lg border bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/10"
              />
            </div>

            <div>
              <label className="block text-xs font-medium opacity-70">Legal name (optional)</label>
              <input
                value={legalName}
                onChange={(e) => setLegalName(e.target.value)}
                placeholder="e.g. Prime Installers Ltd"
                className="mt-1 w-full rounded-lg border bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/10"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium opacity-70">City</label>
                <input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="London"
                  className="mt-1 w-full rounded-lg border bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/10"
                />
              </div>
              <div>
                <label className="block text-xs font-medium opacity-70">Postcode</label>
                <input
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value)}
                  placeholder="SW1A 1AA"
                  className="mt-1 w-full rounded-lg border bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/10"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium opacity-70">Logo URL (optional)</label>
              <input
                value={logoUrl}
                onChange={(e) => setLogoUrl(e.target.value)}
                placeholder="https://..."
                className="mt-1 w-full rounded-lg border bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/10"
              />
            </div>

            <div>
              <label className="block text-xs font-medium opacity-70">Cover image (upload)</label>
              <input type="file" accept="image/*" onChange={onPickCover} className="mt-1 w-full text-sm" />

              {coverPreview ? (
                <div className="mt-2 relative aspect-[16/9] w-full overflow-hidden rounded-lg border">
                  <Image src={coverPreview} alt="Cover preview" fill className="object-cover" />
                </div>
              ) : null}

              <div className="mt-1 text-xs opacity-60">
                Uploads to <span className="font-mono">comps_test_covers/covers/</span>
              </div>
            </div>

            {err ? (
              <div className="rounded-xl border p-3 text-sm">
                <div className="font-medium">Could not create company</div>
                <div className="mt-1 opacity-80">{err}</div>
              </div>
            ) : null}
          </div>
        </div>

        <div className="border-t p-4 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={reset}
            disabled={saving}
            className="rounded-lg px-4 py-2 text-sm font-medium border hover:opacity-80 transition disabled:opacity-50"
          >
            Clear
          </button>

          <button
            type="button"
            onClick={onSubmit}
            disabled={saving || !canCreate}
            className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium border border-emerald-700 bg-emerald-600 text-white hover:bg-emerald-700 transition disabled:opacity-50"
          >
            {saving ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                <span>Creating…</span>
              </>
            ) : (
              <span>Create</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}