import { Navigate } from "react-router-dom";

function ProtectedAdmin({ children }) {
  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedAdmin;