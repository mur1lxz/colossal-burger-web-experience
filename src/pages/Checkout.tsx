import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, MapPin, CreditCard, Banknote, QrCode, Store, Truck } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Checkout = () => {
  const navigate = useNavigate();
  const { items, total, clearCart } = useCart();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    deliveryType: 'delivery' as 'pickup' | 'delivery',
    address: '',
    neighborhood: '',
    number: '',
    complement: '',
    reference: '',
    paymentMethod: 'pix' as 'pix' | 'card' | 'cash',
    changeFor: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const deliveryFee = formData.deliveryType === 'delivery' ? 5 : 0;
  const orderTotal = total + deliveryFee;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Nome é obrigatório';
    if (!formData.phone.trim()) newErrors.phone = 'Telefone é obrigatório';
    if (formData.phone.replace(/\D/g, '').length < 10) newErrors.phone = 'Telefone inválido';

    if (formData.deliveryType === 'delivery') {
      if (!formData.address.trim()) newErrors.address = 'Endereço é obrigatório';
      if (!formData.neighborhood.trim()) newErrors.neighborhood = 'Bairro é obrigatório';
      if (!formData.number.trim()) newErrors.number = 'Número é obrigatório';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2');
    }
    return value.slice(0, 15);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: 'Erro no formulário',
        description: 'Por favor, preencha todos os campos obrigatórios.',
        variant: 'destructive',
      });
      return;
    }

    const orderId = Math.random().toString(36).substring(2, 8).toUpperCase();

    // Save order to localStorage (simulating backend)
    const order = {
      id: orderId,
      items,
      customer: { name: formData.name, phone: formData.phone },
      delivery: {
        type: formData.deliveryType,
        address: formData.address,
        neighborhood: formData.neighborhood,
        number: formData.number,
        complement: formData.complement,
        reference: formData.reference,
      },
      payment: {
        method: formData.paymentMethod,
        changeFor: formData.changeFor ? parseFloat(formData.changeFor) : undefined,
      },
      subtotal: total,
      deliveryFee,
      total: orderTotal,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    localStorage.setItem('orders', JSON.stringify([...existingOrders, order]));

    clearCart();
    navigate(`/confirmacao?pedido=${orderId}`);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-20 text-center">
          <h1 className="mb-4 text-3xl font-black">Carrinho Vazio</h1>
          <p className="mb-8 text-muted-foreground">Adicione itens ao carrinho para continuar.</p>
          <Button variant="glow" onClick={() => navigate('/#menu')}>
            Ver Cardápio
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 md:py-12">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>

        <h1 className="mb-8 text-3xl font-black md:text-4xl">
          Finalizar <span className="text-primary">Pedido</span>
        </h1>

        <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            {/* Customer Data */}
            <div className="rounded-lg border border-border bg-card p-6">
              <h2 className="mb-4 text-xl font-bold">Seus Dados</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={errors.name ? 'border-destructive' : ''}
                    placeholder="Seu nome"
                  />
                  {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone/WhatsApp *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: formatPhone(e.target.value) })}
                    className={errors.phone ? 'border-destructive' : ''}
                    placeholder="(00) 00000-0000"
                  />
                  {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
                </div>
              </div>
            </div>

            {/* Delivery Type */}
            <div className="rounded-lg border border-border bg-card p-6">
              <h2 className="mb-4 text-xl font-bold">Tipo de Entrega</h2>
              <RadioGroup
                value={formData.deliveryType}
                onValueChange={(value) => setFormData({ ...formData, deliveryType: value as 'pickup' | 'delivery' })}
                className="grid gap-4 sm:grid-cols-2"
              >
                <div className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-all ${formData.deliveryType === 'pickup' ? 'border-primary bg-primary/10' : 'border-border'}`}>
                  <RadioGroupItem value="pickup" id="pickup" />
                  <Label htmlFor="pickup" className="flex cursor-pointer items-center gap-2">
                    <Store className="h-5 w-5 text-primary" />
                    Retirar no Balcão
                  </Label>
                </div>
                <div className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-all ${formData.deliveryType === 'delivery' ? 'border-primary bg-primary/10' : 'border-border'}`}>
                  <RadioGroupItem value="delivery" id="delivery" />
                  <Label htmlFor="delivery" className="flex cursor-pointer items-center gap-2">
                    <Truck className="h-5 w-5 text-primary" />
                    Entrega (+R$ 5,00)
                  </Label>
                </div>
              </RadioGroup>

              {formData.deliveryType === 'delivery' && (
                <div className="mt-6 space-y-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">Endereço de Entrega</span>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="address">Endereço *</Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className={errors.address ? 'border-destructive' : ''}
                        placeholder="Rua, Avenida..."
                      />
                      {errors.address && <p className="text-sm text-destructive">{errors.address}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="number">Número *</Label>
                      <Input
                        id="number"
                        value={formData.number}
                        onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                        className={errors.number ? 'border-destructive' : ''}
                        placeholder="123"
                      />
                      {errors.number && <p className="text-sm text-destructive">{errors.number}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="neighborhood">Bairro *</Label>
                      <Input
                        id="neighborhood"
                        value={formData.neighborhood}
                        onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
                        className={errors.neighborhood ? 'border-destructive' : ''}
                        placeholder="Seu bairro"
                      />
                      {errors.neighborhood && <p className="text-sm text-destructive">{errors.neighborhood}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="complement">Complemento</Label>
                      <Input
                        id="complement"
                        value={formData.complement}
                        onChange={(e) => setFormData({ ...formData, complement: e.target.value })}
                        placeholder="Apto, Bloco..."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reference">Ponto de Referência</Label>
                      <Input
                        id="reference"
                        value={formData.reference}
                        onChange={(e) => setFormData({ ...formData, reference: e.target.value })}
                        placeholder="Próximo a..."
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Payment */}
            <div className="rounded-lg border border-border bg-card p-6">
              <h2 className="mb-4 text-xl font-bold">Forma de Pagamento</h2>
              <RadioGroup
                value={formData.paymentMethod}
                onValueChange={(value) => setFormData({ ...formData, paymentMethod: value as 'pix' | 'card' | 'cash' })}
                className="grid gap-4 sm:grid-cols-3"
              >
                <div className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-all ${formData.paymentMethod === 'pix' ? 'border-primary bg-primary/10' : 'border-border'}`}>
                  <RadioGroupItem value="pix" id="pix" />
                  <Label htmlFor="pix" className="flex cursor-pointer items-center gap-2">
                    <QrCode className="h-5 w-5 text-primary" />
                    Pix
                  </Label>
                </div>
                <div className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-all ${formData.paymentMethod === 'card' ? 'border-primary bg-primary/10' : 'border-border'}`}>
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="flex cursor-pointer items-center gap-2">
                    <CreditCard className="h-5 w-5 text-primary" />
                    Cartão
                  </Label>
                </div>
                <div className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-all ${formData.paymentMethod === 'cash' ? 'border-primary bg-primary/10' : 'border-border'}`}>
                  <RadioGroupItem value="cash" id="cash" />
                  <Label htmlFor="cash" className="flex cursor-pointer items-center gap-2">
                    <Banknote className="h-5 w-5 text-primary" />
                    Dinheiro
                  </Label>
                </div>
              </RadioGroup>

              {formData.paymentMethod === 'cash' && (
                <div className="mt-4 space-y-2">
                  <Label htmlFor="changeFor">Troco para quanto?</Label>
                  <Input
                    id="changeFor"
                    type="number"
                    value={formData.changeFor}
                    onChange={(e) => setFormData({ ...formData, changeFor: e.target.value })}
                    placeholder="Ex: 100"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-lg border border-border bg-card p-6">
              <h2 className="mb-4 text-xl font-bold">Resumo do Pedido</h2>
              <div className="space-y-3">
                {items.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span>
                      {item.quantity}x {item.menuItem.name}
                      {item.size !== '180g' && ` (${item.size})`}
                    </span>
                    <span>R$ {item.totalPrice.toFixed(2).replace('.', ',')}</span>
                  </div>
                ))}
              </div>
              <Separator className="my-4" />
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>R$ {total.toFixed(2).replace('.', ',')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Taxa de Entrega</span>
                  <span>R$ {deliveryFee.toFixed(2).replace('.', ',')}</span>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span className="text-primary">R$ {orderTotal.toFixed(2).replace('.', ',')}</span>
              </div>
              <Button
                type="submit"
                variant="glow"
                className="mt-6 w-full py-6 text-lg font-bold animate-pulse"
              >
                Confirmar Pedido
              </Button>
            </div>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
