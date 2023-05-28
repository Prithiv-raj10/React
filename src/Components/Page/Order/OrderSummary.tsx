import React from 'react'
import { orderSummaryProps } from './orderSummaryForm'

function OrderSummary({data,userInput}:orderSummaryProps) {
    console.log(data);
    // console.log(data.value.result.clientSecret);
    // console.log(data.result.clientSecret);
    const name=data.value.result.rentItems[0].carList.name;
    const total=data.value.result.total;
  return (
    <div>
      {" "}
      <h3 className="text-success">Order Summary</h3>
      <div className="mt-3">
        <div className="border py-3 px-2">Name : {userInput.name}</div>
        <div className="border py-3 px-2">Email : {userInput.email} </div>
        <div className="border py-3 px-2">Phone : {userInput.phoneNumber} </div>
        <div className="border py-3 px-2">
          <h4 className="text-success">Booking</h4>
          <div className="p-3">
            <div className="d-flex">
              <div className="d-flex w-100 justify-content-between">
                <p>{name}</p>
                {/* <p>Total</p> */}
              </div>
              <p style={{ width: "70px", textAlign: "right" }}>Total</p>
            </div>
            <hr />
            <h4 className="text-danger" style={{ textAlign: "right" }}>
            ₹{total}
            </h4>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderSummary