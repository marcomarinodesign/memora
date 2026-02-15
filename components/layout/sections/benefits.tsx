import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Blocks, LineChart, Wallet, Sparkles } from "lucide-react";

const benefitList = [
  {
    icon: Blocks,
    title: "Ahorra tiempo",
    description:
      "De horas a segundos en la elaboración de actas. Sin pasos manuales repetitivos.",
  },
  {
    icon: LineChart,
    title: "Evita errores",
    description:
      "Estructura consistente y sin olvidos. Formato profesional en cada acta.",
  },
  {
    icon: Wallet,
    title: "Más conversiones",
    description:
      "Actas claras que facilitan el seguimiento y los acuerdos con clientes y equipos.",
  },
  {
    icon: Sparkles,
    title: "Idea tus reuniones",
    description:
      "Prueba diferentes formatos y plantillas. Adapta el acta a cada tipo de reunión.",
  },
];

export function BenefitsSection() {
  return (
    <section id="benefits" className="container py-24 sm:py-32">
      <div className="grid lg:grid-cols-2 place-items-center lg:gap-24">
        <div>
          <h2 className="text-lg text-primary mb-2 tracking-wider">
            Beneficios
          </h2>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Tu atajo al éxito
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Memora transforma reuniones largas en actas profesionales. Menos
            trabajo manual, más claridad para tu equipo.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-4 w-full">
          {benefitList.map(({ icon: Icon, title, description }, index) => (
            <Card
              key={title}
              className="bg-muted/50 hover:bg-background transition-all delay-75 group/number"
            >
              <CardHeader>
                <div className="flex justify-between">
                  <Icon
                    size={32}
                    className="mb-6 text-primary"
                  />
                  <span className="text-5xl text-muted-foreground/15 font-medium transition-all delay-75 group-hover/number:text-muted-foreground/30">
                    0{index + 1}
                  </span>
                </div>

                <CardTitle>{title}</CardTitle>
              </CardHeader>

              <CardContent className="text-muted-foreground">
                {description}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
