import { Link } from "react-router-dom";
import useStore from "../store";

const Cart = () => {
  const { cart, getTotalPrice, removeItemFromCart } = useStore();

  const totalPrice = getTotalPrice();
  console.log("cart", JSON.stringify(cart, null, 2));

  return (
    <div>
      <Link
        to="/shipping"
        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-200 transition duration-200"
      >
        Shipping
      </Link>
      <br />
      <br />
      
      Total Price: ${totalPrice}
      {cart.map((cartItem) => {
        return (
          <div key={cartItem.cartId}>
            <div>Item Name: {cartItem.title}</div>
            <div>Price: ${cartItem.price}</div>
            <div>Quantity: {cartItem.quantity}</div>
            <br />
            <img src={cartItem.image} width={200} height={120} />
            <button
              onClick={() => {
                removeItemFromCart(cartItem.cartId);
              }}
            >
              Remove
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Cart;
