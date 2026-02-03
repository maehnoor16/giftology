import React from "react";
import { useCart } from "../context/CartContext";
import "../styles/cart.css";
import { useNavigate } from "react-router-dom";

const CartDrawer = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const { cart, updateQty, removeFromCart, total } = useCart();
  const navigate = useNavigate();

  if (!open) return null;

  return (
    <div className="cart-overlay">
      <div className="cart-drawer">
        <div className="cart-header">
          <h3>Cart ({cart.length})</h3>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        {cart.length === 0 ? (
          <p style={{ padding: 20 }}>Your cart is empty.</p>
        ) : (
          <>
            <div className="cart-items">
              {cart.map(item => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} />
                  <div className="cart-info">
                    <h4>{item.name}</h4>
                    <p>Rs.{item.price}</p>
                    <div className="qty-box">
                      <button onClick={() => updateQty(item.id, Math.max(1, item.qty - 1))}>−</button>
                      <span>{item.qty}</span>
                      <button onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                    </div>
                  </div>
                  <button className="delete-btn" onClick={() => removeFromCart(item.id)}>🗑</button>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <div className="total-row">
                <span>Estimated total</span>
                <strong>Rs.{total.toLocaleString()}</strong>
              </div>
              <button
                className="checkout-btn"
                onClick={() => {
                  onClose();
                  navigate("/checkout");
                }}
              >
                Check out
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
