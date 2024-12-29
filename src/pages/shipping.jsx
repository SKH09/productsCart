import { useForm } from "react-hook-form";
import vine from "@vinejs/vine";
import { vineResolver } from "@hookform/resolvers/vine";
import useStore from "../store";
import { axiosInstance } from "../client/api";
import { useNavigate } from "react-router-dom";

const schema = vine.compile(
  vine.object({
    city: vine.string().maxLength(10),
    state: vine.string().maxLength(10),
    country: vine.string().maxLength(10),
  })
);

const Shipping = () => {
  const { cart, getTotalPrice, removeItemFromCart, updateClientSecret } =
    useStore();
  const navigate = useNavigate();

  const totalPrice = getTotalPrice();
  console.log("cart", JSON.stringify(cart, null, 2));

  const { register, handleSubmit, formState, getValues } = useForm({
    resolver: vineResolver(schema),
  });
  console.log("formState", JSON.stringify(formState, null, 2));

  const onSubmit = async () => {
    try {
      const orderItems = cart.map((cartItem) => {
        return {
          productId: cartItem.productId,
          price: cartItem.price,
          quantity: cartItem.quantity,
        };
      });
      const { city, state, country } = getValues();
      const deliveryAddress = city + state + country;
      console.log("orderItems", JSON.stringify(orderItems, null, 2));
      const response = await axiosInstance.post("/orders", {
        deliveryAddress,
        totalPrice: getTotalPrice(), // TODO: get total price from cart
        orderItems: [...orderItems],
      });

      updateClientSecret(response.data.clientSecret);
      navigate("/checkout");
    } catch (error) {
      console.log("error in onSubmit", error);
      throw error;
    }
  };

  return (
    <div className="grid grid-cols-2 gap-2">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("city")} placeholder="city" />
        <input {...register("state")} placeholder="state" />
        <input {...register("country")} placeholder="country" />
        <button type="submit">Submit</button>
      </form>
      <div>
        Total Price: ${totalPrice}
        {cart.map((cartItem) => {
          return (
            <div key={cartItem.cartId}>
              <div>Item Name: {cartItem.title}</div>
              <div>Price: ${cartItem.price}</div>
              <div>Quantity: {cartItem.quantity}</div>
              <br />
              <img src={cartItem.image} width={40} height={40} />
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
    </div>
  );
};

export default Shipping;
