import Link from "next/link";
import { Button } from "@/components/ui/button";

interface PricingPreviewSectionProps {
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  className?: string;
}

export function PricingPreviewSection({
  title = "Planes para cada equipo",
  subtitle = "Elige el plan que mejor se adapte a tus necesidades. Sin sorpresas.",
  ctaLabel = "Ver precios",
  ctaHref = "/pricing",
  className = "",
}: PricingPreviewSectionProps) {
  return (
    <section
      className={`border-t border-border py-16 md:py-24 ${className}`}
      aria-labelledby="pricing-preview-heading"
    >
      <div className="container mx-auto max-w-4xl px-6 text-center">
        <h2
          id="pricing-preview-heading"
          className="text-h2 font-bold text-foreground"
        >
          {title}
        </h2>
        <p className="mt-3 text-body text-muted-foreground max-w-xl mx-auto">
          {subtitle}
        </p>
        <div className="mt-8 flex justify-center">
          <Button
            variant="secondary"
            href={ctaHref}
            className="min-w-[180px] py-6 text-btn font-semibold"
          >
            {ctaLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}
