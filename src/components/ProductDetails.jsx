import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
      const data = await getProductById(id);
      setProduct(data);
    } catch (error) {
      console.log(error);
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!product) {
    return <h2>Product not found.</h2>;
  }

  const onAddToCart = () => {
    try {
      // Check if product is out of stock
      if (product.stock <= 0) {
        alert("Sorry, this product is out of stock.");
        return;
      }

      const current = JSON.parse(
        localStorage.getItem("cart") || "[]"
      );

      const existing = current.find(
        (item) => item.id === product._id
      );

      // Check stock limit
      if (existing) {
        if (existing.quantity >= product.stock) {
          alert(
            `Only ${product.stock} item(s) available in stock.`
          );
          return;
        }

        existing.quantity += 1;
      } else {
        current.push({
          id: product._id,
          name: product.name,
          price: product.price,
          image: product.image,
          stock: product.stock,
          quantity: 1,
        });
      }

      localStorage.setItem(
        "cart",
        JSON.stringify(current)
      );

      window.dispatchEvent(
        new Event("cartUpdated")
      );

      alert("Product added to cart!");
    } catch (error) {
      console.log(error);
      alert("Something went wrong.");
    }
  };

  return (
    <section className="product-details">

      <div className="product-image">
        <img
          src={product.image}
          alt={product.name}
        />
      </div>

      <div className="product-info">

        <h1>{product.name}</h1>

        <h2>Rs. {product.price}</h2>

        <p>
          <strong>Category:</strong>{" "}
          {product.category}
        </p>

        <p>
          <strong>Stock:</strong>{" "}
          {product.stock}
        </p>

        <p>{product.description}</p>

        {product.stock > 0 ? (
          <button onClick={onAddToCart}>
            Add to Cart
          </button>
        ) : (
          <button disabled>
            Out of Stock
          </button>
        )}

      </div>
    </section>
  );
}

export default ProductDetails;