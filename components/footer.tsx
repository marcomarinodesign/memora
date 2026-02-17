import Image from "next/image";
import Link from "next/link";
import { Github, Twitter, Linkedin } from "lucide-react";

const linkStyles = {
  fontSize: "var(--text-sm)",
  fontWeight: "var(--weight-regular)",
  lineHeight: "var(--leading-snug)",
  color: "var(--color-text-primary)",
  transition: "opacity 0.15s ease",
};

const headingStyles = {
  fontSize: "var(--text-sm)",
  fontWeight: "var(--weight-semibold)",
  lineHeight: "var(--leading-snug)",
  color: "var(--color-text-primary)",
  marginBottom: "var(--space-3)",
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        backgroundColor: "var(--color-surface-1)",
      }}
    >
      <div
        className="container mx-auto grid grid-cols-2 gap-8 py-16 md:grid-cols-4 md:gap-12 md:px-20 md:py-16"
        style={{ maxWidth: "1280px", paddingLeft: "var(--space-6)", paddingRight: "var(--space-6)" }}
      >
        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <Link href="/" className="inline-block w-20 md:w-24">
            <Image
              src="/images/logo.png"
              alt="NOAH ESTATE"
              width={96}
              height={33}
              className="h-auto w-full"
            />
          </Link>
          <p
            className="mt-[18px] max-w-xs"
            style={{
              ...linkStyles,
              marginTop: "var(--space-5)",
            }}
          >
            Convierte reuniones en actas profesionales con IA.
          </p>
        </div>

        {/* Product */}
        <div>
          <h3 style={headingStyles}>Producto</h3>
          <ul className="stack gap-3">
            <li>
              <Link href="/generar-acta" className="hover:opacity-80" style={linkStyles}>
                Generar acta
              </Link>
            </li>
            <li>
              <Link href="/acta" className="hover:opacity-80" style={linkStyles}>
                Ver ejemplo
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:opacity-80" style={linkStyles}>
                FAQ
              </Link>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 style={headingStyles}>Empresa</h3>
          <ul className="stack gap-3">
            <li>
              <Link href="/contacto" className="hover:opacity-80" style={linkStyles}>
                Contacto
              </Link>
            </li>
            <li>
              <a
                href="https://github.com/marcomarinodesign/noah"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80"
                style={linkStyles}
              >
                GitHub
              </a>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 style={headingStyles}>Legal</h3>
          <ul className="stack gap-3">
            <li>
              <Link href="/privacidad" className="hover:opacity-80" style={linkStyles}>
                Privacidad
              </Link>
            </li>
            <li>
              <Link href="/terminos" className="hover:opacity-80" style={linkStyles}>
                Términos
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row"
        style={{
          marginTop: "var(--space-12)",
          paddingTop: "var(--space-8)",
          borderColor: "var(--color-border-subtle)",
        }}
      >
        <p style={linkStyles}>
          © {currentYear} Noah. Todos los derechos reservados.
        </p>
        <div
          className="flex items-center gap-6"
          style={{ gap: "var(--space-6)" }}
        >
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-opacity hover:opacity-80"
            style={{ color: "var(--color-text-primary)" }}
            aria-label="Twitter"
          >
            <Twitter className="size-5" />
          </a>
          <a
            href="https://github.com/marcomarinodesign/noah"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-opacity hover:opacity-80"
            style={{ color: "var(--color-text-primary)" }}
            aria-label="GitHub"
          >
            <Github className="size-5" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-opacity hover:opacity-80"
            style={{ color: "var(--color-text-primary)" }}
            aria-label="LinkedIn"
          >
            <Linkedin className="size-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
