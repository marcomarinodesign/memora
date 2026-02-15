// app/api/generate-acta/route.ts
/**
 * POST with JSON body: acta or pre-mapped data → generateActaPdf → PDF
 * Used by /acta page. Home flow uses /api/generate-pdf (FormData).
 */
import { NextResponse } from "next/server";
import { generateActaPdf } from "@/lib/pdf/generatePdf";
import type { Acta } from "@/app/schema/acta.schema";
import type { PdfActaFormat } from "@/lib/acta/actaMapper";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON body" },
        { status: 400 }
      );
    }

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Body must be a JSON object" },
        { status: 400 }
      );
    }

    const pdf = await generateActaPdf(body as Acta | PdfActaFormat);
    return new Response(pdf as unknown as BodyInit, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="acta.pdf"',
      },
    });
  } catch (error) {
    console.error("[generate-acta]", error);

    const message =
      error instanceof Error ? error.message : "AI processing failed";

    const isJsonError =
      message.includes("invalid JSON") || message.includes("Invalid acta structure");
    const status = isJsonError ? 422 : 500;

    return NextResponse.json(
      { success: false, error: message },
      { status }
    );
  }
}