"use client";

import { Button } from "@/components/ui/button";

export function HeroOnlyLanding() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Full Height Hero Section */}
      {/* TODO: design-system - review spacing (104px ≈ 100px navbar clearance, no single token) */}
      <section className="flex-1 flex items-center justify-center px-6 pb-20" style={{ paddingTop: "calc(var(--space-16) + var(--space-10))" }}>
        <div className="w-full max-w-5xl mx-auto">
          <div className="flex flex-col items-center text-center space-y-8">
            {/* Image Placeholder */}
            <div className="w-full max-w-[760px] h-[180px] bg-muted/50 border-2 border-dashed border-border rounded-lg flex items-center justify-center">
              <span className="text-sm text-muted-foreground">
                760 × 180 px
              </span>
            </div>

            {/* Main headline */}
            <h1 className="max-w-[800px] heading-xl text-foreground text-[64px] font-extrabold tracking-[-2px]">
              De reunión a acta profesional en minutos
            </h1>

            {/* Supporting text */}
            <p className="max-w-2xl text-body text-muted-foreground">
              Sube el audio de tu reunión o pega la transcripción. Noah usa IA
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
                href="/faq"
                className="text-lg px-8 py-6"
              >
                Cómo funciona
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
