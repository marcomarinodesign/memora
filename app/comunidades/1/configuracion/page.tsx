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
      <div className="p-6 max-w-2xl mx-auto">
        <p className="text-gray-500">Comunidad no encontrada.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 p-6 max-w-2xl mx-auto">
      <h1 className="max-w-[800px] heading-xl text-foreground text-[64px] font-extrabold tracking-[-2px]">Configuración</h1>

      <section className="border rounded-lg p-4 bg-white shadow-sm">
        <h2 className="text-sm font-medium text-gray-500 mb-2">Comunidad</h2>
        <p className="font-medium">{comunidad.nombre}</p>
        <p className="text-sm text-gray-600">{comunidad.direccion}</p>
        <p className="text-sm text-gray-600">NIF: {comunidad.nif}</p>
      </section>

      <section className="border rounded-lg p-4 bg-white shadow-sm">
        <h2 className="text-sm font-medium text-gray-500 mb-3">Idioma</h2>
        <LanguageToggle
          value={idioma}
          onChange={handleIdiomaChange}
        />
        {message && (
          <p className="mt-3 text-sm text-green-600">{message}</p>
        )}
      </section>
    </div>
  );
}
