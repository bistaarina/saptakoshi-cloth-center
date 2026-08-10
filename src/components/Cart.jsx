import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/Cart.css";

function Cart() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);

  useEffect(() => {
    loadCart();

    const handleCartUpdate = () => {
      loadCart();
    };

    window.addEventListener(
      "cartUpdated",
      handleCartUpdate
    );

    return () => {
      window.removeEventListener(
        "cartUpdated",
        handleCartUpdate
      );
    };
  }, []);

  // Load cart from localStorage
  const loadCart = () => {
    try {
      const items = JSON.parse(
        localStorage.getItem("cart") || "[]"
      );

      setCart(items);
    } catch (error) {
      console.error("Failed to load cart:", error);
      setCart([]);
    }
  };

  // Update cart
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

    if (!item) {
      return;
    }

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

    const item = updated[index];

    if (!item) {
      return;
    }

    if (item.quantity > 1) {
      item.quantity -= 1;
    } else {
      updated.splice(index, 1);
    }

    updateCart(updated);
  };

  // Remove product
  const removeItem = (index) => {
    const confirmRemove = window.confirm(
      "Are you sure you want to remove this product?"
    );

    if (!confirmRemove) {
      return;
    }

    const updated = [...cart];

    updated.splice(index, 1);

    updateCart(updated);
  };

  // Clear entire cart
  const clearCart = () => {
    const confirmClear = window.confirm(
      "Are you sure you want to clear your cart?"
    );

    if (!confirmClear) {
      return;
    }

    updateCart([]);
  };

  // Calculate subtotal
  const total = cart.reduce(
    (sum, item) =>
      sum +
      Number(item.price || 0) *
        Number(item.quantity || 0),
    0
  );

  // Proceed to checkout
  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    navigate("/checkout");
  };

  return (
    <section className="cart-page">

      {/* Header */}
      <div className="cart-header">

        <div>
          <h1>Shopping Cart</h1>

          <p>
            Review your products before checkout.
          </p>
        </div>

        {cart.length > 0 && (
          <button
            className="clear-cart-btn"
            onClick={clearCart}
          >
            Clear Cart
          </button>
        )}

      </div>

      {/* Empty Cart */}
      {cart.length === 0 ? (

        <div className="empty-cart">

          <div className="empty-cart-icon">
            🛒
          </div>

          <h2>Your cart is empty</h2>

          <p>
            You haven't added any products to your
            cart yet.
          </p>

          <button
            className="continue-shopping-btn"
            onClick={() => navigate("/shop")}
          >
            Continue Shopping
          </button>

        </div>

      ) : (

        <>

          {/* Cart Items */}
          <div className="cart-items">

            {cart.map((item, index) => (

              <div
                key={item.id || index}
                className="cart-item"
              >

                {/* Product Image */}
                <div className="cart-image">

                  <img
                    src={item.image}
                    alt={item.name}
                  />

                </div>

                {/* Product Information */}
                <div className="cart-info">

                  <h3>
                    {item.name}
                  </h3>

                  <p>
                    Price:{" "}
                    <strong>
                      Rs.{" "}
                      {Number(
                        item.price || 0
                      ).toLocaleString()}
                    </strong>
                  </p>

                  <p>
                    Available Stock:{" "}
                    <strong>
                      {item.stock}
                    </strong>
                  </p>

                  {/* Quantity */}
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
                        item.quantity >=
                        item.stock
                      }
                    >
                      +
                    </button>

                  </div>

                  {/* Subtotal */}
                  <h4>
                    Subtotal: Rs.{" "}
                    {(
                      Number(
                        item.price || 0
                      ) *
                      Number(
                        item.quantity || 0
                      )
                    ).toLocaleString()}
                  </h4>

                </div>

                {/* Remove */}
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

          </div>

          {/* Cart Summary */}
          <div className="cart-total">

            <div>
              <span>
                Total Items
              </span>

              <strong>
                {cart.reduce(
                  (sum, item) =>
                    sum +
                    Number(
                      item.quantity || 0
                    ),
                  0
                )}
              </strong>
            </div>

            <div>
              <span>
                Total Amount
              </span>

              <h2>
                Rs.{" "}
                {total.toLocaleString()}
              </h2>
            </div>

            <button
              className="checkout-btn"
              onClick={handleCheckout}
            >
              Proceed to Checkout →
            </button>

          </div>

        </>

      )}

    </section>
  );
}

export default Cart;