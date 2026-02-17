import { FC, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useCartUI } from "../context/CartUIContext";
import { toggleWishlist, inWishlist } from "../utils/wishlist";

interface Props {
  product: any;
}

const ProductCard: FC<Props> = ({ product }) => {
  const { addToCart } = useCart();
  const { openCart } = useCartUI();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const isOutOfStock = product.stock <= 0;


  useEffect(() => {
    setIsWishlisted(inWishlist(product.id));
  }, [product.id]);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      qty: 1,
    });
    openCart();
  };

  const handleToggleWishlist = () => {
    toggleWishlist(product);
    setIsWishlisted(!isWishlisted);
  };

return (
  <div className="card">
    <div style={{ position: 'relative' }}>
      <Link to={`/products/${product.id}`}>
        <img src={product.image} alt={product.name} />
      </Link>

      <button
        className="wishlist-btn"
        onClick={(e) => {
          e.stopPropagation();
          handleToggleWishlist();
        }}
        style={{
          position: 'absolute',
          top: 8,
          right: 8,
          cursor: 'pointer',
          fontSize: 20,
        }}
      >
        {isWishlisted ? '❤️' : '🤍'}
      </button>
      {isOutOfStock && (
        <div
          style={{
            position: 'absolute',
            bottom: 10,
            left: 10,
            backgroundColor: '#ff4d4f',
            color: 'white',
            padding: '5px 10px',
            borderRadius: 6,
            fontSize: 12,
            fontWeight: 'bold'
          }}
        >
          OUT OF STOCK
        </div>
      )}
    </div>

    <div className="card-body">
      <Link
        to={`/products/${product.id}`}
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        <h4>{product.name}</h4>
      </Link>

      <p className="price">Rs.{product.price}</p>

      <button
        className="button"
        disabled={isOutOfStock}
        style={{
          backgroundColor: isOutOfStock ? '#ccc' : '',
          cursor: isOutOfStock ? 'not-allowed' : 'pointer'
        }}
        onClick={(e) => {
          e.stopPropagation();
          if (!isOutOfStock) handleAddToCart();
        }}
      >
        {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
      </button>

    </div>
  </div>
);
};

export default ProductCard;
