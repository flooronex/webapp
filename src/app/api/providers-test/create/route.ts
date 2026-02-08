import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);

    // Aici pui câmpurile pe care le trimiți din client
    const payload = body?.payload as Record<string, unknown> | undefined;

    if (!payload) {
      return NextResponse.json({ error: "Missing 'payload'." }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;

    // IMPORTANT: nu arunca error aici, doar return JSON.
    // Dacă arunci, build-ul poate pica la import.
    if (!supabaseUrl || !serviceRole) {
      return NextResponse.json(
        { error: "Server missing env: NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY" },
        { status: 500 }
      );
    }

    const admin = createClient(supabaseUrl, serviceRole, {
      auth: { persistSession: false },
    });

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