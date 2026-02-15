"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="container w-full">
      <div className="grid place-items-center lg:max-w-screen-xl gap-8 mx-auto py-20 md:py-32">
        <div className="text-center space-y-8">
          <Badge variant="outline" className="text-sm py-2">
            <span className="mr-2 text-primary">
              <Badge>Nuevo</Badge>
            </span>
            <span> Genera actas en segundos </span>
          </Badge>

          <div className="max-w-screen-md mx-auto text-center">
            <h1 className="max-w-[800px] mx-auto heading-xl text-foreground text-[64px] font-extrabold tracking-[-2px]">
              Convierte tus reuniones en
              <span className="text-transparent px-2 bg-gradient-to-r from-[#D247BF] to-primary bg-clip-text">
                actas
              </span>
              profesionales
            </h1>
          </div>

          <p className="max-w-screen-sm mx-auto text-xl text-muted-foreground">
            Sube tu transcripción o documento y genera automáticamente un acta
            clara, estructurada y lista para compartir.
          </p>

          <div className="space-y-4 md:space-y-0 md:space-x-4">
            <Button
              href="/generar-acta"
              className="w-5/6 md:w-1/4 font-bold group/arrow"
            >
              Generar acta ahora
              <ArrowRight className="size-5 ml-2 group-hover/arrow:translate-x-1 transition-transform" />
            </Button>

            <Button
              variant="secondary"
              href="/pricing"
              className="w-5/6 md:w-1/4 font-bold"
            >
              Ver precios
            </Button>
          </div>
        </div>

        <div className="relative group mt-14 w-full max-w-4xl">
          <div className="absolute top-2 lg:-top-8 left-1/2 transform -translate-x-1/2 w-[90%] mx-auto h-24 lg:h-80 bg-primary/50 rounded-full blur-3xl" />
          <div className="w-full aspect-video mx-auto rounded-lg relative flex items-center justify-center border border-t-2 border-border border-t-primary/30 bg-muted/50">
            <p className="text-muted-foreground text-body">
              Vista previa de la herramienta
            </p>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-20 md:h-28 bg-gradient-to-b from-background/0 via-background/50 to-background rounded-lg" />
        </div>
      </div>
    </section>
  );
}
