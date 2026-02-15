import type { ReactNode } from "react";

interface Feature {
  title: string;
  description: string;
  icon: ReactNode;
}

interface FeaturesSection1Props {
  title: string;
  subtitle?: string;
  features: Feature[];
  className?: string;
}

export function FeaturesSection1({
  title,
  subtitle,
  features,
  className = "",
}: FeaturesSection1Props) {
  return (
    <section
      className={`border-t border-border bg-card/50 ${className}`}
      aria-labelledby="features-heading"
    >
      <div className="container mx-auto max-w-5xl px-6 py-16 md:py-24">
        <h2
          id="features-heading"
          className="text-h2 font-bold text-foreground text-center"
        >
          {title}
        </h2>
        {subtitle && (
          <p className="mt-3 text-body text-center text-muted-foreground max-w-xl mx-auto">
            {subtitle}
          </p>
        )}
        <div className="mt-12 grid gap-8 md:grid-cols-3 md:gap-10">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col items-center text-center"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                {feature.icon}
              </div>
              <h3 className="mt-4 text-h3 font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 text-body-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
