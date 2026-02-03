import { api } from '../api';

export const getWishlist = () =>
  JSON.parse(localStorage.getItem('wishlist') || '[]');

export const saveWishlist = (items: any[]) => {
  localStorage.setItem('wishlist', JSON.stringify(items));
};

export const toggleWishlist = (product: any) => {
  const list = getWishlist();
  const exists = list.find((p: any) => p.id === product.id);

  let newList;
  if (exists) {
    newList = list.filter((p: any) => p.id !== product.id);
  } else {
    newList = [...list, product];
  }

  saveWishlist(newList);
  // If user logged in, sync with backend (fire-and-forget)
  try {
    const raw = localStorage.getItem('user');
    if (raw) {
      const user = JSON.parse(raw);
      api.post('wishlist/toggle/', { email: user.email, product_id: product.id }).catch(() => {});
    }
  } catch {}

  return newList;
};

export const inWishlist = (id: number) =>
  getWishlist().some((p: any) => p.id === id);
