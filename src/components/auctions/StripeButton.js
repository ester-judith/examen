import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51P2lXE2NgCkt3iMqXOYFNvZ6yF8DOe3kNDAlrZFJRzr997OL2VGcnup6slBiysrcwsLySzhPnUlBHZzUvIZkCMch00o2bL5U4i'); 

const CheckoutForm = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    try {
      const response = await fetch('https://api.stripe.com/v1/payment_intents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Bearer sk_test_51P2lXE2NgCkt3iMq5ZGVoiMoVz4DG14zWwVbCl5uJb5JtUNnZJnU4IEDJjHszQJXfr7A3cdmtIsD1sysiMyDIDz000KH41kVRE` 
        },
        body: new URLSearchParams({
          'amount': amount * 100,
          'currency': 'usd',
          'payment_method_types[]': 'card'
        })
      });

      if (!response.ok) {
        throw new Error('Error al crear el intento de pago');
      }

      const paymentIntent = await response.json();
      const clientSecret = paymentIntent.client_secret;

      const payload = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: 'Nombre del usuario',
          },
        },
      });

      if (payload.error) {
        setError(`Pago fallido: ${payload.error.message}`);
        setProcessing(false);
      } else {
        setError(null);
        setProcessing(false);
        setSucceeded(true);
        alert('Pago realizado con éxito');
      }
    } catch (error) {
      setError(error.message);
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe || processing || succeeded}>
        {processing ? 'Procesando' : 'Pagar'}
      </button>
      {error && <div className="card-error">{error}</div>}
    </form>
  );
};

const StripeButton = ({ amount }) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm amount={amount} />
    </Elements>
  );
};

export default StripeButton;




