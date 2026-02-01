import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Cómo funciona | memora",
  description: "Cómo funciona memora: de transcripción a acta en PDF en minutos.",
};

const steps = [
  {
    title: "Sube o pega la transcripción",
    description:
      "Añade un archivo (.txt o .docx) o pega el texto directamente. Puedes incluir notas extra para dar contexto.",
  },
  {
    title: "Genera el acta",
    description:
      "memora estructura la información en un acta formal siguiendo el formato definido (participantes, orden del día, acuerdos, tareas…).",
  },
  {
    title: "Descarga el PDF",
    description:
      "Obtén un PDF limpio y listo para compartir. Si necesitas afinar algo, ajusta la transcripción y vuelve a generar.",
  },
];

const faqs = [
  {
    q: "¿Qué formatos aceptáis?",
    a: "Actualmente: .txt y .docx, además de texto pegado en el formulario.",
  },
  {
    q: "¿Puedo añadir contexto adicional?",
    a: "Sí. Puedes añadir notas junto a la transcripción (asistentes, fecha, acuerdos, tareas, incidencias…).",
  },
  {
    q: "¿La información se inventa?",
    a: "No. Si un dato no aparece en la transcripción, se deja vacío o como null según el esquema.",
  },
  {
    q: "¿Se puede regenerar?",
    a: "Sí. Ajusta el texto y vuelve a generar hasta que el resultado sea el deseado.",
  },
];

export default function ComoFuncionaPage() {
  return (
    <div className="bg-background">
      <section className="container mx-auto px-6 pt-12 md:pt-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium text-muted-foreground">
            Cómo funciona
          </p>
          <h1 className="mt-3 heading-lg text-foreground">
            De transcripción a acta en PDF, sin fricción
          </h1>
          <p className="mt-4 text-base text-muted-foreground md:text-lg">
            Sube tu transcripción o pégala, genera el acta y descárgala en PDF.
            Diseñado para un resultado formal y claro.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild>
              <Link href="/#generator">Ir al generador</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/#pricing">Ver pricing</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-12 md:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-4 md:grid-cols-3 md:gap-6">
            {steps.map((s, idx) => (
              <div
                key={s.title}
                className="rounded-2xl border border-border bg-card p-6 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                    {idx + 1}
                  </div>
                  <h2 className="text-base font-semibold text-foreground">
                    {s.title}
                  </h2>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">
                  {s.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 pb-14 md:pb-20">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-3xl border border-border bg-muted p-6 md:p-10">
            <div className="text-center">
              <h2 className="heading-sm text-foreground">Preguntas frecuentes</h2>
              <p className="mt-3 text-sm text-muted-foreground md:text-base">
                Respuestas rápidas sobre formatos, calidad del resultado y
                regeneración.
              </p>
            </div>

            <div className="mt-8 grid gap-3 md:grid-cols-2">
              {faqs.map((f) => (
                <div
                  key={f.q}
                  className="rounded-2xl border border-border bg-card p-5"
                >
                  <p className="text-sm font-semibold text-foreground">{f.q}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild>
                <Link href="/#generator">Generar acta</Link>
              </Button>
              <Button variant="link" asChild>
                <Link href="/#contactos">Contactos</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

