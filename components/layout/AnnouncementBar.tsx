"use client";

import { ChevronRight } from "lucide-react";
import { useLeadModal } from "@/components/context/LeadModalContext";

export function AnnouncementBar() {
  const { openModal } = useLeadModal();

  return (
    <div
      className="flex items-center justify-center gap-2 py-1.5 text-center"
      style={{
        backgroundColor: "var(--color-banner-bg)",
        color: "var(--color-banner-text)",
        fontFamily: "var(--font-body)",
        fontWeight: "var(--weight-medium)",
        fontSize: "var(--text-banner)",
        lineHeight: "var(--leading-banner)",
      }}
    >
      <button
        type="button"
        onClick={openModal}
        className="inline-flex items-center justify-center gap-1.5 transition-opacity hover:opacity-90"
      >
        <span>Noah en beta — Solicita acceso</span>
        <ChevronRight className="size-4 shrink-0" aria-hidden />
      </button>
    </div>
  );
}
