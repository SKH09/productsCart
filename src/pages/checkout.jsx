import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { PaymentElement } from "@stripe/react-stripe-js";
import useStore from "../store";
const stripePromise = loadStripe(
  "pk_test_51QbFiiImcKPXFkPZZOiQ2xGN5tkd7tUNsGVMYH1YqLcgHdkljHf8o687H6tnz9tVtB4nGihTlQJh9vTNXmuW4G8e00xhtAUPlr"
);

const CheckoutForm = () => {
  return (
    <form>
      <PaymentElement />
      <button>Click to Pay</button>
    </form>
  );
};

const Checkout = () => {
  const { clientSecret } = useStore();
  const options = {
    clientSecret: clientSecret,
  };
  return (
    <div>
      Checkout
      {clientSecret && (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};

export default Checkout;
