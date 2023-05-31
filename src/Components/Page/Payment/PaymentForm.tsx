import {useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';
import {useState} from 'react';
import { toastNotify } from '../../../Helper';
import { orderSummaryProps } from '../Order/orderSummaryProps';
import { apiResponse, rentItemModel } from '../../../Interfaces';
import { useCreateOrderMutation } from '../../../Apis/orderApi';
import { SD_Status } from '../../../Utility/SD';
import { Navigate, useNavigate } from 'react-router-dom';


const PaymentForm = ({data,userInput}:orderSummaryProps) => {
    const navigate=useNavigate();
    const stripe = useStripe();
  const elements = useElements();
  const [createOrder]=useCreateOrderMutation();
  const[isProcessing,setIsProcesssing]=useState(false);

  console.log("data");
  console.log(data);

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
    } 
    else 
    {
        console.log("Result");
        console.log(result);
        console.log(result.paymentIntent.status);
        console.log(data.value.result.rentItems);
    

        // "pickupName": "string",
        // "pickupPhoneNumber": "string",
        // "pickupEmail": "string",
        // "applicationUserId": "string",
        // "orderTotal": 0,
        // "stripePaymentIntentID": "string",
        // "status": "string",
        // "orderDetailsDTO": [
        //   {
        //     "carListId": 0,
        //     "itemName": "string",
        //     "price": 0
        //   }
        // ]
      const orderDetailsDTO: any = [];
      let total=0;
      data.value.result.rentItems.forEach((item: rentItemModel) => {
        const tempOrderDetail: any = {};
        tempOrderDetail["carListId"] = item.carListId
        tempOrderDetail["itemName"] = item.carList?.name
        tempOrderDetail["price"] = item.carList?.rent;
        total+=item.carList?.rent!;
        orderDetailsDTO.push(tempOrderDetail);
      });
      console.log("OD");
      console.log(orderDetailsDTO);
      console.log(data.value.result.userId);
   console.log(data.value.result.stripePaymentIntentId);


      const response: apiResponse = await createOrder({
        pickupName: userInput.name,
        pickupPhoneNumber: userInput.phoneNumber,
        pickupEmail: userInput.email,
        orderTotal: total,
        orderDetailsDTO:orderDetailsDTO,
        stripePaymentIntentID: data.value.result.stripePaymentIntentId,
        applicationUserId: data.value.result.userId,
        status:
          result.paymentIntent.status === "succeeded"
            ? SD_Status.CONFIRMED
            : SD_Status.PENDING,
        
    });
    console.log(response);
    if(response){
      if(response.data?.result.value.result.status===SD_Status.CONFIRMED){
          navigate(`/order/orderConfirmed/${response.data?.result.value.result.orderHeaderId}`)
      }
      else{
        navigate("/failed");
      }
    }
  }
    
  setIsProcesssing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button disabled={!stripe || isProcessing} className='btn btn-success mt-5 w-100'>Submit</button>
    </form>
  );
};

export default PaymentForm;