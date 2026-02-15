/**
 * Maps AI-structured acta output to the legal PDF format expected by generateActaHtml.
 * Does not modify generateActaHtml or the AI template.
 */

import type { Acta } from "@/app/schema/acta.schema";

export interface PdfActaFormat {
  idioma: string;
  comunidad: {
    nombre: string | null;
    direccion: string | null;
    nif: string | null;
    ciudad: string | null;
  };
  cabecera: {
    fecha: string | null;
    hora_inicio: string | null;
    presidente: string | null;
    secretario: string | null;
  };
  orden_dia: Array<{ punto_id: number; titulo: string | null }>;
  asistentes: Array<{
    departamento: string | null;
    coeficiente: string | number | null;
    propietario: string | null;
    representante: string | null;
  }>;
  acuerdos: Array<{
    punto_id: number;
    resumen: string | null;
    decisiones: string[];
    resultado: string | null;
  }>;
  fondos: Array<Record<string, unknown>>;
  cargos: {
    presidente: string | null;
    vicepresidente: string | null;
    secretario_admin: string | null;
  };
  cierre: {
    hora_fin: string | null;
  };
}

export function mapStructuredActaToPdfFormat(aiData: Acta): PdfActaFormat {
  const metadata = aiData.metadata ?? {};
  const participantes = aiData.participantes ?? {};
  const ordenDelDia = aiData.orden_del_dia ?? [];
  const acuerdos = aiData.acuerdos ?? [];
  const cierre = aiData.cierre ?? {};
  const firmas = aiData.firmas ?? {};

  const idioma = metadata.idioma_acta === "ca" ? "ca" : "es";

  const comunidad = {
    nombre: metadata.comunidad ?? null,
    direccion: metadata.direccion ?? null,
    nif: null as string | null,
    ciudad: metadata.lugar ?? null,
  };

  const cabecera = {
    fecha: metadata.fecha_reunion ?? null,
    hora_inicio: metadata.hora_inicio ?? null,
    presidente: participantes.presidente ?? firmas.presidente ?? null,
    secretario: participantes.secretario ?? firmas.secretario ?? null,
  };

  const orden_dia = ordenDelDia.map((p, i) => ({
    punto_id: i + 1,
    titulo: p.descripcion ?? p.punto ?? null,
  }));

  const asistentesFromList = (participantes.asistentes ?? []).map((a) => ({
    departamento: a.vivienda_o_coeficiente ?? null,
    coeficiente: a.vivienda_o_coeficiente ?? null,
    propietario: a.nombre ?? null,
    representante: "" as string | null,
  }));

  const representados = (participantes.representados ?? []).map((r) => ({
    departamento: null as string | null,
    coeficiente: null as string | number | null,
    propietario: r.nombre ?? null,
    representante: r.representado_por ?? null,
  }));

  const asistentes = [...asistentesFromList, ...representados];

  const acuerdosMapped = acuerdos.map((a, i) => ({
    punto_id: i + 1,
    resumen: a.acuerdo ?? null,
    decisiones: a.resultado_votacion ? [a.resultado_votacion] : [],
    resultado: a.resultado_votacion ?? null,
  }));

  const cargos = {
    presidente: participantes.presidente ?? firmas.presidente ?? null,
    vicepresidente: "" as string | null,
    secretario_admin: participantes.secretario ?? firmas.secretario ?? null,
  };

  const horaFin = cierre.hora_cierre ?? metadata.hora_fin ?? null;

  const cierreMapped = {
    hora_fin: horaFin,
  };

  return {
    idioma,
    comunidad,
    cabecera,
    orden_dia,
    asistentes,
    acuerdos: acuerdosMapped,
    fondos: [],
    cargos,
    cierre: cierreMapped,
  };
}
