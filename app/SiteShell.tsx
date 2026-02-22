"use client";

import { usePathname } from "next/navigation";
import { LpNavbar1 } from "@/components/pro-blocks/landing-page/lp-navbars/lp-navbar-1";
import { Footer } from "@/components/footer";

const NO_SHELL_ROUTES = ["/design-system"];

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hasShell = !NO_SHELL_ROUTES.some((r) => pathname.startsWith(r));

  if (!hasShell) return <>{children}</>;

  return (
    <>
      <LpNavbar1 />
      {children}
      <Footer />
    </>
  );
}
