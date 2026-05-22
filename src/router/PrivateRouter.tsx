import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { clearStoredAuth, getStoredToken, getStoredUser } from "../utils/auth";

const PrivateRouter: React.FC = () => {
  const token = getStoredToken();
  const user = getStoredUser();

  if (!token || !user) {
    clearStoredAuth();
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRouter;
