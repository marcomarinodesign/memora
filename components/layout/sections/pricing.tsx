import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";

const plans = [
  {
    title: "Free",
    popular: false,
    price: 0,
    description: "3 actas al mes. Ideal para probar.",
    buttonText: "Empezar gratis",
    buttonHref: "/generar-acta",
    benefitList: [
      "3 actas al mes",
      "Exportación PDF",
      "Soporte básico",
    ],
  },
  {
    title: "Pro",
    popular: true,
    price: 19,
    description: "Actas ilimitadas para equipos.",
    buttonText: "Elegir Pro",
    buttonHref: "/generar-acta",
    benefitList: [
      "Actas ilimitadas",
      "Plantillas avanzadas",
      "Prioridad en generación",
      "Soporte prioritario",
    ],
  },
  {
    title: "Business",
    popular: false,
    price: 49,
    description: "Para equipos que necesitan más.",
    buttonText: "Contactar ventas",
    buttonHref: "/contacto",
    benefitList: [
      "Todo lo de Pro",
      "Gestión de equipos",
      "Branding personalizado",
      "Soporte dedicado",
    ],
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="container py-24 sm:py-32">
      <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
        Precios
      </h2>

      <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
        Acceso ilimitado
      </h2>

      <h3 className="md:w-1/2 mx-auto text-xl text-center text-muted-foreground pb-14">
        Planes simples y transparentes. Sin sorpresas.
      </h3>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-4">
        {plans.map(
          ({
            title,
            popular,
            price,
            description,
            buttonText,
            buttonHref,
            benefitList,
          }) => (
            <Card
              key={title}
              className={
                popular
                  ? "drop-shadow-xl border-[1.5px] border-primary lg:scale-[1.05]"
                  : ""
              }
            >
              <CardHeader>
                <CardTitle className="pb-2">{title}</CardTitle>

                <CardDescription className="pb-4">
                  {description}
                </CardDescription>

                <div>
                  <span className="text-3xl font-bold">{price}€</span>
                  <span className="text-muted-foreground"> /mes</span>
                </div>
              </CardHeader>

              <CardContent className="flex">
                <div className="space-y-4">
                  {benefitList.map((benefit) => (
                    <span key={benefit} className="flex">
                      <Check className="text-primary mr-2 shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </span>
                  ))}
                </div>
              </CardContent>

              <CardFooter>
                <Button
                  variant={popular ? "primary" : "secondary"}
                  href={buttonHref}
                  className="w-full"
                >
                  {buttonText}
                </Button>
              </CardFooter>
            </Card>
          )
        )}
      </div>
    </section>
  );
}
