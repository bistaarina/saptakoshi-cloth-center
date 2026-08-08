import { useEffect, useState } from "react";
import {
  getMyOrders,
  cancelOrder,
} from "../api/orderApi";

function MyOrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        console.log("User not logged in");
        return;
      }

      const data = await getMyOrders(user._id);

      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelOrder = async (orderId) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this order?"
    );

    if (!confirmCancel) {
      return;
    }

    try {
      const res = await cancelOrder(orderId);

      alert(res.message);

      fetchOrders();
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Failed to cancel order."
      );
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>My Orders</h1>

      {orders.length === 0 ? (
        <h3>No orders found.</h3>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            style={{
              border: "1px solid #ddd",
              padding: "20px",
              marginBottom: "20px",
              borderRadius: "10px",
            }}
          >
            <h3>Order ID: {order._id}</h3>

            <p>
              <strong>Total:</strong> Rs. {order.total}
            </p>

            <p>
              <strong>Status:</strong> {order.status}
            </p>

            <p>
              <strong>Date:</strong>{" "}
              {new Date(order.createdAt).toLocaleDateString()}
            </p>

            <h4>Products</h4>

            <ul>
              {order.products.map((item, index) => (
                <li key={index}>
                  {item.name} × {item.quantity}
                </li>
              ))}
            </ul>

            {(
              order.status === "Pending" ||
              order.status === "Confirmed"
            ) && (
              <button
                onClick={() => handleCancelOrder(order._id)}
                style={{
                  backgroundColor: "#e74c3c",
                  color: "white",
                  border: "none",
                  padding: "10px 18px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  marginTop: "10px",
                }}
              >
                Cancel Order
              </button>
            )}

            {order.status === "Cancelled" && (
              <p
                style={{
                  color: "#e74c3c",
                  fontWeight: "bold",
                }}
              >
                This order has been cancelled.
              </p>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default MyOrdersPage;