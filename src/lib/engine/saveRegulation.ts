import { supabaseAdmin } from "../supabase/admin";
import { AnalysisResult } from "./analyze";

export async function saveRegulation(
  documentId: string,
  analysis: AnalysisResult
): Promise<string> {

  const { data, error } = await supabaseAdmin
    .from("regulations")
    .insert({
      document_id: documentId,
      title: analysis.title,
      summary: analysis.summary,
      urgency: analysis.urgency,
      effective_date: analysis.effective_date,
      sectors: analysis.sectors,
      ai_summary: analysis.summary,
      status: "published",
    })
    .select("id")
    .single();

  if (error) {
    throw error;
  }

  return data.id;
}
