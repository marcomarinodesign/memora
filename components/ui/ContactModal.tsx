"use client";

import { useCallback, useEffect, useState } from "react";
import { useLeadModal } from "@/components/context/LeadModalContext";
import { AnimatePresence, motion } from "framer-motion";
import { MotionButton } from "@/components/ui/motion";

const USER_TYPES = [
  { value: "", label: "Selecciona..." },
  { value: "administrador_fincas", label: "Administrador de fincas" },
  { value: "presidente", label: "Presidente" },
  { value: "otro", label: "Otro" },
] as const;

type FormState = {
  name: string;
  email: string;
  userType: string;
  message: string;
};

const initialForm: FormState = {
  name: "",
  email: "",
  userType: "",
  message: "",
};

export function ContactModal() {
  const { isOpen, closeModal } = useLeadModal();
  const [form, setForm] = useState<FormState>(initialForm);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const resetForm = useCallback(() => {
    setForm(initialForm);
    setStatus("idle");
    setErrorMessage("");
  }, []);

  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm]);

  useEffect(() => {
    if (!isOpen) return;
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [isOpen, closeModal]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;
    if (!form.name.trim() || !form.email.trim() || !form.userType) {
      setErrorMessage("Completa nombre, email y tipo de usuario.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    if (typeof window !== "undefined" && (window as unknown as { gtag?: (a: string, b: string) => void }).gtag) {
      (window as unknown as { gtag: (a: string, b: string) => void }).gtag("event", "form_submit");
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          userType: form.userType,
          message: form.message.trim() || undefined,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(data?.error ?? "Error al enviar. Inténtalo de nuevo.");
        return;
      }

      setStatus("success");
      setTimeout(() => {
        closeModal();
      }, 2000);
    } catch {
      setStatus("error");
      setErrorMessage("Error de conexión. Inténtalo de nuevo.");
    }
  };

  const inputBase =
    "w-full rounded-lg border bg-white px-4 py-3 font-sans text-[15px] outline-none transition-colors focus:ring-2 focus:ring-[var(--color-primary-dark)]/20";
  const inputBorder = "border-[var(--color-border-default)] focus:border-[var(--color-primary-dark)]";

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[300] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-modal-title"
        >
          <motion.div
            className="absolute inset-0 bg-black/50"
            onClick={closeModal}
            onKeyDown={(e) => e.key === "Escape" && closeModal()}
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
          />
          <motion.div
            className="relative z-10 w-full max-w-md rounded-xl bg-[var(--color-bg-cream)] p-6 shadow-xl"
            style={{
              fontFamily: "var(--font-body)",
              border: "1px solid var(--color-border-subtle)",
            }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <button
              type="button"
              onClick={closeModal}
              className="absolute right-4 top-4 rounded p-1 text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-surface-2)] hover:text-[var(--color-text-primary)]"
              aria-label="Cerrar"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  className="py-4 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <p
                    className="text-lg font-medium"
                    style={{ color: "var(--color-partners-text)" }}
                  >
                    Hemos recibido tu solicitud
                  </p>
                  <p
                    className="mt-2 text-sm"
                    style={{ color: "var(--color-pricing-muted)" }}
                  >
                    Te responderemos en menos de 24h.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                >
            <h2
              id="contact-modal-title"
              className="text-xl font-bold"
              style={{ color: "var(--color-hero-heading)" }}
            >
              Solicita acceso a Noah
            </h2>
            <p
              className="mt-1 text-sm"
              style={{ color: "var(--color-hero-subtitle)" }}
            >
              Automatiza tus actas de comunidad en minutos
            </p>

            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
              <div>
                <label
                  htmlFor="contact-name"
                  className="mb-1 block text-sm font-medium"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  Nombre *
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                  className={`${inputBase} ${inputBorder}`}
                  placeholder="Tu nombre"
                  disabled={status === "loading"}
                />
              </div>
              <div>
                <label
                  htmlFor="contact-email"
                  className="mb-1 block text-sm font-medium"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  Email *
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                  className={`${inputBase} ${inputBorder}`}
                  placeholder="tu@email.com"
                  disabled={status === "loading"}
                />
              </div>
              <div>
                <label
                  htmlFor="contact-userType"
                  className="mb-1 block text-sm font-medium"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  Tipo de usuario *
                </label>
                <select
                  id="contact-userType"
                  required
                  value={form.userType}
                  onChange={(e) => setForm((p) => ({ ...p, userType: e.target.value }))}
                  className={`${inputBase} ${inputBorder}`}
                  disabled={status === "loading"}
                >
                  {USER_TYPES.map((opt) => (
                    <option key={opt.value || "empty"} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="contact-message"
                  className="mb-1 block text-sm font-medium"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  Mensaje (opcional)
                </label>
                <textarea
                  id="contact-message"
                  rows={3}
                  value={form.message}
                  onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                  className={`${inputBase} ${inputBorder} resize-none`}
                  placeholder="Cuéntanos en qué podemos ayudarte"
                  disabled={status === "loading"}
                />
              </div>

              {errorMessage && (
                <p className="text-sm text-[var(--color-error)]">{errorMessage}</p>
              )}

              <MotionButton
                type="submit"
                disabled={status === "loading"}
                className="mt-2 flex h-[44px] items-center justify-center rounded-lg font-medium text-white transition-opacity hover:opacity-95 disabled:opacity-60"
                style={{
                  backgroundColor: "var(--color-primary-dark)",
                  fontSize: "var(--text-nav)",
                }}
              >
                {status === "loading" ? "Enviando…" : "Solicitar acceso"}
              </MotionButton>
            </form>
            <p
              className="mt-3 text-center text-xs"
              style={{ color: "var(--color-pricing-muted)" }}
            >
              Sin compromiso. Respuesta en menos de 24h.
            </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
