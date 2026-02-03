import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../api';
import { addToCart } from '../utils/cart';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    api.get(`products/${id}/`).then(res => setProduct(res.data));
  }, [id]);

  if (!product) return <p style={{ padding: 30 }}>Loading...</p>;

  return (
    <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
      <img
        src={product.image}
        alt={product.name}
        style={{ width: '100%', borderRadius: 20 }}
      />

      <div>
        <h2>{product.name}</h2>
        <p style={{ margin: '15px 0', color: '#555' }}>{product.description}</p>
        <h3 style={{ color: '#3fa9f5' }}>${product.price}</h3>

        <button
          className="button"
          style={{ marginTop: 20, padding: '12px 22px' }}
          onClick={() => {
            addToCart(product);
            window.dispatchEvent(new Event('storage'));
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
