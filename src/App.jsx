import ProtectedAdmin from "./components/ProtectedAdmin";
import AdminOrdersPage from "./pages/AdminOrdersPage";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import BlogPage from "./pages/BlogPage";
import ServicesPage from "./pages/ServicesPage";
import FeaturedPage from "./pages/FeaturedPage";
import ContactPage from "./pages/ContactPage";
import ShopPage from "./pages/ShopPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CartPage from "./pages/CartPage";
import WishlistPage from "./pages/WishlistPage";
import CheckoutPage from "./pages/CheckoutPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import AdminPage from "./pages/AdminPage";
import MyOrdersPage from "./pages/MyOrdersPage";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProducts from "./pages/AdminProducts";

function App() {
  return (
    <>
      <Navbar />

      <Routes>

        <Route path="/" element={<HomePage />} />

        <Route path="/shop" element={<ShopPage />} />

        <Route
          path="/product/:id"
          element={<ProductDetailsPage />}
        />

        <Route path="/about" element={<AboutPage />} />

        <Route path="/blog" element={<BlogPage />} />

        <Route
          path="/services"
          element={<ServicesPage />}
        />

        <Route
          path="/featured"
          element={<FeaturedPage />}
        />

        <Route
          path="/contact"
          element={<ContactPage />}
        />

        <Route
          path="/cart"
          element={<CartPage />}
        />

        <Route
          path="/wishlist"
          element={<WishlistPage />}
        />

        <Route
          path="/checkout"
          element={<CheckoutPage />}
        />

        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/register"
          element={<RegisterPage />}
        />

        <Route
          path="/profile"
          element={<ProfilePage />}
        />

        <Route
          path="/my-orders"
          element={<MyOrdersPage />}
        />

        {/* Admin Dashboard */}

        <Route
          path="/admin"
          element={<AdminDashboard />}
        />

        {/* Admin Page */}

        <Route
          path="/admin"
          element={
            <ProtectedAdmin>
              <AdminPage />
            </ProtectedAdmin>
          }
        />

        {/* Admin Orders */}

        <Route
          path="/admin/orders"
          element={
            <ProtectedAdmin>
              <AdminOrdersPage />
            </ProtectedAdmin>
          }
        />

        {/* Admin Products */}

        <Route
          path="/admin/products"
          element={
            <ProtectedAdmin>
              <AdminProducts />
            </ProtectedAdmin>
          }
        />

      </Routes>
    </>
  );
}

export default App;