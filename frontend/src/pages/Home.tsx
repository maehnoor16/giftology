import React, { useEffect, useState } from 'react';
import { api } from '../api';
import ProductCard from '../components/ProductCard';

const categories = ['All', 'Birthday', 'Anniversary', 'Kids', 'Luxury', 'Flowers'];

const Home = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [banner, setBanner] = useState(0);

  useEffect(() => {
    api.get('products/').then(res => setProducts(res.data));

    const interval = setInterval(() => {
      setBanner(b => (b + 1) % 3);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const filtered = products.filter(p => {
    const matchName = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'All' || p.category === category;
    return matchName && matchCat;
  });

  return (
    <>
      <div className="hero">
        <h1>
          {['Perfect Gifts 🎁', 'Make Moments Special 💖', 'Surprise Loved Ones 🎉'][banner]}
        </h1>
        <p>Premium curated gifts for every occasion.</p>
        <button>Shop Now</button>
      </div>

      <div className="container">
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 25 }}>
          {categories.map(c => (
            <button
              key={c}
              className={`button ${category === c ? '' : 'secondary'}`}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>

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
