import { Routes, Route, Outlet } from "react-router-dom";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Header from "./components/header";
import Services from "./pages/Services";
import Cart from "./pages/cart";
import Product from "./pages/product";

function Layout() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}
const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/products/:productId" element={<Product />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/cart" element={<Cart />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
