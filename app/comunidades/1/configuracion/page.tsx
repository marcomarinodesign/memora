"use client";

import { useState } from "react";
import { getComunidad, updateIdioma } from "@/lib/store/comunidadStore";
import { LanguageToggle } from "@/components/LanguageToggle";
import type { Idioma } from "@/lib/models/comunidad";

export default function ConfiguracionPage() {
  const comunidad = getComunidad("1");
  const [idioma, setIdioma] = useState<Idioma>(comunidad?.idioma ?? "es");
  const [message, setMessage] = useState<string | null>(null);

  const handleIdiomaChange = (newIdioma: Idioma) => {
    updateIdioma("1", newIdioma);
    setIdioma(newIdioma);
    setMessage("Idioma actualizado correctamente");
    setTimeout(() => setMessage(null), 3000);
  };

  if (!comunidad) {
    return (
      <div
        className="p-6 max-w-2xl mx-auto"
        style={{ padding: "var(--space-6)" }}
      >
        <p style={{ color: "var(--color-text-secondary)" }}>
          Comunidad no encontrada.
        </p>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col gap-6 p-6 max-w-2xl mx-auto"
      style={{ padding: "var(--space-6)", gap: "var(--space-6)" }}
    >
      <h1
        className="heading-xl max-w-[800px]"
        style={{
          color: "var(--color-text-primary)",
          letterSpacing: "var(--tracking-tight)",
        }}
      >
        Configuración
      </h1>

      <section
        className="card p-4"
        style={{
          padding: "var(--space-4)",
          borderRadius: "var(--radius-lg)",
          border: "1px solid var(--color-border-subtle)",
          backgroundColor: "var(--color-surface-1)",
          boxShadow: "var(--shadow-sm)",
        }}
      >
        <h2
          className="mb-2"
          style={{
            fontSize: "var(--text-sm)",
            fontWeight: "var(--weight-medium)",
            color: "var(--color-text-secondary)",
            marginBottom: "var(--space-2)",
          }}
        >
          Comunidad
        </h2>
        <p style={{ fontWeight: "var(--weight-medium)", color: "var(--color-text-primary)" }}>{comunidad.nombre}</p>
        <p style={{ fontSize: "var(--text-sm)", color: "var(--color-text-secondary)" }}>{comunidad.direccion}</p>
        <p style={{ fontSize: "var(--text-sm)", color: "var(--color-text-secondary)" }}>NIF: {comunidad.nif}</p>
      </section>

      <section
        className="card p-4"
        style={{
          padding: "var(--space-4)",
          borderRadius: "var(--radius-lg)",
          border: "1px solid var(--color-border-subtle)",
          backgroundColor: "var(--color-surface-1)",
          boxShadow: "var(--shadow-sm)",
        }}
      >
        <h2
          className="mb-3"
          style={{
            fontSize: "var(--text-sm)",
            fontWeight: "var(--weight-medium)",
            color: "var(--color-text-secondary)",
            marginBottom: "var(--space-3)",
          }}
        >
          Idioma
        </h2>
        <LanguageToggle
          value={idioma}
          onChange={handleIdiomaChange}
        />
        {message && (
          <p
            className="mt-3 text-sm"
            style={{
              marginTop: "var(--space-3)",
              fontSize: "var(--text-sm)",
              color: "var(--color-success-text)",
            }}
          >
            {message}
          </p>
        )}
      </section>
    </div>
  );
}
