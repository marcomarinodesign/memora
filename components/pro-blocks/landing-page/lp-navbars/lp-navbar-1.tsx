"use client";

import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useId, useState } from "react";

const MENU_ITEMS = [
  { label: "Generar acta", href: "/generar-acta" },
  { label: "Pricing", href: "/pricing" },
  { label: "FAQ", href: "/faq" },
  { label: "Contacto", href: "/contacto" },
] as const;

export function LpNavbar1() {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <header
      className="lp-navbar isolate"
      style={{
        position: "sticky",
        top: 0,
        zIndex: "var(--z-sticky)",
        borderBottom: "1px solid var(--color-border-subtle)",
        backgroundColor: "var(--color-surface-1)",
      }}
    >
      <div
        className="lp-navbar-inner"
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "var(--space-4) var(--space-6)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "var(--space-4)",
        }}
      >
        {/* Logo — izquierda */}
        <Link
          href="/"
          aria-label="Ir a inicio"
          className="shrink-0"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/images/logo.png"
            alt="NOAH ESTATE"
            width={140}
            height={48}
            style={{ height: "auto", width: "auto", maxHeight: "2rem" }}
            priority
          />
        </Link>

        {/* Links — centro (solo desktop) */}
        <nav
          className="lp-nav-desktop-links"
          aria-label="Navegación principal"
        >
          {MENU_ITEMS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="transition-opacity hover:opacity-80"
              style={{
                fontSize: "var(--text-sm)",
                fontWeight: "var(--weight-medium)",
                color: "var(--color-text-primary)",
              }}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Button Generar acta — derecha (solo desktop) */}
        <div className="lp-nav-desktop-cta">
          <Button href="/generar-acta" variant="primary">
            Generar acta
          </Button>
        </div>

        {/* Mobile: hamburger (solo móvil) */}
        <Button
          variant="ghost"
          size="icon"
          type="button"
          className="lp-nav-mobile-menu-btn"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </Button>
      </div>

      {/* Mobile dropdown (solo móvil) */}
      <div
        id={panelId}
        className={`lp-nav-mobile-dropdown ${open ? "" : "hidden"}`}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-1)",
            borderTop: "1px solid var(--color-border-subtle)",
            padding: "var(--space-4) var(--space-6)",
          }}
        >
          {MENU_ITEMS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              onClick={() => setOpen(false)}
              className="rounded-lg transition-opacity hover:opacity-80"
              style={{
                padding: "var(--space-3) var(--space-4)",
                borderRadius: "var(--radius-lg)",
                fontSize: "var(--text-base)",
                fontWeight: "var(--weight-medium)",
                color: "var(--color-text-primary)",
              }}
            >
              {label}
            </Link>
          ))}
          <Button
            variant="primary"
            href="/generar-acta"
            block
            style={{ marginTop: "var(--space-2)" }}
            onClick={() => setOpen(false)}
          >
            Generar acta
          </Button>
        </div>
      </div>
    </header>
  );
}
