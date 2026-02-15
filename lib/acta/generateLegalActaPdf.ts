/**
 * Re-exports the unified PDF engine. All acta PDF generation lives in @/lib/pdf/generatePdf.
 * @deprecated Prefer importing generateActaPdf from "@/lib/pdf/generatePdf"
 */
export { generateActaPdf as generateLegalActaPdf } from "@/lib/pdf/generatePdf";
