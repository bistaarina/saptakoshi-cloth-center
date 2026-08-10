import { useState, useEffect } from "react";
import API from "../api/api";
import ProductCard from "./ProductCard";
import "../styles/Shop.css";

function Shop() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  // Fetch products
  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  // Load products when page opens
  useEffect(() => {
    fetchProducts();

    // Refresh products when stock changes
    const handleStockUpdate = () => {
      fetchProducts();
    };

    window.addEventListener("stockUpdated", handleStockUpdate);

    return () => {
      window.removeEventListener("stockUpdated", handleStockUpdate);
    };
  }, []);

  // Search + category filter
  const filteredProducts = products.filter((product) => {
    const productName = product.name?.toLowerCase() || "";

    const matchesSearch = productName.includes(
      search.toLowerCase()
    );

    const matchesCategory =
      category === "All" ||
      product.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <section className="shop-section">

      {/* Header */}
      <div className="shop-header">
        <h2>All Products</h2>

        <p>
          Explore our latest collection
        </p>
      </div>

      {/* Search */}
      <div className="shop-search-container">
        <input
          type="text"
          placeholder="Search products..."
          className="shop-search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Category Buttons */}
      <div className="category-buttons">

        <button
          className={category === "All" ? "active" : ""}
          onClick={() => setCategory("All")}
        >
          All
        </button>

        <button
          className={category === "Women" ? "active" : ""}
          onClick={() => setCategory("Women")}
        >
          Women
        </button>

        <button
          className={category === "Men" ? "active" : ""}
          onClick={() => setCategory("Men")}
        >
          Men
        </button>

        <button
          className={category === "Bedding" ? "active" : ""}
          onClick={() => setCategory("Bedding")}
        >
          Bedding
        </button>

      </div>

      {/* Product Count */}
      <div className="shop-result-count">
        Showing {filteredProducts.length} of {products.length} products
      </div>

      {/* Products */}
      {filteredProducts.length === 0 ? (

        <div className="no-products">
          <div>🛍️</div>

          <h3>No products found</h3>

          <p>
            Try searching for another product or category.
          </p>
        </div>

      ) : (

        <div className="product-grid">

          {filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              id={product._id}
              image={product.image}
              name={product.name}
              price={product.price}
              stock={product.stock}
            />
          ))}

        </div>

      )}

    </section>
  );
}

export default Shop;