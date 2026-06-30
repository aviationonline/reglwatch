import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export interface AIObligation {
  title: string;
  description: string;
  legal_reference: string;
  deadline_days: number | null;
}

export interface AIAnalysis {

  title: string;

  summary: string;

  urgency: "low" | "medium" | "high" | "critical";

  effective_date: string | null;

  sectors: string[];

  obligations: AIObligation[];

}

function cleanJson(text: string): string {

  return text
    .replace(/^```json/i, "")
    .replace(/^```/, "")
    .replace(/```$/, "")
    .trim();

}

export async function analyseRegulation(
  content: string
): Promise<AIAnalysis> {

  const prompt = `
Tu es juriste spécialisé en conformité réglementaire française.

Analyse le texte.

Retourne UNIQUEMENT un JSON valide.

{

"title":"",

"summary":"",

"urgency":"low|medium|high|critical",

"effective_date":null,

"sectors":[],

"obligations":[

{

"title":"",

"description":"",

"legal_reference":"",

"deadline_days":null

}

]

}

Texte :

${content}
`;

  const response = await client.responses.create({

    model: "gpt-5",

    input: prompt,

  });

  const text = cleanJson(response.output_text);

  let result: AIAnalysis;

  try {

    result = JSON.parse(text);

  } catch {

    throw new Error("Réponse OpenAI invalide");

  }

  if (!result.title)
    throw new Error("Titre absent");

  if (!result.summary)
    throw new Error("Résumé absent");

  if (!Array.isArray(result.sectors))
    result.sectors = [];

  if (!Array.isArray(result.obligations))
    result.obligations = [];

  if (
    result.effective_date === ""
  ) {
    result.effective_date = null;
  }

  return result;

}
