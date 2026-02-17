import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import { LpNavbar1 } from "@/components/pro-blocks/landing-page/lp-navbars/lp-navbar-1";
import { Footer } from "@/components/footer";

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  display: "swap",
  variable: "--font-lato",
});

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
    <html lang="es" data-theme="light" className={lato.variable}>
      <body className="font-sans antialiased">
        <LpNavbar1 />
        {children}
        <Footer />
      </body>
    </html>
  );
}
