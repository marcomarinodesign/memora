"use client";

import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const MENU_ITEMS = [
  { label: "Generar acta", href: "/generar-acta" },
  { label: "Pricing", href: "/pricing" },
  { label: "FAQ", href: "/faq" },
  { label: "Contacto", href: "/contacto" },
] as const;

interface NavMenuItemsProps {
  className?: string;
}

const NavMenuItems = ({ className }: NavMenuItemsProps) => (
  <div
    className={`flex flex-col gap-2 md:flex-row md:items-center md:gap-8 ${className ?? ""}`}
  >
    {MENU_ITEMS.map(({ label, href }) => (
      <Link
        key={label}
        href={href}
        className="inline-flex h-10 w-full items-center rounded-md px-1 text-sm font-medium text-foreground underline-offset-4 hover:underline md:h-11 md:w-auto md:px-0"
      >
        {label}
      </Link>
    ))}
  </div>
);

export function LpNavbar1() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <nav className="bg-white sticky top-0 isolate z-50 py-3.5 md:py-4">
      <div className="relative container m-auto flex flex-col justify-between gap-4 px-6 md:flex-row md:items-center md:gap-8">
        <div className="flex items-center justify-between md:flex-none">
          <Link
            href="/"
            aria-label="Go to homepage"
            className="font-bold text-foreground text-base"
          >
            noah.estate
          </Link>
          <Button
            variant="ghost"
            type="button"
            className="flex items-center justify-center md:hidden"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden flex-1 items-center gap-6 md:flex">
          <NavMenuItems className="mx-auto" />
          <Button variant="primary" href="/generar-acta">
            Generar acta
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="flex w-full flex-col justify-end gap-5 pb-2.5 md:hidden">
            <NavMenuItems />
            <Button variant="primary" href="/generar-acta" className="w-full">
              Generar acta
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
