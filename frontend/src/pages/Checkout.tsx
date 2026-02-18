import { useState, useEffect } from 'react';
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';
import { api } from '../api';
import Dialog from '../components/Dialog';
import '../styles/checkout.css';

const Checkout = () => {
  const { cart, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogType, setDialogType] = useState<'info' | 'success' | 'error'>('info');
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    phone: '',
    couponCode: '',
  });

  // Auto-fill form data when user is logged in
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user && user.email) {
        try {
          const response = await api.get('user/profile/', { params: { email: user.email } });
          const profileData = response.data;
          setFormData(prevData => ({
            ...prevData,
            email: profileData.email || user.email,
            firstName: profileData.firstName || '',
            lastName: profileData.lastName || '',
            address: profileData.address || '',
            city: profileData.city || '',
            phone: profileData.phone || '',
          }));
        } catch (error) {
      console.error("Profile fetch failed", error);
          }
        }
      }

    fetchUserProfile();
  }, [user]);

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlaceOrder = async () => {
    if (!formData.email || !formData.firstName || !formData.lastName || !formData.address || !formData.city || !formData.phone) {
      setDialogType('error');
      setDialogMessage('Please fill in all required fields');
      setDialogOpen(true);
      return;
    }

    if (cart.length === 0) {
      setDialogType('error');
      setDialogMessage('Your cart is empty');
      setDialogOpen(true);
      return;
    }

    setLoading(true);
    try {
      const orderData = {
        email: formData.email,
        first_name: formData.firstName,
        last_name: formData.lastName,
        address: formData.address,
        city: formData.city,
        phone: formData.phone,
        coupon_code: formData.couponCode || null,
        total_price: total + 199,
        items: cart.map(item => ({
          product_id: item.id,
          quantity: item.qty,
          price: item.price,
        })),
      };

      const response = await api.post('orders/create/', orderData);
      setDialogType('success');
      setDialogMessage('🎉 Order placed successfully! Your order will be delivered in 2-4 working days.');
      setDialogOpen(true);
      clearCart();
      setTimeout(() => navigate('/'), 2000);
    } catch (error) {
      console.error('Error placing order:', error);
      setDialogType('error');
      setDialogMessage('Failed to place order. Please try again.');
      setDialogOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-layout">
      <div className="left">
        <h3>Contact</h3>
        <input
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          disabled={!!user}
        />

        <h3>Delivery</h3>
        <div className="delivery-info">
          <div className="info-box">
            <strong>🚚 Delivery Type:</strong>
            <p>Cash On Delivery</p>
          </div>
          <div className="info-box">
            <strong>⏱️ Estimated Time:</strong>
            <p>2-4 Working Days</p>
          </div>
        </div>

        <input placeholder="First name" name="firstName" value={formData.firstName} onChange={handleChange} />
        <input placeholder="Last name" name="lastName" value={formData.lastName} onChange={handleChange} />
        <input placeholder="Address" name="address" value={formData.address} onChange={handleChange} />
        <input placeholder="City" name="city" value={formData.city} onChange={handleChange} />
        <input placeholder="Phone" name="phone" value={formData.phone} onChange={handleChange} />

        <h3>Coupon Code <span className="optional">(Optional)</span></h3>
        <input placeholder="Enter coupon code (if any)" name="couponCode" value={formData.couponCode} onChange={handleChange} />
      </div>

      <div className="right">
        {cart.map(i => (
          <div key={i.id} className="checkout-item">
            <img src={i.image} />
            <span>{i.name}</span>
            <strong>Rs.{i.price}</strong>
          </div>
        ))}
        <hr />
        <div className="row"><span>Subtotal</span><span>Rs.{total}</span></div>
        <div className="row"><span>Shipping</span><span>Rs.199</span></div>
        <div className="row total"><strong>Total</strong><strong>Rs.{total + 199}</strong></div>
        <button className="pay-btn" onClick={handlePlaceOrder} disabled={loading}>
          {loading ? 'Processing...' : 'Place Order'}
        </button>
      </div>

      <Dialog
        open={dialogOpen}
        title={dialogType === 'success' ? '✅ Success!' : dialogType === 'error' ? ' Error' : 'ℹ️ Info'}
        message={dialogMessage}
        onClose={() => setDialogOpen(false)}
        type={dialogType}
      />
    </div>
  );
};

export default Checkout;
