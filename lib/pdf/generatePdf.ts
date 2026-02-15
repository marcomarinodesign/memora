/**
 * Single PDF generation engine. All acta PDFs (home CTA, acta page, API) use this.
 * Layout (header banner, margins, A4, typography) is applied here and in generateActaHtml.
 */
import fs from "fs/promises";
import path from "path";
import type { Acta } from "@/app/schema/acta.schema";
import { mapStructuredActaToPdfFormat } from "@/lib/acta/actaMapper";
import type { PdfActaFormat } from "@/lib/acta/actaMapper";
import { launchBrowser } from "@/lib/puppeteer";
import { toPdfActaViewModel } from "./actaPdfViewModel";
import {
  ACTA_HEADER_PLACEHOLDER,
  generateActaHtml,
} from "./generateActaHtml";

function isActaShape(data: unknown): data is Acta {
  if (!data || typeof data !== "object") return false;
  const o = data as Record<string, unknown>;
  return Array.isArray(o.orden_del_dia) && "metadata" in o && "participantes" in o;
}

/**
 * Loads Organ header image from public dir and returns a data-URI img tag.
 * Ensures the header renders in all environments (local + Vercel).
 * @throws Clear error if file is missing (e.g. ENOENT)
 */
async function getActaHeaderImgTag(): Promise<string> {
  const headerPath = path.join(process.cwd(), "public", "acta-header.png");
  try {
    const buffer = await fs.readFile(headerPath);
    const base64 = buffer.toString("base64");
    return `<img src="data:image/png;base64,${base64}" class="acta-header-img" alt="" style="width:100%; display:block;" />`;
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    if (message.includes("ENOENT") || message.includes("no such file")) {
      throw new Error(
        "Acta header image not found (public/acta-header.png). Ensure the file exists in the project."
      );
    }
    throw err;
  }
}

/**
 * Single function that turns HTML into a PDF buffer.
 * Centralized: A4, printBackground, margins, header injection, networkidle0.
 */
export async function htmlToPdf(html: string): Promise<Buffer> {
  const headerImgTag = await getActaHeaderImgTag();
  const htmlWithHeader = html.replace(ACTA_HEADER_PLACEHOLDER, headerImgTag);

  const browser = await launchBrowser();
  try {
    const page = await browser.newPage();
    await page.setContent(htmlWithHeader, { waitUntil: "networkidle0" });
    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "120px",
        bottom: "60px",
        left: "40px",
        right: "40px",
      },
    });
    return Buffer.from(pdf);
  } finally {
    await browser.close();
  }
}

/**
 * Single entry point for acta PDF generation.
 * Accepts either AI-structured Acta or pre-mapped PdfActaFormat; content is passed as structured JSON.
 * Uses the single HTML template and single PDF engine (no duplicated layout).
 *
 * @param data - Acta (from AI) or PdfActaFormat (e.g. from /acta page)
 * @returns PDF as Buffer
 */
export async function generateActaPdf(
  data: Acta | PdfActaFormat
): Promise<Buffer> {
  const mapped: PdfActaFormat = isActaShape(data)
    ? mapStructuredActaToPdfFormat(data as Acta)
    : (data as PdfActaFormat);

  const viewModel = toPdfActaViewModel(mapped);
  const html = generateActaHtml(viewModel);
  return htmlToPdf(html);
}
