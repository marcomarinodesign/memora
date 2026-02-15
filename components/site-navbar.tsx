"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useState } from "react";
import { Button } from "@/components/ui/button";

function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M4 6h16" />
      <path d="M4 12h16" />
      <path d="M4 18h16" />
    </svg>
  );
}

function CloseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M18 6 6 18" />
      <path d="M6 6l12 12" />
    </svg>
  );
}

const links = [
  { href: "/faq", label: "FAQ" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contacto", label: "Contacto" },
];

export function SiteNavbar() {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <header className="fixed left-0 right-0 top-8 z-50">
      <div className="mx-auto max-w-5xl px-4">
        <div className="relative flex h-16 items-center rounded-full border border-border/70 bg-card px-5 shadow-[0_14px_40px_rgba(15,23,42,0.14)]">
          <Link
            href="/"
            className="inline-flex items-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            aria-label="Ir al inicio"
            onClick={() => setOpen(false)}
          >
            <Image
              src="/brand/memora-logo.png"
              alt="memora"
              width={80}
              height={18}
              priority
              className="h-4 w-auto"
            />
          </Link>

          {/* decorative dot (design system: primary) */}
          <span
            className="pointer-events-none absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary"
            aria-hidden="true"
          />

          <nav
            className="hidden flex-1 items-center justify-center gap-9 md:flex"
            aria-label="Navegación principal"
          >
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-full px-2 py-1 text-sm font-medium text-foreground transition-colors hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto hidden md:block">
            <Button variant="primary" href="/#generator">
              Genera acta
            </Button>
          </div>

          <button
            type="button"
            className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-transparent text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background md:hidden"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>

        <div
          id={panelId}
          className={`md:hidden ${open ? "block" : "hidden"}`}
        >
          <div className="mt-3 rounded-3xl border border-border bg-card p-3 shadow-[0_16px_60px_rgba(0,0,0,0.18)]">
            <div className="flex flex-col gap-1">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-4 py-3 text-base font-medium text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  {l.label}
                </Link>
              ))}
              <Button
                variant="primary"
                href="/#generator"
                className="mt-2 w-full"
                onClick={() => setOpen(false)}
              >
                Genera acta
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

