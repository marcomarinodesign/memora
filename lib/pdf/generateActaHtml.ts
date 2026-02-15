/**
 * Single HTML template for acta PDFs. Renders only from PdfActaViewModel.
 * Sections: Header, Metadata, ORDEN DEL DÍA, ASISTENTES, ACUERDOS, FONDOS, Signature.
 * No free-form HTML injection; no raw concatenation of AI output — every value is escaped.
 */
import type { PdfActaViewModel } from "./actaPdfViewModel";

export const ACTA_HEADER_PLACEHOLDER = "{{ACTA_HEADER_IMG}}";

function escapeHtml(text: unknown): string {
  if (text == null || text === "") return "";
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Fixed opening sentence (ES): placeholders replaced with escaped vm fields only */
function buildOpeningParagraphEs(vm: PdfActaViewModel): string {
  const l = escapeHtml(vm.lugar);
  const f = escapeHtml(vm.fecha);
  const h = escapeHtml(vm.horaInicio);
  const n = escapeHtml(vm.nombreComunidad);
  const d = escapeHtml(vm.direccion);
  const ni = escapeHtml(vm.nif);
  const p = escapeHtml(vm.presidente);
  const s = escapeHtml(vm.secretario);
  return `A ${l}, a ${f}, siendo las ${h} horas, se celebra debidamente convocada la Junta General Ordinaria de la Comunidad de Propietarios <strong>${n}</strong>, con domicilio en ${d} y NIF ${ni}, bajo la presidencia de D./Dña. ${p} y actuando como Secretario-Administrador ${s}, desarrollándose la sesión bajo el siguiente orden del día:`;
}

/** Fixed opening sentence (CA): placeholders replaced with escaped vm fields only */
function buildOpeningParagraphCa(vm: PdfActaViewModel): string {
  const l = escapeHtml(vm.lugar);
  const f = escapeHtml(vm.fecha);
  const h = escapeHtml(vm.horaInicio);
  const n = escapeHtml(vm.nombreComunidad);
  const d = escapeHtml(vm.direccion);
  const ni = escapeHtml(vm.nif);
  const p = escapeHtml(vm.presidente);
  const s = escapeHtml(vm.secretario);
  return `A ${l}, a ${f}, essent les ${h} hores, es celebra degudament convocada la Junta General Ordinària de la Comunitat de Propietaris <strong>${n}</strong>, amb domicili a ${d} i NIF ${ni}, sota la presidència de D./Dna. ${p} i actuant com a Secretari-Administrador ${s}, desenvolupant-se la sessió segons el següent ordre del dia:`;
}

/** Centralized PDF layout: A4, fixed header. Body padding-top reserves space so header does not overlap (avoids Puppeteer margin issues). */
const LAYOUT_STYLES = `
  @page { size: A4; margin: 25mm; }
  * { box-sizing: border-box; }
  body {
    margin: 0 auto;
    padding-top: 140px;
    padding-right: 25mm;
    padding-bottom: 25mm;
    padding-left: 25mm;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 11pt;
    line-height: 1.5;
    color: #1a1a1a;
    max-width: 210mm;
  }
  .pdf-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 120px;
  }
  .pdf-header .acta-header-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: top center;
    display: block;
  }
  .narrative {
    text-align: justify;
    margin-bottom: 1em;
    text-indent: 1.5em;
  }
  .narrative:first-of-type { text-indent: 0; }
  .narrative.quorum { margin-top: 0.75em; font-style: italic; }
  .section { margin-bottom: 1.25em; }
  .section-title {
    font-size: 12pt;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin: 1.25em 0 0.75em 0;
    color: #1a1a1a;
  }
  .orden-dia-list { margin: 0.5em 0 0 1.5em; padding: 0; }
  .orden-item { margin-bottom: 0.4em; }
  .table {
    width: 100%;
    border-collapse: collapse;
    font-size: 10pt;
    margin-top: 0.5em;
  }
  .table th, .table td {
    border: 1px solid #333;
    padding: 6px 10px;
    text-align: left;
  }
  .table th { background: #f8f8f8; font-weight: bold; }
  .acuerdo-block { margin-bottom: 1em; text-align: justify; text-indent: 0; page-break-inside: avoid; }
  .acuerdo-block .ordinal { font-weight: bold; margin-right: 0.25em; }
  .acuerdo-resumen, .acuerdo-resultado { display: inline; }
  .cierre { margin-top: 1.5em; }
  .firmas-section { margin-top: 2.5em; padding-top: 2em; }
  .firmas-grid {
    display: flex;
    justify-content: space-between;
    gap: 40mm;
    margin-top: 2em;
  }
  .firma-block { flex: 1; max-width: 70mm; }
  .firma-line {
    border-bottom: 1px solid #1a1a1a;
    height: 2em;
    margin-bottom: 0.5em;
  }
  .firma-label { font-size: 10pt; margin: 0; color: #444; }
  .firma-nombre { font-weight: bold; margin: 0.25em 0 0 0; }
  .titulo-principal {
    font-size: 14pt;
    font-weight: bold;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 1.5em;
  }
  .page-break-inside-avoid { page-break-inside: avoid; }
  @media print {
    body { padding: 140px 0 0 0; }
    .section { page-break-inside: avoid; }
  }
`;

/**
 * Renders the acta PDF HTML from the structured view model only.
 * Each section is explicit; every value from the view model is escaped — no raw AI text.
 */
export function generateActaHtml(vm: PdfActaViewModel): string {
  const e = escapeHtml;
  const openingParagraph = vm.idioma === "ca" ? buildOpeningParagraphCa(vm) : buildOpeningParagraphEs(vm);

  // ORDEN DEL DÍA — list of strings, each escaped
  const ordenDiaItems =
    vm.ordenDia.length > 0
      ? vm.ordenDia.map((titulo) => `<li class="orden-item">${e(titulo)}</li>`).join("")
      : "";
  const ordenDiaSection =
    vm.ordenDia.length > 0
      ? `
    <section class="section page-break-inside-avoid">
      <h2 class="section-title">${e(vm.labelOrdenDia)}</h2>
      <ol class="orden-dia-list">${ordenDiaItems}</ol>
    </section>`
      : "";

  // ASISTENTES — table, each cell escaped
  const asistentesRows = vm.asistentes.map(
    (a) =>
      `<tr><td>${e(a.departamento)}</td><td>${e(a.coeficiente)}</td><td>${e(a.propietario)}</td><td>${e(a.representante)}</td></tr>`
  ).join("");
  const asistentesHeaders = vm.tableAsistentesHeaders.map((h) => `<th>${e(h)}</th>`).join("");
  const asistentesSection =
    vm.asistentes.length > 0
      ? `
    <section class="section page-break-inside-avoid">
      <h2 class="section-title">${e(vm.labelAsistentes)}</h2>
      <p class="narrative">${e(vm.asistentesIntro)}</p>
      <table class="table">
        <thead><tr>${asistentesHeaders}</tr></thead>
        <tbody>${asistentesRows}</tbody>
      </table>
      <p class="narrative quorum">${e(vm.quorum)}</p>
    </section>`
      : "";

  // ACUERDOS — each item: ordinal, resumen, decisiones, resultado as separate escaped fields (no concatenation)
  const acuerdosBlocks = vm.acuerdos.map((a) => {
    const resumenPart = a.resumen ? `<span class="acuerdo-resumen">${e(a.resumen)}</span>` : "";
    const decisionesPart = a.decisiones ? ` <span class="acuerdo-decisiones">${e(a.decisiones)}</span>` : "";
    const resultadoPart = `<span class="acuerdo-resultado"> ${e(a.resultado)}</span>`;
    return `<div class="acuerdo-block">
        <span class="ordinal">${e(a.ordinalLabel)}.-</span>
        ${resumenPart}${decisionesPart}${resultadoPart}
      </div>`;
  }).join("");
  const acuerdosSection =
    vm.acuerdos.length > 0
      ? `
    <section class="section">
      <h2 class="section-title">${e(vm.labelAcuerdos)}</h2>
      ${acuerdosBlocks}
    </section>`
      : "";

  // FONDOS — table, each cell escaped
  const fondosRows = vm.fondos.map(
    (f) =>
      `<tr><td>${e(f.nombre)}</td><td>${e(f.saldoAnterior)}</td><td>${e(f.ingresos)}</td><td>${e(f.gastos)}</td><td>${e(f.saldoActual)}</td></tr>`
  ).join("");
  const fondosHeaders = vm.tableFondosHeaders.map((h) => `<th>${e(h)}</th>`).join("");
  const fondosSection =
    vm.fondos.length > 0
      ? `
    <section class="section page-break-inside-avoid">
      <h2 class="section-title">${e(vm.labelFondos)}</h2>
      <table class="table">
        <thead><tr>${fondosHeaders}</tr></thead>
        <tbody>${fondosRows}</tbody>
      </table>
    </section>`
      : "";

  // Closing — single string from view model (already built from fixed template + horaFin)
  const cierreParagraph = `<p class="narrative cierre">${e(vm.closing)}</p>`;

  // Signature — fixed labels + escaped names
  const firmasSection = `
    <section class="firmas-section page-break-inside-avoid">
      <div class="firmas-grid">
        <div class="firma-block">
          <div class="firma-line"></div>
          <p class="firma-label">${e(vm.labelPresidente)}</p>
          <p class="firma-nombre">${e(vm.presidenteFirma)}</p>
        </div>
        <div class="firma-block">
          <div class="firma-line"></div>
          <p class="firma-label">${e(vm.labelSecretario)}</p>
          <p class="firma-nombre">${e(vm.secretarioFirma)}</p>
        </div>
      </div>
    </section>`;

  return `<!DOCTYPE html>
<html lang="${e(vm.idioma)}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${e(vm.pageTitle)}</title>
  <style>${LAYOUT_STYLES}</style>
</head>
<body>
  <header class="pdf-header">
    ${ACTA_HEADER_PLACEHOLDER}
  </header>
  <main class="pdf-content">
    <h1 class="titulo-principal">${e(vm.titulo)}</h1>
    <p class="narrative">${openingParagraph}</p>
    ${ordenDiaSection}
    ${asistentesSection}
    ${acuerdosSection}
    ${fondosSection}
    ${cierreParagraph}
    ${firmasSection}
  </main>
</body>
</html>`;
}
