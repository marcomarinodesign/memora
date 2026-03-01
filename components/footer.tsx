"use client";

import { useLeadModal } from "@/components/context/LeadModalContext";
import Image from "next/image";
import Link from "next/link";
const footerText = {
  heading: "15px",
  headingWeight: 700,
  link: "12.9px",
  linkHeight: "18.75px",
};

type FooterLink = { label: string; href: string; external?: boolean; openModal?: boolean };

const FOOTER_COLUMNS: { heading: string; links: FooterLink[] }[] = [
  {
    heading: "Producto",
    links: [
      { label: "Solicitar acceso", href: "#", openModal: true },
      { label: "Cómo funciona", href: "/#producto" },
      { label: "Precios", href: "/#precios" },
      { label: "FAQ", href: "/#faq" },
    ],
  },
  {
    heading: "Empezar",
    links: [
      { label: "Precios", href: "/#precios" },
      { label: "Pedir información", href: "#", openModal: true },
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
      { label: "Hablar con nosotros", href: "#", openModal: true },
      { label: "GitHub", href: "https://github.com/marcomarinodesign/noah", external: true },
    ],
  },
];

export function Footer() {
  const { openModal } = useLeadModal();

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
                  link.openModal ? (
                    <li key={link.label}>
                      <button
                        type="button"
                        onClick={openModal}
                        className="transition-opacity hover:opacity-80 text-left"
                        style={{
                          fontFamily: "var(--font-body)",
                          fontWeight: 400,
                          fontSize: footerText.link,
                          lineHeight: footerText.linkHeight,
                          color: "var(--color-section-dark-text)",
                          background: "none",
                          border: "none",
                          padding: 0,
                          cursor: "pointer",
                        }}
                      >
                        {link.label}
                      </button>
                    </li>
                  ) : link.external ? (
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
              src="/brand/White_Logo.svg"
              alt="Noah"
              width={136}
              height={30}
              className="h-8 w-auto opacity-95 md:h-[30px]"
            />
          </Link>
          <div
            className="h-px flex-1 shrink-0"
            style={{
              borderTop: "1px solid var(--color-primary-dark)",
            }}
          />
        </div>
      </div>
    </footer>
  );
}
