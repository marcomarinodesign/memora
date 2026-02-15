import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const serviceList = [
  {
    title: "Exportación PDF",
    description: "Actas listas para descargar e imprimir. Formato profesional.",
    pro: false,
  },
  {
    title: "Múltiples formatos de entrada",
    description: "Texto pegado, .txt o .docx. Flexibilidad total.",
    pro: false,
  },
  {
    title: "Plantillas avanzadas",
    description: "Diferentes estilos de acta según el tipo de reunión.",
    pro: true,
  },
  {
    title: "Gestión de equipos",
    description: "Actas organizadas por proyecto o equipo.",
    pro: true,
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="container py-24 sm:py-32">
      <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
        Servicios
      </h2>

      <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
        Cómo crece tu equipo
      </h2>
      <h3 className="md:w-1/2 mx-auto text-xl text-center text-muted-foreground mb-8">
        Desde la generación básica hasta la gestión completa de actas para equipos.
      </h3>
      <div className="grid sm:grid-cols-2 gap-4 w-full lg:w-[60%] mx-auto">
        {serviceList.map(({ title, description, pro }) => (
          <Card
            key={title}
            className="bg-muted/60 h-full relative"
          >
            <CardHeader>
              <CardTitle>{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
            {pro && (
              <Badge
                variant="secondary"
                className="absolute -top-2 -right-3"
              >
                PRO
              </Badge>
            )}
          </Card>
        ))}
      </div>
    </section>
  );
}
