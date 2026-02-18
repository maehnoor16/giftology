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
  <div className="product-details">

    <div className="product-image-wrapper">
      <img
        src={product.image}
        alt={product.name}
        className="product-image"
      />
    </div>

    <div className="product-info">
      <h2>{product.name}</h2>

      <p className="product-description">
        {product.description}
      </p>

      <h3 className="product-price">
        Rs.{product.price}
      </h3>

      <button
        className="button product-btn"
        disabled={isOutOfStock}
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
