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
          <strong>{orders.length}</strong>
          <span>Total Orders</span>
        </div>

      </div>

      {/* Orders */}

      {orders.length === 0 ? (

        <div className="no-orders">

          <div className="no-orders-icon">
            📦
          </div>

          <h2>No Orders Found</h2>

          <p>
            Customer orders will appear here when
            customers place orders.
          </p>

        </div>

      ) : (

        <div className="orders-list">

          {orders.map((order) => (

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
                  className={`order-status-badge ${order.status.toLowerCase()}`}
                >
                  {order.status}
                </span>

              </div>

              {/* Customer Information */}

              <div className="customer-section">

                <h4>Customer Information</h4>

                <div className="customer-details">

                  <div>
                    <span>Name</span>
                    <strong>
                      {order.customerName}
                    </strong>
                  </div>

                  <div>
                    <span>Email</span>
                    <strong>
                      {order.email}
                    </strong>
                  </div>

                  <div>
                    <span>Phone</span>
                    <strong>
                      {order.phone}
                    </strong>
                  </div>

                  <div>
                    <span>Address</span>
                    <strong>
                      {order.address}
                    </strong>
                  </div>

                </div>

              </div>

              {/* Products */}

              <div className="ordered-products">

                <h4>Ordered Products</h4>

                {order.products.map(
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
                          Rs. {item.price}
                        </span>

                      </div>

                      <div className="product-quantity">
                        × {item.quantity}
                      </div>

                      <div className="product-subtotal">

                        Rs.{" "}
                        {(
                          Number(item.price) *
                          item.quantity
                        ).toLocaleString()}

                      </div>

                    </div>

                  )
                )}

              </div>

              {/* Footer */}

              <div className="order-card-footer">

                <div className="order-total">

                  <span>Total Amount</span>

                  <strong>
                    Rs.{" "}
                    {Number(
                      order.total
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