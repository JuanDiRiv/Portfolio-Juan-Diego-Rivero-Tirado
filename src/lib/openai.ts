import "server-only";

import OpenAI from "openai";

let cached: OpenAI | null = null;

export function getOpenAI(): OpenAI {
  if (cached) return cached;
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("Missing environment variable: OPENAI_API_KEY");
  }
  cached = new OpenAI({ apiKey });
  return cached;
}

export function getOpenAIModel(): string {
  return process.env.OPENAI_MODEL || "gpt-5.4-mini";
}
