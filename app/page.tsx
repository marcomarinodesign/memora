"use client";

import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!file && !text.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();

      if (file) {
        formData.append("file", file);
      }
      if (text.trim()) {
        formData.append("text", text);
      }

      const res = await fetch("/api/generate-acta", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Error generando el acta");
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      // abrir en nueva pestaña (preview) antes de descargar
      const opened = window.open(url, "_blank", "noopener,noreferrer");

      // descarga automática
      const a = document.createElement("a");
      a.href = url;
      a.download = "acta.pdf";
      a.click();

      // Nota: no revocar inmediatamente o el preview puede fallar
      setTimeout(() => URL.revokeObjectURL(url), 60_000);

      // Fallback si el navegador bloquea popups
      if (!opened) {
        // (la descarga ya se disparó arriba)
      }
    } catch {
      setError("No se ha podido generar el acta. Revisa la transcripción.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-xl bg-white rounded-xl shadow p-6 space-y-4">
        <h1 className="text-xl font-semibold text-center">
          Generar acta de reunión
        </h1>

        <section className="rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 p-5 space-y-4">
          <p className="text-sm text-gray-600 text-center">
            Pega la transcripción y/o añade información adicional sobre la reunión
          </p>

          <div className="space-y-2">
            <input
              id="acta-file"
              type="file"
              accept=".txt,.docx"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  setFile(e.target.files[0]);
                }
              }}
              className="hidden"
            />

            <label
              htmlFor="acta-file"
              className="w-full inline-flex items-center justify-center rounded-md border border-gray-200 bg-white py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 cursor-pointer"
            >
              {file
                ? `Archivo seleccionado: ${file.name}`
                : "Elegir archivo (.txt, .docx)"}
            </label>

            <p className="text-xs text-gray-500 text-center">
              Si adjuntas un archivo, puedes añadir contexto aquí (opcional)
            </p>
          </div>

          <textarea
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
            onDrop={(e) => {
              e.preventDefault();
              const droppedText = e.dataTransfer.getData("text");
              if (droppedText) {
                setText(droppedText);
              }
            }}
            onDragOver={(e) => e.preventDefault()}
            placeholder="Pega la transcripción aquí…&#10;&#10;Opcional: añade detalles extra (asistentes, fecha/hora, acuerdos, votaciones, tareas, incidencias…)."
            className="w-full h-56 border border-gray-200 bg-white rounded-md p-3 text-sm focus:outline-none focus:ring"
          />
        </section>

        {error && <p className="text-sm text-red-600 text-center">{error}</p>}

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded-md hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Generando acta…" : "Generar acta (PDF)"}
        </button>
      </div>
    </main>
  );
}
