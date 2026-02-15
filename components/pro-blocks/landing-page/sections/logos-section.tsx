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
  title = "Confían en Memora",
  logos = DEFAULT_LOGOS,
  className = "",
}: LogosSectionProps) {
  return (
    <section
      className={`border-y border-border bg-muted/30 py-12 md:py-16 ${className}`}
      aria-label="Empresas que confían en nosotros"
    >
      <div className="container mx-auto max-w-5xl px-6">
        {title && (
          <p className="text-body-sm text-center text-muted-foreground mb-8">
            {title}
          </p>
        )}
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-60">
          {logos.map((logo) => (
            <div
              key={logo.name}
              className="flex h-8 items-center justify-center px-4 text-muted-foreground"
            >
              {logo.placeholder ? (
                <span className="text-body-sm font-medium text-muted-foreground/80">
                  {logo.name}
                </span>
              ) : (
                <span className="text-body-sm font-medium">{logo.name}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
