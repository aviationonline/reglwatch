import { supabaseAdmin } from "@/lib/supabase/admin";
import { SourceDocument } from "@/lib/collect/types";

export interface SaveResult {
  id: string;
  externalId: string;
  created: boolean;
}

export class SourceDocumentRepository {

  async save(document: SourceDocument): Promise<SaveResult> {

    // Vérifie si le document existe déjà
    const { data: existing, error: searchError } =
      await supabaseAdmin
        .from("source_documents")
        .select("id")
        .eq("external_id", document.externalId)
        .maybeSingle();

    if (searchError) {
      throw searchError;
    }

    // Déjà présent
    if (existing) {

      return {
        id: existing.id,
        externalId: document.externalId,
        created: false
      };

    }

    // Nouveau document
    const { data, error } =
      await supabaseAdmin
        .from("source_documents")
        .insert({
          external_id: document.externalId,
          cid: document.cid,
          nor: document.nor,
          nature: document.nature,
          origin: document.origin,

          source_name: "PISTE",

          title: document.title,
          content: document.content,

          processing_status: "pending",
          processed: false
        })
        .select("id")
        .single();

    if (error) {
      throw error;
    }

    return {
      id: data.id,
      externalId: document.externalId,
      created: true
    };

  }

}
