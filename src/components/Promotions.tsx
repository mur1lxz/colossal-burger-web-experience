import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Percent, Clock, Gift } from "lucide-react";

const promotions = [
  {
    id: 1,
    icon: Percent,
    title: "Combo em Dobro",
    description: "Compre 2 hambúrgueres e ganhe 20% de desconto",
    badge: "Economize",
    color: "text-primary",
  },
  {
    id: 2,
    icon: Clock,
    title: "Happy Hour",
    description: "Das 15h às 18h - Todos os burgers com 15% OFF",
    badge: "Horário Especial",
    color: "text-primary",
  },
  {
    id: 3,
    icon: Gift,
    title: "Fidelidade",
    description: "A cada 5 pedidos, ganhe 1 hambúrguer grátis!",
    badge: "Programa VIP",
    color: "text-primary",
  },
];

const Promotions = () => {
  return (
    <section id="promotions" className="py-20 bg-primary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 fade-in-up">
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-background">
            PROMOÇÕES <span className="text-background/80">IMPERDÍVEIS</span>
          </h2>
          <p className="text-xl text-background/80 max-w-2xl mx-auto">
            Aproveite nossas ofertas especiais e economize nos seus hambúrgueres favoritos
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {promotions.map((promo, index) => (
            <div
              key={promo.id}
              className="bg-background rounded-2xl p-8 hover:scale-105 transition-all duration-300 shadow-lg fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="flex items-center justify-between mb-4">
                <promo.icon size={48} className={promo.color} />
                <Badge variant="secondary" className="bg-primary/20 text-background border-0">
                  {promo.badge}
                </Badge>
              </div>
              <h3 className="text-2xl font-black mb-3 text-foreground">{promo.title}</h3>
              <p className="text-muted-foreground text-lg">{promo.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center fade-in-up animation-delay-400">
          <Button
            variant="outline"
            size="xl"
            className="bg-background text-primary border-background hover:bg-background/90 font-bold text-lg"
          >
            Ver Todas as Promoções
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Promotions;
