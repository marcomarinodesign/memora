"use client";

import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

const MAIN_NAV_LINKS = [
  { href: "/generar-acta", label: "Generar acta" },
  { href: "/pricing", label: "Pricing" },
  { href: "/faq", label: "FAQ" },
  { href: "/contacto", label: "Contacto" },
];

const LEGAL_LINKS = [
  { href: "/#privacidad", label: "Privacidad" },
  { href: "/#terminos", label: "Términos" },
  { href: "/#cookies", label: "Cookies" },
];

export function Footer1() {
  return (
    <footer
      className="section-padding-y bg-[var(--black)] text-[var(--off-white)] text-body-sm"
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="container-padding-x container mx-auto flex flex-col gap-12 lg:gap-16">
        {/* Top Section */}
        <div className="flex w-full flex-col items-center gap-12 text-center">
          {/* Logo Section */}
          <Link href="/" aria-label="Go to homepage">
            <Image
              src="/brand/memora.svg"
              alt="memora"
              width={59}
              height={9}
              priority
              className="h-4 w-auto brightness-0 invert"
            />
          </Link>

          {/* Main Navigation */}
          <nav
            className="flex flex-col items-center gap-4 md:flex-row md:gap-8"
            aria-label="Footer navigation"
          >
            {MAIN_NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-white/70 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Section Divider */}
        <Separator role="presentation" className="bg-white/15" />

        {/* Bottom Section */}
        <div className="flex w-full flex-col-reverse items-center gap-12 lg:flex-row lg:justify-between lg:gap-6">
          {/* Copyright Text */}
          <p className="text-white/60 text-center lg:text-left">
            <span>Copyright © {new Date().getFullYear()}</span>{" "}
            <Link href="/" className="hover:underline">
              memora
            </Link>
            . All rights reserved.
          </p>

          {/* Legal Navigation */}
          <nav
            className="flex flex-col items-center gap-4 md:flex-row md:gap-8"
            aria-label="Legal links"
          >
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-white/60 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
