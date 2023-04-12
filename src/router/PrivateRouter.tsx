import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRouter: React.FC = () => {
  const token = localStorage.getItem("token");
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRouter;
