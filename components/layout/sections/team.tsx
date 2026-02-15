import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const teamList = [
  { firstName: "Equipo", lastName: "Memora", positions: ["Producto", "Desarrollo"] },
  { firstName: "Cliente", lastName: "1", positions: ["Beta tester"] },
  { firstName: "Cliente", lastName: "2", positions: ["Early adopter"] },
];

export function TeamSection() {
  return (
    <section id="team" className="container lg:w-[75%] py-24 sm:py-32">
      <div className="text-center mb-8">
        <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
          Equipo
        </h2>

        <h2 className="text-3xl md:text-4xl text-center font-bold">
          Quién está detrás de Memora
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamList.map(({ firstName, lastName, positions }, index) => (
          <Card
            key={index}
            className="bg-muted/60 flex flex-col h-full overflow-hidden"
          >
            <CardHeader>
              <div className="h-48 flex items-center justify-center bg-muted rounded-t-lg">
                <span className="text-4xl font-bold text-muted-foreground">
                  {firstName.charAt(0)}
                  {lastName.charAt(0)}
                </span>
              </div>
              <CardTitle className="py-4">
                {firstName}
                <span className="text-primary ml-2">{lastName}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              {positions.join(", ")}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
