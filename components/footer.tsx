"use client";

import Image from "next/image";
import Link from "next/link";
import { Github, Twitter, Linkedin, Instagram } from "lucide-react";

const footerText = {
  heading: "15px",
  headingWeight: 700,
  link: "12.9px",
  linkHeight: "18.75px",
  legal: "11.1px",
  legalHeight: "16.88px",
};

type FooterLink = { label: string; href: string; external?: boolean };

const FOOTER_COLUMNS: { heading: string; links: FooterLink[] }[] = [
  {
    heading: "Producto",
    links: [
      { label: "Generar acta", href: "/generar-acta" },
      { label: "Cómo funciona", href: "/#producto" },
      { label: "Precios", href: "/#precios" },
      { label: "FAQ", href: "/#faq" },
    ],
  },
  {
    heading: "Empezar",
    links: [
      { label: "Precios", href: "/#precios" },
      { label: "Probar gratis", href: "/generar-acta" },
      { label: "Contacto", href: "/#contacto" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Términos de uso", href: "/terminos" },
      { label: "Privacidad", href: "/privacidad" },
    ],
  },
  {
    heading: "Contacto",
    links: [
      { label: "Formulario", href: "/#contacto" },
      { label: "GitHub", href: "https://github.com/marcomarinodesign/noah", external: true },
    ],
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        backgroundColor: "var(--color-section-dark-bg)",
        color: "var(--color-section-dark-text)",
      }}
    >
      <div
        className="mx-auto flex max-w-[1230px] flex-col gap-12 px-6 py-12 md:gap-[90px] md:py-[90px]"
        style={{
          paddingLeft: "var(--space-6)",
          paddingRight: "var(--space-6)",
        }}
      >
        {/* Link columns — Figma 0:769 */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-[45px]">
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.heading} className="flex flex-col gap-[15px]">
              <h4
                className="font-bold"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: footerText.heading,
                  lineHeight: "22.5px",
                  color: "var(--color-section-dark-text)",
                }}
              >
                {col.heading}
              </h4>
              <ul className="flex flex-col gap-[15px]">
                {col.links.map((link) =>
                  link.external ? (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-opacity hover:opacity-80"
                        style={{
                          fontFamily: "var(--font-body)",
                          fontWeight: 400,
                          fontSize: footerText.link,
                          lineHeight: footerText.linkHeight,
                          color: "var(--color-section-dark-text)",
                        }}
                      >
                        {link.label}
                      </a>
                    </li>
                  ) : (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="transition-opacity hover:opacity-80"
                        style={{
                          fontFamily: "var(--font-body)",
                          fontWeight: 400,
                          fontSize: footerText.link,
                          lineHeight: footerText.linkHeight,
                          color: "var(--color-section-dark-text)",
                        }}
                      >
                        {link.label}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>
          ))}
        </div>

        {/* Separator + logo — Figma 0:843 */}
        <div className="flex items-center gap-[45px]">
          <div
            className="h-px flex-1 shrink-0"
            style={{
              borderTop: "1px solid var(--color-primary-dark)",
            }}
          />
          <Link href="/" className="shrink-0" aria-label="Noah - Inicio">
            <Image
              src="/images/logo.png"
              alt="Noah"
              width={136}
              height={30}
              className="h-8 w-auto opacity-95 md:h-[30px]"
              style={{ filter: "brightness(0) invert(1)" }}
            />
          </Link>
          <div
            className="h-px flex-1 shrink-0"
            style={{
              borderTop: "1px solid var(--color-primary-dark)",
            }}
          />
        </div>

        {/* Bottom: legal + social — Figma 0:851 */}
        <div className="flex flex-col gap-6 border-t border-[var(--color-primary-dark)] pt-8 md:flex-row md:items-start md:justify-between md:gap-8">
          <div className="flex flex-col gap-5">
            <Link href="/" className="inline-block w-fit">
              <Image
                src="/images/logo.png"
                alt="Noah"
                width={120}
                height={33}
                className="h-7 w-auto opacity-95 md:h-8"
                style={{ filter: "brightness(0) invert(1)" }}
              />
            </Link>
            <div
              className="text-left"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                fontSize: footerText.legal,
                lineHeight: footerText.legalHeight,
                color: "var(--color-section-dark-text)",
                opacity: 0.95,
              }}
            >
              <p>De reunión a acta profesional en minutos. Noah usa IA para estructurar automáticamente la información en un acta formal lista para compartir.</p>
            </div>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                fontSize: footerText.legal,
                lineHeight: "15px",
                color: "var(--color-section-dark-text)",
                opacity: 0.9,
              }}
            >
              © {currentYear} Noah. Todos los derechos reservados.
            </p>
            <div
              className="flex flex-wrap gap-x-3 gap-y-1"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                fontSize: footerText.legal,
                lineHeight: "15px",
                color: "var(--color-section-dark-text)",
                opacity: 0.9,
              }}
            >
              <Link href="/terminos" className="transition-opacity hover:opacity-80">
                Términos de uso
              </Link>
              <span aria-hidden>·</span>
              <Link href="/privacidad" className="transition-opacity hover:opacity-80">
                Privacidad
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4 md:shrink-0">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity hover:opacity-80"
              style={{ color: "var(--color-section-dark-text)" }}
              aria-label="Twitter"
            >
              <Twitter className="size-5" strokeWidth={1.5} />
            </a>
            <a
              href="https://github.com/marcomarinodesign/noah"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity hover:opacity-80"
              style={{ color: "var(--color-section-dark-text)" }}
              aria-label="GitHub"
            >
              <Github className="size-5" strokeWidth={1.5} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity hover:opacity-80"
              style={{ color: "var(--color-section-dark-text)" }}
              aria-label="LinkedIn"
            >
              <Linkedin className="size-5" strokeWidth={1.5} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity hover:opacity-80"
              style={{ color: "var(--color-section-dark-text)" }}
              aria-label="Instagram"
            >
              <Instagram className="size-5" strokeWidth={1.5} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
