// app/api/generate-acta/route.ts
/**
 * Error flow:
 * - 400: Invalid form data, no transcript
 * - 422: Invalid JSON from AI, invalid acta structure
 * - 500: Groq API failure, empty response, or other server errors
 * Never log or expose API keys.
 */
import { NextResponse } from "next/server";
import { extractStructuredActa } from "@/lib/ai/aiUtils";
import { ActaSchema } from "@/app/schema/acta.schema";
import { mapStructuredActaToPdfFormat } from "@/lib/acta/actaMapper";
import { generateActaHtml } from "@/lib/generateActaHtml";
import { launchBrowser } from "@/lib/puppeteer";

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

    const mapped = mapStructuredActaToPdfFormat(parsed.data);
    const html = generateActaHtml({ ...mapped });

    const browser = await launchBrowser();
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });
    const pdf = await page.pdf({ format: "A4", printBackground: true });
    await browser.close();

    return new Response(Buffer.from(pdf), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="acta.pdf"',
      },
    });
  } catch (error) {
    console.error("[generate-acta]", error);

    const message =
      error instanceof Error ? error.message : "AI processing failed";

    // JSON parsing / structure errors → 422
    const isJsonError =
      message.includes("invalid JSON") || message.includes("Invalid acta structure");
    const status = isJsonError ? 422 : 500;

    return NextResponse.json(
      { success: false, error: message },
      { status }
    );
  }
}