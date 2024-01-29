import { jwtDecode } from "jwt-decode";
import React from "react";

const UnauthorizedComponent = () => {
  const token = localStorage.getItem("token");
  const { role } = token ? jwtDecode(token) : null;
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Access Denied</h1>
        <p className="text-lg text-gray-600 mb-4">
          You do not have permission to view this page.
        </p>
        <p className="text-md text-gray-500">
          If you believe this is an error, please contact support or try
          <a href="/" className="text-blue-600 hover:text-blue-800 ml-1">
            returning to the homepage
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default UnauthorizedComponent;
