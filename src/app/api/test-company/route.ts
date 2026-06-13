import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("companies")
    .insert([
      {
        user_id: crypto.randomUUID(),
        company_name: "Société Test",
        legal_form: "SAS",
        sector: "Services",
        employees: "1-10",
      },
    ])
    .select();

  if (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
    data,
  });
}
