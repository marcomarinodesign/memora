/**
 * Reusable AI helper functions using the centralized Groq client.
 * Server-side only. Never import in client components.
 */

import { jsonrepair } from "jsonrepair";
import { getGroqClient } from "./groqClient";
import type { TranscriptionResult, StructuredActaResult, SummaryResult } from "./types";

const ACTA_TEMPLATE = `
{
  "metadata": {
    "tipo_reunion": null,
    "comunidad": null,
    "direccion": null,
    "fecha_reunion": null,
    "hora_inicio": null,
    "hora_fin": null,
    "lugar": null,
    "idioma_acta": "es"
  },
  "participantes": {
    "presidente": null,
    "secretario": null,
    "administrador": null,
    "asistentes": [
      {
        "nombre": null,
        "vivienda_o_coeficiente": null,
        "presente": true
      }
    ],
    "representados": [
      {
        "nombre": null,
        "representado_por": null
      }
    ]
  },
  "orden_del_dia": [
    {
      "punto": null,
      "descripcion": null
    }
  ],
  "desarrollo": [
    {
      "punto": null,
      "resumen_discusion": null
    }
  ],
  "acuerdos": [
    {
      "punto": null,
      "acuerdo": null,
      "resultado_votacion": null,
      "votos_a_favor": null,
      "votos_en_contra": null,
      "abstenciones": null,
      "coeficiente_aprobacion": null,
      "aprobado": null
    }
  ],
  "tareas": [
    {
      "descripcion": null,
      "responsable": null,
      "fecha_limite": null,
      "observaciones": null
    }
  ],
  "incidencias": [
    {
      "descripcion": null,
      "requiere_seguimiento": null
    }
  ],
  "cierre": {
    "hora_cierre": null,
    "observaciones_finales": null
  },
  "firmas": {
    "presidente": null,
    "secretario": null
  }
}
`;

function extractJsonCandidate(text: string): string | null {
  if (typeof text !== "string" || !text) return null;
  const trimmed = text.trim();
  if (!trimmed) return null;

  const fencedWhole = trimmed.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/i);
  if (fencedWhole?.[1]) return fencedWhole[1].trim();

  const fencedAnywhere = trimmed.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  if (fencedAnywhere?.[1]) return fencedAnywhere[1].trim();

  const firstBrace = trimmed.indexOf("{");
  const lastBrace = trimmed.lastIndexOf("}");
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    return trimmed.slice(firstBrace, lastBrace + 1);
  }
  return null;
}

function isObjectWithMetadata(value: unknown): value is { metadata: object } {
  const meta = (value as { metadata?: unknown })?.metadata;
  return (
    typeof value === "object" &&
    value !== null &&
    typeof meta === "object" &&
    meta !== null
  );
}

/**
 * Transcribe audio to text using Groq Whisper.
 */
export async function transcribeAudio(
  file: Buffer,
  filename: string
): Promise<TranscriptionResult> {
  try {
    const groq = getGroqClient();
    const { toFile } = await import("groq-sdk");

    const transcription = await groq.audio.transcriptions.create({
      model: "whisper-large-v3-turbo",
      file: await toFile(file, filename),
    });

    return {
      text: transcription.text ?? "",
    };
  } catch {
    throw new Error("AI transcription failed");
  }
}

/**
 * Extract structured acta JSON from a meeting transcript.
 *
 * Error flow:
 * 1. Groq API call fails → log full error, throw "Groq API call failed"
 * 2. Empty response → throw "Empty AI response"
 * 3. JSON parsing fails → log raw content, throw "AI returned invalid JSON"
 * 4. Invalid structure (no metadata) → throw "AI returned invalid JSON"
 */
export async function extractStructuredActa(
  transcript: string
): Promise<StructuredActaResult> {
  const groq = getGroqClient();

  const prompt = `
Eres un asistente experto en gestión de comunidades de propietarios e inmobiliarias.
Tu tarea es analizar una TRANSCRIPCIÓN DE UNA REUNIÓN y generar EXCLUSIVAMENTE
un objeto JSON que siga EXACTAMENTE el template proporcionado.

REGLAS OBLIGATORIAS:
1. Devuelve SOLO JSON válido, sin texto antes ni después.
2. No inventes información. Usa null si no aparece.
3. Fechas: YYYY-MM-DD | Horas: HH:MM
4. Lenguaje formal administrativo.
5. Resume discusiones, no transcribas literal.
6. No añadas campos.
7. Respeta exactamente los nombres de los campos.
8. INCLUYE SIEMPRE todos los campos del template: metadata, participantes, orden_del_dia, desarrollo, acuerdos, tareas, incidencias, cierre, firmas. Usa [] o null si no aplica.

TEMPLATE JSON:
${ACTA_TEMPLATE}

TRANSCRIPCIÓN:
"""
${transcript}
"""
`;

  // --- Step 1: Groq API call (do not swallow errors) ---
  let completion;
  try {
    completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      temperature: 0,
      max_tokens: 8192,
      messages: [{ role: "user", content: prompt }],
    });
  } catch (error) {
    console.error("=== GROQ API ERROR START ===");
    console.error(error);
    console.error("=== GROQ API ERROR END ===");
    throw new Error("Groq API call failed");
  }

  // Log completion metadata only (never API key)
  console.log("=== GROQ RESPONSE METADATA ===", {
    id: completion.id,
    model: completion.model,
    usage: completion.usage,
    choicesCount: completion.choices?.length ?? 0,
  });

  // --- Step 2: Extract content safely ---
  const content = completion.choices[0]?.message?.content ?? "";
  if (!content.trim()) {
    throw new Error("Empty AI response");
  }

  // --- Step 3: JSON parsing (try parse, fallback to jsonrepair for malformed LLM output) ---
  const candidate = extractJsonCandidate(content) ?? content.trim();
  if (!candidate) {
    throw new Error("AI returned invalid JSON");
  }

  let data: unknown;
  try {
    data = JSON.parse(candidate);
  } catch {
    try {
      const repaired = jsonrepair(candidate);
      data = JSON.parse(repaired);
    } catch (parseError) {
      console.error("=== AI JSON PARSE ERROR ===");
      console.error("Raw content:", content);
      console.error("Parse error:", parseError);
      throw new Error("AI returned invalid JSON");
    }
  }

  if (!isObjectWithMetadata(data)) {
    throw new Error("AI returned invalid JSON");
  }

  return { data };
}

/**
 * Generate a summary of text.
 */
export async function generateSummary(text: string): Promise<SummaryResult> {
  try {
    const groq = getGroqClient();

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      temperature: 0.3,
      messages: [
        {
          role: "user",
          content: `Resume el siguiente texto de forma concisa:\n\n${text}`,
        },
      ],
    });

    const summary = completion.choices[0]?.message?.content ?? "";
    return { summary };
  } catch {
    throw new Error("AI summary failed");
  }
}
