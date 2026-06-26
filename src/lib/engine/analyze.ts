import { askGPT } from "../ai/openai";
import { regulationPrompt } from "../prompts/regulation";
import { PendingDocument } from "./extract";

export interface AnalysisResult {
  title: string;
  summary: string;
  urgency: "low" | "medium" | "high" | "critical";
  effective_date: string | null;
  sectors: string[];
  obligations: {
    title: string;
    description: string;
    deadline_days: number;
  }[];
}

export async function analyze(
  document: PendingDocument
): Promise<AnalysisResult> {

  const prompt = regulationPrompt(document.content);

  const response = await askGPT(prompt);

  let result: AnalysisResult;

  try {
    result = JSON.parse(response);
  } catch (err) {
    throw new Error(
      "Réponse OpenAI invalide : " + response.substring(0, 500)
    );
  }

  return result;
}
