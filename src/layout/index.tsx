import React from "react";
import { Link, Outlet } from "react-router-dom";
import userStore from "../store/user";
import useStore from "../store";

function Layout() {
  const { user, logout } = userStore();
  const { getTotalCartItems } = useStore();
  const getTotalItemsInCart = getTotalCartItems();
  return (
    <div>
      <header>
        <nav>
          <ul>
            <Link to="/">Home</Link>
            <Link to="/cart">
              Cart -
              <span
                style={{
                  fontWeight: "bolder",
                  color: "white",
                  fontSize: "20px",
                }}
              >
                {getTotalItemsInCart}
              </span>
            </Link>
            {user ? (
              <button onClick={logout}>Logout</button>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
