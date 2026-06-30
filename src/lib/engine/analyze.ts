import { analyseRegulation } from "../ai/openai";
import { PendingDocument } from "./extract";

export type AnalysisResult = Awaited<
  ReturnType<typeof analyseRegulation>
>;

export async function analyze(
  document: PendingDocument
): Promise<AnalysisResult> {
  return analyseRegulation(document.content);
}
