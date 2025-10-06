import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import burgerBacon from "@/assets/burger-bacon.jpg";
import burgerSmash from "@/assets/burger-smash.jpg";
import burgerEgg from "@/assets/burger-egg.jpg";

const menuItems = [
  {
    id: 1,
    name: "Colossal Bacon",
    description: "Pão artesanal, carne 180g, cheddar derretido, bacon crocante e molho especial",
    price: "R$ 32,90",
    image: burgerBacon,
  },
  {
    id: 2,
    name: "Smash Supreme",
    description: "Duas carnes finas smash, cheddar derretido, cebola caramelizada e molho especial",
    price: "R$ 29,90",
    image: burgerSmash,
  },
  {
    id: 3,
    name: "Colossal Egg",
    description: "Pão brioche, carne 200g, queijo suíço, ovo frito, alface e tomate frescos",
    price: "R$ 34,90",
    image: burgerEgg,
  },
];

const Menu = () => {
  return (
    <section id="menu" className="py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12 fade-in-up">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-3 md:mb-4">
            NOSSO <span className="text-primary">CARDÁPIO</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Hambúrgueres artesanais preparados com ingredientes premium e muito sabor
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {menuItems.map((item, index) => (
            <Card
              key={item.id}
              className="bg-card border-border overflow-hidden hover:scale-105 hover:shadow-[var(--shadow-card)] transition-all duration-300 fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="relative overflow-hidden h-48 sm:h-56 md:h-64">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
              </div>
              <CardHeader className="p-4 md:p-6">
                <CardTitle className="text-xl md:text-2xl font-black text-foreground">
                  {item.name}
                </CardTitle>
                <CardDescription className="text-muted-foreground text-sm md:text-base">
                  {item.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col sm:flex-row items-center gap-3 sm:justify-between p-4 md:p-6 pt-0">
                <span className="text-2xl md:text-3xl font-bold text-primary">{item.price}</span>
                <Button variant="glow" size="default" className="font-bold w-full sm:w-auto">
                  Pedir Agora
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Menu;
