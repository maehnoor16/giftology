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
  // attempt to sync with backend if we have an email (user or guest)
  try {
    let email: string | null = null;
    const raw = localStorage.getItem('user');
    if (raw) {
      const user = JSON.parse(raw);
      email = user.email;
    }
    if (!email) {
      email = localStorage.getItem('guestEmail');
    }
    if (email) {
      api.post('wishlist/toggle/', { email, product_id: product.id }).catch(() => {});
    }
  } catch {}

  return newList;
};

export const inWishlist = (id: number) =>
  getWishlist().some((p: any) => p.id === id);
