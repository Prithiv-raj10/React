import React from 'react'
import { useLocation } from 'react-router-dom';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import { PaymentForm } from '../Components/Page/Payment';
import { OrderSummary } from '../Components/Page/Order';

function Payment() {
    const {
        state: { apiResult, userInput },
      } = useLocation();
    
      const stripePromise = loadStripe('pk_test_51N6a5HSE1ciSL1Z1nWlJJKeXJ6soJATRHvUmH0rnL5L5RhKoc4G2z1NsFwoaZAb21JUBTq6SDTYElUmXBydPvY2200DWc3qS4W');
      console.log(apiResult);
      console.log(userInput);
      const options = {
        // passing the client secret obtained from the server
        clientSecret: apiResult.value.result.clientSecret,
      };
    
      console.log(apiResult.value.result);
      console.log(userInput);
  return (
    <div>
         <Elements stripe={stripePromise} options={options}>
         <div className="container m-5 p-5">
        <div className="row">
          <div className="col-md-7">
            <OrderSummary data={apiResult} userInput={userInput} />
          </div>
          <div className="col-md-4 offset-md-1">
            <h3 className="text-success">Payment</h3>
            <div className="mt-5">
              <PaymentForm data={apiResult} userInput={userInput}/>
            </div>
          </div>
        </div>
      </div>
    </Elements>
    </div>
  )
}

export default Payment