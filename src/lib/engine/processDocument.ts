import { extract } from "./extract";
import { analyze } from "./analyze";
import { saveRegulation } from "./saveRegulation";
import { saveObligations } from "./saveObligations";
import { markProcessed } from "./markProcessed";
import { saveAnalysis } from "./saveAnalysis";

import { supabaseAdmin } from "../supabase/admin";

export async function processDocument(documentId: string) {

  try {

    const document = await extract(documentId);

    if (!document) {
      throw new Error("Document introuvable");
    }

    const analysis = await analyze(document);

    await saveAnalysis(
      document.id,
      analysis
    );

    const regulationId = await saveRegulation(
      document.id,
      analysis
    );

    await saveObligations(
      regulationId,
      analysis
    );

    await markProcessed(document.id);

    return {
      success: true,
      regulationId,
      analysis
    };

  } catch (error) {

    const message =
      error instanceof Error
        ? error.message
        : "Unknown error";

    await supabaseAdmin
      .from("source_documents")
      .update({
        processing_status: "error",
        error_message: message
      })
      .eq("id", documentId);

    await supabaseAdmin
      .from("workflow_logs")
      .insert({
        workflow: "processDocument",
        step: "pipeline",
        status: "error",
        message
      });

    return {
      success: false,
      error: message
    };
  }

}
