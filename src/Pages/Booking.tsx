import React from "react";
import { BookingSummary, CarPickUpDetails } from "../Components/Page/Booking";
import { withAuth } from "../HOC";


function Booking() {
  return (
    <div className="row w-100" style={{ marginTop: "10px" }}>
      <div className="col-lg-6 col-12" style={{ fontWeight: 300 }}>
        <BookingSummary />
      </div>
      <div className="col-lg-6 col-12 p-4 ">
        <CarPickUpDetails />
      </div>
    </div>
  );
}

export default withAuth(Booking);