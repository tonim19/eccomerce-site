import "./stripe-button.css";

import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    "pk_test_51K1ddjGYItCAjyBKbGmvawXGx6bSJfcAfli9nY9XkJNAKNCoepvJiC5zeCwiO2HmvDmKgy2YNbSkUdN8gb9SmDyg00aPycNPEW";

  const onToken = (token) => {
    console.log(token);
    alert("Payment Successful");
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="Papi d.o.o."
      billingAddress
      shippingAddress
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
