import React, { useEffect, useState } from 'react';
import { getWishlist } from '../utils/wishlist';
import { useAuth } from '../context/AuthContext';
import { api } from '../api';
import ProductCard from '../components/ProductCard';

const Wishlist = () => {
  const [items, setItems] = useState<any[]>([]);
  const auth = useAuth();

  useEffect(() => {
    const load = async () => {
      try {
        if (auth.user) {
          const resp = await api.get('wishlist/', { params: { email: auth.user.email } });
          setItems(resp.data || []);
          return;
        }
        const guestEmail = localStorage.getItem('guestEmail');
        if (guestEmail) {
          const resp = await api.get('wishlist/', { params: { email: guestEmail } });
          setItems(resp.data || []);
          return;
        }
      } catch (e) {}

      setItems(getWishlist());
    };

    load();
  }, [auth.user]);

  return (
    <div className="container">
      <h2 className="section-title">❤️ Wishlist</h2>

      {items.length === 0 && <p>No wishlist items yet.</p>}

      <div className="grid">
        {items.map((p: any) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
