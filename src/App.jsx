import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

// =========================
// CUSTOMER PAGES
// =========================
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import BlogPage from "./pages/BlogPage";
import ServicesPage from "./pages/ServicesPage";
import FeaturedPage from "./pages/FeaturedPage";
import ContactPage from "./pages/ContactPage";
import ShopPage from "./pages/ShopPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import CartPage from "./pages/CartPage";
import WishlistPage from "./pages/WishlistPage";
import CheckoutPage from "./pages/CheckoutPage";
import MyOrdersPage from "./pages/MyOrdersPage";


// =========================
// ADMIN PAGES
// =========================
import AdminDashboard from "./pages/AdminDashboard";
import AdminProducts from "./pages/AdminProducts";
import AdminCustomersPage from "./pages/AdminCustomersPage";
import AdminOrdersPage from "./pages/AdminOrdersPage";

// =========================
// NAVBAR
// =========================
import Navbar from "./components/Navbar";


function AppContent() {
  const location = useLocation();

  // Hide customer navbar on admin pages
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <>
      {/* Customer Navbar */}
      {!isAdminPage && <Navbar />}

      <Routes>

        {/* =========================
            CUSTOMER PAGES
        ========================= */}

        <Route
          path="/"
          element={<HomePage />}
        />

        <Route
          path="/about"
          element={<AboutPage />}
        />

        <Route
          path="/blog"
          element={<BlogPage />}
        />

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
          path="/shop"
          element={<ShopPage />}
        />


        {/* =========================
            AUTHENTICATION
        ========================= */}

        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/register"
          element={<RegisterPage />}
        />


        {/* =========================
            CUSTOMER ACCOUNT
        ========================= */}

        <Route
          path="/profile"
          element={<ProfilePage />}
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
          path="/my-orders"
          element={<MyOrdersPage />}
        />


        {/* =========================
            ADMIN PAGES
        ========================= */}

        <Route
          path="/admin"
          element={<AdminDashboard />}
        />

        <Route
          path="/admin/products"
          element={<AdminProducts />}
        />

        <Route
          path="/admin/customers"
          element={<AdminCustomersPage />}
        />

        <Route
          path="/admin/orders"
          element={<AdminOrdersPage />}
        />


        {/* =========================
            404 PAGE
        ========================= */}

        <Route
          path="*"
          element={
            <div
              style={{
                minHeight: "80vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <h1>404</h1>
              <p>Page not found.</p>
            </div>
          }
        />

      </Routes>
    </>
  );
}


function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;