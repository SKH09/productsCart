import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/login";
import userStore from "./store/user";
import Register from "./pages/register";
import Cart from "./pages/cart";
import Profile from "./pages/profile";
import { useEffect } from "react";

const ProtectedRoute = (props) => {
  const { user } = userStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      alert("You are navigating to Login Page");
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) return null;

  return <div>{props.children}</div>;
};

const AppRouter2 = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRouter2;
