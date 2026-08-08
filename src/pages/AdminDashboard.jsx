import { useEffect, useState } from "react";
import { getOrders } from "../api/orderApi";
import API from "../api/api";
import "../styles/AdminDashboard.css";

function AdminDashboard() {
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

  const totalSales = orders
    .filter((order) => order.status !== "Cancelled")
    .reduce(
      (sum, order) => sum + Number(order.total || 0),
      0
    );

  const recentOrders = orders.slice(0, 5);

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

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

          <a href="/admin" className="nav-item active">
            <span>📊</span>
            Dashboard
          </a>

          <a href="/admin/orders" className="nav-item">
            <span>📦</span>
            Orders
          </a>

          <a href="/admin/products" className="nav-item">
            <span>🛍️</span>
            Products
          </a>

          <a href="/shop" className="nav-item">
            <span>🌐</span>
            View Store
          </a>

        </nav>

        <div className="admin-sidebar-bottom">
          <p>Admin Panel</p>
          <span>© 2026 Saptakoshi</span>
        </div>

      </aside>

      {/* Main Content */}
      <main className="admin-main">

        {/* Header */}
        <header className="admin-header">

          <div>
            <h1>Dashboard</h1>
            <p>
              Overview of your store performance and orders.
            </p>
          </div>

          <div className="admin-profile">
            <div className="admin-avatar">
              A
            </div>

            <div>
              <strong>Administrator</strong>
              <span>Store Admin</span>
            </div>
          </div>

        </header>

        {/* Statistics */}
        <section className="statistics-grid">

          <div className="stat-card">
            <div className="stat-icon products-icon">
              🛍️
            </div>

            <div>
              <span>Total Products</span>
              <h2>{products.length}</h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon orders-icon">
              📦
            </div>

            <div>
              <span>Total Orders</span>
              <h2>{orders.length}</h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon pending-icon">
              ⏳
            </div>

            <div>
              <span>Pending Orders</span>
              <h2>{pendingOrders}</h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon sales-icon">
              💰
            </div>

            <div>
              <span>Total Sales</span>
              <h2>
                Rs. {totalSales.toLocaleString()}
              </h2>
            </div>
          </div>

        </section>

        {/* Order Overview */}
        <section className="dashboard-section">

          <div className="section-header">
            <div>
              <h2>Order Overview</h2>
              <p>Current order status summary</p>
            </div>
          </div>

          <div className="order-status-grid">

            <div className="status-card">
              <span className="status-dot pending"></span>
              <div>
                <span>Pending</span>
                <strong>{pendingOrders}</strong>
              </div>
            </div>

            <div className="status-card">
              <span className="status-dot confirmed"></span>
              <div>
                <span>Confirmed</span>
                <strong>{confirmedOrders}</strong>
              </div>
            </div>

            <div className="status-card">
              <span className="status-dot shipped"></span>
              <div>
                <span>Shipped</span>
                <strong>{shippedOrders}</strong>
              </div>
            </div>

            <div className="status-card">
              <span className="status-dot delivered"></span>
              <div>
                <span>Delivered</span>
                <strong>{deliveredOrders}</strong>
              </div>
            </div>

            <div className="status-card">
              <span className="status-dot cancelled"></span>
              <div>
                <span>Cancelled</span>
                <strong>{cancelledOrders}</strong>
              </div>
            </div>

          </div>

        </section>

        {/* Recent Orders */}
        <section className="dashboard-section">

          <div className="section-header">

            <div>
              <h2>Recent Orders</h2>
              <p>Latest customer orders</p>
            </div>

            <a href="/admin/orders" className="view-all">
              View All →
            </a>

          </div>

          {recentOrders.length === 0 ? (
            <div className="empty-orders">
              <span>📦</span>
              <h3>No orders yet</h3>
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

                      <td>
                        <span className="order-id">
                          #{order._id.slice(-6)}
                        </span>
                      </td>

                      <td>
                        {new Date(
                          order.createdAt
                        ).toLocaleDateString()}
                      </td>

                      <td>
                        <strong>
                          Rs.{" "}
                          {Number(
                            order.total
                          ).toLocaleString()}
                        </strong>
                      </td>

                      <td>
                        <span
                          className={`order-status ${order.status.toLowerCase()}`}
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