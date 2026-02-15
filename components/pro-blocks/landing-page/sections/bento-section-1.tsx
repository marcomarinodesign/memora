import type { ReactNode } from "react";

interface BentoCard {
  title: string;
  description: string;
  icon?: ReactNode;
  className?: string;
}

interface BentoSection1Props {
  title: string;
  subtitle?: string;
  cards: BentoCard[];
  className?: string;
}

export function BentoSection1({
  title,
  subtitle,
  cards,
  className = "",
}: BentoSection1Props) {
  return (
    <section
      className={`container mx-auto max-w-5xl px-6 py-16 md:py-24 ${className}`}
      aria-labelledby="bento-heading"
    >
      <h2
        id="bento-heading"
        className="text-h2 font-bold text-foreground text-center"
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-body text-center text-muted-foreground max-w-xl mx-auto">
          {subtitle}
        </p>
      )}
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.title}
            className={`flex flex-col rounded-xl border border-border bg-card px-5 py-4 ${card.className ?? ""}`}
          >
            {card.icon && (
              <div className="mb-3 text-primary">{card.icon}</div>
            )}
            <h3 className="text-body font-semibold text-foreground">
              {card.title}
            </h3>
            <p className="mt-1 text-body-sm text-muted-foreground">
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
