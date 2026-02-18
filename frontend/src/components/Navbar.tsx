// import React from "react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useCartUI } from "../context/CartUIContext";
import CartDrawer from "./CartDrawer";

const Navbar = () => {
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const { isCartOpen, openCart, closeCart } = useCartUI();
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);



  return (
    <>
      <div className="navbar">
        <h2>🎁 Giftology</h2>
        {/* <div className="nav-links"> */}
        <div className={`nav-links ${menuOpen ? "active" : ""}`}>

          <Link to="/" onClick={closeMenu}>Shop</Link>

          {user && (
            <Link to="/wishlist" onClick={closeMenu}>
              Wishlist ❤️
            </Link>
          )}

          {user && (
            <Link to="/orders" onClick={closeMenu}>
              Orders 📦
            </Link>
          )}

          <button
            className="cart-btn"
            onClick={() => {
              openCart();
              closeMenu();
            }}
          >
            Cart ({cart.reduce((s, i) => s + i.qty, 0)})
          </button>

          {user ? (
            <button
              onClick={() => {
                logout();
                closeMenu();
              }}
            >
              Logout
            </button>
          ) : (
            <Link to="/login" onClick={closeMenu}>
              Login
            </Link>
          )}

        </div>

        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </div>

      </div>

      <CartDrawer open={isCartOpen} onClose={closeCart} />
    </>
  );
};

export default Navbar;
