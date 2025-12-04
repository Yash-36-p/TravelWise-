import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const user = typeof window !== "undefined" ? localStorage.getItem("travelwise-user") : null;
  if (!user) {
    // redirect to login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export default RequireAuth;
