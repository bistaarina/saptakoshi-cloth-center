import { useState, useEffect } from "react";
import "../styles/Checkout.css";
import { placeOrder } from "../api/orderApi";

function Checkout() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const items = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );

    setCart(items);
  }, []);

  const total = cart.reduce(
    (sum, item) =>
      sum + Number(item.price) * item.quantity,
    0
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const form = e.target;

      const user = JSON.parse(
        localStorage.getItem("user") || "null"
      );

      if (!user) {
        alert("Please login before placing an order.");
        return;
      }

      if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
      }

      const order = {
        user: user._id,
        customerName: form[0].value,
        email: form[1].value,
        phone: form[2].value,
        address: form[3].value,
        products: cart,
        total,
      };

      const res = await placeOrder(order);

      alert(res.message);

      // Clear cart
      localStorage.removeItem("cart");

      // Update navbar cart count
      window.dispatchEvent(
        new Event("cartUpdated")
      );

      // Tell other components that stock changed
      window.dispatchEvent(
        new Event("stockUpdated")
      );

      setCart([]);

      form.reset();

    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
        "Order failed"
      );
    }
  };

  return (
    <section className="checkout">

      <h1>Checkout</h1>

      <form
        onSubmit={handleSubmit}
        className="checkout-form"
      >

        <input
          type="text"
          placeholder="Full Name"
          required
        />

        <input
          type="email"
          placeholder="Email"
          required
        />

        <input
          type="text"
          placeholder="Phone Number"
          required
        />

        <textarea
          placeholder="Delivery Address"
          required
        ></textarea>

        <h2>
          Total: Rs. {total}
        </h2>

        <button type="submit">
          Place Order
        </button>

      </form>

    </section>
  );
}

export default Checkout;