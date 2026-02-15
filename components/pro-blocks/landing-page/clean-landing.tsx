"use client";

import { Button } from "@/components/ui/button";
import { Mic, Sparkles, FileText, Zap, Shield, Clock } from "lucide-react";

export function CleanLanding() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section - Notion-inspired minimal */}
      <section className="container mx-auto max-w-5xl px-6 pt-24 pb-20 md:pt-32 md:pb-28">
        <div className="flex flex-col items-center text-center space-y-8">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted border border-border">
            <Sparkles className="size-4 text-primary" />
            <span className="text-sm font-medium text-foreground">
              Ahora con transcripción de audio automática
            </span>
          </div>

          {/* Main headline */}
          <h1 className="max-w-4xl heading-xl text-foreground">
            De reunión a acta profesional en minutos
          </h1>

          {/* Supporting text */}
          <p className="max-w-2xl text-body text-muted-foreground">
            Sube el audio de tu reunión o pega la transcripción. Memora usa IA
            para estructurar automáticamente toda la información en un acta
            formal lista para compartir.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button
              variant="primary"
              href="/generar-acta"
              className="text-lg px-8 py-6"
            >
              Generar acta gratis
            </Button>
            <Button
              variant="secondary"
              href="#como-funciona"
              className="text-lg px-8 py-6"
            >
              Ver cómo funciona
            </Button>
          </div>

          {/* Visual spacer */}
          <div className="pt-8" />
        </div>
      </section>

      {/* How it works - Clean 3 steps */}
      <section
        id="como-funciona"
        className="border-t border-border bg-background"
      >
        <div className="container mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="text-center space-y-4 mb-16">
            <h2 className="heading-lg text-foreground">Cómo funciona</h2>
            <p className="text-body text-muted-foreground max-w-2xl mx-auto">
              Tres pasos simples para convertir cualquier reunión en un acta
              profesional.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {/* Step 1 */}
            <div className="flex flex-col items-start space-y-4">
              <div className="flex items-center justify-center size-12 rounded-xl bg-blue-100 text-blue-600">
                <Mic className="size-6" strokeWidth={2} />
              </div>
              <div className="space-y-2">
                <h3 className="heading-sm text-foreground">1. Sube tu audio</h3>
                <p className="text-body-sm text-muted-foreground">
                  Arrastra un archivo de audio (.mp3, .wav, .m4a) o pega
                  directamente la transcripción. Aceptamos cualquier formato.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-start space-y-4">
              <div className="flex items-center justify-center size-12 rounded-xl bg-blue-100 text-blue-600">
                <Sparkles className="size-6" strokeWidth={2} />
              </div>
              <div className="space-y-2">
                <h3 className="heading-sm text-foreground">
                  2. IA lo estructura
                </h3>
                <p className="text-body-sm text-muted-foreground">
                  Nuestra IA transcribe el audio y organiza automáticamente:
                  participantes, agenda, acuerdos, votaciones y tareas.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-start space-y-4">
              <div className="flex items-center justify-center size-12 rounded-xl bg-blue-100 text-blue-600">
                <FileText className="size-6" strokeWidth={2} />
              </div>
              <div className="space-y-2">
                <h3 className="heading-sm text-foreground">
                  3. Descarga el PDF
                </h3>
                <p className="text-body-sm text-muted-foreground">
                  Obtén un acta profesional en formato PDF, con estructura
                  legal y lista para firmar. Todo en menos de 2 minutos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features - Bento grid style */}
      <section className="border-t border-border bg-muted/30">
        <div className="container mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="text-center space-y-4 mb-16">
            <h2 className="heading-lg text-foreground">
              Todo lo que necesitas
            </h2>
            <p className="text-body text-muted-foreground max-w-2xl mx-auto">
              Tecnología de IA avanzada para actas perfectas cada vez.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Feature 1 - Large card */}
            <div className="md:col-span-2 bg-card border border-border rounded-2xl p-8 md:p-10 hover:border-border-hover transition-colors">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="space-y-4 flex-1">
                  <div className="inline-flex items-center gap-2 text-sm font-medium text-primary">
                    <Mic className="size-4" />
                    Transcripción automática
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">
                    Del audio al texto en segundos
                  </h3>
                  <p className="text-body-sm text-muted-foreground max-w-lg">
                    Sube grabaciones de reuniones en cualquier formato. Nuestra
                    IA con Whisper transcribe automáticamente con alta
                    precisión, incluso con múltiples hablantes.
                  </p>
                </div>
                <div className="flex-shrink-0 size-24 rounded-xl bg-blue-100 flex items-center justify-center">
                  <Mic className="size-12 text-blue-600" strokeWidth={1.5} />
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="bg-card border border-border rounded-2xl p-8 hover:border-border-hover transition-colors">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 text-sm font-medium text-primary">
                  <Zap className="size-4" />
                  Estructura inteligente
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  Organización automática
                </h3>
                <p className="text-body-sm text-muted-foreground">
                  La IA identifica y estructura: orden del día, acuerdos,
                  votaciones, tareas y responsables. Sin intervención manual.
                </p>
                <div className="pt-4">
                  <div className="size-16 rounded-xl bg-blue-100 flex items-center justify-center">
                    <Sparkles className="size-8 text-blue-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="bg-card border border-border rounded-2xl p-8 hover:border-border-hover transition-colors">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 text-sm font-medium text-primary">
                  <Shield className="size-4" />
                  Formato profesional
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  PDF listo para firmar
                </h3>
                <p className="text-body-sm text-muted-foreground">
                  Genera PDFs con formato legal estándar. Incluye todas las
                  secciones obligatorias y está listo para compartir.
                </p>
                <div className="pt-4">
                  <div className="size-16 rounded-xl bg-blue-100 flex items-center justify-center">
                    <FileText className="size-8 text-blue-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 4 - Time saver */}
            <div className="md:col-span-2 bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-2xl p-8 md:p-10">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex-shrink-0 size-20 rounded-xl bg-white flex items-center justify-center">
                  <Clock className="size-10 text-blue-600" strokeWidth={1.5} />
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-gray-900">
                    Ahorra más de 2 horas por reunión
                  </h3>
                  <p className="text-body-sm text-gray-700 max-w-2xl">
                    La redacción manual de actas puede tomar horas. Con Memora,
                    todo el proceso se reduce a menos de 2 minutos. Más tiempo
                    para lo que realmente importa.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-border bg-background">
        <div className="container mx-auto max-w-4xl px-6 py-20 md:py-28">
          <div className="flex flex-col items-center text-center space-y-8">
            <h2 className="heading-lg text-foreground max-w-2xl">
              Empieza a generar actas en segundos
            </h2>
            <p className="text-body text-muted-foreground max-w-xl">
              Gratis para empezar. No requiere tarjeta de crédito.
            </p>
            <Button
              variant="primary"
              href="/generar-acta"
              className="text-lg px-8 py-6"
            >
              Crear mi primera acta
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
