import { create } from "zustand";
import { nanoid } from "nanoid";
import { devtools, persist } from "zustand/middleware";

const useStore = create(
  devtools(
    persist(
      (set, get) => ({
        cart: [],
        counter: 0,
        setCart: (cartItems) => {
          const { cart } = get();
          console.log(cart);
          set({ cart: cartItems });
        },
        //removing products from cart
        reduceItemInCart: (productId) => {
          const { cart } = get();
          const updateCartItems = cart
            .map((cartItem) => {
              if (cartItem.productId === productId && cartItem.quantity > 1) {
                return { ...cartItem, quantity: cartItem.quantity - 1 };
              }
              return cartItem;
            })
            .filter((item) => item.quantity > 0);
          set({ cart: updateCartItems });
        },
        //adding products to cart
        addProducttoCart: (product) => {
          const { cart } = get();
          const existingCartItem = cart.find(
            (cartItem) => cartItem.productId === product.id
          );
          if (existingCartItem) {
            // Update quantity if the product already exists in the cart
            const updatedItems = cart.map((cartItem) => {
              if (cartItem.productId === product.id) {
                return { ...cartItem, quantity: cartItem.quantity + 1 };
              }
              return cartItem;
            });
            set({
              cart: updatedItems,
            });
          } else {
            // Add new product to the cart
            const cartItem = {
              cartId: "cart" + nanoid(),
              productId: product.id,
              title: product.title,
              price: product.price,
              quantity: 1,
            };
            const updatedCart = [...cart, cartItem];
            set({
              cart: updatedCart,
            });
          }
        },
        //getting the total price
        getTotalPrice: () => {
          const { cart } = get();
          const totalPrice = cart.reduce((sum, element) => {
            return sum + element.price * element.quantity;
          }, 0);
          return totalPrice;
        },
        //removing the item from cart
        removeItemFromCart: (id) => {
          const { cart } = get();
          const filteredCartItems = cart.filter((item) => item.cartId !== id);
          set({
            cart: filteredCartItems,
          });
        },
      }),
      { name: "cart" }
    )
  )
);

export default useStore;
