"use client";

const sponsors = [
  { name: "Empresa 1" },
  { name: "Empresa 2" },
  { name: "Empresa 3" },
  { name: "Empresa 4" },
  { name: "Empresa 5" },
  { name: "Empresa 6" },
];

export function SponsorsSection() {
  return (
    <section id="sponsors" className="max-w-[75%] mx-auto pb-24 sm:pb-32">
      <h2 className="text-lg md:text-xl text-center mb-6">
        Confían en Memora
      </h2>

      <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-60">
        {sponsors.map(({ name }) => (
          <div
            key={name}
            className="flex items-center text-xl md:text-2xl font-medium text-muted-foreground"
          >
            {name}
          </div>
        ))}
      </div>
    </section>
  );
}
