import { askGPT } from "../ai/openai";
import { regulationPrompt } from "../prompts/regulation";
import { supabaseAdmin } from "../supabase/admin";

export async function processDocument(documentId: string) {

  const { data: doc, error } = await supabaseAdmin
    .from("source_documents")
    .select("*")
    .eq("id", documentId)
    .single();

  if (error || !doc) {
    throw new Error("Document introuvable");
  }

  const prompt = regulationPrompt(doc.content);

  const answer = await askGPT(prompt);

  const analysis = JSON.parse(answer);

  const { data: regulation, error: regError } = await supabaseAdmin
    .from("regulations")
    .insert({
      document_id: doc.id,
      title: analysis.title,
      summary: analysis.summary,
      urgency: analysis.urgency,
      effective_date: analysis.effective_date,
      sectors: analysis.sectors,
      ai_summary: analysis.summary,
      status: "published"
    })
    .select()
    .single();

  if (regError) throw regError;

  for (const obligation of analysis.obligations) {

    await supabaseAdmin
      .from("obligations")
      .insert({
        regulation_id: regulation.id,
        title: obligation.title,
        description: obligation.description,
        deadline_days: obligation.deadline_days
      });

  }

  await supabaseAdmin
    .from("source_documents")
    .update({
      processing_status: "processed",
      processed_at: new Date().toISOString()
    })
    .eq("id", doc.id);

  return analysis;

}
