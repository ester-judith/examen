import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { Modal, Button, Form, Row, Col, Alert } from 'react-bootstrap';

const stripePromise = loadStripe('pk_test_51P2lXE2NgCkt3iMqXOYFNvZ6yF8DOe3kNDAlrZFJRzr997OL2VGcnup6slBiysrcwsLySzhPnUlBHZzUvIZkCMch00o2bL5U4i');

const CheckoutForm = ({ amount, itemTitle, itemImage, userEmail, productOwner }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [buyerName, setBuyerName] = useState('');

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
            name: buyerName,
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
    <Form onSubmit={handleSubmit}>
      {error && <Alert variant="danger">{error}</Alert>}
      <Row>
        <Col md={6}>
          <Form.Group>
            <Form.Label style={{ color: "#d69496", fontSize: "1.0em", fontWeight: "bold" }}>Correo del comprador</Form.Label>
            <Form.Control
              type="email"
              value={userEmail}
              readOnly
            />
          </Form.Group>
          <Form.Group>
            <Form.Label style={{ color: "#d69496", fontSize: "1.0em", fontWeight: "bold" }}>Producto</Form.Label>
            <Form.Control
              type="text"
              value={itemTitle}
              readOnly
            />
          </Form.Group>
          <Form.Group>
            <Form.Label style={{ color: "#d69496", fontSize: "1.0em", fontWeight: "bold" }}>Dueño del producto</Form.Label>
            <Form.Control
              type="text"
              value={productOwner}
              readOnly
            />
          </Form.Group>
          <Form.Group>
            <Form.Label style={{ color: "#d69496", fontSize: "1.0em", fontWeight: "bold" }}>Precio a pagar</Form.Label>
            <Form.Control
              type="text"
              value={`$${amount}`}
              readOnly
            />
          </Form.Group>
          <Form.Group>
            <Form.Label style={{ color: "#d69496", fontSize: "1.0em", fontWeight: "bold" }}>Nombre del comprador</Form.Label>
            <Form.Control
              type="text"
              value={buyerName}
              onChange={(e) => setBuyerName(e.target.value)}
              placeholder="Nombre"
              required
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label style={{ color: "#d69496", fontSize: "1.0em", fontWeight: "bold" }}>Imagen del producto</Form.Label>
            <div>
              <img src={itemImage} alt={itemTitle} style={{ maxWidth: '100%' }} />
            </div>
          </Form.Group>
        </Col>
      </Row>
      <CardElement />
      <Button type="submit" disabled={!stripe || processing || succeeded} style={{ backgroundColor: '#f5b2c2', color: '#000' }}>
        {processing ? 'Procesando' : 'Pagar'}
      </Button>
    </Form>
  );
};

const StripeButton = ({ amount, itemTitle, itemImage, userEmail, productOwner }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow} style={{ backgroundColor: '#d69496', border: '1px solid #dddddd', color: '#ffffff' }}>
        Pagar
      </Button>

      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header style={{ backgroundColor: "#d69496", border: "1px solid #dddddd" }} closeButton>
          <Modal.Title style={{ color: "#ffffff" }}>
            Formulario de pago
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Elements stripe={stripePromise}>
            <CheckoutForm amount={amount} itemTitle={itemTitle} itemImage={itemImage} userEmail={userEmail} productOwner={productOwner} />
          </Elements>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} style={{ backgroundColor: '#ddd', color: '#000' }}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default StripeButton;



