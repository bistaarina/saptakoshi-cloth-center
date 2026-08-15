import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import LoginPage from "./pages/LoginPage";
import Register from "./components/Register";

import AdminDashboard from "./pages/AdminDashboard";
import AdminProducts from "./components/AdminProducts";
import AdminCustomers from "./components/AdminCustomers";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Customer pages */}
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />

        {/* Admin pages */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route
          path="/admin/products"
          element={<AdminProducts />}
        />
        <Route
          path="/admin/customers"
          element={<AdminCustomers />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;