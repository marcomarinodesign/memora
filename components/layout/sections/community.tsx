import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function CommunitySection() {
  return (
    <section id="community" className="py-12">
      <hr className="border-border" />
      <div className="container py-20 sm:py-20">
        <div className="lg:w-[60%] mx-auto">
          <Card className="bg-background border-none shadow-none text-center flex flex-col items-center justify-center">
            <CardHeader>
              <CardTitle className="text-4xl md:text-5xl font-bold flex flex-col items-center">
                <div>
                  ¿Listo para generar tu primera
                  <span className="text-transparent pl-2 bg-gradient-to-r from-[#D247BF] to-primary bg-clip-text">
                    acta?
                  </span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="lg:w-[80%] text-xl text-muted-foreground">
              Únete a los equipos que ya usan Memora. Genera actas profesionales
              en segundos.
            </CardContent>

            <CardFooter>
              <Button href="/generar-acta">Generar acta ahora</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      <hr className="border-border" />
    </section>
  );
}
