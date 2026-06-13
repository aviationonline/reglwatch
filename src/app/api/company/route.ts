import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      user_id,
      company_name,
      legal_form,
      employees,
      sector,
    } = body;

    const { data, error } = await supabaseAdmin
      .from("companies")
      .insert([
        {
          user_id,
          company_name,
          legal_form,
          employees,
          sector,
        },
      ])
      .select();

    if (error) {
      return NextResponse.json(
        {
          success: false,
          error: error.message,
        },
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
