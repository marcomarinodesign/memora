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
      style={{
        paddingLeft: "var(--space-6)",
        paddingRight: "var(--space-6)",
        paddingTop: "var(--space-16)",
        paddingBottom: "var(--space-16)",
      }}
      aria-labelledby="bento-heading"
    >
      <h2
        id="bento-heading"
        className="heading-lg text-center"
        style={{ color: "var(--color-text-primary)" }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className="mt-3 text-center max-w-xl mx-auto"
          style={{
            marginTop: "var(--space-3)",
            fontSize: "var(--text-base)",
            color: "var(--color-text-secondary)",
          }}
        >
          {subtitle}
        </p>
      )}
      <div
        className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        style={{ marginTop: "var(--space-12)", gap: "var(--space-4)" }}
      >
        {cards.map((card) => (
          <div
            key={card.title}
            className={`card flex flex-col px-5 py-4 ${card.className ?? ""}`}
            style={{
              padding: "var(--space-5)",
              borderRadius: "var(--radius-xl)",
            }}
          >
            {card.icon && (
              <div
                className="mb-3"
                style={{
                  marginBottom: "var(--space-3)",
                  color: "var(--color-accent-text)",
                }}
              >
                {card.icon}
              </div>
            )}
            <h3
              className="font-semibold"
              style={{
                fontSize: "var(--text-base)",
                fontWeight: "var(--weight-semibold)",
                color: "var(--color-text-primary)",
              }}
            >
              {card.title}
            </h3>
            <p
              className="mt-1"
              style={{
                marginTop: "var(--space-1)",
                fontSize: "var(--text-sm)",
                color: "var(--color-text-secondary)",
              }}
            >
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
