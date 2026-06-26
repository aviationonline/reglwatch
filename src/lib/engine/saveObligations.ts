import { supabaseAdmin } from "../supabase/admin";
import { AnalysisResult } from "./analyze";

export async function saveObligations(
  regulationId: string,
  analysis: AnalysisResult
): Promise<void> {

  if (!analysis.obligations?.length) {
    return;
  }

  const rows = analysis.obligations.map((o) => ({
    regulation_id: regulationId,
    title: o.title,
    description: o.description,
    deadline_days: o.deadline_days,
  }));

  const { error } = await supabaseAdmin
    .from("obligations")
    .insert(rows);

  if (error) {
    throw error;
  }
}
