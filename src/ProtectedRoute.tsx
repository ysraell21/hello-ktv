import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./context/authContext";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { userLoggedIn } = useAuth();
  return userLoggedIn ? <>{children}</> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
