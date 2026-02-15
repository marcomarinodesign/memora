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
    <main className="min-h-screen bg-background">
      {/* Header */}
      <section className="border-b border-border bg-background sticky top-0 z-10">
        <div className="container mx-auto max-w-6xl px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Eye className="size-5 text-muted-foreground" />
              <h1 className="text-lg font-semibold text-foreground">
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
        <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
          <ActaTemplate data={data as ActaData} />
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-muted/30">
        <div className="container mx-auto max-w-4xl px-6 py-16 md:py-20">
          <div className="text-center space-y-6">
            <h2 className="heading-lg text-foreground">
              ¿Listo para generar tu acta?
            </h2>
            <p className="text-body text-muted-foreground max-w-xl mx-auto">
              Este es un ejemplo de cómo se vería tu acta generada. Prueba con
              tus propias reuniones.
            </p>
            <Button variant="primary" href="/generar-acta" className="px-8 py-6">
              Generar mi acta
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
