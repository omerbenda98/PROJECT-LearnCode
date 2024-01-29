import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const { role } = token ? jwtDecode(token) : null;

  const location = useLocation();

  if (!allowedRoles.includes(role)) {
    // Redirect them to the /unauthorized page, preserving the current location
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
