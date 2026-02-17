import { Button } from "@/components/ui/button";

interface HeroSection1Props {
  title: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  className?: string;
}

export function HeroSection1({
  title,
  description,
  primaryCta,
  secondaryCta,
  className = "",
}: HeroSection1Props) {
  return (
    <section
      className={`container mx-auto max-w-4xl px-6 pt-16 md:pt-24 pb-20 md:pb-28 text-center ${className}`}
      style={{ paddingLeft: "var(--space-6)", paddingRight: "var(--space-6)" }}
    >
      <h1
        className="heading-xl max-w-[800px] mx-auto"
        style={{
          color: "var(--color-text-primary)",
          letterSpacing: "var(--tracking-tight)",
        }}
      >
        {title}
      </h1>
      <p
        className="mt-5 max-w-2xl mx-auto"
        style={{
          marginTop: "var(--space-5)",
          fontSize: "var(--text-base)",
          lineHeight: "var(--leading-relaxed)",
          color: "var(--color-text-secondary)",
        }}
      >
        {description}
      </p>
      <div
        className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
        style={{ marginTop: "var(--space-10)", gap: "var(--space-3)" }}
      >
        <Button
          variant="primary"
          size="lg"
          href={primaryCta.href}
          className="min-w-[200px]"
        >
          {primaryCta.label}
        </Button>
        {secondaryCta && (
          <Button
            variant="secondary"
            size="lg"
            href={secondaryCta.href}
            className="min-w-[160px]"
          >
            {secondaryCta.label}
          </Button>
        )}
      </div>
    </section>
  );
}
