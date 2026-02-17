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
    question: "¿Qué formatos de documento acepta Noah?",
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
      className={`border-t py-16 md:py-24 ${className}`}
      style={{
        borderColor: "var(--color-border-subtle)",
        backgroundColor: "var(--color-surface-2)",
        paddingTop: "var(--space-16)",
        paddingBottom: "var(--space-16)",
      }}
      aria-labelledby="faq-preview-heading"
    >
      <div
        className="container mx-auto max-w-3xl px-6"
        style={{ paddingLeft: "var(--space-6)", paddingRight: "var(--space-6)" }}
      >
        <h2
          id="faq-preview-heading"
          className="heading-lg text-center"
          style={{ color: "var(--color-text-primary)" }}
        >
          {title}
        </h2>
        <dl
          className="mt-12 space-y-6"
          style={{ marginTop: "var(--space-12)" }}
        >
          {items.map((item, i) => (
            <div
              key={i}
              className="card px-5 py-4"
              style={{
                padding: "var(--space-5)",
                borderRadius: "var(--radius-xl)",
                border: "1px solid var(--color-border-subtle)",
                backgroundColor: "var(--color-surface-1)",
              }}
            >
              <dt
                className="font-semibold"
                style={{
                  fontSize: "var(--text-base)",
                  fontWeight: "var(--weight-semibold)",
                  color: "var(--color-text-primary)",
                }}
              >
                {item.question}
              </dt>
              <dd
                className="mt-2"
                style={{
                  marginTop: "var(--space-2)",
                  fontSize: "var(--text-sm)",
                  color: "var(--color-text-secondary)",
                }}
              >
                {item.answer}
              </dd>
            </div>
          ))}
        </dl>
        <div
          className="mt-10 text-center"
          style={{ marginTop: "var(--space-10)" }}
        >
          <Link
            href={ctaHref}
            className="font-medium hover:underline"
            style={{
              fontSize: "var(--text-sm)",
              fontWeight: "var(--weight-medium)",
              color: "var(--color-accent-text)",
            }}
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
