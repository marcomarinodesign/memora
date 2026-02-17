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
      className={`border-t ${className}`}
      style={{
        borderColor: "var(--color-border-subtle)",
        backgroundColor: "var(--color-surface-2)",
      }}
      aria-labelledby="features-heading"
    >
      <div
        className="container mx-auto max-w-5xl px-6 py-16 md:py-24"
        style={{
          paddingLeft: "var(--space-6)",
          paddingRight: "var(--space-6)",
          paddingTop: "var(--space-16)",
          paddingBottom: "var(--space-16)",
        }}
      >
        <h2
          id="features-heading"
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
          className="mt-12 grid gap-8 md:grid-cols-3 md:gap-10"
          style={{ marginTop: "var(--space-12)", gap: "var(--space-8)" }}
        >
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col items-center text-center"
            >
              <div
                className="flex items-center justify-center rounded-2xl"
                style={{
                  backgroundColor: "var(--color-accent-subtle)",
                  color: "var(--color-accent-text)",
                  width: "calc(var(--space-12) + var(--space-2))",
                  height: "calc(var(--space-12) + var(--space-2))",
                  borderRadius: "var(--radius-xl)",
                }}
              >
                {feature.icon}
              </div>
              <h3
                className="mt-4 heading-sm"
                style={{
                  marginTop: "var(--space-4)",
                  color: "var(--color-text-primary)",
                }}
              >
                {feature.title}
              </h3>
              <p
                className="mt-2"
                style={{
                  marginTop: "var(--space-2)",
                  fontSize: "var(--text-sm)",
                  color: "var(--color-text-secondary)",
                }}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
