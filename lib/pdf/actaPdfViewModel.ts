/**
 * Structured view model for the acta PDF template.
 * AI output is transformed into this shape; the template only renders these fields.
 * No free-form text or HTML from AI — every value is a discrete, escaped-safe string or array of such.
 */
import type { PdfActaFormat } from "@/lib/acta/actaMapper";

export interface PdfActaAsistenteRow {
  departamento: string;
  coeficiente: string;
  propietario: string;
  representante: string;
}

export interface PdfActaAcuerdoRow {
  puntoId: number;
  ordinalLabel: string;
  resumen: string;
  /** Voting/details text: single preformatted string (no concatenation in template) */
  decisiones: string;
  resultado: string;
}

export interface PdfActaFondoRow {
  nombre: string;
  saldoAnterior: string;
  ingresos: string;
  gastos: string;
  saldoActual: string;
}

export interface PdfActaViewModel {
  idioma: "es" | "ca";
  titulo: string;
  pageTitle: string;
  fecha: string;
  lugar: string;
  horaInicio: string;
  horaFin: string;
  nombreComunidad: string;
  direccion: string;
  nif: string;
  presidente: string;
  secretario: string;
  ordenDia: string[];
  asistentes: PdfActaAsistenteRow[];
  acuerdos: PdfActaAcuerdoRow[];
  fondos: PdfActaFondoRow[];
  presidenteFirma: string;
  secretarioFirma: string;
  /** Fixed copy: "ORDEN DEL DÍA" / "ORDRE DEL DIA" */
  labelOrdenDia: string;
  labelAsistentes: string;
  labelAcuerdos: string;
  labelFondos: string;
  labelPresidente: string;
  labelSecretario: string;
  asistentesIntro: string;
  quorum: string;
  closing: string;
  tableAsistentesHeaders: [string, string, string, string];
  tableFondosHeaders: [string, string, string, string, string];
}

function safeStr(val: unknown): string {
  return val != null && val !== "" ? String(val).trim() : "-";
}

function formatDate(isoDate: string, lang: "es" | "ca"): string {
  if (!isoDate) return "";
  const d = new Date(isoDate + "T12:00:00");
  if (Number.isNaN(d.getTime())) return "";
  const monthsEs = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
  ];
  const monthsCa = [
    "gener", "febrer", "març", "abril", "maig", "juny",
    "juliol", "agost", "setembre", "octubre", "novembre", "desembre",
  ];
  const months = lang === "ca" ? monthsCa : monthsEs;
  return `${d.getDate()} de ${months[d.getMonth()]} de ${d.getFullYear()}`;
}

const ORDINALS_ES = [
  "PRIMERO", "SEGUNDO", "TERCERO", "CUARTO", "QUINTO", "SEXTO",
  "SÉPTIMO", "OCTAVO", "NOVENO", "DÉCIMO", "UNDÉCIMO", "DUODÉCIMO",
  "DECIMOTERCERO", "DECIMOCUARTO", "DECIMOQUINTO", "DECIMOSEXTO",
  "DECIMOSÉPTIMO", "DECIMOCTAVO", "DECIMONOVENO", "VIGÉSIMO",
];

const ORDINALS_CA = [
  "PRIMER", "SEGON", "TERCER", "QUART", "CINQUÈ", "SISÈ",
  "SETÈ", "VUITÈ", "NOUÈ", "DÈCIM", "ONZÈ", "DOTZÈ",
  "TRENZÈ", "CATORZÈ", "QUINZÈ", "SETZÈ", "DISSETÈ", "DIVUITÈ",
  "DINOVÈ", "VINTÈ",
];

function ordinal(n: number, lang: "es" | "ca"): string {
  const list = lang === "ca" ? ORDINALS_CA : ORDINALS_ES;
  return list[n - 1] ?? (lang === "ca" ? `NÚMERO ${n}` : `NÚMERO ${n}`);
}

function resultadoToNarrative(resultado: string, lang: "es" | "ca"): string {
  const r = String(resultado).toLowerCase().trim();
  if (lang === "es") {
    if (r.includes("unanimidad") || r === "unanimidad") return "se acuerda por unanimidad";
    if (r.includes("mayoría") || r.includes("mayoria")) return "se acuerda por mayoría";
    if (r.includes("mayoría absoluta")) return "se acuerda por mayoría absoluta";
    if (r.includes("mayoría simple")) return "se acuerda por mayoría simple";
    if (r) return `se acuerda (${resultado})`;
    return "se acuerda";
  }
  if (lang === "ca") {
    if (r.includes("unanimidad") || r === "unanimidad" || r.includes("unanimitat")) return "s'acorda per unanimitat";
    if (r.includes("mayoría") || r.includes("mayoria") || r.includes("majoria")) return "s'acorda per majoria";
    if (r.includes("mayoría absoluta") || r.includes("majoria absoluta")) return "s'acorda per majoria absoluta";
    if (r.includes("mayoría simple") || r.includes("majoria simple")) return "s'acorda per majoria simple";
    if (r) return `s'acorda (${resultado})`;
    return "s'acorda";
  }
  return lang === "ca" ? "s'acorda" : "se acuerda";
}

const TEXTS = {
  es: {
    title: "ACTA DE REUNIÓN",
    pageTitle: "Acta de reunión",
    ordenDelDiaTitle: "ORDEN DEL DÍA",
    asistentesTitle: "ASISTENTES",
    acuerdosTitle: "ACUERDOS",
    fondosTitle: "FONDOS",
    presidenteLabel: "El Presidente",
    secretarioLabel: "El Secretario",
    asistentesIntro: "Asisten a la reunión las siguientes entidades:",
    quorum: "Se constata que concurren propietarios que representan suficiente coeficiente de participación para la válida constitución de la Junta, quedando ésta válidamente constituida.",
    closing: (horaFin: string) =>
      `Y no habiendo más asuntos que tratar, se levanta la sesión a las ${horaFin} horas, ` +
      `extendiéndose la presente acta que, leída y aprobada, es firmada por el Presidente y el Secretario en prueba de conformidad, conforme a lo previsto en el artículo 553-27 del C.C.C.`,
    tableAsistentes: ["Departamento", "Coeficiente", "Propietario", "Representante"] as const,
    tableFondos: ["Fondo", "Saldo anterior", "Ingresos", "Gastos", "Saldo actual"] as const,
  },
  ca: {
    title: "ACTA DE REUNIÓ",
    pageTitle: "Acta de reunió",
    ordenDelDiaTitle: "ORDRE DEL DIA",
    asistentesTitle: "ASSISTENTS",
    acuerdosTitle: "ACORDS",
    fondosTitle: "FONS",
    presidenteLabel: "El President",
    secretarioLabel: "El Secretari",
    asistentesIntro: "Assisteixen a la reunió les següents entitats:",
    quorum: "Es constata que concorren propietaris que representen suficient coeficient de participació per a la vàlida constitució de la Junta, quedant aquesta vàlidament constituïda.",
    closing: (horaFin: string) =>
      `I no havent-hi més assumptes a tractar, es lleva la sessió a les ${horaFin} hores, ` +
      `estenent-se la present acta que, llegida i aprovada, és signada pel President i el Secretari en prova de conformitat, d'acord amb el previst a l'article 553-27 del C.C.C.`,
    tableAsistentes: ["Departament", "Coeficient", "Propietari", "Representant"] as const,
    tableFondos: ["Fons", "Saldo anterior", "Ingressos", "Despeses", "Saldo actual"] as const,
  },
} as const;

/**
 * Transforms PdfActaFormat (from AI or pre-mapped) into the strict view model.
 * All narrative/formatting is done here; output contains only display-ready strings.
 * No HTML; no raw concatenation of AI text — each field is a single value for the template.
 * @throws If data is null or undefined (e.g. invalid API payload or direct caller mistake)
 */
export function toPdfActaViewModel(data: PdfActaFormat): PdfActaViewModel {
  if (data == null || typeof data !== "object") {
    throw new Error("toPdfActaViewModel requires a non-null object (PdfActaFormat).");
  }
  const idioma = (data.idioma === "ca" ? "ca" : "es") as "es" | "ca";
  const t = TEXTS[idioma];

  const comunidad = data.comunidad ?? {};
  const cabecera = data.cabecera ?? {};
  const cierre = data.cierre ?? {};
  const orden_dia = Array.isArray(data.orden_dia) ? data.orden_dia : [];
  const asistentes = Array.isArray(data.asistentes) ? data.asistentes : [];
  const acuerdos = Array.isArray(data.acuerdos) ? data.acuerdos : [];
  const fondos = Array.isArray(data.fondos) ? data.fondos : [];
  const cargos = data.cargos ?? {};

  const fecha = formatDate(safeStr(cabecera.fecha), idioma);
  const horaFin = safeStr(cierre.hora_fin);
  const closing = t.closing(horaFin);

  const ordenDia: string[] = orden_dia.map((p) => safeStr(p?.titulo ?? null));

  const asistentesRows: PdfActaAsistenteRow[] = asistentes.map((a) => ({
    departamento: safeStr(a?.departamento ?? null),
    coeficiente: safeStr(a?.coeficiente ?? null),
    propietario: safeStr(a?.propietario ?? null),
    representante: safeStr(a?.representante ?? null),
  }));

  const acuerdosRows: PdfActaAcuerdoRow[] = acuerdos.map((a, i) => {
    const puntoId = typeof a?.punto_id === "number" ? a.punto_id : i + 1;
    const resumen = safeStr(a?.resumen ?? null);
    const decisionesArr = Array.isArray(a?.decisiones) ? a.decisiones : [];
    const decisiones = decisionesArr
      .map((d) => (d != null && String(d).trim() !== "" ? String(d).trim() : null))
      .filter((s): s is string => s != null)
      .map((s) => (s.endsWith(".") ? s : s + "."))
      .join(" ");
    const resultadoRaw = safeStr(a?.resultado ?? null);
    const resultado = resultadoToNarrative(resultadoRaw, idioma);
    return {
      puntoId,
      ordinalLabel: ordinal(puntoId, idioma),
      resumen,
      decisiones,
      resultado: resultado + ".",
    };
  });

  const fondosRows: PdfActaFondoRow[] = fondos.map((f) => (f && typeof f === "object" ? {
    nombre: safeStr(f.nombre ?? null),
    saldoAnterior: safeStr(f.saldo_anterior ?? null),
    ingresos: safeStr(f.ingresos ?? null),
    gastos: safeStr(f.gastos ?? null),
    saldoActual: safeStr(f.saldo_actual ?? null),
  } : {
    nombre: "-",
    saldoAnterior: "-",
    ingresos: "-",
    gastos: "-",
    saldoActual: "-",
  }));

  return {
    idioma,
    titulo: t.title,
    pageTitle: t.pageTitle,
    fecha,
    lugar: safeStr(comunidad.ciudad ?? null),
    horaInicio: safeStr(cabecera.hora_inicio ?? null),
    horaFin,
    nombreComunidad: safeStr(comunidad.nombre ?? null),
    direccion: safeStr(comunidad.direccion ?? null),
    nif: safeStr(comunidad.nif ?? null),
    presidente: safeStr(cabecera.presidente ?? null),
    secretario: safeStr(cabecera.secretario ?? null),
    ordenDia,
    asistentes: asistentesRows,
    acuerdos: acuerdosRows,
    fondos: fondosRows,
    presidenteFirma: safeStr(cargos.presidente ?? null),
    secretarioFirma: safeStr(cargos.secretario_admin ?? null),
    labelOrdenDia: t.ordenDelDiaTitle,
    labelAsistentes: t.asistentesTitle,
    labelAcuerdos: t.acuerdosTitle,
    labelFondos: t.fondosTitle,
    labelPresidente: t.presidenteLabel,
    labelSecretario: t.secretarioLabel,
    asistentesIntro: t.asistentesIntro,
    quorum: t.quorum,
    closing,
    tableAsistentesHeaders: [...t.tableAsistentes],
    tableFondosHeaders: [...t.tableFondos],
  };
}
