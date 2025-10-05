import { Instagram, MessageCircle, Mail } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: MessageCircle,
      label: "WhatsApp",
      link: "https://wa.me/5511987654321",
      color: "hover:text-green-500",
    },
    {
      icon: Instagram,
      label: "Instagram",
      link: "https://instagram.com/colossalburguer",
      color: "hover:text-pink-500",
    },
    {
      icon: Mail,
      label: "Email",
      link: "mailto:contato@colossalburguer.com",
      color: "hover:text-primary",
    },
  ];

  return (
    <footer className="bg-background border-t border-primary/20 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center">
          {/* Logo */}
          <div className="mb-6 fade-in flex flex-col items-center">
            <img 
              src={logo} 
              alt="Colossal Burguer" 
              className="h-20 w-auto mb-3 hover:scale-105 transition-transform duration-300"
            />
            <p className="text-muted-foreground text-sm">
              O sabor gigante que conquista
            </p>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-6 mb-8 fade-in-up">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 bg-card rounded-full hover:scale-110 hover:rotate-12 transition-all duration-300 ${social.color} border border-primary/20`}
                aria-label={social.label}
              >
                <social.icon size={24} />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="border-t border-border pt-6 fade-in-up">
            <p className="text-muted-foreground">
              © {currentYear} Colossal Burguer — O sabor gigante que conquista.
            </p>
            <p className="text-sm text-muted-foreground/60 mt-2">
              Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
