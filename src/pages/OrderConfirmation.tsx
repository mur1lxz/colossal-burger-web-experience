import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock, Home, MessageCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const OrderConfirmation = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const orderId = searchParams.get('pedido');
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    if (orderId) {
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      const foundOrder = orders.find((o: any) => o.id === orderId);
      setOrder(foundOrder);
    }
  }, [orderId]);

  const estimatedTime = order?.delivery?.type === 'delivery' ? '40-50 min' : '20-30 min';

  const handleWhatsApp = () => {
    const phone = '5511999999999'; // Replace with actual phone
    const message = encodeURIComponent(
      `Olá! Gostaria de acompanhar meu pedido #${orderId}. Obrigado!`
    );
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12 md:py-20">
        <div className="mx-auto max-w-lg text-center">
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 animate-ping rounded-full bg-primary/30" />
              <CheckCircle className="relative h-24 w-24 text-primary animate-fade-in" />
            </div>
          </div>

          <h1 className="mb-4 text-3xl font-black md:text-4xl">
            Pedido <span className="text-primary">Confirmado!</span>
          </h1>

          <p className="mb-8 text-lg text-muted-foreground">
            Seu pedido foi recebido e está sendo preparado com carinho.
          </p>

          <div className="mb-8 rounded-lg border border-border bg-card p-6">
            <div className="mb-4 text-center">
              <span className="text-sm text-muted-foreground">Número do Pedido</span>
              <p className="text-3xl font-black text-primary">#{orderId}</p>
            </div>

            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Clock className="h-5 w-5" />
              <span>Tempo estimado: <strong className="text-foreground">{estimatedTime}</strong></span>
            </div>
          </div>

          {order && (
            <div className="mb-8 rounded-lg border border-border bg-card p-6 text-left">
              <h3 className="mb-4 font-bold">Detalhes do Pedido</h3>
              <div className="space-y-2 text-sm">
                {order.items.map((item: any, index: number) => (
                  <div key={index} className="flex justify-between">
                    <span>
                      {item.quantity}x {item.menuItem.name}
                    </span>
                    <span>R$ {item.totalPrice.toFixed(2).replace('.', ',')}</span>
                  </div>
                ))}
                <div className="border-t border-border pt-2 mt-2">
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span className="text-primary">R$ {order.total.toFixed(2).replace('.', ',')}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button variant="glow" onClick={handleWhatsApp} className="gap-2">
              <MessageCircle className="h-5 w-5" />
              Acompanhar via WhatsApp
            </Button>
            <Button variant="outline" onClick={() => navigate('/')} className="gap-2">
              <Home className="h-5 w-5" />
              Voltar ao Início
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderConfirmation;
