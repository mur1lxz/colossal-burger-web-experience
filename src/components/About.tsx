import { Button } from "@/components/ui/button";
import aboutKitchen from "@/assets/about-kitchen.jpg";

const About = () => {
  return (
    <section id="about" className="py-12 md:py-20 bg-foreground">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="fade-in-up">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 md:mb-6 text-background">
              SOBRE A <span className="text-primary">COLOSSAL</span>
            </h2>
            <p className="text-lg mb-6 text-background/80">
              A Colossal Burguer nasceu com o propósito de redefinir o sabor do hambúrguer
              artesanal. Ingredientes frescos, carnes selecionadas e muito amor pelo que fazemos.
            </p>
            <p className="text-lg mb-6 text-background/80">
              Cada hambúrguer é uma obra de arte culinária, preparado com dedicação e paixão por
              nossa equipe de chefs especializados. Usamos apenas os melhores ingredientes e
              técnicas artesanais para garantir que cada mordida seja uma experiência inesquecível.
            </p>
            <Button
              variant="outline"
              size="lg"
              className="border-primary text-background hover:bg-primary hover:text-background border-2 font-bold hover:scale-105 transition-all duration-300"
            >
              Conheça Nossa História
            </Button>
          </div>

          <div className="relative fade-in-up animation-delay-200">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-500">
              <img
                src={aboutKitchen}
                alt="Cozinha da Colossal Burguer"
                className="w-full h-64 sm:h-80 md:h-96 lg:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary rounded-full blur-2xl opacity-50" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
