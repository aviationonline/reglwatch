import OpenAI from "openai";

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function askGPT(prompt: string) {
  const response = await openai.responses.create({
    model: "gpt-5",
    input: prompt,
  });

  return response.output_text;
}
