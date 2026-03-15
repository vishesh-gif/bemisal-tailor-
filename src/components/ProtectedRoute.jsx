import React, { Children } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { loginStatus } = useSelector((state) => state.profileSlice);
  if (!loginStatus) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
