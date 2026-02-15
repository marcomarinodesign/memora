/**
 * Single authoritative PDF generation pipeline for legal actas.
 * All PDF output (Home CTA, /acta page, any API) must go through this module.
 *
 * Flow: (Acta or PdfActaFormat) → normalized PdfActaFormat → HTML → Puppeteer → Buffer
 */
import type { Acta } from "@/app/schema/acta.schema";
import { mapStructuredActaToPdfFormat } from "@/lib/acta/actaMapper";
import type { PdfActaFormat } from "@/lib/acta/actaMapper";
import { generateActaHtml } from "@/lib/generateActaHtml";
import { launchBrowser } from "@/lib/puppeteer";

function isActaShape(data: unknown): data is Acta {
  if (!data || typeof data !== "object") return false;
  const o = data as Record<string, unknown>;
  return Array.isArray(o.orden_del_dia) && "metadata" in o && "participantes" in o;
}

/**
 * Renders HTML to PDF via Puppeteer. Shared by both pipeline entry points.
 */
async function htmlToPdfBuffer(html: string): Promise<Buffer> {
  const browser = await launchBrowser();
  try {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });
    const pdf = await page.pdf({ format: "A4", printBackground: true });
    return Buffer.from(pdf);
  } finally {
    await browser.close();
  }
}

/**
 * Single entry point for legal acta PDF generation.
 * - If input is AI-structured Acta (orden_del_dia, metadata, participantes): maps to PDF format, then HTML → PDF.
 * - If input is already in PDF display format (orden_dia, cabecera, etc.): generates HTML → PDF directly.
 *
 * @param aiStructuredData - Either Acta (from AI) or PdfActaFormat (e.g. from /acta page)
 * @returns PDF file as Buffer
 */
export async function generateLegalActaPdf(
  aiStructuredData: Acta | PdfActaFormat
): Promise<Buffer> {
  const mapped: PdfActaFormat = isActaShape(aiStructuredData)
    ? mapStructuredActaToPdfFormat(aiStructuredData as Acta)
    : (aiStructuredData as PdfActaFormat);

  const html = generateActaHtml({ ...mapped });
  return htmlToPdfBuffer(html);
}
