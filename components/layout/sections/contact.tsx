import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Building2, Clock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ContactSection() {
  return (
    <section id="contact" className="container py-24 sm:py-32">
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="mb-4">
            <h2 className="text-lg text-primary mb-2 tracking-wider">
              Contacto
            </h2>

            <h2 className="text-3xl md:text-4xl font-bold">
              Conecta con nosotros
            </h2>
          </div>
          <p className="mb-8 text-muted-foreground lg:w-5/6">
            ¿Tienes preguntas o quieres hablar con nosotros? Escríbenos.
          </p>

          <div className="flex flex-col gap-4">
            <div>
              <div className="flex gap-2 mb-1">
                <Building2 className="size-5" />
                <div className="font-bold">Escríbenos</div>
              </div>

              <div>support@memora.app</div>
            </div>

            <div>
              <div className="flex gap-2 mb-1">
                <Mail className="size-5" />
                <div className="font-bold">Email</div>
              </div>

              <div>support@memora.app</div>
            </div>

            <div>
              <div className="flex gap-2">
                <Clock className="size-5" />
                <div className="font-bold">Respuesta</div>
              </div>

              <div>En menos de 24 horas</div>
            </div>
          </div>
        </div>

        <Card className="bg-muted/60">
          <CardContent className="pt-6">
            <p className="text-muted-foreground mb-6">
              Utiliza nuestro formulario de contacto para enviarnos tu mensaje.
            </p>
            <Button href="/contacto" className="w-full">
              Ir a Contacto
            </Button>
          </CardContent>
        </Card>
      </section>
    </section>
  );
}
