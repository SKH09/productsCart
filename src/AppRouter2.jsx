import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import userStore from "./store/user";
import Register from "./pages/register";
import Cart from "./pages/cart";
import Profile from "./pages/profile";
import { useEffect } from "react";
import Product from "./pages/product";
import Layout from "./layout";
import Shipping from "./pages/shipping";
import Checkout from "./pages/checkout";

const ProtectedRoute = (props) => {
  const { user } = userStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      alert("navigating to login");
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) return null;

  return <div>{props.children}</div>;
};

const AppRouter2 = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/products/:productId" element={<Product />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/shipping"
          element={
            <ProtectedRoute>
              <Shipping />
            </ProtectedRoute>
          }
        />

        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
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
      </Route>
    </Routes>
  );
};

export default AppRouter2;
