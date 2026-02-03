import React, { createContext, useContext, useEffect, useState } from "react";

export type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  qty: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateQty: (id: number, qty: number) => void;
  clearCart: () => void;
  total: number;
};

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("giftology_cart");
    if (saved) setCart(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("giftology_cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: CartItem) => {
    setCart(prev => {
      const existing = prev.find(p => p.id === item.id);
      if (existing) {
        return prev.map(p =>
          p.id === item.id ? { ...p, qty: p.qty + 1 } : p
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(p => p.id !== id));
  };

  const updateQty = (id: number, qty: number) => {
    setCart(prev =>
      prev.map(p => (p.id === id ? { ...p, qty } : p))
    );
  };

  const clearCart = () => setCart([]);

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQty, clearCart, total }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be inside CartProvider");
  return ctx;
};
