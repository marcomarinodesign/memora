import type { Metadata } from "next";
import { Public_Sans } from "next/font/google";
import "./globals.css";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { LpNavbar1 } from "@/components/pro-blocks/landing-page/lp-navbars/lp-navbar-1";
import { Footer } from "@/components/footer";
import { LeadModalLayout } from "@/components/layout/LeadModalLayout";

const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-public-sans",
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
    <html lang="es" data-theme="light" className={publicSans.variable}>
      <body className="font-sans antialiased">
        <LeadModalLayout>
          <AnnouncementBar />
          <LpNavbar1 />
          {children}
          <Footer />
        </LeadModalLayout>
      </body>
    </html>
  );
}
