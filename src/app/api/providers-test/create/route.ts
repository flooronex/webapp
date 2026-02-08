import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    // 1) read multipart/form-data (from client FormData)
    const form = await req.formData();

    const display_name = String(form.get("display_name") ?? "").trim();
    const name = String(form.get("name") ?? "").trim();
    const city = String(form.get("city") ?? "").trim();
    const postcode = String(form.get("postcode") ?? "").trim();
    const logo_url = String(form.get("logo_url") ?? "").trim();
    const owner_id = String(form.get("owner_id") ?? "").trim();

    // required: at least one name
    const baseName = display_name || name;
    if (!baseName) {
      return NextResponse.json({ error: "Company name is required." }, { status: 400 });
    }

    // 2) env
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRole) {
      return NextResponse.json(
        { error: "Server missing env: NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY" },
        { status: 500 }
      );
    }

    const admin = createClient(supabaseUrl, serviceRole, {
      auth: { persistSession: false },
    });

    // 3) slugify + unique suffix (so NOT NULL + unique-ish)
    const slugify = (input: string) =>
      input
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");

    const baseSlug = slugify(baseName) || "company";
    const uniqueSlug = `${baseSlug}-${Math.random().toString(16).slice(2, 8)}`;

    // 4) OPTIONAL: cover upload (if you want it now)
    // If you don't want upload yet, just set cover_url = null
    let cover_url: string | null = null;

    const cover = form.get("cover");
    if (cover && cover instanceof File && cover.size > 0) {
      const bucket = "comps_test_covers";

      const extFromName = cover.name.split(".").pop()?.toLowerCase();
      const ext =
        extFromName && extFromName.length <= 6
          ? extFromName
          : cover.type === "image/png"
            ? "png"
            : cover.type === "image/webp"
              ? "webp"
              : "jpg";

      const path = `covers/${uniqueSlug}-${Date.now()}.${ext}`;

      const { error: upErr } = await admin.storage.from(bucket).upload(path, cover, {
        upsert: false,
        contentType: cover.type || "image/jpeg",
      });

      if (upErr) {
        return NextResponse.json({ error: `Cover upload failed: ${upErr.message}` }, { status: 400 });
      }

      const { data: pub } = admin.storage.from(bucket).getPublicUrl(path);
      cover_url = pub.publicUrl ?? null;
    }

    // 5) build payload WITH company_slug
    const payload: Record<string, unknown> = {
      display_name: display_name || null,
      name: name || baseName,
      city: city || null,
      postcode: postcode || null,
      logo_url: logo_url || null,
      cover_url,
      owner_id: owner_id || null,
      company_slug: uniqueSlug, // ✅ FIX for NOT NULL
      active: true,
    };

    // 6) insert
    const { data, error } = await admin
      .from("companies_test")
      .insert(payload)
      .select("id, display_name, name, city, postcode, cover_url, logo_url")
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ ok: true, data });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}