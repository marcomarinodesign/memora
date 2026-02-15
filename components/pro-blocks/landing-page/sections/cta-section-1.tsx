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
      className={`border-t border-border py-16 md:py-24 ${className}`}
      aria-labelledby="cta-heading"
    >
      <div className="container mx-auto max-w-4xl px-6 text-center">
        <h2
          id="cta-heading"
          className="text-h2 font-bold text-foreground"
        >
          {title}
        </h2>
        {description && (
          <p className="mt-3 text-body text-muted-foreground">
            {description}
          </p>
        )}
        <Button
          variant="primary"
          href={ctaHref}
          className="mt-8 min-w-[220px] py-6 text-btn font-semibold"
        >
          {ctaLabel}
        </Button>
      </div>
    </section>
  );
}
