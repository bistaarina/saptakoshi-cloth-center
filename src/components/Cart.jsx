import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/Cart.css";

function Cart() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    const items = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(items);
  };

  const updateCart = (updatedCart) => {
    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    window.dispatchEvent(
      new Event("cartUpdated")
    );
  };

  // Increase quantity
  const increaseQuantity = (index) => {
    const updated = [...cart];

    const item = updated[index];

    // Check stock
    if (item.quantity >= item.stock) {
      alert(
        `Only ${item.stock} item(s) available in stock.`
      );

      return;
    }

    item.quantity += 1;

    updateCart(updated);
  };

  // Decrease quantity
  const decreaseQuantity = (index) => {
    const updated = [...cart];

    if (updated[index].quantity > 1) {
      updated[index].quantity -= 1;
    } else {
      updated.splice(index, 1);
    }

    updateCart(updated);
  };

  // Remove product
  const removeItem = (index) => {
    const updated = [...cart];

    updated.splice(index, 1);

    updateCart(updated);
  };

  // Calculate total
  const total = cart.reduce(
    (sum, item) =>
      sum +
      Number(item.price) * item.quantity,
    0
  );

  return (
    <section className="cart-page">

      <h1>Shopping Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item, index) => (
            <div
              key={index}
              className="cart-item"
            >

              <img
                src={item.image}
                alt={item.name}
              />

              <div className="cart-info">

                <h3>{item.name}</h3>

                <p>
                  Price:{" "}
                  <strong>
                    Rs. {item.price}
                  </strong>
                </p>

                <p>
                  Available Stock:{" "}
                  <strong>
                    {item.stock}
                  </strong>
                </p>

                <div className="quantity-box">

                  <button
                    className="qty-btn"
                    onClick={() =>
                      decreaseQuantity(index)
                    }
                  >
                    −
                  </button>

                  <span>
                    {item.quantity}
                  </span>

                  <button
                    className="qty-btn"
                    onClick={() =>
                      increaseQuantity(index)
                    }
                    disabled={
                      item.quantity >= item.stock
                    }
                  >
                    +
                  </button>

                </div>

                <h4>
                  Subtotal: Rs.{" "}
                  {Number(item.price) *
                    item.quantity}
                </h4>

              </div>

              <button
                className="remove-btn"
                onClick={() =>
                  removeItem(index)
                }
              >
                Remove
              </button>

            </div>
          ))}

          <div className="cart-total">

            <h2>
              Total: Rs. {total}
            </h2>

            <button
              className="checkout-btn"
              onClick={() =>
                navigate("/checkout")
              }
            >
              Proceed to Checkout
            </button>

          </div>
        </>
      )}

    </section>
  );
}

export default Cart;