import { useEffect, useState } from "react";
import {
  getOrders,
  updateOrderStatus,
  deleteOrder,
} from "../api/orderApi";
import "../styles/AdminOrders.css";

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await getOrders();
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatus = async (id, status) => {
    try {
      await updateOrderStatus(id, status);
      await fetchOrders();
      alert("Order status updated!");
    } catch (error) {
      console.log(error);
      alert("Failed to update order status");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this order?"
    );

    if (!confirmDelete) return;

    try {
      await deleteOrder(id);
      await fetchOrders();
      alert("Order deleted successfully!");
    } catch (error) {
      console.log(error);
      alert("Failed to delete order");
    }
  };

  return (
    <div className="admin-orders">
      <h1>Customer Orders</h1>

      {orders.length === 0 ? (
        <h2>No Orders Found</h2>
      ) : (
        orders.map((order) => (
          <div className="order-card" key={order._id}>

            <h2>{order.customerName}</h2>

            <p>
              <strong>Order ID:</strong> {order._id}
            </p>

            <p>
              <strong>Date:</strong>{" "}
              {new Date(order.createdAt).toLocaleDateString()}
            </p>

            <p>
              <strong>Email:</strong> {order.email}
            </p>

            <p>
              <strong>Phone:</strong> {order.phone}
            </p>

            <p>
              <strong>Address:</strong> {order.address}
            </p>

            <p>
              <strong>Total:</strong> Rs. {order.total}
            </p>

            <p>
              <strong>Status:</strong> {order.status}
            </p>

            <h3>Ordered Products</h3>

            {order.products.map((item, index) => (
              <div className="order-product" key={index}>

                <img
                  src={item.image}
                  alt={item.name}
                />

                <div>
                  <h4>{item.name}</h4>

                  <p>
                    Price: Rs. {item.price}
                  </p>

                  <p>
                    Quantity: {item.quantity}
                  </p>
                </div>

              </div>
            ))}

            <select
              value={order.status}
              onChange={(e) =>
                handleStatus(order._id, e.target.value)
              }
            >
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>

            <button
              className="delete-order"
              onClick={() => handleDelete(order._id)}
            >
              Delete Order
            </button>

          </div>
        ))
      )}
    </div>
  );
}

export default AdminOrders;