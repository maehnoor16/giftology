import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../api';
import { useCart } from '../context/CartContext';
import { useCartUI } from '../context/CartUIContext';


const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const { addToCart } = useCart();
  const { openCart } = useCartUI();
  const isOutOfStock = product?.stock <= 0;



  useEffect(() => {
  console.log("ID from params:", id);

  api.get(`products/${id}/`)
    .then(res => {
      console.log("Product response:", res.data);
      setProduct(res.data);
    })
    .catch(err => {
      console.error("API Error:", err);
    });
  }, [id]);

  if (!product) return <p style={{ padding: 30 }}>Loading...</p>;

  return (
    <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
      <div
        style={{
          width: '100%',
          height: '400px',
          overflow: 'hidden',
          borderRadius: 20
        }}
      >
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain'
          }}
        />
      </div>


      <div>
        <h2>{product.name}</h2>
        <p style={{ margin: '15px 0', color: '#555' }}>{product.description}</p>
        <h3 style={{ color: '#3fa9f5' }}>Rs.{product.price}</h3>

        <button
          className="button"
          disabled={isOutOfStock}
          style={{
            marginTop: 20,
            padding: '12px 22px',
            backgroundColor: isOutOfStock ? '#ccc' : '',
            cursor: isOutOfStock ? 'not-allowed' : 'pointer'
          }}
          onClick={() => {
            if (!isOutOfStock) {
              addToCart({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                qty: 1,
              });
              openCart();
            }
          }}
        >
          {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
        </button>

      </div>
    </div>
  );
};

export default ProductDetails;
