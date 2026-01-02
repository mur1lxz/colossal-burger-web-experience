export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'burgers' | 'sides' | 'drinks' | 'desserts';
}

export interface CartItemExtra {
  id: string;
  name: string;
  price: number;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  size: '120g' | '180g' | '250g';
  extras: CartItemExtra[];
  observations: string;
  totalPrice: number;
}

export interface OrderData {
  id: string;
  items: CartItem[];
  customer: {
    name: string;
    phone: string;
  };
  delivery: {
    type: 'pickup' | 'delivery';
    address?: string;
    neighborhood?: string;
    number?: string;
    complement?: string;
    reference?: string;
  };
  payment: {
    method: 'pix' | 'card' | 'cash';
    changeFor?: number;
  };
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: 'pending' | 'preparing' | 'delivering' | 'delivered' | 'cancelled';
  createdAt: Date;
}

export const EXTRAS: CartItemExtra[] = [
  { id: 'bacon-extra', name: 'Bacon Extra', price: 5 },
  { id: 'queijo-extra', name: 'Queijo Extra', price: 4 },
  { id: 'cebola-caramelizada', name: 'Cebola Caramelizada', price: 3 },
  { id: 'ovo-extra', name: 'Ovo Extra', price: 3 },
  { id: 'molho-especial', name: 'Molho Especial', price: 2 },
];

export const SIZE_PRICES: Record<CartItem['size'], number> = {
  '120g': 0,
  '180g': 5,
  '250g': 10,
};
