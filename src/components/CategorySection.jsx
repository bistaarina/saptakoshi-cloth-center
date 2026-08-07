import "../styles/CategorySection.css";

function CategorySection() {
  return (
    <section className="categories" id="categories">


      <h2>Shop by Category</h2>

      <div className="category-grid">

        <div className="category-card">👗 Women</div>

        <div className="category-card">👔 Men</div>

        <div className="category-card">👦 Kids</div>

        <div className="category-card">🧵 Fabrics</div>

        <div className="category-card">🛏️ Bedding</div>

      </div>

    </section>
  );
}

export default CategorySection;