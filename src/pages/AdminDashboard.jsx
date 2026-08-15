import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getOrders } from "../api/orderApi";
import API from "../api/api";
import "../styles/AdminDashboard.css";

function AdminDashboard() {
  const location = useLocation();

  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      const ordersData = await getOrders();
      const productsRes = await API.get("/products");

      setOrders(ordersData);
      setProducts(productsRes.data);
    } catch (error) {
      console.error("Dashboard error:", error);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // ORDER STATISTICS
  // =========================

  const pendingOrders = orders.filter(
    (order) => order.status === "Pending"
  ).length;

  const confirmedOrders = orders.filter(
    (order) => order.status === "Confirmed"
  ).length;

  const shippedOrders = orders.filter(
    (order) => order.status === "Shipped"
  ).length;

  const deliveredOrders = orders.filter(
    (order) => order.status === "Delivered"
  ).length;

  const cancelledOrders = orders.filter(
    (order) => order.status === "Cancelled"
  ).length;

  // =========================
  // SALES
  // =========================

  const totalSales = orders
    .filter((order) => order.status !== "Cancelled")
    .reduce(
      (sum, order) => sum + Number(order.total || 0),
      0
    );

  // =========================
  // INVENTORY
  // =========================

  const totalProducts = products.length;

  const inStockProducts = products.filter(
    (product) => Number(product.stock) > 5
  ).length;

  const lowStockProducts = products.filter(
    (product) =>
      Number(product.stock) > 0 &&
      Number(product.stock) <= 5
  ).length;

  const outOfStockProducts = products.filter(
    (product) => Number(product.stock) === 0
  ).length;

  // =========================
  // RECENT ORDERS
  // =========================

  const recentOrders = orders.slice(0, 5);

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>

        <h3>Loading dashboard...</h3>

        <p>
          Please wait while we load your store data.
        </p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">

      {/* =========================
          SIDEBAR
      ========================= */}

      <aside className="admin-sidebar">

        {/* LOGO */}

        <div className="admin-logo">

          <div className="logo-icon">
            S
          </div>

          <div>
            <h2>Saptakoshi</h2>
            <span>Cloth Center</span>
          </div>

        </div>

        {/* NAVIGATION */}

        <nav className="admin-nav">

          {/* Dashboard */}

          <Link
            to="/admin"
            className={`nav-item ${
              location.pathname === "/admin"
                ? "active"
                : ""
            }`}
          >
            <span>📊</span>
            Dashboard
          </Link>

          {/* Orders */}

          <Link
            to="/admin/orders"
            className={`nav-item ${
              location.pathname === "/admin/orders"
                ? "active"
                : ""
            }`}
          >
            <span>📦</span>
            Orders
          </Link>

          {/* Products */}

          <Link
            to="/admin/products"
            className={`nav-item ${
              location.pathname === "/admin/products"
                ? "active"
                : ""
            }`}
          >
            <span>🛍️</span>
            Products
          </Link>

          {/* Customers */}

          <Link
            to="/admin/customers"
            className={`nav-item ${
              location.pathname === "/admin/customers"
                ? "active"
                : ""
            }`}
          >
            <span>👥</span>
            Customers
          </Link>

          {/* View Store */}

          <Link
            to="/shop"
            className="nav-item"
          >
            <span>🌐</span>
            View Store
          </Link>

        </nav>

        {/* SIDEBAR BOTTOM */}

        <div className="admin-sidebar-bottom">

          <p>Admin Panel</p>

          <span>
            © 2026 Saptakoshi
          </span>

        </div>

      </aside>

      {/* =========================
          MAIN CONTENT
      ========================= */}

      <main className="admin-main">

        {/* HEADER */}

        <header className="admin-header">

          <div>
            <h1>Dashboard</h1>

            <p>
              Overview of your store performance
              and orders.
            </p>
          </div>

          <div className="admin-profile">

            <div className="admin-avatar">
              A
            </div>

            <div>
              <strong>
                Administrator
              </strong>

              <span>
                Store Admin
              </span>
            </div>

          </div>

        </header>

        {/* =========================
            MAIN STATISTICS
        ========================= */}

        <section className="statistics-grid">

          {/* Total Products */}

          <div className="stat-card">

            <div className="stat-icon products-icon">
              🛍️
            </div>

            <div>
              <span>
                Total Products
              </span>

              <h2>
                {totalProducts}
              </h2>
            </div>

          </div>

          {/* Total Orders */}

          <div className="stat-card">

            <div className="stat-icon orders-icon">
              📦
            </div>

            <div>
              <span>
                Total Orders
              </span>

              <h2>
                {orders.length}
              </h2>
            </div>

          </div>

          {/* Pending Orders */}

          <div className="stat-card">

            <div className="stat-icon pending-icon">
              ⏳
            </div>

            <div>
              <span>
                Pending Orders
              </span>

              <h2>
                {pendingOrders}
              </h2>
            </div>

          </div>

          {/* Total Sales */}

          <div className="stat-card">

            <div className="stat-icon sales-icon">
              💰
            </div>

            <div>
              <span>
                Total Sales
              </span>

              <h2>
                Rs. {totalSales.toLocaleString()}
              </h2>
            </div>

          </div>

        </section>

        {/* =========================
            INVENTORY OVERVIEW
        ========================= */}

        <section className="dashboard-section">

          <div className="section-header">

            <div>
              <h2>
                Inventory Overview
              </h2>

              <p>
                Current product stock status
              </p>
            </div>

            <Link
              to="/admin/products"
              className="view-all"
            >
              Manage Products →
            </Link>

          </div>

          <div className="inventory-dashboard-grid">

            {/* Total Products */}

            <div className="inventory-dashboard-card">

              <div className="inventory-dashboard-icon">
                🛍️
              </div>

              <div>
                <span>
                  Total Products
                </span>

                <strong>
                  {totalProducts}
                </strong>
              </div>

            </div>

            {/* In Stock */}

            <div className="inventory-dashboard-card">

              <div className="inventory-dashboard-icon">
                🟢
              </div>

              <div>
                <span>
                  In Stock
                </span>

                <strong>
                  {inStockProducts}
                </strong>
              </div>

            </div>

            {/* Low Stock */}

            <div className="inventory-dashboard-card">

              <div className="inventory-dashboard-icon">
                🟡
              </div>

              <div>
                <span>
                  Low Stock
                </span>

                <strong>
                  {lowStockProducts}
                </strong>
              </div>

            </div>

            {/* Out of Stock */}

            <div className="inventory-dashboard-card">

              <div className="inventory-dashboard-icon">
                🔴
              </div>

              <div>
                <span>
                  Out of Stock
                </span>

                <strong>
                  {outOfStockProducts}
                </strong>
              </div>

            </div>

          </div>

        </section>

        {/* =========================
            INVENTORY ALERT
        ========================= */}

        {(lowStockProducts > 0 ||
          outOfStockProducts > 0) && (

          <section className="inventory-alert-section">

            <div className="inventory-alert-icon">
              ⚠️
            </div>

            <div className="inventory-alert-content">

              <h3>
                Inventory Attention Required
              </h3>

              <p>

                {lowStockProducts > 0 && (
                  <>
                    {lowStockProducts}{" "}
                    {lowStockProducts === 1
                      ? "product is"
                      : "products are"}{" "}
                    running low on stock.
                  </>
                )}

                {lowStockProducts > 0 &&
                  outOfStockProducts > 0 && (
                    <> </>
                  )}

                {outOfStockProducts > 0 && (
                  <>
                    {outOfStockProducts}{" "}
                    {outOfStockProducts === 1
                      ? "product is"
                      : "products are"}{" "}
                    out of stock.
                  </>
                )}

              </p>

            </div>

            <Link
              to="/admin/products"
              className="inventory-alert-button"
            >
              Manage Inventory
            </Link>

          </section>
        )}

        {/* =========================
            ORDER OVERVIEW
        ========================= */}

        <section className="dashboard-section">

          <div className="section-header">

            <div>
              <h2>
                Order Overview
              </h2>

              <p>
                Current order status summary
              </p>
            </div>

          </div>

          <div className="order-status-grid">

            {/* Pending */}

            <div className="status-card">

              <span className="status-dot pending"></span>

              <div>
                <span>
                  Pending
                </span>

                <strong>
                  {pendingOrders}
                </strong>
              </div>

            </div>

            {/* Confirmed */}

            <div className="status-card">

              <span className="status-dot confirmed"></span>

              <div>
                <span>
                  Confirmed
                </span>

                <strong>
                  {confirmedOrders}
                </strong>
              </div>

            </div>

            {/* Shipped */}

            <div className="status-card">

              <span className="status-dot shipped"></span>

              <div>
                <span>
                  Shipped
                </span>

                <strong>
                  {shippedOrders}
                </strong>
              </div>

            </div>

            {/* Delivered */}

            <div className="status-card">

              <span className="status-dot delivered"></span>

              <div>
                <span>
                  Delivered
                </span>

                <strong>
                  {deliveredOrders}
                </strong>
              </div>

            </div>

            {/* Cancelled */}

            <div className="status-card">

              <span className="status-dot cancelled"></span>

              <div>
                <span>
                  Cancelled
                </span>

                <strong>
                  {cancelledOrders}
                </strong>
              </div>

            </div>

          </div>

        </section>

        {/* =========================
            RECENT ORDERS
        ========================= */}

        <section className="dashboard-section">

          <div className="section-header">

            <div>
              <h2>
                Recent Orders
              </h2>

              <p>
                Latest customer orders
              </p>
            </div>

            <Link
              to="/admin/orders"
              className="view-all"
            >
              View All →
            </Link>

          </div>

          {recentOrders.length === 0 ? (

            <div className="empty-orders">

              <span>
                📦
              </span>

              <h3>
                No orders yet
              </h3>

              <p>
                Customer orders will appear here.
              </p>

            </div>

          ) : (

            <div className="orders-table-wrapper">

              <table className="orders-table">

                <thead>

                  <tr>
                    <th>Customer</th>
                    <th>Order ID</th>
                    <th>Date</th>
                    <th>Total</th>
                    <th>Status</th>
                  </tr>

                </thead>

                <tbody>

                  {recentOrders.map((order) => (

                    <tr key={order._id}>

                      {/* Customer */}

                      <td>

                        <div className="customer-cell">

                          <div className="customer-avatar">

                            {order.customerName
                              ?.charAt(0)
                              .toUpperCase()}

                          </div>

                          <div>

                            <strong>
                              {order.customerName}
                            </strong>

                            <span>
                              {order.email}
                            </span>

                          </div>

                        </div>

                      </td>

                      {/* Order ID */}

                      <td>

                        <span className="order-id">
                          #{order._id?.slice(-6)}
                        </span>

                      </td>

                      {/* Date */}

                      <td>

                        {order.createdAt
                          ? new Date(
                              order.createdAt
                            ).toLocaleDateString()
                          : "N/A"}

                      </td>

                      {/* Total */}

                      <td>

                        <strong>
                          Rs.{" "}
                          {Number(
                            order.total || 0
                          ).toLocaleString()}
                        </strong>

                      </td>

                      {/* Status */}

                      <td>

                        <span
                          className={`order-status ${
                            order.status
                              ?.toLowerCase()
                              .replace(/\s+/g, "-")
                          }`}
                        >
                          {order.status}
                        </span>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </section>

      </main>

    </div>
  );
}

export default AdminDashboard;