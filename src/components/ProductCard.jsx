import "../styles/ProductCard.css";
import { useNavigate } from "react-router-dom";

function ProductCard({ id, image, name, price, stock }) {
  const navigate = useNavigate();

  const onAddToCart = () => {
    // Check if product is out of stock
    if (stock <= 0) {
      alert("Sorry, this product is out of stock.");
      return;
    }

    const current = JSON.parse(localStorage.getItem("cart") || "[]");

    const existing = current.find((item) => item.id === id);

    if (existing) {
      // Check stock limit
      if (existing.quantity >= stock) {
        alert(`Only ${stock} item(s) available in stock.`);
        return;
      }

      existing.quantity += 1;
    } else {
      // Add product with stock information
      current.push({
        id,
        image,
        name,
        price,
        stock,
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(current));

    window.dispatchEvent(new Event("cartUpdated"));

    alert("Product added to cart!");
  };

  const onSave = () => {
    const current = JSON.parse(localStorage.getItem("saved") || "[]");

    const alreadySaved = current.find((item) => item.id === id);

    if (alreadySaved) {
      alert("Product is already in your wishlist!");
      return;
    }

    current.push({
      id,
      image,
      name,
      price,
    });

    localStorage.setItem("saved", JSON.stringify(current));

    window.dispatchEvent(new Event("savedUpdated"));

    alert("Added to wishlist!");
  };

  return (
    <article className="product-card">

      <div
        className="product-image"
        onClick={() => navigate(`/product/${id}`)}
        style={{ cursor: "pointer" }}
      >
        <img src={image} alt={name} />
      </div>

      <div className="product-info">

        <h3>{name}</h3>

        <div className="rating">★★★★★</div>

        <h4>Rs. {price}</h4>

        <p>
          <strong>Stock:</strong> {stock}
        </p>

        {stock > 0 ? (
          <button type="button" onClick={onAddToCart}>
            Add to Cart
          </button>
        ) : (
          <button type="button" disabled>
            Out of Stock
          </button>
        )}

        <button type="button" onClick={onSave}>
          ❤️ Save
        </button>

      </div>
    </article>
  );
}

export default ProductCard;