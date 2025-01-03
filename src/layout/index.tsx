import React from "react";
import { Link, Outlet } from "react-router-dom";
import userStore from "../store/user";
import useStore from "../store";

function Layout() {
  const { user, logout } = userStore();
  const { getTotalCartItems } = useStore();
  const getTotalItemsInCart = getTotalCartItems();
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header Section */}
      <header className="bg-blue-500 text-white shadow-md">
        <nav className="container mx-auto flex justify-between items-center py-4">
          {/* Navigation Links */}
          <ul className="flex items-center space-x-6">
            <Link
              to="/"
              className="text-lg font-semibold text-cyan-50 hover:text-blue-300 transition"
            >
              Home
            </Link>
            <Link
              to="/cart"
              className="text-lg font-semibold text-cyan-50 hover:text-blue-300 transition flex items-center"
            >
              Cart -
              <span className="ml-2 bg-red-600 text-white font-bold text-sm px-2 py-1 rounded-full">
                {getTotalItemsInCart}
              </span>
            </Link>
          </ul>

          {/* Authentication Links */}
          {user ? (
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
            >
              Login
            </Link>
          )}
        </nav>
      </header>

      {/* Main Content Section */}
      <main className="flex-grow container mx-auto py-6">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
