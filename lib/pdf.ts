// lib/pdf.ts
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import type { Acta } from "@/app/schema/acta.schema";

const ORGAN_LOGO_URL =
  "https://www.totsantcugat.cat/uploads/s1/12/44/19/47/72logo-organ.jpeg";

let organLogoBytesPromise: Promise<Uint8Array> | null = null;
async function getOrganLogoBytes(): Promise<Uint8Array> {
  if (!organLogoBytesPromise) {
    organLogoBytesPromise = (async () => {
      const res = await fetch(ORGAN_LOGO_URL);
      if (!res.ok) {
        throw new Error(`Failed to fetch logo: ${res.status}`);
      }
      const buf = await res.arrayBuffer();
      return new Uint8Array(buf);
    })();
  }
  return organLogoBytesPromise;
}

export async function generateActaPDF(acta: Acta, notes?: string) {
  const pdfDoc = await PDFDocument.create();
  let page = pdfDoc.addPage([595, 842]); // A4
  let { width, height } = page.getSize();

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const bold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const marginX = 50;
  const topMargin = 50;
  const bottomMargin = 50;
  const maxWidth = width - marginX * 2;

  let y = height - topMargin;

  const newPage = () => {
    page = pdfDoc.addPage([595, 842]);
    ({ width, height } = page.getSize());
    y = height - topMargin;
  };

  const ensureSpace = (needed: number) => {
    if (y - needed < bottomMargin) newPage();
  };

  const drawText = (text: string, size = 11, isBold = false, x = marginX) => {
    ensureSpace(size + 6);
    page.drawText(text, {
      x,
      y,
      size,
      font: isBold ? bold : font,
      color: rgb(0, 0, 0),
    });
    y -= size + 6;
  };

  const drawWrappedText = (text: string, size = 11, isBold = false) => {
    const f = isBold ? bold : font;
    const paragraphs = text.split(/\r?\n/);
    for (const para of paragraphs) {
      const trimmed = para.trimEnd();
      if (!trimmed) {
        // blank line
        y -= size + 6;
        continue;
      }

      const words = trimmed.split(/\s+/);
      let line = "";
      for (const word of words) {
        const testLine = line ? `${line} ${word}` : word;
        const testWidth = f.widthOfTextAtSize(testLine, size);
        if (testWidth <= maxWidth) {
          line = testLine;
          continue;
        }

        if (line) drawText(line, size, isBold);
        line = word;
      }
      if (line) drawText(line, size, isBold);
    }
  };

  // --- HEADER ---
  let headerX = marginX;
  let logoBottomY: number | null = null;
  try {
    const logoBytes = await getOrganLogoBytes();
    const logo = await pdfDoc.embedJpg(logoBytes);
    const dims = logo.scaleToFit(90, 48);
    const logoX = marginX;
    const logoY = height - topMargin - dims.height;
    logoBottomY = logoY;
    page.drawImage(logo, {
      x: logoX,
      y: logoY,
      width: dims.width,
      height: dims.height,
    });
    headerX = logoX + dims.width + 12;
  } catch {
    // If the logo can't be fetched/embedded, keep generating the PDF.
  }

  drawText("ACTA DE REUNIÓN", 18, true, headerX);
  y -= 6;

  drawText(`Comunidad: ${acta.metadata.comunidad ?? "-"}`, 12, false, headerX);
  drawText(`Fecha: ${acta.metadata.fecha_reunion ?? "-"}`, 12, false, headerX);
  drawText(
    `Tipo de reunión: ${acta.metadata.tipo_reunion ?? "-"}`,
    12,
    false,
    headerX
  );

  y -= 20;
  if (logoBottomY !== null) {
    y = Math.min(y, logoBottomY - 10);
  }

  // --- PARTICIPANTES ---
  drawText("Participantes", 14, true);

  if (acta.participantes.presidente) {
    drawText(`Presidente: ${acta.participantes.presidente}`);
  }
  if (acta.participantes.secretario) {
    drawText(`Secretario: ${acta.participantes.secretario}`);
  }

  y -= 10;

  // --- ORDEN DEL DÍA ---
  drawText("Orden del día", 14, true);
  acta.orden_del_dia.forEach((item, i) => {
    drawText(`${i + 1}. ${item.descripcion ?? "-"}`);
  });

  y -= 10;

  // --- ACUERDOS ---
  drawText("Acuerdos", 14, true);
  acta.acuerdos.forEach((a, i) => {
    drawText(`${i + 1}. ${a.acuerdo ?? "-"}`);
  });

  y -= 20;

  // --- NOTAS (texto adicional del usuario) ---
  if (notes?.trim()) {
    drawText("Notas", 14, true);
    drawWrappedText(notes.trim(), 11, false);
    y -= 20;
  }

  // --- FIRMAS ---
  drawText("Firmas", 14, true);
  drawText(`Presidente: ${acta.firmas.presidente ?? "____________________"}`);
  y -= 20;
  drawText(`Secretario: ${acta.firmas.secretario ?? "____________________"}`);

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}