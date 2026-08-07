import { Navigate } from "react-router-dom";

function ProtectedAdmin({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));

  console.log("ProtectedAdmin user:", user);

  if (!user) {
    console.log("No user found");
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "admin") {
    console.log("Not admin");
    return <Navigate to="/" replace />;
  }

  console.log("Admin verified");

  return children;
}

export default ProtectedAdmin;