"use client";

import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Free",
    price: "0",
    description: "Perfecto para empezar",
    features: [
      "3 actas al mes",
      "Transcripción de audio",
      "Exportación en PDF",
      "Soporte por email",
    ],
    cta: "Empezar gratis",
    ctaHref: "/generar-acta",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "19",
    description: "Para equipos que crecen",
    features: [
      "Actas ilimitadas",
      "Transcripción ilimitada",
      "Exportación en PDF",
      "Plantillas personalizadas",
      "Historial completo",
      "Soporte prioritario",
    ],
    cta: "Empezar ahora",
    ctaHref: "/generar-acta",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Contactar",
    description: "Para organizaciones",
    features: [
      "Todo lo de Pro",
      "Gestión de equipos",
      "Branding personalizado",
      "SLA garantizado",
      "Soporte dedicado 24/7",
      "Integración API",
    ],
    cta: "Hablar con ventas",
    ctaHref: "/contacto",
    highlighted: false,
  },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="container mx-auto max-w-4xl px-6 pt-20 md:pt-28 pb-16 md:pb-20">
        <div className="text-center space-y-6">
          <h1 className="max-w-4xl mx-auto heading-xl text-foreground">
            Planes simples, precios transparentes
          </h1>
          <p className="text-body text-muted-foreground max-w-2xl mx-auto">
            Empieza gratis y escala cuando lo necesites. Todos los planes
            incluyen transcripción de audio con IA.
          </p>
        </div>
      </section>

      {/* Pricing cards */}
      <section className="container mx-auto max-w-6xl px-6 pb-20 md:pb-28">
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col bg-card border rounded-2xl p-8 transition-all ${
                plan.highlighted
                  ? "border-primary shadow-xl ring-2 ring-primary/10 md:scale-105"
                  : "border-border hover:border-border-hover"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                    Más popular
                  </span>
                </div>
              )}

              {/* Header */}
              <div className="space-y-4 pb-6 border-b border-border">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">
                    {plan.name}
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {plan.description}
                  </p>
                </div>
                <div className="flex items-baseline gap-1">
                  {plan.price === "Contactar" ? (
                    <span className="text-3xl font-bold text-foreground">
                      {plan.price}
                    </span>
                  ) : (
                    <>
                      <span className="text-4xl font-bold tracking-tight text-foreground">
                        {plan.price}€
                      </span>
                      <span className="text-muted-foreground">/mes</span>
                    </>
                  )}
                </div>
              </div>

              {/* Features */}
              <ul className="flex-1 space-y-3 pt-6 pb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="size-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-body-sm text-foreground">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                variant={plan.highlighted ? "primary" : "secondary"}
                href={plan.ctaHref}
                className="w-full py-6"
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ section */}
      <section className="border-t border-border bg-muted/30">
        <div className="container mx-auto max-w-4xl px-6 py-16 md:py-20">
          <div className="text-center space-y-6">
            <h2 className="heading-lg text-foreground">
              Preguntas frecuentes
            </h2>
            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">
                  ¿Puedo cambiar de plan más adelante?
                </h3>
                <p className="text-body-sm text-muted-foreground">
                  Sí, puedes actualizar o degradar tu plan en cualquier momento.
                  Los cambios se aplican de inmediato.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">
                  ¿Qué métodos de pago aceptan?
                </h3>
                <p className="text-body-sm text-muted-foreground">
                  Aceptamos tarjetas de crédito/débito (Visa, Mastercard) y
                  transferencia bancaria para planes Enterprise.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">
                  ¿Hay periodo de prueba?
                </h3>
                <p className="text-body-sm text-muted-foreground">
                  El plan Free te permite probar todas las funciones básicas sin
                  límite de tiempo ni tarjeta de crédito.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">
                  ¿Ofrecen descuentos por volumen?
                </h3>
                <p className="text-body-sm text-muted-foreground">
                  Sí, para equipos grandes (50+ usuarios) ofrecemos precios
                  personalizados. Contáctanos para más información.
                </p>
              </div>
            </div>
            <div className="pt-4">
              <Link
                href="/faq"
                className="inline-flex items-center gap-2 text-body-sm font-medium text-primary hover:underline underline-offset-4"
              >
                Ver todas las preguntas frecuentes →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-background">
        <div className="container mx-auto max-w-4xl px-6 py-20 md:py-28">
          <div className="text-center space-y-6">
            <h2 className="heading-lg text-foreground">
              ¿Listo para empezar?
            </h2>
            <p className="text-body text-muted-foreground max-w-xl mx-auto">
              Crea tu primera acta gratis en menos de 2 minutos. Sin tarjeta de
              crédito.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button variant="primary" href="/generar-acta" className="px-8 py-6">
                Empezar gratis
              </Button>
              <Button variant="secondary" href="/contacto" className="px-8 py-6">
                Contactar ventas
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
