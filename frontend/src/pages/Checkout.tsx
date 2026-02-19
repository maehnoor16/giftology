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

  const [discountPercent, setDiscountPercent] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    phone: '',
    couponCode: '',
  });

  /* ===============================
     Auto-fill when user logged in
  ================================ */
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
        try {
          const token = localStorage.getItem("token");

          const response = await api.get('user/profile/', {
            headers: {
              Authorization: `Token ${token}`
            }
          });

          const profileData = response.data;

          setFormData(prev => ({
            ...prev,
            email: profileData.email || '',
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
    };

    fetchUserProfile();
  }, [user]);

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /* ===============================
     Apply Coupon
  ================================ */
  const handleApplyCoupon = async () => {
    if (!formData.couponCode) {
      setDialogType('error');
      setDialogMessage('Please enter coupon code');
      setDialogOpen(true);
      return;
    }

    try {
      const response = await api.post('coupon/validate/', {
        code: formData.couponCode
      });

      const percent = response.data.discount_percent;
      const subtotalWithShipping = total + 199;
      const discount = (subtotalWithShipping * percent) / 100;

      setDiscountPercent(percent);
      setDiscountAmount(discount);
      setCouponApplied(true);

      setDialogType('success');
      setDialogMessage(`🎉 ${percent}% discount applied successfully!`);
      setDialogOpen(true);

    } catch (error) {
      setDiscountPercent(0);
      setDiscountAmount(0);
      setCouponApplied(false);

      setDialogType('error');
      setDialogMessage('Invalid or expired coupon');
      setDialogOpen(true);
    }
  };

  /* ===============================
     Place Order
  ================================ */
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
      const finalTotal = total + 199 - discountAmount;

      const orderData = {
        email: formData.email,
        first_name: formData.firstName,
        last_name: formData.lastName,
        address: formData.address,
        city: formData.city,
        phone: formData.phone,
        coupon_code: couponApplied ? formData.couponCode : null,
        total_price: finalTotal,
        items: cart.map(item => ({
          product_id: item.id,
          quantity: item.qty,
        })),
      };

      await api.post('orders/create/', orderData);

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

  const subtotalWithShipping = total + 199;
  const finalTotal = subtotalWithShipping - discountAmount;

  return (
    <div className="checkout-layout">

      {/* LEFT SIDE */}
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

        <div style={{ display: 'flex', gap: '10px' }}>
          <input
            placeholder="Enter coupon code"
            name="couponCode"
            value={formData.couponCode}
            onChange={handleChange}
          />
         <button
            type="button"
            className="button coupon-btn"
            onClick={handleApplyCoupon}
            disabled={couponApplied}
          >
            {couponApplied ? 'Applied' : 'Apply'}
          </button>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="right">
        {cart.map(i => (
          <div key={i.id} className="checkout-item">
            <img src={i.image} alt={i.name} />
            <span>{i.name}</span>
            <strong>Rs.{i.price}</strong>
          </div>
        ))}

        <hr />

        <div className="row">
          <span>Subtotal</span>
          <span>Rs.{total}</span>
        </div>

        <div className="row">
          <span>Shipping</span>
          <span>Rs.199</span>
        </div>

        {couponApplied && (
          <div className="row">
            <span>Discount ({discountPercent}%)</span>
            <span>- Rs.{discountAmount.toFixed(0)}</span>
          </div>
        )}

        <div className="row total">
          <strong>Total</strong>
          <strong>Rs.{finalTotal.toFixed(0)}</strong>
        </div>

        <button
          className="pay-btn"
          onClick={handlePlaceOrder}
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Place Order'}
        </button>
      </div>

      <Dialog
        open={dialogOpen}
        title={dialogType === 'success' ? 'Success' : dialogType === 'error' ? 'Error' : 'Info'}
        message={dialogMessage}
        onClose={() => setDialogOpen(false)}
        type={dialogType}
      />
    </div>
  );
};

export default Checkout;
