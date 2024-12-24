import useStore from "../store";

const Cart = () => {
  const {
    cart,
    getTotalPrice,
    removeItemFromCart,
  } = useStore();

  const totalPrice = getTotalPrice();
  return (
    <div>
      Total Price: ${totalPrice}
      {cart.map((cartItem, index) => (
        <div key={index + cartItem.id}>
          <div>Item Name: {cartItem.title}</div>
          <div>Price: ${cartItem.price}</div>
          <div>Quantity: {cartItem.quantity}</div>
          <button
            onClick={() => {
              removeItemFromCart(cartItem.cartId);
            }}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default Cart;
