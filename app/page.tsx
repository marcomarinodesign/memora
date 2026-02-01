"use client";

import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const handleDownloadPDF = async () => {
    if (!pdfUrl) return;

    // Abrir preview solo por acción del usuario
    window.open(pdfUrl, "_blank", "noopener,noreferrer");

    const a = document.createElement("a");
    a.href = pdfUrl;
    a.download = "acta.pdf";
    a.click();

    // Nota: no revocar inmediatamente o el preview puede fallar
    setTimeout(() => URL.revokeObjectURL(pdfUrl), 5 * 60_000);
  };

  const handleGenerate = async () => {
    if (!file && !text.trim()) return;

    setLoading(true);
    setError(null);
    setPdfUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });

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
      setPdfUrl(url);

      // Importante: NO abrimos pestaña aquí. Solo al pulsar "Descargar PDF".
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

        <section className="rounded-xl bg-gray-50 p-5 space-y-4">
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
              className="w-full h-11 px-4 inline-flex items-center justify-center rounded-md border border-gray-200 bg-transparent text-base font-medium text-gray-900 hover:bg-white cursor-pointer"
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
          className="w-full h-11 px-4 rounded-md border border-gray-200 bg-gray-100 text-base font-medium text-gray-900 hover:bg-gray-200 disabled:opacity-50"
        >
          {loading ? "Generando acta…" : "Generar acta"}
        </button>

        <button
          onClick={handleDownloadPDF}
          disabled={!pdfUrl || loading}
          className="w-full h-11 px-4 rounded-md bg-black text-base font-medium text-white hover:opacity-90 disabled:opacity-50"
        >
          Descargar PDF
        </button>
      </div>
    </main>
  );
}
