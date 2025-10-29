import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Correct import syntax

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const user = token ? jwtDecode(token) : null;

  const location = useLocation();

  // Check if the user exists and if their role is included in the allowed roles
  const isAllowed = user && allowedRoles.includes(user.role);

  if (!isAllowed) {
    // Redirect them to the /unauthorized page, preserving the current location
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
