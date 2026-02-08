import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    const id = body?.id as string | undefined;

    if (!id) {
      return NextResponse.json({ error: "Missing 'id'." }, { status: 400 });
    }

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

    // 1) (opțional) ia cover_url ca să ștergi și fișierul din storage
    const { data: row, error: readErr } = await admin
      .from("companies_test")
      .select("id, cover_url")
      .eq("id", id)
      .single();

    if (readErr) {
      return NextResponse.json({ error: readErr.message }, { status: 400 });
    }

    // 2) șterge rândul
    const { error: delErr } = await admin.from("companies_test").delete().eq("id", id);

    if (delErr) {
      return NextResponse.json({ error: delErr.message }, { status: 400 });
    }

    // 3) (opțional) șterge cover din storage dacă e în bucket-ul tău
    // Atenție: funcționează doar dacă cover_url e din supabase storage public URL.
    const coverUrl = row?.cover_url as string | null;
    if (coverUrl) {
      const marker = "/storage/v1/object/public/comps_test_covers/";
      const idx = coverUrl.indexOf(marker);
      if (idx !== -1) {
        const path = coverUrl.slice(idx + marker.length); // ex: covers/abc.jpg
        // remove acceptă array de paths
        await admin.storage.from("comps_test_covers").remove([path]);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}