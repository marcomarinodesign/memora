"use client";

import { createContext, useCallback, useContext, useState } from "react";

type LeadModalContextValue = {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

const LeadModalContext = createContext<LeadModalContextValue | null>(null);

export function useLeadModal() {
  const ctx = useContext(LeadModalContext);
  if (!ctx) throw new Error("useLeadModal must be used within LeadModalProvider");
  return ctx;
}

export function LeadModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => {
    setIsOpen(true);
    if (typeof window !== "undefined" && (window as unknown as { gtag?: (a: string, b: string) => void }).gtag) {
      (window as unknown as { gtag: (a: string, b: string) => void }).gtag("event", "modal_open");
    }
  }, []);

  const closeModal = useCallback(() => setIsOpen(false), []);

  return (
    <LeadModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
    </LeadModalContext.Provider>
  );
}
