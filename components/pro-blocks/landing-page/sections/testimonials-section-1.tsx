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
      "Memora ha transformado cómo gestionamos las actas de reunión. Ahorramos horas cada semana.",
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
  subtitle = "Equipos que ya confían en Memora",
  testimonials = PLACEHOLDER_TESTIMONIALS,
  className = "",
}: TestimonialsSection1Props) {
  return (
    <section
      className={`border-t border-border bg-muted/30 py-16 md:py-24 ${className}`}
      aria-labelledby="testimonials-heading"
    >
      <div className="container mx-auto max-w-4xl px-6">
        <h2
          id="testimonials-heading"
          className="text-h2 font-bold text-foreground text-center"
        >
          {title}
        </h2>
        {subtitle && (
          <p className="mt-3 text-body text-center text-muted-foreground">
            {subtitle}
          </p>
        )}
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <blockquote
              key={i}
              className="rounded-xl border border-border bg-card p-6"
            >
              <p className="text-body text-foreground italic">&ldquo;{t.quote}&rdquo;</p>
              <footer className="mt-4">
                <cite className="not-italic text-body-sm font-medium text-foreground">
                  {t.author}
                </cite>
                {t.role && (
                  <span className="text-body-sm text-muted-foreground">
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
