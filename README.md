# 🎁 Giftology - E-Commerce Platform

A full-stack e-commerce application for gift shopping with user authentication, wishlist management, shopping cart, and secure checkout. Built with Django, React, and Node.js.

![Status](https://img.shields.io/badge/status-active-success.svg)
![Python](https://img.shields.io/badge/Python-3.12-blue.svg)
![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)
![React](https://img.shields.io/badge/React-18+-61dafb.svg)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Project Architecture](#project-architecture)
- [Contributing](#contributing)

---

## ✨ Features

### User & Authentication
- ✅ User registration and login
- ✅ Email-based authentication
- ✅ Persistent user sessions
- ✅ User-specific data (orders, wishlist)

### Product Catalog
- ✅ Browse all products
- ✅ Search and filter products
- ✅ View product details
- ✅ Real-time stock tracking

### Shopping Experience
- ✅ Add/remove items from cart
- ✅ Persistent cart storage
- ✅ Quantity management
- ✅ Real-time cart total calculation

### Wishlist Management
- ✅ Add/remove items from wishlist
- ✅ User-specific wishlist (per email)
- ✅ Wishlist synchronization with backend
- ✅ View saved items anytime

### Checkout & Orders
- ✅ Multi-step checkout process
- ✅ Delivery information collection
- ✅ Optional coupon code support
- ✅ Cash on delivery option
- ✅ Estimated delivery time (2-4 working days)
- ✅ Order history viewing

### UI/UX
- ✅ Modern, responsive design
- ✅ Beautiful gradient aesthetics
- ✅ Minimal dialog popups (no browser alerts)
- ✅ Smooth animations and transitions
- ✅ Mobile-friendly interface
- ✅ Professional footer with newsletter subscription

---

## 🛠️ Tech Stack

### Backend - Django REST Framework
- **Framework**: Django 6.0+
- **API**: Django REST Framework
- **Database**: SQLite (development), PostgreSQL (production-ready)
- **Auth**: Django built-in authentication
- **Port**: `8000`

### Frontend - React + TypeScript
- **Framework**: React 18+
- **Language**: TypeScript
- **Styling**: CSS3 with gradients and animations
- **HTTP Client**: Axios
- **State Management**: React Context API
- **Port**: `3000`

### Payment Service - Node.js
- **Framework**: Express.js
- **Language**: JavaScript
- **Port**: `5000`

---

## 📁 Project Structure

```
giftology/
├── backend-django/                 # Django REST API
│   ├── manage.py
│   ├── db.sqlite3
│   ├── giftology_backend/          # Main Django app
│   │   ├── settings.py
│   │   ├── urls.py
│   │   ├── asgi.py
│   │   └── wsgi.py
│   └── store/                      # Store app
│       ├── models.py               # Product, Order, WishlistItem
│       ├── views.py                # API endpoints
│       ├── serializers.py
│       ├── urls.py
│       └── migrations/
│
├── backend-node/                   # Node.js Payment Service
│   ├── server.js
│   ├── package.json
│   ├── routes/
│   │   └── payment.js
│   └── controllers/
│       └── paymentController.js
│
├── frontend/                       # React TypeScript App
│   ├── public/
│   ├── src/
│   │   ├── components/             # Reusable UI components
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Dialog.tsx
│   │   │   ├── CartDrawer.tsx
│   │   │   └── ProductCard.tsx
│   │   ├── pages/                  # Page components
│   │   │   ├── Home.tsx
│   │   │   ├── Shop.tsx
│   │   │   ├── Cart.tsx
│   │   │   ├── Checkout.tsx
│   │   │   ├── Wishlist.tsx
│   │   │   ├── Orders.tsx
│   │   │   └── Login.tsx
│   │   ├── context/                # State management
│   │   │   ├── AuthContext.tsx
│   │   │   ├── CartContext.tsx
│   │   │   └── CartUIContext.tsx
│   │   ├── styles/                 # CSS files
│   │   │   ├── dialog.css
│   │   │   ├── footer.css
│   │   │   ├── checkout.css
│   │   │   └── cart.css
│   │   ├── utils/                  # Utility functions
│   │   │   ├── cart.ts
│   │   │   └── wishlist.ts
│   │   ├── api.ts                  # API client configuration
│   │   └── index.tsx
│   ├── package.json
│   └── tsconfig.json
│
├── .gitignore
└── README.md
```

---

## 📦 Prerequisites

Before you begin, ensure you have installed:

- **Python** 3.10 or higher
- **Node.js** 18.0 or higher
- **npm** 9.0 or higher
- **Git**

---

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/maehnoor16/giftology.git
cd giftology
```

### 2. Backend Setup (Django)

```bash
# Navigate to Django directory
cd backend-django

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py makemigrations
python manage.py migrate

# Create superuser (optional, for admin panel)
python manage.py createsuperuser

# Start Django server
python manage.py runserver
```

Django API will be available at: `http://127.0.0.1:8000/api/`

### 3. Frontend Setup (React)

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start React development server
npm start
```

Frontend will be available at: `http://localhost:3000`

### 4. Node.js Payment Service (Optional)

```bash
# Navigate to backend-node directory
cd backend-node

# Install dependencies
npm install

# Start Node server
npm start
```

Payment service will run at: `http://localhost:5000`

---

## ▶️ Running the Application

### Option 1: Run All Services Separately

**Terminal 1 - Django Backend:**
```bash
cd backend-django
venv\Scripts\activate  # Windows
python manage.py runserver
```

**Terminal 2 - React Frontend:**
```bash
cd frontend
npm start
```

**Terminal 3 - Node.js Service (Optional):**
```bash
cd backend-node
npm start
```

### Option 2: Run from Root Directory

If you have all three services installed:

```bash
# Django (from Giftology root)
cd backend-django && python manage.py runserver

# React (from Giftology root in another terminal)
cd frontend && npm start

# Node (from Giftology root in another terminal)
cd backend-node && npm start
```

---

## 📡 API Documentation

### Base URL
```
http://127.0.0.1:8000/api/
```

### Authentication Endpoints

#### Login
```
POST /login/
Body: { "username": "email", "password": "password" }
Response: { "message": "Login successful", "user_id": 1, "email": "user@example.com" }
```

#### Register
```
POST /register/
Body: { "username": "email", "password": "password", "email": "user@example.com" }
Response: { "message": "User created" }
```

### Product Endpoints

#### Get All Products
```
GET /products/
Response: [{ "id": 1, "name": "Product", "price": 999, "image": "url", "stock": 10 }, ...]
```

### Order Endpoints

#### Get User Orders
```
GET /orders/?email=user@example.com
Response: [{ "id": 1, "user": 1, "total_price": 1199, "items": [...], "created_at": "..." }, ...]
```

#### Create Order
```
POST /orders/create/
Body: {
  "email": "user@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "address": "123 Main St",
  "city": "New York",
  "phone": "1234567890",
  "total_price": 1199,
  "items": [{ "product_id": 1, "quantity": 2, "price": 999 }]
}
Response: { "message": "Order created successfully", "order_id": 1 }
```

### Wishlist Endpoints

#### Get User Wishlist
```
GET /wishlist/?email=user@example.com
Response: [{ "id": 1, "name": "Product", "price": 999, "image": "url", ... }, ...]
```

#### Toggle Wishlist Item
```
POST /wishlist/toggle/
Body: { "email": "user@example.com", "product_id": 1 }
Response: { "message": "added" } or { "message": "removed" }
```

---

## 💾 Database Schema

### Models

#### Product
```python
- id: Integer (Primary Key)
- name: String(200)
- description: Text
- price: Float
- image: URL
- stock: Integer
```

#### Order
```python
- id: Integer (Primary Key)
- user: Foreign Key (User)
- total_price: Float
- address: String(500)
- city: String(100)
- phone: String(20)
- created_at: DateTime
```

#### OrderItem
```python
- id: Integer (Primary Key)
- order: Foreign Key (Order)
- product: Foreign Key (Product)
- quantity: Integer
```

#### WishlistItem
```python
- id: Integer (Primary Key)
- user: Foreign Key (User)
- product: Foreign Key (Product)
- added_at: DateTime
```

---

## 🏗️ Project Architecture

### Frontend Architecture
```
User Interface (React Components)
        ↓
Context API (Auth, Cart, CartUI)
        ↓
API Client (Axios)
        ↓
Django REST Backend
```

### Data Flow
1. User logs in → AuthContext stores user data & localStorage
2. User adds to cart → CartContext manages items & localStorage
3. User adds to wishlist → Both localStorage & backend sync
4. User checks orders → API fetches from Django backend
5. User submits order → Frontend sends to backend → Backend stores in DB

### Key Features Implementation

**Wishlist System:**
- Local storage for instant UI feedback
- Backend sync for persistence across devices
- Per-user tracking via email

**Cart System:**
- localStorage persistence
- Real-time total calculation
- Drawer-based UI

**Dialog System:**
- Replaces browser alerts
- Styled popups for success/error/info
- Smooth animations

---

## 📝 Frontend Pages

| Page | Route | Purpose |
|------|-------|---------|
| Home | `/` | Hero section & featured products |
| Shop | `/shop` | Browse all products |
| Product Details | `/product/:id` | View single product details |
| Cart | `/cart` | View & manage cart items |
| Checkout | `/checkout` | Order placement with delivery info |
| Wishlist | `/wishlist` | View saved items (authenticated) |
| Orders | `/orders` | View order history (authenticated) |
| Login | `/login` | User authentication |
| Register | `/register` | New user registration |

---

## 🤝 Contributing

Contributions are welcome! Here's how to contribute:

1. **Fork the repository**
   ```bash
   git clone https://github.com/maehnoor16/giftology.git
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```

3. **Make your changes**
   - Follow the existing code style
   - Add comments for complex logic
   - Test thoroughly

4. **Commit your changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```

5. **Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```

6. **Open a Pull Request**
   - Describe your changes
   - Reference any related issues

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👥 Author

**Mahnoor**
- GitHub: [@maehnoor16](https://github.com/maehnoor16)
- Project: [Giftology](https://github.com/maehnoor16/giftology)

---

## 🙏 Acknowledgments

- Django & Django REST Framework for the powerful backend
- React & TypeScript for the modern frontend
- Express.js for the payment service
- SQLite for development database

---

## 📞 Support

For support, open an issue on the [GitHub repository](https://github.com/maehnoor16/giftology/issues).

---

## 🚀 Future Enhancements

- [ ] Payment gateway integration (Stripe/PayPal)
- [ ] Email notifications
- [ ] Product reviews and ratings
- [ ] Advanced search and filters
- [ ] Admin dashboard
- [ ] Analytics and reporting
- [ ] Mobile app (React Native)
- [ ] Dark mode theme
- [ ] Multi-language support
- [ ] Inventory management system

---

**Made with ❤️ by Mahnoor**
