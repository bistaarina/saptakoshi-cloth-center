import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/api";
import "../styles/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

localStorage.setItem("token", res.data.token);
localStorage.setItem("user", JSON.stringify(res.data.user));
localStorage.setItem("auth", "true");

console.log("LOGIN RESPONSE:");
console.log(res.data);
// Notify Navbar to update
window.dispatchEvent(new Event("storage"));

alert(res.data.message);

// Redirect to home
window.location.href = "/";
    } 
    catch (error) {
  console.log(error.response);
  alert(error.response?.data?.message || "Login failed");
}
  };

  return (
    <section className="login">
      <div className="login-container">
        <h1>Welcome Back</h1>
        <p>Login to your account</p>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
        </form>

        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </section>
  );
}

export default Login;