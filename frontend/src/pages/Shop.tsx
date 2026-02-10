import React, { useEffect, useState } from "react";
import { api } from "../api";
import ProductCard from "../components/ProductCard";

const Shop = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const categories = ['All', 'Birthday', 'Anniversary', 'Kids', 'Luxury', 'Flowers'];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get('products/');
        setProducts(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filtered = products.filter(p => {
    const matchName = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'All' || p.category === category;
    return matchName && matchCat;
  });

  if (loading) return <div style={{ padding: 20 }}><h2>Loading products...</h2></div>;
  if (error) return <div style={{ padding: 20 }}><h2>❌ {error}</h2></div>;

  return (
    <div style={{ padding: 20 }}>
      <h2>🛍 Shop</h2>

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
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: 12,
          width: '100%',
          maxWidth: 400,
          marginBottom: 25,
          borderRadius: 10,
          border: '1px solid #ccc'
        }}
      />

      {filtered.length === 0 ? (
        <p>No products available. Please add products from the admin panel.</p>
      ) : (
        <div className="grid">
          {filtered.map((p: any) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Shop;
