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
      className={`border-t py-16 md:py-24 ${className}`}
      style={{
        borderColor: "var(--color-border-subtle)",
        paddingTop: "var(--space-16)",
        paddingBottom: "var(--space-16)",
      }}
      aria-labelledby="pricing-preview-heading"
    >
      <div
        className="container mx-auto max-w-4xl px-6 text-center"
        style={{ paddingLeft: "var(--space-6)", paddingRight: "var(--space-6)" }}
      >
        <h2
          id="pricing-preview-heading"
          className="heading-lg"
          style={{ color: "var(--color-text-primary)" }}
        >
          {title}
        </h2>
        <p
          className="mt-3 max-w-xl mx-auto"
          style={{
            marginTop: "var(--space-3)",
            fontSize: "var(--text-base)",
            color: "var(--color-text-secondary)",
          }}
        >
          {subtitle}
        </p>
        <div
          className="mt-8 flex justify-center"
          style={{ marginTop: "var(--space-8)" }}
        >
          <Button
            variant="secondary"
            size="lg"
            href={ctaHref}
            className="min-w-[180px]"
          >
            {ctaLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}
