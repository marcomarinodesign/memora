"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail, MessageSquare, Clock } from "lucide-react";

type FormStatus = "idle" | "loading" | "success" | "error";

const inputClass =
  "w-full rounded-lg border border-input bg-background px-4 py-3 text-body-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

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
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="container mx-auto max-w-4xl px-6 pt-20 md:pt-28 pb-12 md:pb-16">
        <div className="text-center space-y-6">
          <h1 className="max-w-[800px] mx-auto heading-xl text-foreground text-[64px] font-extrabold tracking-[-2px]">Hablemos</h1>
          <p className="text-body text-muted-foreground max-w-2xl mx-auto">
            ¿Tienes preguntas sobre Memora? ¿Necesitas ayuda o quieres hablar
            de un plan Enterprise? Estamos aquí para ayudarte.
          </p>
        </div>
      </section>

      {/* Contact options + Form */}
      <section className="container mx-auto max-w-5xl px-6 pb-20 md:pb-28">
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Email */}
          <div className="bg-card border border-border rounded-2xl p-6 text-center">
            <div className="inline-flex items-center justify-center size-12 rounded-xl bg-blue-100 text-blue-600 mb-4">
              <Mail className="size-6" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Email</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Escríbenos directamente
            </p>
            <a
              href="mailto:soporte@memora.app"
              className="text-sm font-medium text-primary hover:underline underline-offset-4"
            >
              soporte@memora.app
            </a>
          </div>

          {/* Support */}
          <div className="bg-card border border-border rounded-2xl p-6 text-center">
            <div className="inline-flex items-center justify-center size-12 rounded-xl bg-blue-100 text-blue-600 mb-4">
              <MessageSquare className="size-6" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Soporte</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Base de conocimiento
            </p>
            <a
              href="/faq"
              className="text-sm font-medium text-primary hover:underline underline-offset-4"
            >
              Ver preguntas frecuentes
            </a>
          </div>

          {/* Response time */}
          <div className="bg-card border border-border rounded-2xl p-6 text-center">
            <div className="inline-flex items-center justify-center size-12 rounded-xl bg-blue-100 text-blue-600 mb-4">
              <Clock className="size-6" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">
              Tiempo de respuesta
            </h3>
            <p className="text-sm text-muted-foreground">
              Menos de 24 horas en días laborables
            </p>
          </div>
        </div>

        {/* Contact form */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-card border border-border rounded-2xl p-8 md:p-10">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Envíanos un mensaje
            </h2>
            <p className="text-body-sm text-muted-foreground mb-8">
              Completa el formulario y te responderemos lo antes posible.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-sm font-medium text-foreground mb-2"
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
                  className="block text-sm font-medium text-foreground mb-2"
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
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Empresa{" "}
                  <span className="text-muted-foreground font-normal">
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
                  className="block text-sm font-medium text-foreground mb-2"
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
                  <div className="w-full p-4 rounded-lg bg-green-50 border border-green-200">
                    <p className="text-sm text-green-800 text-center font-medium">
                      ✓ Mensaje enviado correctamente. Te responderemos pronto.
                    </p>
                  </div>
                )}
                {status === "error" && (
                  <div className="w-full p-4 rounded-lg bg-red-50 border border-red-200">
                    <p className="text-sm text-red-800 text-center">
                      Ha ocurrido un error. Por favor, intenta de nuevo.
                    </p>
                  </div>
                )}
                <Button
                  type="submit"
                  variant="primary"
                  disabled={status === "loading" || status === "success"}
                  className="w-full md:w-auto min-w-[200px] py-6"
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
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Al enviar este formulario, aceptas que procesemos tu información
              de contacto para responder a tu consulta.
            </p>
          </div>
        </div>
      </section>

      {/* Enterprise CTA */}
      <section className="border-t border-border bg-muted/30">
        <div className="container mx-auto max-w-4xl px-6 py-16 md:py-20">
          <div className="text-center space-y-6">
            <h2 className="heading-lg text-foreground">
              ¿Buscas un plan Enterprise?
            </h2>
            <p className="text-body text-muted-foreground max-w-xl mx-auto">
              Ofrecemos soluciones personalizadas para organizaciones grandes
              con necesidades específicas. Hablemos de cómo podemos ayudarte.
            </p>
            <Button
              variant="secondary"
              href="mailto:ventas@memora.app"
              className="px-8 py-6"
            >
              Contactar con ventas
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
