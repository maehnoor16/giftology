import React, { useEffect, useState } from 'react';
import { getCart, updateQty, removeFromCart } from '../utils/cart';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cart, setCart] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setCart(getCart());
  }, []);

  const update = (id: number, qty: number) => {
    const newCart = updateQty(id, qty);
    setCart(newCart);
    window.dispatchEvent(new Event('storage'));
  };

  const remove = (id: number) => {
    const newCart = removeFromCart(id);
    setCart(newCart);
    window.dispatchEvent(new Event('storage'));
  };

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <div className="container">
      <h2 className="section-title">Your Cart</h2>

      {cart.length === 0 && <p>Your cart is empty.</p>}

      {cart.map(item => (
        <div className="cart-item" key={item.id}>
          <img src={item.image} alt={item.name} />
          <div style={{ flex: 1 }}>
            <h4>{item.name}</h4>
            <p>${item.price}</p>

            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <button
                className="button"
                onClick={() => update(item.id, Math.max(1, item.qty - 1))}
              >
                −
              </button>
              <strong>{item.qty}</strong>
              <button
                className="button"
                onClick={() => update(item.id, item.qty + 1)}
              >
                +
              </button>
              <button
                className="button"
                style={{ background: '#ff4d4f' }}
                onClick={() => remove(item.id)}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}

      {cart.length > 0 && (
        <div className="cart-summary">
          <h3>Total: ${total.toFixed(2)}</h3>
          <button className="button checkout-btn" onClick={() => navigate('/checkout')}>
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
