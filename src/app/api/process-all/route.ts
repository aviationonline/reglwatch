import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { processDocument } from "@/lib/engine/processDocument";

export async function POST() {
  const { data, error } = await supabaseAdmin
    .from("source_documents")
    .select("id")
    .eq("processed", false)
    .limit(20);

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  const results = [];

  for (const doc of data ?? []) {
    try {
      await processDocument(doc.id);

      results.push({
        id: doc.id,
        status: "processed",
      });

    } catch (e: any) {

      results.push({
        id: doc.id,
        status: "error",
        message: e.message,
      });

    }
  }

  return NextResponse.json({
    processed: results.length,
    results,
  });
}
