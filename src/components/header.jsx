import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="bg-gray-800 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-3xl font-bold">Products</div>
        <div className="flex items-center gap-10">
          <Link to="/" className="text-white hover:text-gray-300">
            Home
          </Link>
          <Link to="/about" className="text-white hover:text-gray-300">
            About
          </Link>
          <Link to="/contact" className="text-white hover:text-gray-300">
            Contact
          </Link>
          <Link to="/services" className="text-white hover:text-gray-300">
            Services
          </Link>
          <Link to="/cart" className="text-white hover:text-gray-300">
            Cart
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
