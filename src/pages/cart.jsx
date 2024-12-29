import { Link } from "react-router-dom";
import useStore from "../store";

const Cart = () => {
  const { cart, getTotalPrice, removeItemFromCart } = useStore();

  const totalPrice = getTotalPrice();
  console.log("cart", JSON.stringify(cart, null, 2));

  return (
    <div>
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
      <Link to={"/shipping"}>Shipping</Link>
    </div>
  );
};

export default Cart;
