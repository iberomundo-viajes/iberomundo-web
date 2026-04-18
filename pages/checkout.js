import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';
import './Checkout.css'; // Assuming you have similar styling as index.js

const Checkout = () => {
  const [passengerCount, setPassengerCount] = useState(1);
  const [passengerDetails, setPassengerDetails] = useState([{
    nombre: '',
    apellido: '',
    pasaporte: '',
    nacimiento: ''
  }]);
  const [flightPrice, setFlightPrice] = useState(100); // Example flight price
  const commission = 60;
  const totalPrice = flightPrice + commission;
  const history = useHistory();

  const handlePassengerChange = (index, e) => {
    const { name, value } = e.target;
    const updatedDetails = [...passengerDetails];
    updatedDetails[index][name] = value;
    setPassengerDetails(updatedDetails);
  };

  const handlePassengerAdd = () => {
    setPassengerDetails([...passengerDetails, { nombre: '', apellido: '', pasaporte: '', nacimiento: '' }]);
    setPassengerCount(passengerCount + 1);
  };

  const handlePayment = (token) => {
    const paymentData = {
      token,
      passengers: passengerDetails,
      total: totalPrice,
    };
    fetch('/api/pagar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        history.push('/success');
      })
      .catch(error => console.error('Payment Error:', error));
  };

  return (
    <div className="checkout-container">
      <header>Your Header Here</header>
      <h1>Checkout Page</h1>
      {Array.from({ length: passengerCount }).map((_, index) => (
        <div key={index} className="passenger-form">
          <input type="text" name="nombre" placeholder="Nombre" onChange={(e) => handlePassengerChange(index, e)} />
          <input type="text" name="apellido" placeholder="Apellido" onChange={(e) => handlePassengerChange(index, e)} />
          <input type="text" name="pasaporte" placeholder="Pasaporte (opcional)" onChange={(e) => handlePassengerChange(index, e)} />
          <input type="date" name="nacimiento" placeholder="Fecha de Nacimiento" onChange={(e) => handlePassengerChange(index, e)} />
        </div>
      ))}
      <button onClick={handlePassengerAdd}>Add Another Passenger</button>
      <div className="price-breakdown">
        <p>Flight Price: {flightPrice} EUR</p>
        <p>Gestión Fee: {commission} EUR</p>
        <h2>Total: {totalPrice} EUR</h2>
      </div>
      <StripeCheckout
        stripeKey="your_public_stripe_key"
        token={handlePayment}
        amount={totalPrice * 100}
        name="Payment"
      />
      <footer>Your Footer Here</footer>
    </div>
  );
};

export default Checkout;