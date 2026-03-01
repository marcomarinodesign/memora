"use client";

import { Button } from "@/components/ui/button";
import { useLeadModal } from "@/components/context/LeadModalContext";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useId, useState, useCallback, useEffect } from "react";

const NAVBAR_OFFSET_PX = 86;

const MENU_ITEMS = [
  { label: "Cómo funciona", sectionId: "producto" },
  { label: "Pricing", sectionId: "precios" },
  { label: "Contacto", sectionId: "faq" },
] as const;

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const yOffset = -NAVBAR_OFFSET_PX;
  const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
  window.scrollTo({ top: y, behavior: "smooth" });
}

const navLinkStyle = {
  fontSize: "var(--text-nav)",
  lineHeight: "var(--leading-nav)",
  fontWeight: "var(--weight-medium)" as const,
  color: "var(--color-nav-text)",
};

export function LpNavbar1() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const panelId = useId();
  const { openModal } = useLeadModal();

  const handleNavClick = useCallback((sectionId: string) => {
    scrollToSection(sectionId);
    setOpen(false);
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `/#${sectionId}`);
    }
  }, []);

  useEffect(() => {
    const sectionIds = MENU_ITEMS.map((item) => item.sectionId);
    const threshold = NAVBAR_OFFSET_PX + 80;

    const onScroll = () => {
      let current: string | null = null;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= threshold) current = id;
      }
      setActiveSection(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="lp-navbar isolate"
      style={{
        position: "sticky",
        top: 0,
        zIndex: "var(--z-sticky)",
        backgroundColor: "var(--color-bg-cream)",
      }}
    >
      <div
        className="lp-navbar-inner"
        style={{
          maxWidth: "1230px",
          margin: "0 auto",
          paddingLeft: "var(--space-6)",
          paddingRight: "var(--space-6)",
          minHeight: "86px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "var(--space-4)",
        }}
      >
        <Link
          href="/"
          aria-label="Ir a inicio"
          className="shrink-0"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/brand/Green_Logo.svg"
            alt="Noah"
            width={93}
            height={20}
            style={{ height: "20px", width: "auto" }}
            priority
          />
        </Link>

        <nav
          className="lp-nav-desktop-links items-center gap-0"
          aria-label="Navegación principal"
          style={{ gap: "var(--space-2)" }}
        >
          {MENU_ITEMS.map(({ label, sectionId }) => (
            <a
              key={sectionId}
              href={`/#${sectionId}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(sectionId);
              }}
              className={`rounded px-4 py-2 transition-opacity hover:opacity-80 ${activeSection === sectionId ? "opacity-100 font-semibold" : "opacity-90"}`}
              style={navLinkStyle}
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="lp-nav-desktop-cta">
          <button
            type="button"
            onClick={() => { setOpen(false); openModal(); }}
            className="inline-flex h-[38px] items-center justify-center rounded px-4 text-[15px] font-medium transition-opacity hover:opacity-90"
            style={{
              ...navLinkStyle,
              border: "1px solid var(--color-nav-border)",
              backgroundColor: "transparent",
            }}
          >
            Solicitar acceso
          </button>
        </div>

        <Button
          variant="ghost"
          size="icon"
          type="button"
          className="lp-nav-mobile-menu-btn md:hidden"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </Button>
      </div>

      <div
        id={panelId}
        className={`lp-nav-mobile-dropdown md:hidden ${open ? "" : "hidden"}`}
        style={{
          borderTop: "1px solid var(--color-border-subtle)",
          padding: "var(--space-4) var(--space-6)",
        }}
      >
        <div className="flex flex-col gap-1">
          {MENU_ITEMS.map(({ label, sectionId }) => (
            <a
              key={sectionId}
              href={`/#${sectionId}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(sectionId);
              }}
              className={`rounded-lg px-4 py-3 transition-opacity hover:opacity-80 ${activeSection === sectionId ? "opacity-100 font-semibold" : ""}`}
              style={{ ...navLinkStyle, fontSize: "var(--text-base)" }}
            >
              {label}
            </a>
          ))}
          <button
            type="button"
            onClick={() => { setOpen(false); openModal(); }}
            className="mt-2 inline-flex h-[38px] items-center justify-center rounded border px-4"
            style={{
              borderColor: "var(--color-nav-border)",
              ...navLinkStyle,
            }}
          >
            Solicitar acceso
          </button>
        </div>
      </div>
    </header>
  );
}
