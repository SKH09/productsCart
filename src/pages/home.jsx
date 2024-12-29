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
    <div style={{ padding: "20px" }}>
      {user ? (
        <>
          <button onClick={logout}>Log Out</button>
          <Link to={"/profile"}>Profile</Link>
          <Link to={"/cart"}>Cart</Link>
        </>
      ) : (
        <>
          <Link to={"/profile"}>Profile</Link>
          <Link to={"/login"}>Login</Link>
        </>
      )}

      {/* Header for cart details */}
      {cart.map((cartItem) => (
        <div key={cartItem.cartId}>
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
          >
            Remove
          </button>
        </div>
      ))}
      <header
        style={{
          marginBottom: "20px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span>Items in the Cart: {cart.length}</span>
        <span>Total Price: ${totalPrice.toFixed(2)}</span>
      </header>

      {/* Products Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #ddd",
              padding: "16px",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              textAlign: "center",
            }}
          >
            <Link to={`/products/${product.id}`}>
              Details Page{product.id}logging product id
            </Link>

            <img
              src={product.thumbnail}
              alt={product.title}
              style={{
                width: "100%",
                height: "150px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
            <h3 style={{ margin: "10px 0" }}>{product.title}</h3>
            <p>Price: ${product.price}</p>

            {/* /buttons */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "10px",
                marginTop: "10px",
              }}
            >
              {/* Decrement button */}
              <button
                onClick={() => {
                  reduceItemInCart(product.id);
                }}
              >
                -
              </button>

              {/* Increment button */}
              <button onClick={() => addProducttoCart(product)}>+</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
