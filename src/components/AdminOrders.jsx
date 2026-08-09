import { useEffect, useState } from "react";
import {
  getOrders,
  updateOrderStatus,
  deleteOrder,
} from "../api/orderApi";
import "../styles/AdminOrders.css";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchText, setSearchText] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const data = await getOrders();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  // Search
  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchText.trim().toLowerCase());
  };

  // Filter orders
  const filteredOrders = orders.filter((order) => {
    const customerName =
      order.customerName?.toLowerCase() || "";

    const email =
      order.email?.toLowerCase() || "";

    const orderId =
      order._id?.toLowerCase() || "";

    const matchesSearch =
      search === "" ||
      customerName.includes(search) ||
      email.includes(search) ||
      orderId.includes(search);

    const matchesStatus =
      statusFilter === "All" ||
      order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Update status
  const handleStatus = async (id, status) => {
    try {
      await updateOrderStatus(id, status);

      alert("Order status updated successfully!");

      fetchOrders();
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to update order status."
      );
    }
  };

  // Delete order
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this order?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await deleteOrder(id);

      alert("Order deleted successfully!");

      fetchOrders();
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to delete order."
      );
    }
  };

  // Clear filters
  const clearFilters = () => {
    setSearchText("");
    setSearch("");
    setStatusFilter("All");
  };

  if (loading) {
    return (
      <div className="orders-loading">
        <div className="loading-spinner"></div>
        <p>Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="admin-orders-page">

      {/* Header */}
      <div className="orders-page-header">

        <div>
          <h1>Customer Orders</h1>

          <p>
            Manage and track all customer orders.
          </p>
        </div>

        <div className="order-count">
          <strong>{filteredOrders.length}</strong>
          <span>
            {search || statusFilter !== "All"
              ? "Matching Orders"
              : "Total Orders"}
          </span>
        </div>

      </div>

      {/* Search and Filters */}
      <div className="orders-filters">

        <form
          onSubmit={handleSearch}
          className="orders-search-form"
        >
          <input
            type="text"
            placeholder="🔎 Search customer, email or order ID..."
            value={searchText}
            onChange={(e) =>
              setSearchText(e.target.value)
            }
          />

          <button type="submit">
            Search
          </button>
        </form>

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
        >
          <option value="All">
            All Status
          </option>

          <option value="Pending">
            Pending
          </option>

          <option value="Confirmed">
            Confirmed
          </option>

          <option value="Shipped">
            Shipped
          </option>

          <option value="Delivered">
            Delivered
          </option>

          <option value="Cancelled">
            Cancelled
          </option>
        </select>

        <button
          type="button"
          className="clear-orders-filter"
          onClick={clearFilters}
        >
          Clear
        </button>

      </div>

      {/* Results information */}
      <div className="orders-results-info">
        Showing{" "}
        <strong>{filteredOrders.length}</strong>{" "}
        of{" "}
        <strong>{orders.length}</strong>{" "}
        orders
      </div>

      {/* No orders */}
      {filteredOrders.length === 0 ? (

        <div className="no-orders">

          <div className="no-orders-icon">
            📦
          </div>

          <h2>
            {orders.length === 0
              ? "No Orders Found"
              : "No Matching Orders"}
          </h2>

          <p>
            {orders.length === 0
              ? "Customer orders will appear here when customers place orders."
              : "Try changing your search or filter."}
          </p>

          {orders.length > 0 && (
            <button
              className="clear-orders-empty"
              onClick={clearFilters}
            >
              Clear Filters
            </button>
          )}

        </div>

      ) : (

        <div className="orders-list">

          {filteredOrders.map((order) => (

            <div
              className="admin-order-card"
              key={order._id}
            >

              {/* Order Header */}
              <div className="order-card-header">

                <div>

                  <span className="order-label">
                    ORDER ID
                  </span>

                  <h3>
                    #{order._id.slice(-8)}
                  </h3>

                </div>

                <span
                  className={`order-status-badge ${
                    order.status
                      ?.toLowerCase()
                      .replace(/\s+/g, "-")
                  }`}
                >
                  {order.status}
                </span>

              </div>

              {/* Customer Information */}
              <div className="customer-section">

                <h4>
                  Customer Information
                </h4>

                <div className="customer-details">

                  <div>
                    <span>Name</span>

                    <strong>
                      {order.customerName || "N/A"}
                    </strong>
                  </div>

                  <div>
                    <span>Email</span>

                    <strong>
                      {order.email || "N/A"}
                    </strong>
                  </div>

                  <div>
                    <span>Phone</span>

                    <strong>
                      {order.phone || "N/A"}
                    </strong>
                  </div>

                  <div>
                    <span>Address</span>

                    <strong>
                      {order.address || "N/A"}
                    </strong>
                  </div>

                </div>

              </div>

              {/* Products */}
              <div className="ordered-products">

                <h4>
                  Ordered Products
                </h4>

                {order.products?.map(
                  (item, index) => (

                    <div
                      className="admin-product-row"
                      key={index}
                    >

                      <img
                        src={item.image}
                        alt={item.name}
                      />

                      <div className="admin-product-info">

                        <strong>
                          {item.name}
                        </strong>

                        <span>
                          Rs.{" "}
                          {Number(
                            item.price || 0
                          ).toLocaleString()}
                        </span>

                      </div>

                      <div className="product-quantity">
                        × {item.quantity}
                      </div>

                      <div className="product-subtotal">
                        Rs.{" "}
                        {(
                          Number(item.price || 0) *
                          Number(item.quantity || 0)
                        ).toLocaleString()}
                      </div>

                    </div>

                  )
                )}

              </div>

              {/* Footer */}
              <div className="order-card-footer">

                <div className="order-total">

                  <span>
                    Total Amount
                  </span>

                  <strong>
                    Rs.{" "}
                    {Number(
                      order.total || 0
                    ).toLocaleString()}
                  </strong>

                </div>

                <div className="order-actions">

                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatus(
                        order._id,
                        e.target.value
                      )
                    }
                  >

                    <option value="Pending">
                      Pending
                    </option>

                    <option value="Confirmed">
                      Confirmed
                    </option>

                    <option value="Shipped">
                      Shipped
                    </option>

                    <option value="Delivered">
                      Delivered
                    </option>

                    <option value="Cancelled">
                      Cancelled
                    </option>

                  </select>

                  <button
                    className="delete-order-btn"
                    onClick={() =>
                      handleDelete(order._id)
                    }
                  >
                    Delete
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default AdminOrders;