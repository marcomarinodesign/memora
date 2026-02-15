/**
 * Centralized Groq client for server-side AI operations.
 * Never import this in client components.
 */

import Groq from "groq-sdk";

let groqInstance: Groq | null = null;

export function getGroqClient(): Groq {
  if (!groqInstance) {
    if (!process.env.GROQ_API_KEY?.trim()) {
      throw new Error("Missing GROQ_API_KEY environment variable");
    }
    const apiKey = process.env.GROQ_API_KEY.trim();
    const normalizedKey = apiKey.startsWith("sk_groq_")
      ? apiKey.slice("sk_groq_".length)
      : apiKey;
    groqInstance = new Groq({ apiKey: normalizedKey });
  }
  return groqInstance;
}
