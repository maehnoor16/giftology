import { FC, useState, useEffect } from "react";
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
        <img src={product.image} alt={product.name} />
        <button
          className="wishlist-btn"
          onClick={handleToggleWishlist}
          style={{
            position: 'absolute',
            top: 8,
            right: 8,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 20,
          }}
        >
          {isWishlisted ? '❤️' : '🤍'}
        </button>
      </div>
      <div className="card-body">
        <div>
          <h4>{product.name}</h4>
          <p className="price">Rs.{product.price}</p>
        </div>
        <button className="button" onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductCard;
