"use client";

import {
  HeroSection1,
  LogosSection,
  FeaturesSection1,
  BentoSection1,
  TestimonialsSection1,
  PricingPreviewSection,
  FaqPreviewSection,
  CtaSection1,
} from "./sections";
import { Upload, Sparkles, Download, Check } from "lucide-react";

const STEPS = [
  {
    title: "Sube tu audio o documento",
    description:
      "Sube un audio de reunión (.mp3, .wav, .m4a) y lo transcribiremos automáticamente, o pega directamente la transcripción (.txt, .docx).",
    icon: <Upload className="size-7" strokeWidth={1.5} />,
  },
  {
    title: "Noah lo estructura automáticamente",
    description:
      "La información se organiza en un acta formal: participantes, orden del día, acuerdos y tareas.",
    icon: <Sparkles className="size-7" strokeWidth={1.5} />,
  },
  {
    title: "Descarga tu acta en PDF",
    description:
      "Obtén un PDF listo para compartir. Sin pasos extra ni formatos raros.",
    icon: <Download className="size-7" strokeWidth={1.5} />,
  },
];

const BENEFITS = [
  {
    title: "Ahorra tiempo",
    description: "De horas a segundos en la elaboración de actas.",
    icon: <Check className="size-5" strokeWidth={2} />,
  },
  {
    title: "Evita errores manuales",
    description: "Estructura consistente y sin olvidos.",
    icon: <Check className="size-5" strokeWidth={2} />,
  },
  {
    title: "Formato profesional",
    description: "Actas listas para compartir con cualquier equipo.",
    icon: <Check className="size-5" strokeWidth={2} />,
  },
  {
    title: "Ideal para equipos",
    description: "Escalable para managers y equipos de cualquier tamaño.",
    icon: <Check className="size-5" strokeWidth={2} />,
  },
];

export function LandingPage1() {
  return (
    <main
      className="min-h-screen"
      style={{ backgroundColor: "var(--color-bg-base)" }}
    >
      <HeroSection1
        title="Convierte tus reuniones en actas profesionales en segundos"
        description="Sube el audio de tu reunión o transcripción y genera automáticamente un acta clara, estructurada y lista para compartir con IA."
        primaryCta={{ label: "Generar acta ahora", href: "/generar-acta" }}
        secondaryCta={{ label: "Ver precios", href: "/pricing" }}
      />

      <LogosSection title="Confían en Noah" />

      <FeaturesSection1
        title="Cómo funciona"
        subtitle="Tres pasos y listo."
        features={STEPS}
      />

      <BentoSection1
        title="Por qué Noah"
        subtitle="Menos trabajo manual, más claridad."
        cards={BENEFITS}
      />

      <TestimonialsSection1 />

      <section
        className="border-t"
        style={{
          borderColor: "var(--color-border-subtle)",
          backgroundColor: "var(--color-surface-2)",
        }}
      >
        <div
          className="container mx-auto max-w-4xl px-6 py-14 md:py-20 text-center"
          style={{
            paddingLeft: "var(--space-6)",
            paddingRight: "var(--space-6)",
            paddingTop: "var(--space-16)",
            paddingBottom: "var(--space-16)",
          }}
        >
          <p
            style={{
              fontSize: "var(--text-base)",
              color: "var(--color-text-secondary)",
            }}
          >
            Ya utilizado por equipos que quieren reuniones más eficientes
          </p>
        </div>
      </section>

      <PricingPreviewSection />

      <FaqPreviewSection />

      <CtaSection1
        title="Empieza ahora"
        description="Genera tu primera acta en menos de un minuto."
        ctaLabel="Generar acta ahora"
        ctaHref="/generar-acta"
      />
    </main>
  );
}
