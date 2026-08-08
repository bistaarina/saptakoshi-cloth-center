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

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

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
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Something went wrong."
      );
    }
  };

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
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to delete product."
      );
    }
  };

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

      {/* Products */}

      <div className="products-section">

        <div className="products-section-header">

          <div>
            <h2>All Products</h2>

            <span>
              {products.length} products
            </span>
          </div>

        </div>

        {products.length === 0 ? (

          <div className="empty-products">

            <div>🛍️</div>

            <h3>No products found</h3>

            <p>
              Add your first product to get started.
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

                {products.map((product) => (

                  <tr key={product._id}>

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

                    <td>
                      <span className="category-badge">
                        {product.category}
                      </span>
                    </td>

                    <td>
                      <strong>
                        Rs.{" "}
                        {Number(
                          product.price
                        ).toLocaleString()}
                      </strong>
                    </td>

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
                          : product.stock}
                      </span>

                    </td>

                    <td>

                      <div className="product-actions">

                        <button
                          className="edit-btn"
                          onClick={() =>
                            handleEdit(product)
                          }
                        >
                          Edit
                        </button>

                        <button
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