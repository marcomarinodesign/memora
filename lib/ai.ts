import OpenAI from "openai";

type GroqJsonError = Error & { raw?: string; extracted?: string | null };

function getGroqClient() {
  const apiKeyRaw = process.env.GROQ_API_KEY;
  const apiKey = apiKeyRaw?.trim();
  if (!apiKey) {
    throw new Error(
      "Missing GROQ_API_KEY. Set it in your environment variables (e.g. Vercel Project Settings → Environment Variables)."
    );
  }

  return new OpenAI({
    apiKey,
    baseURL: "https://api.groq.com/openai/v1",
  });
}

let groqClient: OpenAI | null = null;
function groq() {
  if (!groqClient) groqClient = getGroqClient();
  return groqClient;
}

function extractJsonCandidate(text: string): string | null {
  const trimmed = text.trim();

  // If the model wraps JSON in a fenced block, extract it.
  const fencedWhole = trimmed.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/i);
  if (fencedWhole?.[1]) return fencedWhole[1].trim();

  const fencedAnywhere = trimmed.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  if (fencedAnywhere?.[1]) return fencedAnywhere[1].trim();

  // Fallback: take the substring from first '{' to last '}'.
  const firstBrace = trimmed.indexOf("{");
  const lastBrace = trimmed.lastIndexOf("}");
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    return trimmed.slice(firstBrace, lastBrace + 1);
  }

  return null;
}

function parseJsonFromModelOutput(text: string): unknown {
  const candidate = extractJsonCandidate(text) ?? text.trim();
  return JSON.parse(candidate);
}

export async function generateActaFromTranscript(
  transcript: string
): Promise<unknown> {
  const prompt = `
Eres un asistente experto en gestión de comunidades de propietarios e inmobiliarias.
Tu tarea es analizar una TRANSCRIPCIÓN DE UNA REUNIÓN y generar EXCLUSIVAMENTE
un objeto JSON que siga EXACTAMENTE el template proporcionado.

REGLAS OBLIGATORIAS:
1. Devuelve SOLO JSON válido.
2. No inventes información. Usa null si no aparece.
3. Fechas: YYYY-MM-DD | Horas: HH:MM
4. Lenguaje formal administrativo.
5. Resume discusiones, no transcribas literal.
6. No añadas campos.
7. Respeta exactamente los nombres de los campos.
8. No incluyas texto fuera del JSON.

TEMPLATE JSON:
${ACTA_TEMPLATE}

TRANSCRIPCIÓN:
${transcript}
`;

  const completion = await groq().chat.completions.create({
    model: "llama-3.1-8b-instant",
    temperature: 0,
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  const content = completion.choices[0]?.message?.content;
  if (!content) {
    throw new Error("Empty response from Groq");
  }

  try {
    return parseJsonFromModelOutput(content);
  } catch {
    const extracted = extractJsonCandidate(content);
    const error: GroqJsonError = new Error("Invalid JSON returned by Groq");
    error.raw = content;
    error.extracted = extracted;
    throw error;
  }
}

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