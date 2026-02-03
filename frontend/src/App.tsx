import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Wishlist from "./pages/Wishlist";
import Orders from "./pages/Orders";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { CartUIProvider } from "./context/CartUIContext";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <CartUIProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
          <Footer />
        </CartUIProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
