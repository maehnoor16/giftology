import React, { createContext, useContext, useState } from "react";

type CartUIContextType = {
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
};

const CartUIContext = createContext<CartUIContextType | null>(null);

export const CartUIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <CartUIContext.Provider
      value={{
        isCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
      }}
    >
      {children}
    </CartUIContext.Provider>
  );
};

export const useCartUI = () => {
  const ctx = useContext(CartUIContext);
  if (!ctx) throw new Error("useCartUI must be inside CartUIProvider");
  return ctx;
};
