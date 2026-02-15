import { z } from "zod";

export const ActaSchema = z.object({
  metadata: z.object({
    tipo_reunion: z.string().nullable(),
    comunidad: z.string().nullable(),
    direccion: z.string().nullable(),
    fecha_reunion: z.string().nullable(),
    hora_inicio: z.string().nullable(),
    hora_fin: z.string().nullable(),
    lugar: z.string().nullable(),
    idioma_acta: z
      .union([z.string(), z.null()])
      .transform((v) => v ?? "es"),
  }),

  participantes: z.object({
    presidente: z.string().nullable(),
    secretario: z.string().nullable(),
    administrador: z.string().nullable(),

    asistentes: z
      .union([
        z.array(
          z.object({
            nombre: z.string().nullable(),
            vivienda_o_coeficiente: z.string().nullable(),
            presente: z
              .union([z.boolean(), z.null(), z.undefined()])
              .transform((v) => v ?? true),
          })
        ),
        z.null(),
        z.undefined(),
      ])
      .transform((v) => v ?? []),

    representados: z
      .union([
        z.array(
          z.object({
            nombre: z.string().nullable(),
            representado_por: z.string().nullable(),
          })
        ),
        z.null(),
        z.undefined(),
      ])
      .transform((v) => v ?? []),
  }),

  orden_del_dia: z
    .union([
      z.array(
        z.object({
          punto: z
            .union([z.string(), z.number()])
            .nullable()
            .transform((v) => (v === null ? null : String(v))),
          descripcion: z.string().nullable(),
        })
      ),
      z.null(),
      z.undefined(),
    ])
    .transform((v) => v ?? []),

  desarrollo: z
    .union([
      z.array(
        z.object({
          punto: z
            .union([z.string(), z.number()])
            .nullable()
            .transform((v) => (v === null ? null : String(v))),
          resumen_discusion: z.string().nullable(),
        })
      ),
      z.null(),
      z.undefined(),
    ])
    .transform((v) => v ?? []),

  acuerdos: z
    .union([
      z.array(
        z.object({
          punto: z
            .union([z.string(), z.number()])
            .nullable()
            .transform((v) => (v === null ? null : String(v))),
          acuerdo: z.string().nullable(),
          resultado_votacion: z.string().nullable(),
      votos_a_favor: z
        .union([z.number(), z.string(), z.null()])
        .nullable()
        .transform((v) => {
          if (v === null || v === undefined) return null;
          const n = typeof v === "number" ? v : Number(v);
          return Number.isNaN(n) ? null : n;
        }),
      votos_en_contra: z
        .union([z.number(), z.string(), z.null()])
        .nullable()
        .transform((v) => {
          if (v === null || v === undefined) return null;
          const n = typeof v === "number" ? v : Number(v);
          return Number.isNaN(n) ? null : n;
        }),
      abstenciones: z
        .union([z.number(), z.string(), z.null()])
        .nullable()
        .transform((v) => {
          if (v === null || v === undefined) return null;
          const n = typeof v === "number" ? v : Number(v);
          return Number.isNaN(n) ? null : n;
        }),
          coeficiente_aprobacion: z
            .union([z.string(), z.number()])
            .nullable()
            .transform((v) => (v === null ? null : String(v))),
          aprobado: z.boolean().nullable(),
        })
      ),
      z.null(),
      z.undefined(),
    ])
    .transform((v) => v ?? []),

  tareas: z
    .union([
      z.array(
        z.object({
          descripcion: z.string().nullable(),
          responsable: z.string().nullable(),
          fecha_limite: z.string().nullable(),
          observaciones: z.string().nullable(),
        })
      ),
      z.null(),
      z.undefined(),
    ])
    .transform((v) => v ?? []),

  incidencias: z
    .union([
      z.array(
        z.object({
          descripcion: z.string().nullable(),
          requiere_seguimiento: z.boolean().nullable(),
        })
      ),
      z.null(),
      z.undefined(),
    ])
    .transform((v) => v ?? []),

  cierre: z
    .union([
      z.object({
        hora_cierre: z.string().nullable(),
        observaciones_finales: z.string().nullable(),
      }),
      z.null(),
      z.undefined(),
    ])
    .transform((v) => v ?? { hora_cierre: null, observaciones_finales: null }),

  firmas: z
    .union([
      z.object({
        presidente: z.string().nullable(),
        secretario: z.string().nullable(),
      }),
      z.null(),
      z.undefined(),
    ])
    .transform((v) => v ?? { presidente: null, secretario: null }),
});

export type Acta = z.infer<typeof ActaSchema>;
