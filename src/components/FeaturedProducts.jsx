import "../styles/FeaturedProducts.css";
import ProductCard from "./ProductCard";
import products from "../data/products";

function FeaturedProducts() {
  return (
    <section className="featured" id="featured">
      <h2>Featured Products</h2>

      <div className="product-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            image={product.image}
            name={product.name}
            price={product.price}
          />
        ))}
      </div>
    </section>
  );
}

export default FeaturedProducts;