import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductById } from "../api/productApi";
import "../styles/ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);

      const data = await getProductById(id);

      setProduct(data);
    } catch (error) {
      console.error("Error fetching product:", error);
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  // Loading
  if (loading) {
    return (
      <div className="product-details-loading">
        <div className="loading-spinner"></div>
        <p>Loading product...</p>
      </div>
    );
  }

  // Product not found
  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Product not found</h2>

        <p>
          Sorry, the product you are looking for does not exist.
        </p>

        <Link to="/shop">
          Back to Shop
        </Link>
      </div>
    );
  }

  // Add product to cart
  const onAddToCart = () => {
    try {
      // Check stock
      if (product.stock <= 0) {
        alert("Sorry, this product is out of stock.");
        return;
      }

      // Get existing cart
      const current = JSON.parse(
        localStorage.getItem("cart") || "[]"
      );

      // Check whether product already exists
      const existing = current.find(
        (item) => item.id === product._id
      );

      if (existing) {
        // Check stock limit
        if (existing.quantity >= product.stock) {
          alert(
            `Only ${product.stock} item(s) available in stock.`
          );
          return;
        }

        existing.quantity += 1;
      } else {
        // Add new product
        current.push({
          id: product._id,
          name: product.name,
          price: product.price,
          image: product.image,
          stock: product.stock,
          quantity: 1,
        });
      }

      // Save cart
      localStorage.setItem(
        "cart",
        JSON.stringify(current)
      );

      // Update navbar cart count
      window.dispatchEvent(
        new Event("cartUpdated")
      );

      alert("Product added to cart!");
    } catch (error) {
      console.error("Cart error:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <section className="product-details">

      {/* Product Image */}
      <div className="product-image">
        <img
          src={product.image}
          alt={product.name}
        />
      </div>

      {/* Product Information */}
      <div className="product-info">

        <h1>{product.name}</h1>

        <h2>
          Rs.{" "}
          {Number(product.price).toLocaleString()}
        </h2>

        <p>
          <strong>Category:</strong>{" "}
          {product.category}
        </p>

        <p>
          <strong>Stock:</strong>{" "}
          {product.stock}
        </p>

        <p className="product-description">
          {product.description ||
            "No description available."}
        </p>

        {/* Stock Status */}
        {product.stock > 0 ? (
          <>
            <p className="in-stock">
              ✓ In Stock
            </p>

            <button
              className="add-to-cart-btn"
              onClick={onAddToCart}
            >
              Add to Cart
            </button>
          </>
        ) : (
          <>
            <p className="out-of-stock">
              ✕ Out of Stock
            </p>

            <button
              className="add-to-cart-btn"
              disabled
            >
              Out of Stock
            </button>
          </>
        )}

        <Link
          to="/shop"
          className="back-to-shop"
        >
          ← Continue Shopping
        </Link>

      </div>

    </section>
  );
}

export default ProductDetails;