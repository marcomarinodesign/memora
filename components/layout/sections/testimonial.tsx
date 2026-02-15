"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Star } from "lucide-react";

const reviewList = [
  {
    name: "Cliente 1",
    userName: "Product Manager",
    comment:
      "Memora ha transformado cómo gestionamos las actas. Ahorramos horas cada semana.",
  },
  {
    name: "Cliente 2",
    userName: "Project Manager",
    comment:
      "Formato profesional consistente sin esfuerzo. Lo recomiendo a cualquier equipo.",
  },
  {
    name: "Cliente 3",
    userName: "Equipo de producto",
    comment:
      "De la transcripción al PDF en segundos. Imposible volver al método manual.",
  },
];

export function TestimonialSection() {
  return (
    <section id="testimonials" className="container py-24 sm:py-32">
      <div className="text-center mb-8">
        <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
          Testimonios
        </h2>

        <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
          Lo que dicen nuestros usuarios
        </h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 w-[80%] sm:w-[90%] lg:max-w-screen-xl mx-auto">
        {reviewList.map((review) => (
          <Card key={review.name} className="bg-muted/50">
            <CardContent className="pt-6 pb-0">
              <div className="flex gap-1 pb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="size-4 fill-primary text-primary"
                  />
                ))}
              </div>
              {`"${review.comment}"`}
            </CardContent>

            <CardHeader>
              <div className="flex flex-row items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-primary font-medium">
                  {review.name.charAt(0)}
                </div>

                <div className="flex flex-col">
                  <CardTitle className="text-lg">{review.name}</CardTitle>
                  <CardDescription>{review.userName}</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  );
}
