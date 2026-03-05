import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { MenuItem, CartItem, CartItemExtra, EXTRAS, SIZE_PRICES, SODA_FLAVORS, MILKSHAKE_FLAVORS } from '@/types/order';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { Minus, Plus, ShoppingCart } from 'lucide-react';

interface AddToCartModalProps {
  item: MenuItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AddToCartModal = ({ item, open, onOpenChange }: AddToCartModalProps) => {
  const [size, setSize] = useState<CartItem['size']>('180g');
  const [extras, setExtras] = useState<CartItemExtra[]>([]);
  const [observations, setObservations] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [flavor, setFlavor] = useState('');
  const { addItem } = useCart();
  const { toast } = useToast();

  if (!item) return null;

  const isBurger = item.category === 'classicos' || item.category === 'especiais' || item.category === 'promocoes';
  const isSoda = item.id === 'refrigerante-350' || item.id === 'refrigerante-200';
  const isMilkshake = false;
  const hasFlavors = isSoda || isMilkshake;
  const flavorOptions = isSoda ? SODA_FLAVORS : isMilkshake ? MILKSHAKE_FLAVORS : [];
  
  const basePrice = item.price;
  const sizePrice = isBurger ? SIZE_PRICES[size] : 0;
  const extrasPrice = extras.reduce((sum, extra) => sum + extra.price, 0);
  const totalPrice = (basePrice + sizePrice + extrasPrice) * quantity;

  const handleExtraToggle = (extra: CartItemExtra) => {
    setExtras((prev) =>
      prev.find((e) => e.id === extra.id)
        ? prev.filter((e) => e.id !== extra.id)
        : [...prev, extra]
    );
  };

  const handleAddToCart = () => {
    if (hasFlavors && !flavor) {
      toast({
        title: 'Selecione um sabor',
        description: 'Por favor, escolha o sabor desejado.',
        variant: 'destructive',
      });
      return;
    }
    addItem(item, size, extras, observations, quantity, flavor || undefined);
    toast({
      title: 'Item adicionado!',
      description: `${quantity}x ${item.name}${flavor ? ` (${flavorOptions.find(f => f.id === flavor)?.name})` : ''} foi adicionado ao carrinho.`,
    });
    onOpenChange(false);
    resetForm();
  };

  const resetForm = () => {
    setSize('180g');
    setExtras([]);
    setObservations('');
    setQuantity(1);
    setFlavor('');
  };

  return (
    <Dialog open={open} onOpenChange={(open) => { onOpenChange(open); if (!open) resetForm(); }}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black">{item.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="overflow-hidden rounded-lg">
            <img
              src={item.image}
              alt={item.name}
              className="h-48 w-full object-cover"
            />
          </div>

          <p className="text-muted-foreground">{item.description}</p>

          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-primary">
              R$ {item.price.toFixed(2).replace('.', ',')}
            </span>
          </div>

          {isBurger && (
            <div className="space-y-3">
              <Label className="text-lg font-bold">Tamanho da Carne</Label>
              <RadioGroup value={size} onValueChange={(value) => setSize(value as CartItem['size'])}>
                {(['120g', '180g', '250g'] as const).map((s) => (
                  <div key={s} className="flex items-center justify-between rounded-lg border border-border p-3">
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value={s} id={s} />
                      <Label htmlFor={s} className="cursor-pointer font-medium">
                        {s}
                      </Label>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {SIZE_PRICES[s] > 0 ? `+R$ ${SIZE_PRICES[s].toFixed(2).replace('.', ',')}` : 'Padrão'}
                    </span>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}

          {hasFlavors && (
            <div className="space-y-3">
              <Label className="text-lg font-bold">Sabor</Label>
              <RadioGroup value={flavor} onValueChange={setFlavor}>
                {flavorOptions.map((f) => (
                  <div key={f.id} className="flex items-center justify-between rounded-lg border border-border p-3">
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value={f.id} id={f.id} />
                      <Label htmlFor={f.id} className="cursor-pointer font-medium">
                        {f.name}
                      </Label>
                    </div>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}

          {isBurger && (
            <div className="space-y-3">
              <Label className="text-lg font-bold">Adicionais</Label>
              <div className="space-y-2">
                {EXTRAS.map((extra) => (
                  <div
                    key={extra.id}
                    className="flex items-center justify-between rounded-lg border border-border p-3"
                  >
                    <div className="flex items-center gap-3">
                      <Checkbox
                        id={extra.id}
                        checked={extras.some((e) => e.id === extra.id)}
                        onCheckedChange={() => handleExtraToggle(extra)}
                      />
                      <Label htmlFor={extra.id} className="cursor-pointer font-medium">
                        {extra.name}
                      </Label>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      +R$ {extra.price.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-3">
            <Label htmlFor="observations" className="text-lg font-bold">
              Observações
            </Label>
            <Textarea
              id="observations"
              placeholder="Ex: Sem cebola, ponto da carne bem passado..."
              value={observations}
              onChange={(e) => setObservations(e.target.value)}
              className="resize-none"
            />
          </div>

          <div className="flex items-center justify-center gap-4">
            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            >
              <Minus className="h-5 w-5" />
            </Button>
            <span className="w-12 text-center text-2xl font-bold">{quantity}</span>
            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12"
              onClick={() => setQuantity((q) => q + 1)}
            >
              <Plus className="h-5 w-5" />
            </Button>
          </div>

          <Button
            variant="glow"
            className="w-full py-6 text-lg font-bold"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="mr-2 h-5 w-5" />
            Adicionar R$ {totalPrice.toFixed(2).replace('.', ',')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddToCartModal;
