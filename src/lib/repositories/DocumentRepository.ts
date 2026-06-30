import { supabaseAdmin } from "../supabase/admin";

export class DocumentRepository {

  static async getPending(limit = 10) {

    const { data, error } = await supabaseAdmin
      .from("source_documents")
      .select("*")
      .eq("processing_status", "pending")
      .order("published_at", { ascending: true })
      .limit(limit);

    if (error) throw error;

    return data;
  }

  static async getById(id: string) {

    const { data, error } = await supabaseAdmin
      .from("source_documents")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    return data;
  }

  static async markProcessed(id: string) {

    const { error } = await supabaseAdmin
      .from("source_documents")
      .update({
        processing_status: "processed",
        processed_at: new Date().toISOString()
      })
      .eq("id", id);

    if (error) throw error;
  }

}
