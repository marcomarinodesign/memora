"use client";

import { ContactModal } from "@/components/ui/ContactModal";
import { LeadModalProvider } from "@/components/context/LeadModalContext";

export function LeadModalLayout({ children }: { children: React.ReactNode }) {
  return (
    <LeadModalProvider>
      {children}
      <ContactModal />
    </LeadModalProvider>
  );
}
