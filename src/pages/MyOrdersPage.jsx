import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getMyOrders,
  cancelOrder,
} from "../api/orderApi";
import "../styles/MyOrders.css";

function MyOrdersPage() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState(null);

  // =========================
  // FETCH ORDERS
  // =========================

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const user = JSON.parse(
        localStorage.getItem("user") || "null"
      );

      if (!user) {
        alert("Please login to view your orders.");
        navigate("/login");
        return;
      }

      const data = await getMyOrders(user._id);

      setOrders(data || []);
    } catch (error) {
      console.error(
        "Error fetching orders:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to load your orders."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // CANCEL ORDER
  // =========================

  const handleCancelOrder = async (orderId) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this order?"
    );

    if (!confirmCancel) {
      return;
    }

    try {
      setCancellingId(orderId);

      const response =
        await cancelOrder(orderId);

      alert(
        response?.message ||
          "Order cancelled successfully."
      );

      // Refresh orders
      await fetchOrders();

      // Notify other components if needed
      window.dispatchEvent(
        new Event("orderUpdated")
      );

      window.dispatchEvent(
        new Event("stockUpdated")
      );

    } catch (error) {
      console.error(
        "Cancel order error:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to cancel order."
      );
    } finally {
      setCancellingId(null);
    }
  };

  // =========================
  // STATUS CLASS
  // =========================

  const getStatusClass = (status) => {
    return (
      status
        ?.toLowerCase()
        .replace(/\s+/g, "-") || "pending"
    );
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <section className="my-orders-page">

        <div className="orders-loading">

          <div className="orders-spinner"></div>

          <h3>
            Loading your orders...
          </h3>

          <p>
            Please wait while we fetch
            your orders.
          </p>

        </div>

      </section>
    );
  }

  // =========================
  // NO ORDERS
  // =========================

  if (orders.length === 0) {
    return (
      <section className="my-orders-page">

        <div className="my-orders-header">

          <h1>
            My Orders
          </h1>

          <p>
            Track and manage your orders.
          </p>

        </div>

        <div className="no-orders-container">

          <div className="no-orders-icon">
            📦
          </div>

          <h2>
            No Orders Yet
          </h2>

          <p>
            You haven't placed any orders yet.
          </p>

          <button
            type="button"
            onClick={() =>
              navigate("/shop")
            }
          >
            Start Shopping
          </button>

        </div>

      </section>
    );
  }

  // =========================
  // ORDERS PAGE
  // =========================

  return (
    <section className="my-orders-page">

      {/* HEADER */}

      <div className="my-orders-header">

        <div>

          <h1>
            My Orders
          </h1>

          <p>
            Track and manage your orders.
          </p>

        </div>

        <div className="orders-count">

          <strong>
            {orders.length}
          </strong>

          <span>
            {orders.length === 1
              ? "Order"
              : "Orders"}
          </span>

        </div>

      </div>

      {/* ORDERS */}

      <div className="my-orders-list">

        {orders.map((order) => (

          <div
            className="my-order-card"
            key={order._id}
          >

            {/* =========================
                ORDER HEADER
            ========================= */}

            <div className="my-order-header">

              <div>

                <span className="order-label">
                  ORDER ID
                </span>

                <h3>
                  #{order._id.slice(-8)}
                </h3>

              </div>

             {order.status !== "Cancelled" && (
  <div className="order-progress">

    <div
      className={`progress-step ${
        ["Pending", "Confirmed", "Shipped", "Delivered"]
          .includes(order.status)
          ? "completed"
          : ""
      }`}
    >
      <div className="progress-circle">
        1
      </div>
      <span>Pending</span>
    </div>

    <div
      className={`progress-line ${
        ["Confirmed", "Shipped", "Delivered"]
          .includes(order.status)
          ? "completed"
          : ""
      }`}
    />

    <div
      className={`progress-step ${
        ["Confirmed", "Shipped", "Delivered"]
          .includes(order.status)
          ? "completed"
          : ""
      }`}
    >
      <div className="progress-circle">
        2
      </div>
      <span>Confirmed</span>
    </div>

    <div
      className={`progress-line ${
        ["Shipped", "Delivered"]
          .includes(order.status)
          ? "completed"
          : ""
      }`}
    />

    <div
      className={`progress-step ${
        ["Shipped", "Delivered"]
          .includes(order.status)
          ? "completed"
          : ""
      }`}
    >
      <div className="progress-circle">
        3
      </div>
      <span>Shipped</span>
    </div>

    <div
      className={`progress-line ${
        order.status === "Delivered"
          ? "completed"
          : ""
      }`}
    />

    <div
      className={`progress-step ${
        order.status === "Delivered"
          ? "completed"
          : ""
      }`}
    >
      <div className="progress-circle">
        4
      </div>
      <span>Delivered</span>
    </div>

  </div>
)}
            </div>

            {/* =========================
                ORDER INFORMATION
            ========================= */}

            <div className="my-order-info">

              <div>

                <span>
                  Order Date
                </span>

                <strong>
                  {new Date(
                    order.createdAt
                  ).toLocaleDateString()}
                </strong>

              </div>

              <div>

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

            </div>

            {/* =========================
                PRODUCTS
            ========================= */}

            <div className="my-order-products">

              <h4>
                Ordered Products
              </h4>

              {order.products?.map(
                (item, index) => (

                  <div
                    className="my-order-product"
                    key={index}
                  >

                    <img
                      src={item.image}
                      alt={item.name}
                    />

                    <div className="my-order-product-info">

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

                    <div className="my-order-quantity">
                      × {item.quantity}
                    </div>

                    <strong className="my-order-subtotal">
                      Rs.{" "}
                      {(
                        Number(
                          item.price || 0
                        ) *
                        Number(
                          item.quantity || 0
                        )
                      ).toLocaleString()}
                    </strong>

                  </div>
                )
              )}

            </div>

            {/* =========================
                DELIVERY INFORMATION
            ========================= */}

            <div className="my-order-delivery">

              <h4>
                Delivery Information
              </h4>

              <div>

                <strong>
                  {order.customerName}
                </strong>

                <span>
                  {order.phone}
                </span>

                <span>
                  {order.address}
                </span>

              </div>

            </div>

            {/* =========================
                FOOTER
            ========================= */}

            <div className="my-order-footer">

              <div className="my-order-total">

                <span>
                  Total
                </span>

                <strong>
                  Rs.{" "}
                  {Number(
                    order.total || 0
                  ).toLocaleString()}
                </strong>

              </div>

              {/* CANCEL */}

              {(order.status === "Pending" ||
                order.status === "Confirmed") && (

                <button
                  type="button"
                  className="cancel-order-btn"
                  disabled={
                    cancellingId === order._id
                  }
                  onClick={() =>
                    handleCancelOrder(
                      order._id
                    )
                  }
                >
                  {cancellingId === order._id
                    ? "Cancelling..."
                    : "Cancel Order"}
                </button>

              )}

              {/* CANCELLED */}

              {order.status ===
                "Cancelled" && (

                <span className="cancelled-message">
                  Order Cancelled
                </span>

              )}

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}

export default MyOrdersPage;