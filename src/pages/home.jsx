import { useEffect, useState } from "react";
import useStore from "../store";
import { Link } from "react-router-dom";
import userStore from "../store/user";
import { axiosInstance } from "../client/api";

const Home = () => {
  const [products, setProducts] = useState([]);
  const { cart, reduceItemInCart, addProducttoCart, getTotalPrice } =
    useStore();
  const { logout, user } = userStore();

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("/products");
      const productsData = [...response.data];
      setProducts(productsData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const totalPrice = getTotalPrice();

  return (
    <div className="p-8">
      {/* User Actions */}
      <div className="flex justify-between items-center mb-6">
        {user ? (
          <div className="flex gap-4">
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Log Out
            </button>
            <Link
              to="/profile"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Profile
            </Link>
            <Link
              to="/cart"
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Cart
            </Link>
          </div>
        ) : (
          <div className="flex gap-4">
            <Link
              to="/profile"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Profile
            </Link>
            <Link
              to="/login"
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Login
            </Link>
          </div>
        )}
      </div>

      {/* Cart Details */}
      <header className="flex justify-between items-center mb-8 p-4 bg-gray-100 rounded-lg shadow-md">
        <span className="text-lg font-medium">
          Items in Cart: {cart.length}
        </span>
        <span className="text-lg font-medium">
          Total Price: ${totalPrice.toFixed(2)}
        </span>
      </header>

      {cart.map((cartItem) => (
        <div
          key={cartItem.cartId}
          className="p-4 mb-4 bg-white rounded-lg shadow-md"
        >
          <div>Item Name: {cartItem.title}</div>
          <div>Price: ${cartItem.price}</div>
          <div>Quantity: {cartItem.quantity}</div>
          <button
            onClick={() => {
              const { cart } = useStore.getState();
              useStore.setState({
                cart: cart.filter(
                  (item) => item.productId !== cartItem.productId
                ),
              });
            }}
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Remove
          </button>
        </div>
      ))}

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <Link to={`/products/${product.id}`} className="block mb-2">
              <span className="text-blue-500 hover:underline">
                Details Page - <b>{product.id}</b>
              </span>
            </Link>
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
            <p className="text-gray-600 mb-4">Price: ${product.price}</p>

            {/* Action Buttons */}
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => reduceItemInCart(product.id)}
                className="w-10 h-10 bg-red-500 text-white rounded-full hover:bg-red-600"
              >
                -
              </button>
              <button
                onClick={() => addProducttoCart(product)}
                className="w-10 h-10 bg-green-500 text-white rounded-full hover:bg-green-600"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
