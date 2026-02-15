/**
 * POST /api/generate-pdf
 * Home flow: FormData (file, text) → transcript → AI → Acta → PDF
 * Returns the PDF file directly for download.
 */
import { NextResponse } from "next/server";
import { extractStructuredActa } from "@/lib/ai/aiUtils";
import { ActaSchema } from "@/app/schema/acta.schema";
import { generateActaPdf } from "@/lib/pdf/generatePdf";

export const runtime = "nodejs";

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

    const { data: actaJson } = await extractStructuredActa(transcript);

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
      console.error("=== ACTA SCHEMA VALIDATION FAILED ===");
      console.error("Issues:", JSON.stringify(parsed.error.issues, null, 2));
      return NextResponse.json(
        {
          error: "Invalid acta structure",
          issues: parsed.error.issues,
        },
        { status: 422 }
      );
    }

    const pdf = await generateActaPdf(parsed.data);

    return new Response(pdf as unknown as BodyInit, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="acta.pdf"',
      },
    });
  } catch (error) {
    console.error("[generate-pdf]", error);

    const message =
      error instanceof Error ? error.message : "AI processing failed";

    const isJsonError =
      message.includes("invalid JSON") ||
      message.includes("Invalid acta structure");
    const status = isJsonError ? 422 : 500;

    return NextResponse.json(
      { success: false, error: message },
      { status }
    );
  }
}
