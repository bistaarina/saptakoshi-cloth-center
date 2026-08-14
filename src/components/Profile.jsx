import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Profile.css";
import logo from "../assets/images/Logo/logoo.jpeg";

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(
      localStorage.getItem("user") || "null"
    );

    setUser(storedUser);
  }, []);

  const handleLogout = () => {
    const confirmLogout = window.confirm(
      "Are you sure you want to logout?"
    );

    if (!confirmLogout) {
      return;
    }

    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("auth");

    window.dispatchEvent(
      new Event("authChanged")
    );

    navigate("/login");
  };

  if (!user) {
    return (
      <section className="profile">
        <div className="profile-card">
          <h2>Please Login</h2>

          <p>
            You need to login to view your profile.
          </p>

          <button
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="profile">
      <div className="profile-card">

    <img
  src={logo}
  alt="Saptakoshi Cloth Center Logo"
  className="profile-logo"
/>

        <h2>
          Welcome,{" "}
          {user.fullName ||
            user.name ||
            user.username ||
            "Customer"}
          !
        </h2>

        <div className="profile-info">

          <p>
            <strong>Email:</strong>{" "}
            {user.email || "Not available"}
          </p>

          <p>
            <strong>Phone:</strong>{" "}
            {user.phone || "Not available"}
          </p>

          <p>
            <strong>Address:</strong>{" "}
            {user.address || "Not available"}
          </p>

          <p>
            <strong>Role:</strong>{" "}
            {user.role || "Customer"}
          </p>

        </div>

        <button
          onClick={() => navigate("/my-orders")}
        >
          My Orders
        </button>

        <button
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>
    </section>
  );
}

export default Profile;