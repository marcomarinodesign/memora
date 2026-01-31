// app/api/generate-acta/route.ts
import { NextResponse } from "next/server";
import { generateActaFromTranscript } from "@/lib/ai";
import { ActaSchema } from "@/app/schema/acta.schema";
import { generateActaPDF } from "@/lib/pdf";

export const runtime = "nodejs";

function pickDebugInfo(error: unknown): { raw?: unknown; extracted?: unknown } {
  if (process.env.NODE_ENV === "production") return {};
  if (typeof error !== "object" || error === null) return {};

  const raw = "raw" in error ? (error as { raw?: unknown }).raw : undefined;
  const extracted =
    "extracted" in error
      ? (error as { extracted?: unknown }).extracted
      : undefined;

  return { raw, extracted };
}

function getStatusCode(error: unknown): number | undefined {
  if (typeof error !== "object" || error === null) return undefined;
  if (!("status" in error)) return undefined;
  const status = (error as { status?: unknown }).status;
  return typeof status === "number" ? status : undefined;
}

function getErrorCode(error: unknown): string | undefined {
  if (typeof error !== "object" || error === null) return undefined;
  if (!("code" in error)) return undefined;
  const code = (error as { code?: unknown }).code;
  return typeof code === "string" ? code : undefined;
}

export async function POST(req: Request) {
  try {
    let formData: FormData;
    try {
      formData = await req.formData();
    } catch {
      return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
    }

    const fileEntry = formData.get("file");
    const file = fileEntry instanceof File ? fileEntry : null;

    const textEntry = formData.get("text");
    const text = typeof textEntry === "string" ? textEntry : null;

    let transcript = "";
    const notes = file && text?.trim() ? text : undefined;

    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());

      if (file.name.endsWith(".txt")) {
        transcript = buffer.toString("utf-8");
      }

      if (file.name.endsWith(".docx")) {
        const mammoth = await import("mammoth");
        const result = await mammoth.extractRawText({ buffer });
        transcript = result.value;
      }
    }

    if (text?.trim()) {
      transcript = transcript
        ? `${transcript}\n\nNotas adicionales:\n${text}`
        : text;
    }

    if (!transcript) {
      return NextResponse.json(
        { error: "No transcription provided" },
        { status: 400 }
      );
    }

    const actaJson = await generateActaFromTranscript(transcript);

    let actaUnknown: unknown = actaJson;
    if (typeof actaJson === "string") {
      try {
        actaUnknown = JSON.parse(actaJson);
      } catch {
        return NextResponse.json(
          { error: "Invalid JSON returned by AI" },
          { status: 422 }
        );
      }
    }

    const parsed = ActaSchema.safeParse(actaUnknown);
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Invalid acta structure",
          issues: parsed.error.issues,
        },
        { status: 422 }
      );
    }

    const pdfBytes = await generateActaPDF(parsed.data, notes);

    return new Response(Buffer.from(pdfBytes), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="acta.pdf"',
      },
    });
  } catch (error) {
    console.error(error);
    const message =
      error instanceof Error ? error.message : "Internal server error";

    const debug = pickDebugInfo(error);
    const status = getStatusCode(error);
    const code = getErrorCode(error);

    if (status === 401 || code === "invalid_api_key") {
      return NextResponse.json(
        {
          error:
            "Invalid GROQ_API_KEY. Revisa tu clave de Groq (debería empezar por 'gsk_') y reinicia el servidor.",
          ...debug,
        },
        { status: 401 }
      );
    }

    if (message.includes("GROQ_API_KEY")) {
      return NextResponse.json(
        { error: message, ...debug },
        { status: 500 }
      );
    }

    if (message.includes("Invalid JSON returned by Groq")) {
      return NextResponse.json(
        { error: message, ...debug },
        { status: 422 }
      );
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}