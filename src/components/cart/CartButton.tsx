import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { cn } from '@/lib/utils';

interface CartButtonProps {
  onClick: () => void;
}

const CartButton = ({ onClick }: CartButtonProps) => {
  const { itemCount, justAdded } = useCart();

  return (
    <Button
      onClick={onClick}
      variant="glow"
      size="icon"
      className={cn(
        'fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-lg transition-all duration-300',
        justAdded && 'animate-[shake_0.5s_ease-in-out]'
      )}
    >
      <ShoppingCart className="h-6 w-6" />
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-foreground text-xs font-bold text-background">
          {itemCount}
        </span>
      )}
    </Button>
  );
};

export default CartButton;
