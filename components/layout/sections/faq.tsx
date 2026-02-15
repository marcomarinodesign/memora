import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

const FAQList = [
  {
    question: "¿Qué formatos de documento acepta Memora?",
    answer:
      "Puedes subir transcripciones en texto, archivos .txt o .docx. Pegar texto directamente también funciona.",
    value: "item-1",
  },
  {
    question: "¿Cuánto tarda en generarse el acta?",
    answer:
      "Normalmente solo unos segundos. El tiempo puede variar según la longitud del documento.",
    value: "item-2",
  },
  {
    question: "¿En qué formato recibo el acta?",
    answer:
      "Recibirás un PDF listo para compartir con un formato profesional y claro.",
    value: "item-3",
  },
  {
    question: "¿Mis datos son privados?",
    answer:
      "Sí. No almacenamos documentos más tiempo del necesario para generar el acta.",
    value: "item-4",
  },
  {
    question: "¿Hay límite en el número de actas?",
    answer:
      "Depende del plan que elijas. El plan Free incluye 3 actas al mes. Consulta la página de precios.",
    value: "item-5",
  },
];

export function FAQSection() {
  return (
    <section id="faq" className="container md:w-[700px] py-24 sm:py-32">
      <div className="text-center mb-8">
        <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
          FAQ
        </h2>

        <h2 className="text-3xl md:text-4xl text-center font-bold">
          Preguntas frecuentes
        </h2>
      </div>

      <Accordion type="single" collapsible>
        {FAQList.map(({ question, answer, value }) => (
          <AccordionItem key={value} value={value}>
            <AccordionTrigger className="text-left">
              {question}
            </AccordionTrigger>

            <AccordionContent>{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <p className="text-center mt-8 text-muted-foreground">
        ¿Más preguntas?{" "}
        <Link
          href="/faq"
          className="font-medium text-primary hover:underline"
        >
          Ver todas
        </Link>
      </p>
    </section>
  );
}
