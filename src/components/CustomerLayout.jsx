import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function CustomerLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default CustomerLayout;