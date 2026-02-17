"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

const pageStyle = { backgroundColor: "var(--color-bg-base)" };

const faqCategories = [
  {
    category: "Uso básico",
    questions: [
      {
        question: "¿Qué tipo de archivos puedo subir?",
        answer:
          "Aceptamos archivos de audio (.mp3, .wav, .m4a, .webm, .ogg, .flac) y documentos de texto (.txt, .docx). También puedes pegar directamente la transcripción en el editor.",
      },
      {
        question: "¿Cuánto tarda en generarse un acta?",
        answer:
          "El proceso completo toma menos de 2 minutos: transcripción del audio (si aplica) + estructuración con IA + generación del PDF. Archivos de texto se procesan en menos de 30 segundos.",
      },
      {
        question: "¿En qué formato recibo el acta?",
        answer:
          "Recibes un PDF profesional con formato legal estándar, listo para firmar y compartir. Incluye todas las secciones obligatorias: participantes, orden del día, acuerdos, votaciones y tareas.",
      },
      {
        question: "¿Cuál es el límite de tamaño de archivo?",
        answer:
          "Para archivos de audio, el límite es 25MB (aproximadamente 3 horas de grabación). Para documentos de texto, no hay límite práctico.",
      },
    ],
  },
  {
    category: "Transcripción de audio",
    questions: [
      {
        question: "¿Qué tan precisa es la transcripción?",
        answer:
          "Usamos Whisper de OpenAI, uno de los mejores sistemas de transcripción del mercado. La precisión es superior al 95% con audio de calidad normal. Funciona mejor con grabaciones claras y en español estándar.",
      },
      {
        question: "¿Soporta múltiples idiomas?",
        answer:
          "Actualmente optimizado para español (España y Latinoamérica) y catalán. La transcripción detecta automáticamente el idioma del audio.",
      },
      {
        question: "¿Puede distinguir entre diferentes personas?",
        answer:
          "La transcripción convierte todo el audio a texto sin identificar hablantes específicos. La IA luego analiza el contenido para extraer participantes mencionados por nombre.",
      },
    ],
  },
  {
    category: "Planes y precios",
    questions: [
      {
        question: "¿Hay un plan gratuito?",
        answer:
          "Sí, el plan Free incluye 3 actas al mes con todas las funciones básicas: transcripción de audio, estructuración con IA y exportación en PDF. No requiere tarjeta de crédito.",
      },
      {
        question: "¿Puedo cancelar mi suscripción en cualquier momento?",
        answer:
          "Sí, puedes cancelar cuando quieras. Tu plan seguirá activo hasta el final del periodo de facturación actual, sin cargos adicionales.",
      },
      {
        question: "¿Ofrecen descuentos para ONGs o educación?",
        answer:
          "Sí, ofrecemos descuentos del 50% para organizaciones sin ánimo de lucro e instituciones educativas. Contáctanos con documentación acreditativa.",
      },
    ],
  },
  {
    category: "Privacidad y seguridad",
    questions: [
      {
        question: "¿Mis datos están seguros?",
        answer:
          "Sí. Los archivos se procesan de forma segura y se eliminan automáticamente después de generar el acta. No almacenamos tus documentos ni transcripciones en nuestros servidores.",
      },
      {
        question: "¿Quién puede ver mis actas?",
        answer:
          "Solo tú. Las actas se generan y descargan directamente en tu navegador. No las almacenamos ni las compartimos con terceros.",
      },
      {
        question: "¿Cumplen con GDPR?",
        answer:
          "Sí, cumplimos con el Reglamento General de Protección de Datos (GDPR). Procesamos datos solo para generar el acta y los eliminamos inmediatamente después.",
      },
    ],
  },
  {
    category: "Técnico",
    questions: [
      {
        question: "¿Qué tecnología IA utilizan?",
        answer:
          "Usamos Groq LLaMA 3.1 para estructuración de contenido y Whisper (OpenAI) para transcripción de audio. Son modelos líderes en la industria para procesamiento de lenguaje natural.",
      },
      {
        question: "¿Funciona sin conexión?",
        answer:
          "No, requiere conexión a internet para procesar el audio y generar el acta mediante nuestros servidores de IA.",
      },
      {
        question: "¿Puedo integrar Noah con otras herramientas?",
        answer:
          "Los planes Enterprise incluyen acceso a nuestra API para integraciones personalizadas. Contáctanos para más información técnica.",
      },
    ],
  },
];

export default function FaqPage() {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggle = (key: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  return (
    <main className="min-h-screen" style={pageStyle}>
      {/* Hero */}
      <section className="container mx-auto max-w-4xl px-6 pt-[100px] pb-12 md:pb-16">
        <div className="text-center space-y-6">
          {/* Image Placeholder */}
          <div
            className="w-full max-w-[760px] h-[180px] mx-auto border-2 border-dashed rounded-lg flex items-center justify-center mb-8"
            style={{
              backgroundColor: "var(--color-surface-2)",
              borderColor: "var(--color-border-default)",
              borderRadius: "var(--radius-lg)",
            }}
          >
            <span
              style={{
                fontSize: "var(--text-sm)",
                color: "var(--color-text-secondary)",
              }}
            >
              760 × 180 px
            </span>
          </div>

          <h1
            className="max-w-[800px] mx-auto heading-xl"
            style={{
              color: "var(--color-text-primary)",
              letterSpacing: "var(--tracking-tight)",
            }}
          >
            Preguntas frecuentes
          </h1>
          <p
            className="max-w-2xl mx-auto"
            style={{
              fontSize: "var(--text-base)",
              color: "var(--color-text-secondary)",
            }}
          >
            Todo lo que necesitas saber sobre Noah. ¿No encuentras tu
            respuesta?{" "}
            <Link
              href="/contacto"
              className="font-medium hover:underline underline-offset-4"
              style={{
                color: "var(--color-accent-text)",
                fontWeight: "var(--weight-medium)",
              }}
            >
              Contáctanos
            </Link>
            .
          </p>
        </div>
      </section>

      {/* FAQ accordion by category */}
      <section className="container mx-auto max-w-4xl px-6 pb-20 md:pb-28">
        <div className="space-y-12">
          {faqCategories.map((cat, catIndex) => (
            <div key={catIndex} className="space-y-4">
              <h2
                className="text-xl font-bold border-b pb-3"
                style={{
                  fontSize: "var(--text-h4)",
                  fontWeight: "var(--weight-bold)",
                  color: "var(--color-text-primary)",
                  borderColor: "var(--color-border-subtle)",
                  paddingBottom: "var(--space-3)",
                }}
              >
                {cat.category}
              </h2>
              <div className="space-y-3">
                {cat.questions.map((faq, qIndex) => {
                  const key = `${catIndex}-${qIndex}`;
                  const isOpen = openItems.has(key);
                  return (
                    <div
                      key={key}
                      className="card overflow-hidden transition-colors"
                      style={{
                        border: "1px solid var(--color-border-subtle)",
                        borderRadius: "var(--radius-xl)",
                        backgroundColor: "var(--color-surface-1)",
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => toggle(key)}
                        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
                        aria-expanded={isOpen}
                      >
                        <span
                          className="font-medium pr-2"
                          style={{
                            color: "var(--color-text-primary)",
                            fontWeight: "var(--weight-medium)",
                          }}
                        >
                          {faq.question}
                        </span>
                        <ChevronDown
                          className={`size-5 shrink-0 transition-transform duration-200 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                          style={{ color: "var(--color-text-secondary)" }}
                        />
                      </button>
                      <div
                        className={`grid transition-[grid-template-rows] duration-200 ease-out ${
                          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <div className="px-6 pb-5">
                            <p
                              style={{
                                fontSize: "var(--text-sm)",
                                color: "var(--color-text-secondary)",
                                lineHeight: "var(--leading-relaxed)",
                              }}
                            >
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA section */}
      <section
        className="border-t"
        style={{
          borderColor: "var(--color-border-subtle)",
          backgroundColor: "var(--color-surface-2)",
        }}
      >
        <div className="container mx-auto max-w-4xl px-6 py-20 md:py-28">
          <div className="text-center space-y-6">
            <h2
              className="heading-lg"
              style={{ color: "var(--color-text-primary)" }}
            >
              ¿Listo para crear tu primera acta?
            </h2>
            <p
              className="max-w-xl mx-auto"
              style={{
                fontSize: "var(--text-base)",
                color: "var(--color-text-secondary)",
              }}
            >
              Empieza gratis y descubre lo fácil que es generar actas
              profesionales con IA.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button variant="primary" size="lg" href="/generar-acta">
                Generar acta gratis
              </Button>
              <Button variant="secondary" size="lg" href="/contacto">
                Contactar soporte
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
