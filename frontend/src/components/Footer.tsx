import React, { useState } from "react";
import { Link } from "react-router-dom";
import Dialog from "./Dialog";
import "../styles/footer.css";

const Footer = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>🎁 Giftology</h3>
          <p>Your one-stop destination for the perfect gifts. Thoughtfully curated, beautifully delivered.</p>
          <div className="social-links">
            <a href="#" aria-label="Facebook">f</a>
            <a href="#" aria-label="Twitter">𝕏</a>
            <a href="#" aria-label="Instagram">📷</a>
            <a href="#" aria-label="LinkedIn">in</a>
          </div>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Shop</Link></li>
            <li><Link to="/wishlist">Wishlist</Link></li>
            <li><Link to="/orders">Orders</Link></li>
            <li><Link to="/cart">Cart</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Help & Support</h4>
          <ul>
            <li><a href="#contact">Contact Us</a></li>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="#shipping">Shipping Info</a></li>
            <li><a href="#returns">Returns</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Newsletter</h4>
          <p>Subscribe for exclusive offers and updates!</p>
          <form className="newsletter-form" onSubmit={(e) => {
            e.preventDefault();
            setDialogOpen(true);
          }}>
            <input type="email" placeholder="Enter your email" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} Giftology. All rights reserved. | <a href="#privacy">Privacy Policy</a> | <a href="#terms">Terms of Service</a></p>
      </div>

      <Dialog
        open={dialogOpen}
        title="🎉 Thanks for Subscribing!"
        message="You're all set! Check your email for exclusive offers and updates."
        onClose={() => setDialogOpen(false)}
        type="success"
      />
    </footer>
  );
};

export default Footer;
