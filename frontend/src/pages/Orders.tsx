import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../api';

const Orders = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const guestEmail = localStorage.getItem('guestEmail');

    // if neither logged-in nor guest email available, nothing to load
    if (!user && !guestEmail) {
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      try {
        const emailToUse = user ? user.email : guestEmail;
        const response = await api.get(`orders/?email=${emailToUse}`);
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (!user && !localStorage.getItem('guestEmail')) {
    return (
      <div className="container">
        <h2 className="section-title">📦 My Orders</h2>
        <p>Please log in or place an order to view orders.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container">
        <h2 className="section-title">📦 My Orders</h2>
        <p>Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h2 className="section-title">📦 My Orders</h2>

      {orders.length === 0 && <p>No orders yet.</p>}

      {orders.map((order) => (
        <div className="admin-card" key={order.id} style={{ marginBottom: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
            <div>
              <strong style={{ fontSize: 16 }}>Order #{order.id}</strong>
              <p style={{ margin: '4px 0', color: '#666' }}>
                Date: {new Date(order.created_at).toLocaleDateString()} at {new Date(order.created_at).toLocaleTimeString()}
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <strong style={{ fontSize: 16, color: '#3fa9f5' }}>Rs.{order.total_price}</strong>
              <p style={{ margin: '4px 0', color: '#666' }}>({order.items.length} items)</p>
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '12px 0' }} />

          <div style={{ marginBottom: 12 }}>
            <strong style={{ fontSize: 14 }}>Items:</strong>
            {order.items.map((item: any, index: number) => (
              <div key={index} style={{ padding: '8px 0', fontSize: 13, color: '#555' }}>
                • {item.product_name} x {item.quantity} @ Rs.{item.product_price}
              </div>
            ))}
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '12px 0' }} />

          <div style={{ fontSize: 12, color: '#888' }}>
            <p style={{ margin: '4px 0' }}>
              <strong>Address:</strong> {order.address}, {order.city}
            </p>
            <p style={{ margin: '4px 0' }}>
              <strong>Phone:</strong> {order.phone}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;
