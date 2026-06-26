import { askGPT } from "../ai/openai";
import { regulationPrompt } from "../prompts/regulation";

export interface RegulationAnalysis {
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

export async function processDocument(content: string): Promise<RegulationAnalysis> {

  const prompt = regulationPrompt(content);

  const answer = await askGPT(prompt);

  return JSON.parse(answer);

}
