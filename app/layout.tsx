import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { SiteShell } from "./SiteShell";

export const metadata: Metadata = {
  title: "noah.estate - De reunión a acta profesional en minutos",
  description: "Sube el audio de tu reunión o pega la transcripción. Noah usa IA para estructurar automáticamente toda la información en un acta formal lista para compartir.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" data-theme="light" className={GeistSans.variable}>
      <body className="font-sans antialiased">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
