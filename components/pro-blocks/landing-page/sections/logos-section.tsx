interface LogosSectionProps {
  title?: string;
  logos?: { name: string; placeholder?: boolean }[];
  className?: string;
}

const DEFAULT_LOGOS = [
  { name: "Empresa 1", placeholder: true },
  { name: "Empresa 2", placeholder: true },
  { name: "Empresa 3", placeholder: true },
  { name: "Empresa 4", placeholder: true },
  { name: "Empresa 5", placeholder: true },
];

export function LogosSection({
  title = "Confían en Noah",
  logos = DEFAULT_LOGOS,
  className = "",
}: LogosSectionProps) {
  return (
    <section
      className={`border-y py-12 md:py-16 ${className}`}
      style={{
        borderColor: "var(--color-border-subtle)",
        backgroundColor: "var(--color-surface-2)",
        paddingTop: "var(--space-12)",
        paddingBottom: "var(--space-16)",
      }}
      aria-label="Empresas que confían en nosotros"
    >
      <div className="container mx-auto max-w-5xl px-6">
        {title && (
          <p
            className="text-center mb-8"
            style={{
              fontSize: "var(--text-sm)",
              color: "var(--color-text-secondary)",
              marginBottom: "var(--space-8)",
            }}
          >
            {title}
          </p>
        )}
        <div
          className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-60"
          style={{ gap: "var(--space-8)" }}
        >
          {logos.map((logo) => (
            <div
              key={logo.name}
              className="flex h-8 items-center justify-center px-4"
              style={{
                color: "var(--color-text-secondary)",
                paddingLeft: "var(--space-4)",
                paddingRight: "var(--space-4)",
              }}
            >
              {logo.placeholder ? (
                <span
                  className="font-medium"
                  style={{
                    fontSize: "var(--text-sm)",
                    fontWeight: "var(--weight-medium)",
                    color: "var(--color-text-tertiary)",
                  }}
                >
                  {logo.name}
                </span>
              ) : (
                <span
                  className="font-medium"
                  style={{
                    fontSize: "var(--text-sm)",
                    fontWeight: "var(--weight-medium)",
                    color: "var(--color-text-primary)",
                  }}
                >
                  {logo.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
