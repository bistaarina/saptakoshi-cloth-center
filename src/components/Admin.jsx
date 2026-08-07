import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  addProduct,
  getProducts,
  deleteProduct,
  updateProduct,
} from "../api/productApi";
import { getDashboardStats } from "../api/dashboardApi";
import "../styles/Admin.css";

function Admin() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
  });

  const [product, setProduct] = useState({
    name: "",
    price: "",
    image: "",
    category: "",
    description: "",
    stock: "",
  });

  useEffect(() => {
  fetchProducts();
   fetchDashboard();
}, []);

  const fetchDashboard = async () => {
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", "saptakoshi_upload");

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dsoyjket/image/upload",
        formData
      );

      setProduct((prev) => ({
        ...prev,
        image: res.data.secure_url,
      }));

      alert("Image uploaded successfully!");
    } catch (error) {
      console.log(error);
      alert("Image upload failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let res;

      if (editingId) {
        res = await updateProduct(editingId, product);
      } else {
        res = await addProduct(product);
      }

      alert(res.message);

      setProduct({
        name: "",
        price: "",
        image: "",
        category: "",
        description: "",
        stock: "",
      });

      setEditingId(null);

      fetchProducts();
      fetchDashboard();
    } catch (error) {
      alert(error.response?.data?.message || "Operation Failed");
    }
  };

  const handleEdit = (item) => {
    setProduct({
      name: item.name,
      price: item.price,
      image: item.image,
      category: item.category,
      description: item.description,
      stock: item.stock,
    });

    setEditingId(item._id);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      const res = await deleteProduct(id);

      alert(res.message);

      fetchProducts();
      fetchDashboard();
    } catch (error) {
      alert("Delete failed");
    }
  };  return (
    <div className="admin">

      <h1>Admin Dashboard</h1>

      <div className="dashboard-cards">

        <div className="dashboard-card">
          <h2>📦 Products</h2>
          <h1>{stats.totalProducts}</h1>
        </div>

        <div className="dashboard-card">
          <h2>🛒 Orders</h2>
          <h1>{stats.totalOrders}</h1>
        </div>

        <div className="dashboard-card">
          <h2>💰 Revenue</h2>
          <h1>Rs. {stats.totalRevenue}</h1>
        </div>

        <div className="dashboard-card">
          <h2>⏳ Pending</h2>
          <h1>{stats.pendingOrders}</h1>
        </div>

      </div>

      <button
        onClick={() => navigate("/admin/orders")}
        style={{
          padding: "12px 20px",
          marginBottom: "25px",
          background: "#000",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        📦 View Customer Orders
      </button>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={product.name}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
        />

        {product.image && (
          <img
            src={product.image}
            alt="Preview"
            style={{
              width: "180px",
              marginTop: "10px",
              marginBottom: "10px",
              borderRadius: "10px",
            }}
          />
        )}

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={product.category}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={product.description}
          onChange={handleChange}
        />

        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={product.stock}
          onChange={handleChange}
        />

        <button type="submit">
          {editingId ? "Update Product" : "Add Product"}
        </button>

      </form>

      <h2 style={{ marginTop: "50px" }}>All Products</h2>

      <div className="admin-products">

        {products.map((item) => (
          <div className="admin-card" key={item._id}>

            <img src={item.image} alt={item.name} />

            <h3>{item.name}</h3>

            <p>
              <strong>Price:</strong> Rs. {item.price}
            </p>

            <p>
              <strong>Category:</strong> {item.category}
            </p>

            <p>
              <strong>Stock:</strong> {item.stock}
            </p>

            <button
              className="edit-btn"
              onClick={() => handleEdit(item)}
            >
              ✏️ Edit
            </button>

            <button
              className="delete-btn"
              onClick={() => handleDelete(item._id)}
            >
              🗑 Delete
            </button>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Admin;