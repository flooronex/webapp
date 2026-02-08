import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false },
});

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function safeUrlOrNull(input: string) {
  const v = input.trim();
  if (!v) return null;
  try {
    return new URL(v).toString();
  } catch {
    return null;
  }
}

function getExt(name: string, mime: string) {
  const ext = name.split(".").pop()?.toLowerCase();
  if (ext && ext.length <= 6) return ext;
  if (mime === "image/png") return "png";
  if (mime === "image/webp") return "webp";
  return "jpg";
}

export async function POST(req: Request) {
  try {
    const form = await req.formData();

    const display_name = String(form.get("display_name") ?? "").trim();
    const name = String(form.get("name") ?? "").trim();
    const city = String(form.get("city") ?? "").trim();
    const postcode = String(form.get("postcode") ?? "").trim();
    const logo_url = safeUrlOrNull(String(form.get("logo_url") ?? ""));
    const owner_id = String(form.get("owner_id") ?? "").trim() || "00000000-0000-0000-0000-000000000001";

    const title = display_name || name;
    if (!title) {
      return NextResponse.json({ error: "Company name is required." }, { status: 400 });
    }

    const baseSlug = slugify(title) || "company";
    const uniqueSlug = `${baseSlug}-${Math.random().toString(16).slice(2, 8)}`;

    // optional cover file
    const file = form.get("cover") as File | null;
    let cover_url: string | null = null;

    if (file && typeof file.arrayBuffer === "function" && file.size > 0) {
      const bucket = "comps_test_covers";
      const ext = getExt(file.name, file.type);
      const path = `covers/${uniqueSlug}-${Date.now()}.${ext}`;

      const bytes = new Uint8Array(await file.arrayBuffer());

      const { error: upErr } = await supabaseAdmin.storage.from(bucket).upload(path, bytes, {
        contentType: file.type || "image/jpeg",
        upsert: false,
      });

      if (upErr) {
        return NextResponse.json({ error: `Upload failed: ${upErr.message}` }, { status: 400 });
      }

      cover_url = supabaseAdmin.storage.from(bucket).getPublicUrl(path).data.publicUrl;
    }

    const payload = {
      name: name || title,
      display_name: display_name || null,
      city: city || null,
      postcode: postcode || null,
      cover_url,
      logo_url,
      active: true,
      owner_id,
      company_slug: uniqueSlug,
    };

    const { data, error } = await supabaseAdmin
      .from("companies_test")
      .insert(payload)
      .select("id, display_name, name, city, postcode, cover_url, logo_url")
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (e: unknown) {
    return NextResponse.json({ error: e instanceof Error ? e.message : String(e) }, { status: 500 });
  }
}