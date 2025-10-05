import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Phone, Mail, MapPin, Instagram, MessageCircle } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Mensagem enviada com sucesso! Entraremos em contato em breve.");
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const contactInfo = [
    {
      icon: Phone,
      label: "Telefone",
      value: "(11) 98765-4321",
      link: "tel:+5511987654321",
    },
    {
      icon: Mail,
      label: "Email",
      value: "contato@colossalburguer.com",
      link: "mailto:contato@colossalburguer.com",
    },
    {
      icon: MapPin,
      label: "Endereço",
      value: "Rua dos Hambúrgueres, 123 - São Paulo, SP",
      link: "#",
    },
  ];

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
  ];

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 fade-in-up">
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            ENTRE EM <span className="text-primary">CONTATO</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Dúvidas, sugestões ou pedidos especiais? Estamos aqui para você!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="fade-in-up">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Input
                  type="text"
                  name="name"
                  placeholder="Seu nome"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-card border-primary/20 focus:border-primary transition-all duration-300 h-12"
                />
              </div>
              <div>
                <Input
                  type="email"
                  name="email"
                  placeholder="Seu email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-card border-primary/20 focus:border-primary transition-all duration-300 h-12"
                />
              </div>
              <div>
                <Input
                  type="tel"
                  name="phone"
                  placeholder="Seu telefone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="bg-card border-primary/20 focus:border-primary transition-all duration-300 h-12"
                />
              </div>
              <div>
                <Textarea
                  name="message"
                  placeholder="Sua mensagem"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="bg-card border-primary/20 focus:border-primary transition-all duration-300 resize-none"
                />
              </div>
              <Button
                type="submit"
                variant="hero"
                size="xl"
                className="w-full animate-[pulse-glow_2s_ease-in-out_infinite]"
              >
                Enviar Mensagem
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8 fade-in-up animation-delay-200">
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.link}
                  className="flex items-start gap-4 p-4 bg-card rounded-lg hover:bg-card/80 transition-all duration-300 hover:scale-105 group"
                >
                  <info.icon size={24} className="text-primary mt-1 group-hover:scale-110 transition-transform" />
                  <div>
                    <h3 className="font-bold text-foreground mb-1">{info.label}</h3>
                    <p className="text-muted-foreground">{info.value}</p>
                  </div>
                </a>
              ))}
            </div>

            <div className="pt-6 border-t border-border">
              <h3 className="font-bold text-xl mb-4 text-foreground">Redes Sociais</h3>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 px-6 py-3 bg-card rounded-lg hover:scale-110 transition-all duration-300 ${social.color} group border border-primary/20`}
                  >
                    <social.icon size={24} className="group-hover:rotate-12 transition-transform" />
                    <span className="font-medium">{social.label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="h-64 bg-card rounded-lg overflow-hidden border border-primary/20">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.1974!2d-46.6333!3d-23.5505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDMzJzAxLjgiUyA0NsKwMzgnMDAuMCJX!5e0!3m2!1spt-BR!2sbr!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização da Colossal Burguer"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
