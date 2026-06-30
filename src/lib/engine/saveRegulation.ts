import { supabaseAdmin } from "../supabase/admin";
import { AnalysisResult } from "./analyze";
import { regulationSlug } from "../utils/slug";

export async function saveRegulation(
  documentId: string,
  analysis: AnalysisResult
): Promise<string> {

 const slug = regulationSlug(analysis.title);

  // Vérifie si une réglementation existe déjà
  const { data: existing, error: searchError } =
    await supabaseAdmin
      .from("regulations")
      .select("id")
      .eq("slug", slug)
      .maybeSingle();

  if (searchError) {
    throw searchError;
  }

  if (existing) {
    return existing.id;
  }

  const effectiveDate =
    analysis.effective_date &&
    analysis.effective_date.trim() !== ""
      ? analysis.effective_date
      : null;

  const { data, error } =
    await supabaseAdmin
      .from("regulations")
      .insert({
        document_id: documentId,
        slug: slug,
        title: analysis.title,
        summary: analysis.summary,
        ai_summary: analysis.summary,
        urgency: analysis.urgency,
        effective_date: effectiveDate,
        sectors: analysis.sectors,
        status: "draft",
        ai_confidence: 0.95
      })
      .select("id")
      .single();

  if (error) {
    throw error;
  }

  return data.id;
}
