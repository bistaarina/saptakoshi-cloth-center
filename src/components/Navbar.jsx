import "../styles/Navbar.css";
import logo from "../assets/images/Logo/logoo.jpeg";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const navigate = useNavigate();

  const [cartCount, setCartCount] = useState(0);
  const [savedCount, setSavedCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const readCounts = () => {
    try {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const saved = JSON.parse(localStorage.getItem("saved") || "[]");

      setCartCount(cart.length);
      setSavedCount(saved.length);

      setIsLoggedIn(!!localStorage.getItem("token"));
    } catch {
      setCartCount(0);
      setSavedCount(0);
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    readCounts();

    const onUpdate = () => readCounts();

    window.addEventListener("cartUpdated", onUpdate);
    window.addEventListener("savedUpdated", onUpdate);

    return () => {
      window.removeEventListener("cartUpdated", onUpdate);
      window.removeEventListener("savedUpdated", onUpdate);
    };
  }, []);

  const onLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setIsLoggedIn(false);

    alert("Logged out successfully!");

    navigate("/login");
  };

  return (
    <header className="navbar">
      <div className="brand">
        <div className="brand-logo">
          <img
            src={logo}
            alt="Saptakoshi Cloth Center"
            className="brand-logo-img"
          />
          <div className="brand-logo-text">
            Saptakoshi Cloth Center
          </div>
        </div>
      </div>

      <nav className="nav-links">
        <Link className="nav-link" to="/">
          Home
        </Link>

        <Link className="nav-link" to="/about">
          About Us
        </Link>

        <Link className="nav-link" to="/blog">
          Blog
        </Link>

        <Link className="nav-link" to="/services">
          Services
        </Link>

        <Link className="nav-link" to="/featured">
          Featured
        </Link>

        <Link className="nav-link" to="/shop">
          Shop
        </Link>

        <Link className="nav-link" to="/contact">
          Contact Us
        </Link>

        <Link className="nav-link" to="/profile">
          Profile
        </Link>

        <div className="nav-search">
          <input
            className="search-input"
            type="search"
            placeholder="Search products..."
          />

          <button
            className="search-btn"
            onClick={() => {
              const q =
                document.querySelector(".search-input")?.value || "";

              navigate("/featured");

              window.dispatchEvent(
                new CustomEvent("searchRequested", {
                  detail: { q },
                })
              );
            }}
          >
            🔍
          </button>
        </div>

        <div className="nav-actions">
          <button
            className="icon-btn"
            onClick={() => navigate("/cart")}
          >
            🛒
            <span className="badge">{cartCount}</span>
          </button>

          <button
            className="icon-btn"
            onClick={() => navigate("/wishlist")}
          >
            ❤️
            <span className="badge">{savedCount}</span>
          </button>

          {isLoggedIn ? (
            <>
              <span className="welcome-user">
                👋 Welcome, {JSON.parse(localStorage.getItem("user"))?.fullName}
              </span>

              <Link className="nav-link" to="/my-orders">
                My Orders
              </Link>

              <button className="logout-btn" onClick={onLogout}>
                Logout
              </button>
            </>
          ) : (
            <Link className="nav-link" to="/login">
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;