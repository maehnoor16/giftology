import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';

const Dashboard = () => (
  <>
    <div className="admin-card">
      <h3>Total Orders</h3>
      <p>{JSON.parse(localStorage.getItem('orders') || '[]').length}</p>
    </div>

    <div className="admin-card">
      <h3>Total Products</h3>
      <p>Connected to backend</p>
    </div>

    <div className="admin-card">
      <h3>Total Revenue</h3>
      <p>
        $
        {JSON.parse(localStorage.getItem('orders') || '[]').reduce(
          (s: number, o: any) => s + o.total,
          0
        )}
      </p>
    </div>
  </>
);

const Orders = () => (
  <>
    <h2>Orders</h2>
    {JSON.parse(localStorage.getItem('orders') || '[]').map((o: any, i: number) => (
      <div className="admin-card" key={i}>
        <strong>Order #{i + 1}</strong>
        <p>Total: ${o.total}</p>
        <p>Date: {o.date}</p>
      </div>
    ))}
  </>
);

const Admin = () => {
  return (
    <div className="admin-layout">
      <div className="admin-sidebar">
        <h3>Giftology Admin</h3>
        <Link to="/admin">Dashboard</Link>
        <Link to="/admin/orders">Orders</Link>
      </div>

      <div className="admin-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="orders" element={<Orders />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
