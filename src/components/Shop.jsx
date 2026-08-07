import { useState, useEffect } from "react";
import API from "../api/api";
import ProductCard from "./ProductCard";
import "../styles/Shop.css";

function Shop() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();

    // Refresh products when stock changes
    const handleStockUpdate = () => {
      fetchProducts();
    };

    window.addEventListener(
      "stockUpdated",
      handleStockUpdate
    );

    return () => {
      window.removeEventListener(
        "stockUpdated",
        handleStockUpdate
      );
    };
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" ||
      product.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <section className="shop">

      <h2>All Products</h2>

      <input
        type="text"
        placeholder="Search products..."
        className="shop-search"
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <div className="category-buttons">

        <button
          onClick={() => setCategory("All")}
        >
          All
        </button>

        <button
          onClick={() => setCategory("Women")}
        >
          Women
        </button>

        <button
          onClick={() => setCategory("Men")}
        >
          Men
        </button>

        <button
          onClick={() => setCategory("Bedding")}
        >
          Bedding
        </button>

      </div>

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

    </section>
  );
}

export default Shop;