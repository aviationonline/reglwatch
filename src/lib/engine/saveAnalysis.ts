import { supabaseAdmin } from "../supabase/admin";

export async function saveAnalysis(
  documentId: string,
  rawResponse: unknown,
  model = "gpt-5"
) {
  const { error } = await supabaseAdmin
    .from("ai_analysis")
    .insert({
      document_id: documentId,
      model,
      prompt_version: "v1",
      raw_response: rawResponse,
    });

  if (error) {
    throw error;
  }
}
