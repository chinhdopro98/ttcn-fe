import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getStoredToken, getStoredUser } from "../utils/auth";

const PublicRouter: React.FC = () => {
  const token = getStoredToken();
  const user = getStoredUser();

  return token && user ? <Navigate to="/app" replace /> : <Outlet />;
};
export default PublicRouter;
