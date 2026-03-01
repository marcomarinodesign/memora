"use client";

import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useId, useState } from "react";

const MENU_ITEMS = [
  { label: "Cómo funciona", href: "/#producto" },
  { label: "Pricing", href: "/#precios" },
  { label: "Contacto", href: "/#contacto" },
] as const;

const navLinkStyle = {
  fontSize: "var(--text-nav)",
  lineHeight: "var(--leading-nav)",
  fontWeight: "var(--weight-medium)" as const,
  color: "var(--color-nav-text)",
};

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
            src="/images/logo.png"
            alt="minutbook"
            width={140}
            height={30}
            style={{ height: "30px", width: "auto" }}
            priority
          />
        </Link>

        <nav
          className="lp-nav-desktop-links items-center gap-0"
          aria-label="Navegación principal"
          style={{ gap: "var(--space-2)" }}
        >
          {MENU_ITEMS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="rounded px-4 py-2 transition-opacity hover:opacity-80"
              style={navLinkStyle}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="lp-nav-desktop-cta">
          <Link
            href="/generar-acta"
            className="inline-flex h-[38px] items-center justify-center rounded px-4 text-[15px] font-medium transition-opacity hover:opacity-90"
            style={{
              ...navLinkStyle,
              border: "1px solid var(--color-nav-border)",
              backgroundColor: "transparent",
            }}
          >
            Generar acta
          </Link>
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
          {MENU_ITEMS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-4 py-3 transition-opacity hover:opacity-80"
              style={{ ...navLinkStyle, fontSize: "var(--text-base)" }}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/generar-acta"
            onClick={() => setOpen(false)}
            className="mt-2 inline-flex h-[38px] items-center justify-center rounded border px-4"
            style={{
              borderColor: "var(--color-nav-border)",
              ...navLinkStyle,
            }}
          >
            Generar acta
          </Link>
        </div>
      </div>
    </header>
  );
}
