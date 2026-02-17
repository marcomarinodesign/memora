"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail, MessageSquare, Clock } from "lucide-react";

type FormStatus = "idle" | "loading" | "success" | "error";

const inputClass =
  "input w-full";

export default function ContactoPage() {
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setStatus("success");

    // Reset form after 3 seconds
    setTimeout(() => {
      setStatus("idle");
      (e.target as HTMLFormElement).reset();
    }, 3000);
  };

  return (
    <main
      className="min-h-screen"
      style={{ backgroundColor: "var(--color-bg-base)" }}
    >
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
            Hablemos
          </h1>
          <p
            className="max-w-2xl mx-auto"
            style={{
              fontSize: "var(--text-base)",
              color: "var(--color-text-secondary)",
            }}
          >
            ¿Tienes preguntas sobre Noah? ¿Necesitas ayuda o quieres hablar
            de un plan Enterprise? Estamos aquí para ayudarte.
          </p>
        </div>
      </section>

      {/* Contact options + Form */}
      <section className="container mx-auto max-w-5xl px-6 pb-20 md:pb-28">
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Email */}
          <div
            className="card rounded-2xl p-6 text-center"
            style={{
              padding: "var(--space-6)",
              borderRadius: "var(--radius-2xl)",
              border: "1px solid var(--color-border-subtle)",
              backgroundColor: "var(--color-surface-1)",
            }}
          >
            <div
              className="inline-flex items-center justify-center size-12 rounded-xl mb-4"
              style={{
                width: "var(--space-12)",
                height: "var(--space-12)",
                borderRadius: "var(--radius-xl)",
                backgroundColor: "var(--color-info-subtle)",
                color: "var(--color-info-text)",
                marginBottom: "var(--space-4)",
              }}
            >
              <Mail className="size-6" />
            </div>
            <h3
              className="font-semibold mb-2"
              style={{
                color: "var(--color-text-primary)",
                fontWeight: "var(--weight-semibold)",
                marginBottom: "var(--space-2)",
              }}
            >
              Email
            </h3>
            <p
              className="text-sm mb-3"
              style={{
                fontSize: "var(--text-sm)",
                color: "var(--color-text-secondary)",
                marginBottom: "var(--space-3)",
              }}
            >
              Escríbenos directamente
            </p>
            <a
              href="mailto:soporte@noah.estate"
              className="text-sm font-medium hover:underline underline-offset-4"
              style={{
                fontSize: "var(--text-sm)",
                fontWeight: "var(--weight-medium)",
                color: "var(--color-accent-text)",
              }}
            >
              soporte@noah.estate
            </a>
          </div>

          {/* Support */}
          <div
            className="card rounded-2xl p-6 text-center"
            style={{
              padding: "var(--space-6)",
              borderRadius: "var(--radius-2xl)",
              border: "1px solid var(--color-border-subtle)",
              backgroundColor: "var(--color-surface-1)",
            }}
          >
            <div
              className="inline-flex items-center justify-center size-12 rounded-xl mb-4"
              style={{
                width: "var(--space-12)",
                height: "var(--space-12)",
                borderRadius: "var(--radius-xl)",
                backgroundColor: "var(--color-info-subtle)",
                color: "var(--color-info-text)",
                marginBottom: "var(--space-4)",
              }}
            >
              <MessageSquare className="size-6" />
            </div>
            <h3
              className="font-semibold mb-2"
              style={{
                color: "var(--color-text-primary)",
                fontWeight: "var(--weight-semibold)",
                marginBottom: "var(--space-2)",
              }}
            >
              Soporte
            </h3>
            <p
              className="text-sm mb-3"
              style={{
                fontSize: "var(--text-sm)",
                color: "var(--color-text-secondary)",
                marginBottom: "var(--space-3)",
              }}
            >
              Base de conocimiento
            </p>
            <a
              href="/faq"
              className="text-sm font-medium hover:underline underline-offset-4"
              style={{
                fontSize: "var(--text-sm)",
                fontWeight: "var(--weight-medium)",
                color: "var(--color-accent-text)",
              }}
            >
              Ver preguntas frecuentes
            </a>
          </div>

          {/* Response time */}
          <div
            className="card rounded-2xl p-6 text-center"
            style={{
              padding: "var(--space-6)",
              borderRadius: "var(--radius-2xl)",
              border: "1px solid var(--color-border-subtle)",
              backgroundColor: "var(--color-surface-1)",
            }}
          >
            <div
              className="inline-flex items-center justify-center size-12 rounded-xl mb-4"
              style={{
                width: "var(--space-12)",
                height: "var(--space-12)",
                borderRadius: "var(--radius-xl)",
                backgroundColor: "var(--color-info-subtle)",
                color: "var(--color-info-text)",
                marginBottom: "var(--space-4)",
              }}
            >
              <Clock className="size-6" />
            </div>
            <h3
              className="font-semibold mb-2"
              style={{
                color: "var(--color-text-primary)",
                fontWeight: "var(--weight-semibold)",
                marginBottom: "var(--space-2)",
              }}
            >
              Tiempo de respuesta
            </h3>
            <p
              style={{
                fontSize: "var(--text-sm)",
                color: "var(--color-text-secondary)",
              }}
            >
              Menos de 24 horas en días laborables
            </p>
          </div>
        </div>

        {/* Contact form */}
        <div className="max-w-2xl mx-auto">
          <div
            className="card rounded-2xl p-8 md:p-10"
            style={{
              padding: "var(--space-8)",
              borderRadius: "var(--radius-2xl)",
              border: "1px solid var(--color-border-subtle)",
              backgroundColor: "var(--color-surface-1)",
            }}
          >
            <h2
              className="text-2xl font-bold mb-2"
              style={{
                fontSize: "var(--text-h3)",
                fontWeight: "var(--weight-bold)",
                color: "var(--color-text-primary)",
                marginBottom: "var(--space-2)",
              }}
            >
              Envíanos un mensaje
            </h2>
            <p
              className="mb-8"
              style={{
                fontSize: "var(--text-sm)",
                color: "var(--color-text-secondary)",
                marginBottom: "var(--space-8)",
              }}
            >
              Completa el formulario y te responderemos lo antes posible.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label
                  htmlFor="contact-name"
                  className="label block mb-2"
                  style={{ marginBottom: "var(--space-2)" }}
                >
                  Nombre completo
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  required
                  className={inputClass}
                  placeholder="Juan Pérez"
                  disabled={status === "loading" || status === "success"}
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="contact-email"
                  className="label block mb-2"
                  style={{ marginBottom: "var(--space-2)" }}
                >
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  required
                  className={inputClass}
                  placeholder="juan@empresa.com"
                  disabled={status === "loading" || status === "success"}
                />
              </div>

              {/* Company (optional) */}
              <div>
                <label
                  htmlFor="contact-company"
                  className="label block mb-2"
                  style={{ marginBottom: "var(--space-2)" }}
                >
                  Empresa{" "}
                  <span
                    style={{
                      color: "var(--color-text-secondary)",
                      fontWeight: "var(--weight-regular)",
                    }}
                  >
                    (opcional)
                  </span>
                </label>
                <input
                  id="contact-company"
                  type="text"
                  name="company"
                  className={inputClass}
                  placeholder="Mi Empresa S.L."
                  disabled={status === "loading" || status === "success"}
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="contact-message"
                  className="label block mb-2"
                  style={{ marginBottom: "var(--space-2)" }}
                >
                  Mensaje
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={6}
                  className={`${inputClass} resize-y`}
                  placeholder="Cuéntanos cómo podemos ayudarte..."
                  disabled={status === "loading" || status === "success"}
                />
              </div>

              {/* Submit */}
              <div className="flex flex-col items-center gap-3 pt-2">
                {status === "success" && (
                  <div
                    className="alert alert-success w-full"
                    style={{ padding: "var(--space-4)", borderRadius: "var(--radius-lg)" }}
                  >
                    <p
                      className="text-sm text-center font-medium"
                      style={{
                        fontSize: "var(--text-sm)",
                        color: "var(--color-success-text)",
                        fontWeight: "var(--weight-medium)",
                      }}
                    >
                      ✓ Mensaje enviado correctamente. Te responderemos pronto.
                    </p>
                  </div>
                )}
                {status === "error" && (
                  <div
                    className="alert alert-error w-full"
                    style={{ padding: "var(--space-4)", borderRadius: "var(--radius-lg)" }}
                  >
                    <p
                      className="text-sm text-center"
                      style={{
                        fontSize: "var(--text-sm)",
                        color: "var(--color-error-text)",
                      }}
                    >
                      Ha ocurrido un error. Por favor, intenta de nuevo.
                    </p>
                  </div>
                )}
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={status === "loading" || status === "success"}
                  className="w-full md:w-auto min-w-[200px]"
                >
                  {status === "loading"
                    ? "Enviando..."
                    : status === "success"
                      ? "Enviado ✓"
                      : "Enviar mensaje"}
                </Button>
              </div>
            </form>
          </div>

          {/* Additional info */}
          <div className="mt-8 text-center" style={{ marginTop: "var(--space-8)" }}>
            <p
              style={{
                fontSize: "var(--text-sm)",
                color: "var(--color-text-secondary)",
              }}
            >
              Al enviar este formulario, aceptas que procesemos tu información
              de contacto para responder a tu consulta.
            </p>
          </div>
        </div>
      </section>

      {/* Enterprise CTA */}
      <section
        className="border-t"
        style={{
          borderColor: "var(--color-border-subtle)",
          backgroundColor: "var(--color-surface-2)",
        }}
      >
        <div className="container mx-auto max-w-4xl px-6 py-16 md:py-20">
          <div className="text-center space-y-6">
            <h2
              className="heading-lg"
              style={{ color: "var(--color-text-primary)" }}
            >
              ¿Buscas un plan Enterprise?
            </h2>
            <p
              className="max-w-xl mx-auto"
              style={{
                fontSize: "var(--text-base)",
                color: "var(--color-text-secondary)",
              }}
            >
              Ofrecemos soluciones personalizadas para organizaciones grandes
              con necesidades específicas. Hablemos de cómo podemos ayudarte.
            </p>
            <Button
              variant="secondary"
              size="lg"
              href="mailto:ventas@noah.estate"
            >
              Contactar con ventas
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
