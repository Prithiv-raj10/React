import {useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';
import {useState} from 'react';
import { toastNotify } from '../../../Helper';


const PaymentForm = () => {

    const stripe = useStripe();
  const elements = useElements();
  const[isProcessing,setIsProcesssing]=useState(false);

  const handleSubmit = async (event : React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    setIsProcesssing(true);
    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "https://example.com/order/123/complete",
      },
      redirect:"if_required"
    });

    if (result.error) {
       toastNotify("An unexpected error occured");
       setIsProcesssing(false);
    } else {
        console.log(result);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button className='btn btn-success mt-5 w-100'>Submit</button>
    </form>
  );
};

export default PaymentForm;