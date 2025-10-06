import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import heroBurger from "@/assets/hero-burger.jpg";

const Hero = () => {
  const scrollToMenu = () => {
    const element = document.getElementById("menu");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${heroBurger})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-4 md:mb-6 fade-in-up text-glow leading-tight">
          O SABOR GIGANTE
          <br />
          <span className="text-primary">QUE VOCÊ RESPEITA!</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 fade-in-up max-w-2xl mx-auto text-foreground/90 animation-delay-200 px-4">
          Hambúrgueres artesanais feitos com ingredientes frescos e paixão.
        </p>
        <Button
          variant="hero"
          size="lg"
          onClick={scrollToMenu}
          className="fade-in-up animation-delay-400 text-base md:text-lg lg:text-xl"
        >
          FAZER PEDIDO AGORA 🍔
        </Button>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown size={40} className="text-primary" />
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-primary/10 blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-32 h-32 rounded-full bg-primary/10 blur-3xl animate-pulse animation-delay-500" />
    </section>
  );
};

export default Hero;
