import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useCartUI } from "../context/CartUIContext";
import CartDrawer from "./CartDrawer";

const Navbar = () => {
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const { isCartOpen, openCart, closeCart } = useCartUI();

  return (
    <>
      <div className="navbar">
        <h2>🎁 Giftology</h2>
        <div className="nav-links">
          <Link to="/">Shop</Link>
          {user && <Link to="/wishlist">Wishlist ❤️</Link>}
          {user && <Link to="/orders">Orders 📦</Link>}
          <button className="cart-btn" onClick={openCart}>
            Cart ({cart.reduce((s, i) => s + i.qty, 0)})
          </button>
          {user ? (
            <button onClick={logout}>Logout</button>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </div>

      <CartDrawer open={isCartOpen} onClose={closeCart} />
    </>
  );
};

export default Navbar;
