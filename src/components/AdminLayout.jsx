import { Link, Outlet, useLocation } from "react-router-dom";
import "../styles/AdminDashboard.css";

function AdminLayout() {
  const location = useLocation();

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-logo">
          <div className="logo-icon">S</div>

          <div>
            <h2>Saptakoshi</h2>
            <span>Cloth Center</span>
          </div>
        </div>

        <nav className="admin-nav">
          <Link
            to="/admin"
            className={`nav-item ${
              location.pathname === "/admin" ? "active" : ""
            }`}
          >
            <span>📊</span>
            Dashboard
          </Link>

          <Link
            to="/admin/orders"
            className={`nav-item ${
              location.pathname === "/admin/orders" ? "active" : ""
            }`}
          >
            <span>📦</span>
            Orders
          </Link>

          <Link
            to="/admin/products"
            className={`nav-item ${
              location.pathname === "/admin/products" ? "active" : ""
            }`}
          >
            <span>🛍️</span>
            Products
          </Link>

          <Link to="/shop" className="nav-item">
            <span>🌐</span>
            View Store
          </Link>
        </nav>

        <div className="admin-sidebar-bottom">
          <p>Admin Panel</p>
          <span>© 2026 Saptakoshi</span>
        </div>
      </aside>

      {/* Page content */}
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;