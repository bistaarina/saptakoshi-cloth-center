import { useEffect, useState } from "react";
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../api/productApi";
import "../styles/AdminProducts.css";

function AdminProducts() {
  const [products, setProducts] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Search and filters
  const [searchText, setSearchText] = useState("");
  const [search, setSearch] = useState("");

  const [categoryFilter, setCategoryFilter] = useState("All");
  const [stockFilter, setStockFilter] = useState("All");

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
    category: "Women",
    description: "",
    stock: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  // Fetch products
  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  // Handle form input
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: "",
      price: "",
      image: "",
      category: "Women",
      description: "",
      stock: "",
    });

    setEditingId(null);
    setShowForm(false);
  };

  // Add / Update product
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const productData = {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
      };

      if (editingId) {
        await updateProduct(editingId, productData);

        alert("Product updated successfully!");
      } else {
        await addProduct(productData);

        alert("Product added successfully!");
      }

      resetForm();
      fetchProducts();

      // Refresh customer shop
      window.dispatchEvent(new Event("stockUpdated"));
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Something went wrong."
      );
    }
  };

  // Edit product
  const handleEdit = (product) => {
    setEditingId(product._id);

    setFormData({
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      description: product.description || "",
      stock: product.stock,
    });

    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Delete product
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await deleteProduct(id);

      alert("Product deleted successfully!");

      fetchProducts();

      // Refresh customer shop
      window.dispatchEvent(new Event("stockUpdated"));
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to delete product."
      );
    }
  };

  // Search
  const handleSearch = (e) => {
    e.preventDefault();

    setSearch(searchText.trim().toLowerCase());
  };

  // Filter products
  const filteredProducts = products.filter((product) => {
    const productName =
      product.name?.toLowerCase() || "";

    const productCategory =
      product.category?.toLowerCase() || "";

    const productDescription =
      product.description?.toLowerCase() || "";

    // Search by name, category or description
    const matchesSearch =
      search === "" ||
      productName.includes(search) ||
      productCategory.includes(search) ||
      productDescription.includes(search);

    // Category filter
    const matchesCategory =
      categoryFilter === "All" ||
      product.category === categoryFilter;

    // Stock filter
    let matchesStock = true;

    if (stockFilter === "In Stock") {
      matchesStock = product.stock > 5;
    }

    if (stockFilter === "Low Stock") {
      matchesStock =
        product.stock > 0 && product.stock <= 5;
    }

    if (stockFilter === "Out of Stock") {
      matchesStock = product.stock === 0;
    }

    return (
      matchesSearch &&
      matchesCategory &&
      matchesStock
    );
  });

  return (
    <div className="admin-products-page">

      {/* Header */}
      <div className="products-page-header">

        <div>
          <h1>Product Management</h1>

          <p>
            Add, edit and manage your store products.
          </p>
        </div>

        <button
          className="add-product-btn"
          onClick={() => {
            if (showForm) {
              resetForm();
            } else {
              setShowForm(true);
            }
          }}
        >
          {showForm ? "Close Form" : "+ Add Product"}
        </button>

      </div>

      {/* Product Form */}
      {showForm && (
        <div className="product-form-card">

          <div className="form-header">

            <h2>
              {editingId
                ? "Edit Product"
                : "Add New Product"}
            </h2>

            <p>
              Enter the product information below.
            </p>

          </div>

          <form onSubmit={handleSubmit}>

            <div className="form-grid">

              {/* Product Name */}
              <div className="form-group">

                <label>Product Name</label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter product name"
                  required
                />

              </div>

              {/* Price */}
              <div className="form-group">

                <label>Price</label>

                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Enter price"
                  min="0"
                  required
                />

              </div>

              {/* Category */}
              <div className="form-group">

                <label>Category</label>

                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >

                  <option value="Women">
                    Women
                  </option>

                  <option value="Men">
                    Men
                  </option>

                  <option value="Bedding">
                    Bedding
                  </option>

                </select>

              </div>

              {/* Stock */}
              <div className="form-group">

                <label>Stock</label>

                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="Enter stock quantity"
                  min="0"
                  required
                />

              </div>

              {/* Image */}
              <div className="form-group full-width">

                <label>Product Image URL</label>

                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="Enter image URL"
                  required
                />

              </div>

              {/* Description */}
              <div className="form-group full-width">

                <label>Description</label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter product description"
                  rows="4"
                />

              </div>

            </div>

            <div className="form-actions">

              <button
                type="button"
                className="cancel-form-btn"
                onClick={resetForm}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="save-product-btn"
              >
                {editingId
                  ? "Update Product"
                  : "Add Product"}
              </button>

            </div>

          </form>

        </div>
      )}

      {/* Products Section */}
      <div className="products-section">

        <div className="products-section-header">

          <div>

            <h2>All Products</h2>

            <span>
              Showing {filteredProducts.length} of{" "}
              {products.length} products
            </span>

          </div>

        </div>

        {/* Search and Filters */}
        <div className="product-filters">

          {/* Search Form */}
          <form
            onSubmit={handleSearch}
            className="product-search-form"
          >

            <input
              type="text"
              className="product-search"
              placeholder="🔎 Search products..."
              value={searchText}
              onChange={(e) =>
                setSearchText(e.target.value)
              }
            />

            <button type="submit">
              Search
            </button>

          </form>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) =>
              setCategoryFilter(e.target.value)
            }
            className="product-filter-select"
          >

            <option value="All">
              All Categories
            </option>

            <option value="Women">
              Women
            </option>

            <option value="Men">
              Men
            </option>

            <option value="Bedding">
              Bedding
            </option>

          </select>

          {/* Stock Filter */}
          <select
            value={stockFilter}
            onChange={(e) =>
              setStockFilter(e.target.value)
            }
            className="product-filter-select"
          >

            <option value="All">
              All Stock
            </option>

            <option value="In Stock">
              In Stock
            </option>

            <option value="Low Stock">
              Low Stock
            </option>

            <option value="Out of Stock">
              Out of Stock
            </option>

          </select>

          {/* Clear Filters */}
          <button
            type="button"
            className="clear-filter-btn"
            onClick={() => {
              setSearchText("");
              setSearch("");
              setCategoryFilter("All");
              setStockFilter("All");
            }}
          >
            Clear
          </button>

        </div>

        {/* Products */}
        {filteredProducts.length === 0 ? (

          <div className="empty-products">

            <div>🛍️</div>

            <h3>No products found</h3>

            <p>
              Try changing your search or filters.
            </p>

          </div>

        ) : (

          <div className="products-table-wrapper">

            <table className="products-table">

              <thead>

                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Actions</th>
                </tr>

              </thead>

              <tbody>

                {filteredProducts.map((product) => (

                  <tr key={product._id}>

                    {/* Product */}
                    <td>

                      <div className="product-table-info">

                        <img
                          src={product.image}
                          alt={product.name}
                        />

                        <div>

                          <strong>
                            {product.name}
                          </strong>

                          <span>
                            {product.description
                              ? product.description.slice(
                                  0,
                                  45
                                ) + "..."
                              : "No description"}
                          </span>

                        </div>

                      </div>

                    </td>

                    {/* Category */}
                    <td>

                      <span className="category-badge">
                        {product.category}
                      </span>

                    </td>

                    {/* Price */}
                    <td>

                      <strong>
                        Rs.{" "}
                        {Number(
                          product.price
                        ).toLocaleString()}
                      </strong>

                    </td>

                    {/* Stock */}
                    <td>

                      <span
                        className={`stock-badge ${
                          product.stock === 0
                            ? "out"
                            : product.stock <= 5
                            ? "low"
                            : "available"
                        }`}
                      >

                        {product.stock === 0
                          ? "Out of Stock"
                          : product.stock <= 5
                          ? `Low: ${product.stock}`
                          : `Available: ${product.stock}`}

                      </span>

                    </td>

                    {/* Actions */}
                    <td>

                      <div className="product-actions">

                        <button
                          type="button"
                          className="edit-btn"
                          onClick={() =>
                            handleEdit(product)
                          }
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          className="delete-btn"
                          onClick={() =>
                            handleDelete(
                              product._id
                            )
                          }
                        >
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  );
}

export default AdminProducts;