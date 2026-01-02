import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, MenuItem, CartItemExtra, SIZE_PRICES } from '@/types/order';

interface CartContextType {
  items: CartItem[];
  addItem: (menuItem: MenuItem, size: CartItem['size'], extras: CartItemExtra[], observations: string, quantity: number) => void;
  removeItem: (index: number) => void;
  updateQuantity: (index: number, quantity: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
  justAdded: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const calculateItemTotal = (
    menuItem: MenuItem,
    size: CartItem['size'],
    extras: CartItemExtra[],
    quantity: number
  ): number => {
    const basePrice = menuItem.price;
    const sizePrice = SIZE_PRICES[size];
    const extrasPrice = extras.reduce((sum, extra) => sum + extra.price, 0);
    return (basePrice + sizePrice + extrasPrice) * quantity;
  };

  const addItem = (
    menuItem: MenuItem,
    size: CartItem['size'],
    extras: CartItemExtra[],
    observations: string,
    quantity: number
  ) => {
    const totalPrice = calculateItemTotal(menuItem, size, extras, quantity);
    const newItem: CartItem = {
      menuItem,
      size,
      extras,
      observations,
      quantity,
      totalPrice,
    };
    setItems((prev) => [...prev, newItem]);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 500);
  };

  const removeItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const updateQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(index);
      return;
    }
    setItems((prev) =>
      prev.map((item, i) => {
        if (i === index) {
          const totalPrice = calculateItemTotal(item.menuItem, item.size, item.extras, quantity);
          return { ...item, quantity, totalPrice };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const total = items.reduce((sum, item) => sum + item.totalPrice, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, total, itemCount, justAdded }}
    >
      {children}
    </CartContext.Provider>
  );
};
