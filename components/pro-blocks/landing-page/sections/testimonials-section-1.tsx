interface Testimonial {
  quote: string;
  author: string;
  role?: string;
}

interface TestimonialsSection1Props {
  title?: string;
  subtitle?: string;
  testimonials?: Testimonial[];
  className?: string;
}

const PLACEHOLDER_TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Noah ha transformado cómo gestionamos las actas de reunión. Ahorramos horas cada semana.",
    author: "Cliente 1",
    role: "Equipo de producto",
  },
  {
    quote:
      "Formato profesional consistente sin esfuerzo. Lo recomiendo a cualquier equipo.",
    author: "Cliente 2",
    role: "Project Manager",
  },
];

export function TestimonialsSection1({
  title = "Lo que dicen nuestros usuarios",
  subtitle = "Equipos que ya confían en Noah",
  testimonials = PLACEHOLDER_TESTIMONIALS,
  className = "",
}: TestimonialsSection1Props) {
  return (
    <section
      className={`border-t py-16 md:py-24 ${className}`}
      style={{
        borderColor: "var(--color-border-subtle)",
        backgroundColor: "var(--color-surface-2)",
        paddingTop: "var(--space-16)",
        paddingBottom: "var(--space-16)",
      }}
      aria-labelledby="testimonials-heading"
    >
      <div
        className="container mx-auto max-w-4xl px-6"
        style={{ paddingLeft: "var(--space-6)", paddingRight: "var(--space-6)" }}
      >
        <h2
          id="testimonials-heading"
          className="heading-lg text-center"
          style={{ color: "var(--color-text-primary)" }}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            className="mt-3 text-center"
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
          className="mt-12 grid gap-8 md:grid-cols-2"
          style={{ marginTop: "var(--space-12)", gap: "var(--space-8)" }}
        >
          {testimonials.map((t, i) => (
            <blockquote
              key={i}
              className="card p-6"
              style={{
                padding: "var(--space-6)",
                borderRadius: "var(--radius-xl)",
                border: "1px solid var(--color-border-subtle)",
                backgroundColor: "var(--color-surface-1)",
              }}
            >
              <p
                className="italic"
                style={{
                  fontSize: "var(--text-base)",
                  color: "var(--color-text-primary)",
                }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>
              <footer
                className="mt-4"
                style={{ marginTop: "var(--space-4)" }}
              >
                <cite
                  className="not-italic font-medium"
                  style={{
                    fontSize: "var(--text-sm)",
                    fontWeight: "var(--weight-medium)",
                    color: "var(--color-text-primary)",
                    fontStyle: "normal",
                  }}
                >
                  {t.author}
                </cite>
                {t.role && (
                  <span
                    style={{
                      fontSize: "var(--text-sm)",
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    {" "}
                    — {t.role}
                  </span>
                )}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
