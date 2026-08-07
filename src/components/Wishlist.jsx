import { useEffect, useState } from "react";
import "../styles/Wishlist.css";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("saved") || "[]");
    setWishlist(items);
  }, []);

  const removeItem = (index) => {
    const updated = [...wishlist];
    updated.splice(index, 1);

    setWishlist(updated);
    localStorage.setItem("saved", JSON.stringify(updated));

    window.dispatchEvent(new Event("savedUpdated"));
  };

  return (
    <section className="wishlist-page">
      <h1>My Wishlist</h1>

      {wishlist.length === 0 ? (
        <p>No saved products.</p>
      ) : (
        wishlist.map((item, index) => (
          <div className="wishlist-item" key={index}>
            <img src={item.image} alt={item.name} />

            <div>
              <h3>{item.name}</h3>
              <p>Rs. {item.price}</p>
            </div>

            <button onClick={() => removeItem(index)}>
              Remove
            </button>
          </div>
        ))
      )}
    </section>
  );
}

export default Wishlist;