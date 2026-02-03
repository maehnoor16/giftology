export const getCart = () => JSON.parse(localStorage.getItem('cart') || '[]');

export const saveCart = (cart: any[]) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

export const addToCart = (product: any) => {
  const cart = getCart();
  const existing = cart.find((p: any) => p.id === product.id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  saveCart(cart);
  return cart;
};

export const updateQty = (id: number, qty: number) => {
  const cart = getCart().map((item: any) =>
    item.id === id ? { ...item, qty } : item
  );
  saveCart(cart);
  return cart;
};

export const removeFromCart = (id: number) => {
  const cart = getCart().filter((item: any) => item.id !== id);
  saveCart(cart);
  return cart;
};

export const clearCart = () => {
  localStorage.removeItem('cart');
};
