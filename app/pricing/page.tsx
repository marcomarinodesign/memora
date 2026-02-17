"use client";

import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

export default function PricingPage() {
  return (
    <main
      className="min-h-screen flex flex-col items-center px-4 pt-[100px] pb-12"
      style={{
        backgroundColor: "var(--color-bg-base)",
        padding: "var(--space-4)",
        paddingTop: "100px",
        paddingBottom: "var(--space-12)",
      }}
    >
      <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 max-w-md">
        <div
          className="inline-flex items-center justify-center size-16 rounded-2xl"
          style={{
            width: "var(--space-16)",
            height: "var(--space-16)",
            borderRadius: "var(--radius-xl)",
            backgroundColor: "var(--color-surface-2)",
          }}
        >
          <Lock
            className="size-8"
            style={{
              width: "var(--space-8)",
              height: "var(--space-8)",
              color: "var(--color-text-secondary)",
            }}
          />
        </div>
        <h1
          className="heading-lg"
          style={{ color: "var(--color-text-primary)" }}
        >
          Próximamente
        </h1>
        <p
          style={{
            fontSize: "var(--text-base)",
            color: "var(--color-text-secondary)",
          }}
        >
          Estamos trabajando en nuestros planes de precios. Mientras tanto,
          puedes probar Noah de forma gratuita.
        </p>
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
          style={{ gap: "var(--space-4)", paddingTop: "var(--space-4)" }}
        >
          <Button variant="primary" size="lg" href="/generar-acta">
            Probar gratis
          </Button>
          <Button variant="secondary" size="lg" href="/contacto">
            Contactar
          </Button>
        </div>
      </div>
    </main>
  );
}
