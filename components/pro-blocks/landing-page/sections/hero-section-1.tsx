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
    >
      <h1 className="max-w-[800px] heading-xl text-foreground text-[64px] font-extrabold tracking-[-2px]">
        {title}
      </h1>
      <p className="mt-5 text-body text-muted-foreground max-w-2xl mx-auto">
        {description}
      </p>
      <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Button
          variant="primary"
          href={primaryCta.href}
          className="min-w-[200px] py-6 text-btn font-semibold"
        >
          {primaryCta.label}
        </Button>
        {secondaryCta && (
          <Button
            variant="secondary"
            href={secondaryCta.href}
            className="min-w-[160px] py-6 text-btn font-semibold"
          >
            {secondaryCta.label}
          </Button>
        )}
      </div>
    </section>
  );
}
