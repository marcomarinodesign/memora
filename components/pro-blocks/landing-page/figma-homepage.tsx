"use client";

import { Button } from "@/components/ui/button";

export function FigmaHomepage() {
  return (
    <main
      className="h-full min-h-[800px]"
      style={{ backgroundColor: "#f0efea" }}
    >
      {/* Hero Section */}
      <section className="mx-auto flex max-w-[1024px] flex-col items-center justify-center px-6 py-0 text-center md:py-0">
        {/* Illustration (responsive variants) */}
        <div className="mb-12 md:mb-16 w-full max-w-[760px]">
          <picture>
            <source
              media="(max-width: 768px)"
              srcSet="/images/hero-illustration-390w.png"
            />
            <source
              media="(max-width: 1440px)"
              srcSet="/images/hero-illustration-768w.png"
            />
            <img
              src="/images/hero-illustration-1440w.png"
              alt="Dos personas en reunión, conversación colaborativa"
              className="h-auto w-full"
              fetchPriority="high"
            />
          </picture>
        </div>

        {/* Main Headline */}
        <h1
          className="mx-auto mb-6 max-w-[800px] text-center text-black"
          style={{
            fontSize: "clamp(40px, 8vw, 64px)",
            fontWeight: 800,
            lineHeight: "1.2",
            letterSpacing: "-0.02em",
          }}
        >
          De reunión a acta profesional en minutos
        </h1>

        {/* Description */}
        <p
          className="mx-auto mb-8 max-w-[672px] text-center"
          style={{
            fontSize: "clamp(16px, 2vw, 18px)",
            fontWeight: 400,
            lineHeight: "1.6",
            color: "#0f172a",
          }}
        >
          Sube el audio de tu reunión o pega la transcripción. Noah usa IA
          para estructurar automáticamente toda la información en un acta formal
          lista para compartir.
        </p>

        {/* CTAs */}
        <div className="flex flex-col gap-4 sm:flex-row sm:gap-4">
          <button
            className="inline-flex items-center justify-center transition-colors hover:bg-black/90"
            style={{
              backgroundColor: "#000000",
              color: "#ffffff",
              borderRadius: "8px",
              padding: "12px 20px",
              fontSize: "18px",
              fontWeight: 600,
              lineHeight: "25.2px",
              minHeight: "52px",
              border: "none",
              cursor: "pointer",
            }}
            onClick={() => window.location.href = "/generar-acta"}
          >
            Generar acta gratis
          </button>

          <button
            className="inline-flex items-center justify-center transition-colors hover:bg-gray-50"
            style={{
              backgroundColor: "#ffffff",
              color: "#000000",
              borderRadius: "8px",
              padding: "12px 20px",
              fontSize: "18px",
              fontWeight: 600,
              lineHeight: "25.2px",
              minHeight: "52px",
              border: "1px solid #000000",
              cursor: "pointer",
            }}
            onClick={() => window.location.href = "/faq"}
          >
            Cómo funciona
          </button>
        </div>
      </section>
    </main>
  );
}
