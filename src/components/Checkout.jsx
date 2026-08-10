import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Checkout.css";
import { placeOrder } from "../api/orderApi";

function Checkout() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);

  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    phone: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const items = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );

    setCart(items);

    // Load logged-in user's information
    const user = JSON.parse(
      localStorage.getItem("user") || "null"
    );

    if (user) {
      setFormData({
        customerName:
          user.name ||
          user.username ||
          "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
      });
    }
  }, []);

  // Calculate total
  const total = cart.reduce(
    (sum, item) =>
      sum +
      Number(item.price || 0) *
        Number(item.quantity || 0),
    0
  );

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // Submit order
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const user = JSON.parse(
        localStorage.getItem("user") || "null"
      );

      // Check login
      if (!user) {
        alert(
          "Please login before placing an order."
        );

        navigate("/login");
        return;
      }

      // Check cart
      if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
      }

      // Create order object
      const order = {
        user: user._id,
        customerName: formData.customerName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        products: cart,
        total: total,
      };

      console.log("Sending order:", order);

      // Send order to backend
      const res = await placeOrder(order);

      alert(
        res.message ||
          "Order placed successfully!"
      );

      // Clear cart
      localStorage.removeItem("cart");

      // Update navbar cart count
      window.dispatchEvent(
        new Event("cartUpdated")
      );

      // Refresh product stock
      window.dispatchEvent(
        new Event("stockUpdated")
      );

      // Clear local cart
      setCart([]);

      // Go to My Orders
      navigate("/my-orders");

    } catch (error) {
      console.error(
        "Order submission error:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Order failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Empty cart
  if (cart.length === 0) {
    return (
      <section className="checkout-page">

        <div className="checkout-empty">

          <div className="checkout-empty-icon">
            🛒
          </div>

          <h2>
            Your cart is empty
          </h2>

          <p>
            Add some products before
            proceeding to checkout.
          </p>

          <button
            onClick={() =>
              navigate("/shop")
            }
          >
            Continue Shopping
          </button>

        </div>

      </section>
    );
  }

  return (
    <section className="checkout-page">

      {/* Header */}
      <div className="checkout-header">

        <h1>Checkout</h1>

        <p>
          Enter your delivery information
          to place your order.
        </p>

      </div>

      <div className="checkout-container">

        {/* Customer Information */}
        <form
          onSubmit={handleSubmit}
          className="checkout-form"
        >

          <h2>
            Delivery Information
          </h2>

          {/* Name */}
          <div className="checkout-field">

            <label>
              Full Name
            </label>

            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />

          </div>

          {/* Email */}
          <div className="checkout-field">

            <label>
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />

          </div>

          {/* Phone */}
          <div className="checkout-field">

            <label>
              Phone Number
            </label>

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              required
            />

          </div>

          {/* Address */}
          <div className="checkout-field">

            <label>
              Delivery Address
            </label>

            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your complete delivery address"
              rows="5"
              required
            />

          </div>

          {/* Submit */}
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

        {/* Order Summary */}
        <div className="checkout-summary">

          <h2>
            Order Summary
          </h2>

          <div className="checkout-products">

            {cart.map((item, index) => (

              <div
                className="checkout-product"
                key={item.id || index}
              >

                <img
                  src={item.image}
                  alt={item.name}
                />

                <div className="checkout-product-info">

                  <strong>
                    {item.name}
                  </strong>

                  <span>
                    Qty: {item.quantity}
                  </span>

                </div>

                <strong>
                  Rs.{" "}
                  {(
                    Number(item.price || 0) *
                    Number(item.quantity || 0)
                  ).toLocaleString()}
                </strong>

              </div>

            ))}

          </div>

          <div className="checkout-total">

            <span>
              Total Amount
            </span>

            <strong>
              Rs.{" "}
              {total.toLocaleString()}
            </strong>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Checkout;