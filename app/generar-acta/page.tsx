"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

type Status = "idle" | "transcribing" | "structuring" | "generating" | "success" | "error";
type FileType = "text" | "docx" | "audio" | null;

function triggerDownload(url: string, filename: string) {
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

function getFileType(file: File | null): FileType {
  if (!file) return null;
  const name = file.name.toLowerCase();
  if (name.endsWith(".txt")) return "text";
  if (name.endsWith(".docx")) return "docx";
  if (
    name.endsWith(".mp3") ||
    name.endsWith(".m4a") ||
    name.endsWith(".wav") ||
    name.endsWith(".webm") ||
    name.endsWith(".ogg") ||
    name.endsWith(".flac") ||
    name.endsWith(".mp4")
  ) {
    return "audio";
  }
  return null;
}

export default function GenerarActaPage() {
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fileType = getFileType(file);
  const isAudioFile = fileType === "audio";

  const handleGenerate = async () => {
    // Re-download: use cached URL
    if (status === "success" && downloadUrl) {
      triggerDownload(downloadUrl, "acta.pdf");
      return;
    }

    if (!file && !text.trim()) return;

    setErrorMessage(null);
    if (downloadUrl) {
      window.URL.revokeObjectURL(downloadUrl);
      setDownloadUrl(null);
    }

    try {
      let transcriptText = text;

      // Step 1: If audio file, transcribe it first
      if (file && isAudioFile) {
        setStatus("transcribing");

        const transcribeFormData = new FormData();
        transcribeFormData.append("audio", file);

        const transcribeRes = await fetch("/api/transcribe", {
          method: "POST",
          body: transcribeFormData,
        });

        if (!transcribeRes.ok) {
          const data = await transcribeRes.json().catch(() => ({}));
          throw new Error(
            data.error || "Error transcribing audio"
          );
        }

        const transcribeData = await transcribeRes.json();
        const audioTranscript = transcribeData.text || "";

        // Combine audio transcript with additional text
        transcriptText = text.trim()
          ? `${audioTranscript}\n\nNotas adicionales:\n${text}`
          : audioTranscript;
      }

      // Step 2: Structure and generate PDF
      setStatus(isAudioFile ? "structuring" : "generating");

      const formData = new FormData();
      if (file && !isAudioFile) {
        formData.append("file", file);
      }
      if (transcriptText.trim()) {
        formData.append("text", transcriptText);
      }

      const res = await fetch("/api/generate-pdf", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const contentType = res.headers.get("content-type") ?? "";
        let message = "Error generating PDF";

        if (contentType.includes("application/json")) {
          try {
            const data: unknown = await res.json();
            if (
              typeof data === "object" &&
              data !== null &&
              "error" in data &&
              typeof (data as { error?: unknown }).error === "string"
            ) {
              message = (data as { error: string }).error;
            }
          } catch {
            // ignore
          }
        }
        throw new Error(message);
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      triggerDownload(url, "acta.pdf");
      setDownloadUrl(url);
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Ha ocurrido un error"
      );
    }
  };

  const isProcessing =
    status === "transcribing" ||
    status === "structuring" ||
    status === "generating";

  const buttonLabel =
    status === "idle"
      ? "Generar acta en PDF"
      : status === "transcribing"
        ? "Transcribiendo audio..."
        : status === "structuring"
          ? "Estructurando información..."
          : status === "generating"
            ? "Generando PDF..."
            : status === "success"
              ? "Descargar de nuevo"
              : "Reintentar";

  const getProgressMessage = () => {
    if (status === "transcribing") {
      return "Transcribiendo el audio con IA...";
    }
    if (status === "structuring") {
      return "Analizando y estructurando el contenido...";
    }
    if (status === "generating") {
      return "Generando el PDF...";
    }
    if (status === "success") {
      return "¡Acta generada con éxito! ✔";
    }
    if (status === "error") {
      return errorMessage || "Ha ocurrido un error. Inténtalo de nuevo.";
    }
    return null;
  };

  const microcopy = getProgressMessage();

  return (
    <main
      className="flex min-h-screen items-center justify-center px-4 py-10"
      style={{
        backgroundColor: "var(--color-bg-base)",
      }}
    >
      <div
        className="w-full max-w-2xl space-y-6 p-8 md:p-10"
        style={{
          padding: "var(--space-8)",
          borderRadius: "var(--radius-2xl)",
          backgroundColor: "var(--color-surface-1)",
          boxShadow: "var(--shadow-md)",
        }}
      >
        <div className="text-center space-y-3">
          <h2
            className="heading-lg max-w-[800px] mx-auto"
            style={{ color: "var(--color-text-primary)" }}
          >
            Generar acta de reunión
          </h2>
          <p
            style={{
              fontSize: "var(--text-sm)",
              color: "var(--color-text-secondary)",
            }}
          >
            Sube un audio o pega la transcripción para generar tu acta automáticamente
          </p>
        </div>

        <section
          className="space-y-5 rounded-xl p-6"
          style={{
            borderRadius: "var(--radius-xl)",
            backgroundColor: "var(--color-bg-cream-alt)",
            border: "none",
            padding: "var(--space-6)",
          }}
        >
          <div className="space-y-2 flex flex-col items-center">
            <input
              id="acta-file"
              type="file"
              accept=".txt,.docx,.mp3,.m4a,.wav,.webm,.ogg,.flac,.mp4"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  setFile(e.target.files[0]);
                }
              }}
              className="hidden"
            />

            <Button
              variant="secondary"
              type="button"
              className="w-full md:w-auto cursor-pointer"
              onClick={() => document.getElementById("acta-file")?.click()}
            >
              {file ? `📎 ${file.name}` : "📁 Subir archivo"}
            </Button>

            <p
              className="text-xs text-center max-w-md"
              style={{
                fontSize: "var(--text-xs)",
                color: "var(--color-text-secondary)",
              }}
            >
              Audio (.mp3, .m4a, .wav, .webm) • Texto (.txt, .docx)
              <br />
              {isAudioFile && (
                <span
                  style={{
                    color: "var(--color-accent-text)",
                    fontWeight: "var(--weight-medium)",
                  }}
                >
                  ✨ Audio detectado - se transcribirá automáticamente
                </span>
              )}
            </p>
          </div>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onDrop={(e) => {
              e.preventDefault();
              const droppedText = e.dataTransfer.getData("text");
              if (droppedText) setText(droppedText);
            }}
            onDragOver={(e) => e.preventDefault()}
            placeholder="Pega la transcripción aquí…&#10;&#10;Opcional: añade detalles extra (asistentes, fecha/hora, acuerdos, votaciones, tareas, incidencias…)."
            className="input textarea w-full"
            style={{ minHeight: "120px", padding: "var(--space-3)" }}
          />
        </section>

        <div className="flex flex-col items-center gap-3">
          {isProcessing && (
            <div
              className="flex flex-col items-center gap-2"
              style={{ gap: "var(--space-2)" }}
            >
              <span
                className="spinner spinner-sm"
                aria-hidden
              />
              {isAudioFile && (
                <div
                  className="flex gap-1 text-xs"
                  style={{
                    gap: "var(--space-1)",
                    fontSize: "var(--text-xs)",
                    color: "var(--color-text-secondary)",
                  }}
                >
                  <span
                    style={{
                      color:
                        status === "transcribing"
                          ? "var(--color-accent-text)"
                          : status === "structuring" || status === "generating"
                            ? "var(--color-success)"
                            : "inherit",
                      fontWeight:
                        status === "transcribing"
                          ? "var(--weight-semibold)"
                          : "inherit",
                    }}
                  >
                    1. Transcribir
                  </span>
                  <span>→</span>
                  <span
                    style={{
                      color:
                        status === "structuring"
                          ? "var(--color-accent-text)"
                          : status === "generating"
                            ? "var(--color-success)"
                            : "inherit",
                      fontWeight:
                        status === "structuring"
                          ? "var(--weight-semibold)"
                          : "inherit",
                    }}
                  >
                    2. Estructurar
                  </span>
                  <span>→</span>
                  <span
                    style={{
                      color:
                        status === "generating"
                          ? "var(--color-accent-text)"
                          : "inherit",
                      fontWeight:
                        status === "generating"
                          ? "var(--weight-semibold)"
                          : "inherit",
                    }}
                  >
                    3. PDF
                  </span>
                </div>
              )}
            </div>
          )}
          <Button
            variant="primary"
            onClick={handleGenerate}
            disabled={isProcessing}
            className="w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {buttonLabel}
          </Button>
          {microcopy && (
            <p
              className="text-center max-w-md"
              style={{
                fontSize: "var(--text-sm)",
                color:
                  status === "error"
                    ? "var(--color-error-text)"
                    : "var(--color-text-secondary)",
              }}
            >
              {microcopy}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
