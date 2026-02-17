"use client";

import { useState } from "react";
import data from "@/sample-acta.json";
import ActaTemplate, { type ActaData } from "@/app/acta/ActaTemplate";
import { getComunidad, updateIdioma } from "@/lib/store/comunidadStore";
import { LanguageToggle } from "@/components/LanguageToggle";
import { Button } from "@/components/ui/button";
import { Download, Eye } from "lucide-react";
import type { Idioma } from "@/lib/models/comunidad";

export default function ActaPage() {
  const comunidad = getComunidad("1");
  const [idioma, setIdioma] = useState<Idioma>(comunidad?.idioma ?? "es");
  const [isDownloading, setIsDownloading] = useState(false);

  const handleIdiomaChange = (newIdioma: Idioma) => {
    updateIdioma("1", newIdioma);
    setIdioma(newIdioma);
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const payload = { ...data, idioma };
      const res = await fetch("/api/generate-acta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "acta-ejemplo.pdf";
      a.click();
      window.URL.revokeObjectURL(url);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <main
      className="min-h-screen"
      style={{ backgroundColor: "var(--color-bg-base)" }}
    >
      {/* Header */}
      <section
        className="border-b sticky top-0 z-10"
        style={{
          borderColor: "var(--color-border-subtle)",
          backgroundColor: "var(--color-bg-base)",
          zIndex: "var(--z-sticky)",
        }}
      >
        <div className="container mx-auto max-w-6xl px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <div
              className="flex items-center gap-3"
              style={{ gap: "var(--space-3)" }}
            >
              <Eye
                className="size-5"
                style={{
                  width: "var(--space-5)",
                  height: "var(--space-5)",
                  color: "var(--color-text-secondary)",
                }}
              />
              <h1
                style={{
                  fontSize: "var(--text-lg)",
                  fontWeight: "var(--weight-semibold)",
                  color: "var(--color-text-primary)",
                }}
              >
                Vista previa del acta
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <LanguageToggle value={idioma} onChange={handleIdiomaChange} />
              <Button
                variant="primary"
                onClick={handleDownload}
                disabled={isDownloading}
                className="gap-2"
              >
                <Download className="size-4" />
                {isDownloading ? "Generando..." : "Descargar PDF"}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Preview */}
      <section className="container mx-auto max-w-6xl px-6 py-8 md:py-12">
        <div
          className="card overflow-hidden"
          style={{
            borderRadius: "var(--radius-2xl)",
            border: "1px solid var(--color-border-subtle)",
            backgroundColor: "var(--color-surface-1)",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          <ActaTemplate data={data as ActaData} />
        </div>
      </section>

      {/* CTA */}
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
              ¿Listo para generar tu acta?
            </h2>
            <p
              className="max-w-xl mx-auto"
              style={{
                fontSize: "var(--text-base)",
                color: "var(--color-text-secondary)",
              }}
            >
              Este es un ejemplo de cómo se vería tu acta generada. Prueba con
              tus propias reuniones.
            </p>
            <Button variant="primary" size="lg" href="/generar-acta">
              Generar mi acta
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
