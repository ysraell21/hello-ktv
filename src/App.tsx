import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/auth/Login";
import Home from "./components/home/Home";
import { RouteKey } from "./routes/route-key";
import { useAuth } from "./context/authContext";
import ProtectedRoute from "./ProtectedRoute";

const App: React.FC = () => {
  const { userLoggedIn } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path={`/${RouteKey.login}`} element={<Login />} />
        <Route
          path={`/${RouteKey.dashboard}`}
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        {/* Redirect all unknown routes */}
        <Route
          path="*"
          element={
            userLoggedIn ? (
              <Navigate to={`/${RouteKey.dashboard}`} replace />
            ) : (
              <Navigate to={`/${RouteKey.login}`} replace />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
