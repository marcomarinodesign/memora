import { Button } from "@/components/ui/button";

interface CtaSection1Props {
  title: string;
  description?: string;
  ctaLabel: string;
  ctaHref: string;
  className?: string;
}

export function CtaSection1({
  title,
  description,
  ctaLabel,
  ctaHref,
  className = "",
}: CtaSection1Props) {
  return (
    <section
      className={`border-t py-16 md:py-24 ${className}`}
      style={{
        borderColor: "var(--color-border-subtle)",
        paddingTop: "var(--space-16)",
        paddingBottom: "var(--space-16)",
      }}
      aria-labelledby="cta-heading"
    >
      <div
        className="container mx-auto max-w-4xl px-6 text-center"
        style={{ paddingLeft: "var(--space-6)", paddingRight: "var(--space-6)" }}
      >
        <h2
          id="cta-heading"
          className="heading-lg"
          style={{ color: "var(--color-text-primary)" }}
        >
          {title}
        </h2>
        {description && (
          <p
            className="mt-3"
            style={{
              marginTop: "var(--space-3)",
              fontSize: "var(--text-base)",
              color: "var(--color-text-secondary)",
            }}
          >
            {description}
          </p>
        )}
        <Button
          variant="primary"
          size="lg"
          href={ctaHref}
          className="mt-8 min-w-[220px]"
          style={{ marginTop: "var(--space-8)" }}
        >
          {ctaLabel}
        </Button>
      </div>
    </section>
  );
}
