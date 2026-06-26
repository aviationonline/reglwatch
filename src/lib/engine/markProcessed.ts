import { supabaseAdmin } from "../supabase/admin";

export async function markProcessed(documentId: string): Promise<void> {

  const { error } = await supabaseAdmin
    .from("source_documents")
    .update({
      processed: true,
      processing_status: "processed",
      processed_at: new Date().toISOString(),
    })
    .eq("id", documentId);

  if (error) {
    throw error;
  }

}
