import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [banner, setBanner] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log('Fetching products from API...');
        const res = await api.get('products/');
        console.log('Products received:', res.data);
        setProducts(res.data);
        setError('');
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();

    const interval = setInterval(() => {
      setBanner(b => (b + 1) % 3);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const filtered = products.filter(p => {
    const matchName = p.name.toLowerCase().includes(search.toLowerCase());
    return matchName;
  });

  return (
    <>
      <div className="hero">
        <h1>
          {['Perfect Gifts 🎁', 'Make Moments Special 💖', 'Surprise Loved Ones 🎉'][banner]}
        </h1>
        <p>Premium curated gifts for every occasion.</p>
        {
         <button>Shop Now</button>
        }
      </div>

      <div className="container">
        {error && <p style={{ color: 'red' }}>❌ {error}</p>}
        {loading && <p>Loading products...</p>}

        <input
          placeholder="Search gifts..."
          style={{
            padding: 12,
            width: '100%',
            maxWidth: 400,
            marginBottom: 25,
            borderRadius: 10,
            border: '1px solid #ccc'
          }}
          onChange={e => setSearch(e.target.value)}
        />

        {!loading && products.length === 0 && (
          <p>No products available. Please add products from the admin panel.</p>
        )}

        <div className="grid">
          {filtered.map((p: any) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
