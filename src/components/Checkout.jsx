import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Checkout.css";
import { placeOrder } from "../api/orderApi";

function Checkout() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    try {
      const savedCart = JSON.parse(
        localStorage.getItem("cart") || "[]"
      );

      setCart(Array.isArray(savedCart) ? savedCart : []);

      const savedUser = JSON.parse(
        localStorage.getItem("user") || "null"
      );

      if (savedUser) {
        setFormData({
          customerName:
            savedUser.fullName ||
            savedUser.name ||
            savedUser.username ||
            "",
          email: savedUser.email || "",
          phone: savedUser.phone || "",
          address: savedUser.address || "",
        });
      }
    } catch (error) {
      console.error("Failed to load checkout data:", error);
      setCart([]);
    }
  }, []);

  const total = cart.reduce((sum, item) => {
    const price = Number(item.price || 0);
    const quantity = Number(item.quantity || 1);

    return sum + price * quantity;
  }, 0);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const savedUser = JSON.parse(
      localStorage.getItem("user") || "null"
    );

    const token = localStorage.getItem("token");

    if (!savedUser || !token) {
      alert("Please login before placing an order.");
      navigate("/login");
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty.");
      navigate("/shop");
      return;
    }

    try {
      setLoading(true);

      const order = {
        customerName: formData.customerName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        products: cart,
        total,
      };

      console.log("Sending order:", order);

      const response = await placeOrder(order);

      console.log("Order response:", response);

      alert(
        response?.message ||
          "Order placed successfully!"
      );

      localStorage.removeItem("cart");

      setCart([]);

      window.dispatchEvent(
        new Event("cartUpdated")
      );

      window.dispatchEvent(
        new Event("stockUpdated")
      );

      navigate("/my-orders");
    } catch (error) {
      console.error("Order submission error:", error);

      console.error(
        "Backend response:",
        error.response?.data
      );

      alert(
        error.response?.data?.message ||
          "Order failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <section className="checkout-page">
        <div className="checkout-empty">
          <div className="checkout-empty-icon">
            🛒
          </div>

          <h2>Your cart is empty</h2>

          <p>
            Add some products before
            proceeding to checkout.
          </p>

          <button
            onClick={() => navigate("/shop")}
          >
            Continue Shopping
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="checkout-page">

      <div className="checkout-header">
        <h1>Checkout</h1>

        <p>
          Enter your delivery information
          to place your order.
        </p>
      </div>

      <div className="checkout-container">

        <form
          onSubmit={handleSubmit}
          className="checkout-form"
        >
          <h2>Delivery Information</h2>

          <div className="checkout-field">
            <label htmlFor="customerName">
              Full Name
            </label>

            <input
              id="customerName"
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="checkout-field">
            <label htmlFor="email">
              Email
            </label>

            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="checkout-field">
            <label htmlFor="phone">
              Phone Number
            </label>

            <input
              id="phone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              required
            />
          </div>

          <div className="checkout-field">
            <label htmlFor="address">
              Delivery Address
            </label>

            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your complete delivery address"
              rows="5"
              required
            />
          </div>

          <button
            type="submit"
            className="place-order-btn"
            disabled={loading}
          >
            {loading
              ? "Placing Order..."
              : "Place Order"}
          </button>
        </form>

        <div className="checkout-summary">
          <h2>Order Summary</h2>

          <div className="checkout-products">

            {cart.map((item, index) => {
              const price = Number(item.price || 0);
              const quantity = Number(
                item.quantity || 1
              );

              const itemTotal =
                price * quantity;

              return (
                <div
                  className="checkout-product"
                  key={
                    item._id ||
                    item.id ||
                    index
                  }
                >
                  <img
                    src={item.image}
                    alt={
                      item.name || "Product"
                    }
                  />

                  <div className="checkout-product-info">
                    <strong>
                      {item.name}
                    </strong>

                    <span>
                      Qty: {quantity}
                    </span>

                    <span>
                      Rs.{" "}
                      {price.toLocaleString()}
                    </span>
                  </div>

                  <strong>
                    Rs.{" "}
                    {itemTotal.toLocaleString()}
                  </strong>
                </div>
              );
            })}

          </div>

          <div className="checkout-total">
            <span>Total Amount</span>

            <strong>
              Rs. {total.toLocaleString()}
            </strong>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Checkout;