import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("companies")
    .insert([
      {
        user_id: crypto.randomUUID(),
        company_name: "Entreprise Demo",
        legal_form: "SAS",
        employees: "1-10",
        sector: "Services",
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      company_name,
      legal_form,
      employees,
      sector,
    } = body;

    const { data, error } = await supabaseAdmin
      .from("companies")
      .insert([
        {
          user_id: crypto.randomUUID(),
          company_name,
          legal_form,
          employees,
          sector,
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
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Erreur serveur",
      },
      { status: 500 }
    );
  }
}
