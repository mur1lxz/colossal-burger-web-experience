import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const reviews = [
  {
    id: 1,
    name: "Carlos Silva",
    rating: 5,
    comment: "Melhor hambúrguer que já comi! A carne é suculenta e o bacon crocante perfeito.",
    date: "Há 2 dias",
  },
  {
    id: 2,
    name: "Maria Santos",
    rating: 5,
    comment: "Atendimento excelente e o sabor é incomparável. Virei cliente fiel!",
    date: "Há 1 semana",
  },
  {
    id: 3,
    name: "João Pedro",
    rating: 5,
    comment: "O Smash Supreme é sensacional! Ingredientes frescos e preparação impecável.",
    date: "Há 3 dias",
  },
  {
    id: 4,
    name: "Ana Costa",
    rating: 5,
    comment: "Ambiente incrível, hambúrgueres deliciosos. Recomendo muito!",
    date: "Há 5 dias",
  },
];

const Reviews = () => {
  return (
    <section id="reviews" className="py-12 md:py-20 bg-foreground">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12 fade-in-up">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-3 md:mb-4 text-background">
            O QUE DIZEM <span className="text-primary">NOSSOS CLIENTES</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-background/80 max-w-2xl mx-auto px-4">
            Avaliações reais de quem já provou o sabor gigante da Colossal
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {reviews.map((review, index) => (
            <Card
              key={review.id}
              className="bg-background border-primary/20 hover:border-primary hover:scale-105 transition-all duration-300 fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center mb-3 md:mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className="text-primary fill-primary hover:scale-125 transition-transform md:w-5 md:h-5"
                    />
                  ))}
                </div>
                <p className="text-foreground/80 mb-3 md:mb-4 italic text-sm md:text-base">"{review.comment}"</p>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <span className="font-bold text-foreground text-sm md:text-base">{review.name}</span>
                  <span className="text-xs md:text-sm text-muted-foreground">{review.date}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8 md:mt-12 fade-in-up animation-delay-400">
          <div className="inline-flex flex-wrap items-center justify-center gap-2 text-background/80">
            <Star size={20} className="text-primary fill-primary md:w-6 md:h-6" />
            <span className="text-2xl md:text-3xl font-black text-primary">4.9</span>
            <span className="text-lg md:text-xl">/ 5.0</span>
            <span className="text-base md:text-lg ml-0 md:ml-2">(247 avaliações)</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
