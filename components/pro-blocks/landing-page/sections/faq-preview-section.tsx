import Link from "next/link";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqPreviewSectionProps {
  title?: string;
  items?: FaqItem[];
  ctaLabel?: string;
  ctaHref?: string;
  className?: string;
}

const PLACEHOLDER_FAQ: FaqItem[] = [
  {
    question: "¿Qué formatos de documento acepta Memora?",
    answer:
      "Puedes subir transcripciones en texto, archivos .txt o .docx. Próximamente más formatos.",
  },
  {
    question: "¿Cuánto tarda en generarse el acta?",
    answer: "Normalmente solo unos segundos. Depende de la longitud del documento.",
  },
];

export function FaqPreviewSection({
  title = "Preguntas frecuentes",
  items = PLACEHOLDER_FAQ,
  ctaLabel = "Ver todas las preguntas",
  ctaHref = "/faq",
  className = "",
}: FaqPreviewSectionProps) {
  return (
    <section
      className={`border-t border-border bg-muted/30 py-16 md:py-24 ${className}`}
      aria-labelledby="faq-preview-heading"
    >
      <div className="container mx-auto max-w-3xl px-6">
        <h2
          id="faq-preview-heading"
          className="text-h2 font-bold text-foreground text-center"
        >
          {title}
        </h2>
        <dl className="mt-12 space-y-6">
          {items.map((item, i) => (
            <div
              key={i}
              className="rounded-xl border border-border bg-card px-5 py-4"
            >
              <dt className="text-body font-semibold text-foreground">
                {item.question}
              </dt>
              <dd className="mt-2 text-body-sm text-muted-foreground">
                {item.answer}
              </dd>
            </div>
          ))}
        </dl>
        <div className="mt-10 text-center">
          <Link
            href={ctaHref}
            className="text-body-sm font-medium text-primary hover:underline"
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
