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
      .upsert(
        {
          user_id,
          company_name,
          legal_form,
          employees,
          sector,
        },
        {
          onConflict: "user_id",
        }
      )
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

    const { count } = await supabaseAdmin
      .from("alerts")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("user_id", user_id);

    if (count === 0) {
      const { data: regulations, error: regulationsError } =
        await supabaseAdmin
          .from("regulations")
          .select("*")
          .eq("sector", sector)
          .eq("active", true);

      if (regulationsError) {
        return NextResponse.json(
          {
            success: false,
            error: regulationsError.message,
          },
          { status: 500 }
        );
      }

      if (regulations && regulations.length > 0) {
        const alerts = regulations.map((regulation) => ({
          user_id,
          title: regulation.title,
          urgency: regulation.urgency,
          summary: regulation.summary,
        }));

        await supabaseAdmin
          .from("alerts")
          .insert(alerts);
      }
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
