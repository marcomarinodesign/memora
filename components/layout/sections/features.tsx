import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  TabletSmartphone,
  BadgeCheck,
  Goal,
  PictureInPicture,
  MousePointerClick,
  Newspaper,
} from "lucide-react";

const featureList = [
  {
    icon: TabletSmartphone,
    title: "Compatible con móvil",
    description:
      "Sube transcripciones desde cualquier dispositivo. Funciona en desktop y móvil.",
  },
  {
    icon: BadgeCheck,
    title: "Formato profesional",
    description:
      "Actas con estructura consistente. Listas para compartir con clientes y equipos.",
  },
  {
    icon: Goal,
    title: "Contenido dirigido",
    description:
      "Extrae participantes, acuerdos, tareas y orden del día automáticamente.",
  },
  {
    icon: PictureInPicture,
    title: "Plantillas claras",
    description:
      "Estructura visual que facilita la lectura y el seguimiento de acuerdos.",
  },
  {
    icon: MousePointerClick,
    title: "CTA claras",
    description:
      "Botones y flujos sencillos. De la transcripción al PDF en pocos clics.",
  },
  {
    icon: Newspaper,
    title: "Títulos consistentes",
    description:
      "Jerarquía clara en cada acta. Fácil de escanear y encontrar información.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="container py-24 sm:py-32">
      <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
        Características
      </h2>

      <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
        Qué nos diferencia
      </h2>

      <h3 className="md:w-1/2 mx-auto text-xl text-center text-muted-foreground mb-8">
        De la transcripción al acta en PDF. Sin pasos extra ni formatos raros.
      </h3>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {featureList.map(({ icon: Icon, title, description }) => (
          <div key={title}>
            <Card className="h-full bg-background border-0 shadow-none">
              <CardHeader className="flex justify-center items-center">
                <div className="bg-primary/20 p-2 rounded-full ring-8 ring-primary/10 mb-4">
                  <Icon size={24} className="text-primary" />
                </div>

                <CardTitle>{title}</CardTitle>
              </CardHeader>

              <CardContent className="text-muted-foreground text-center">
                {description}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
}
