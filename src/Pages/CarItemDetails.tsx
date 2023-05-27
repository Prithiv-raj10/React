import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetCarItemByIdQuery } from '../Apis/carItemApi';
import { useNavigate } from "react-router-dom";
import {useState} from "react";
import { useUpdateBookingMutation } from '../Apis/bookingApi';
import { MainLoader, MiniLoader } from '../Components/Page/Common';
import { apiResponse, userModel } from '../Interfaces';
import { toastNotify } from '../Helper';
import { RootState } from '../Storage/Redux/store';
import { useSelector } from 'react-redux';


function CarItemDetails() {
  
  const {carItemId} =useParams();
  const {data,isLoading} =useGetCarItemByIdQuery(carItemId);
  const navigate = useNavigate();
  const [isAddingToBook,setIsAddingToBook]=useState<boolean>(false);
const [updateBooking] =useUpdateBookingMutation();

// only register user can rent car
const userData: userModel = useSelector(
  (state: RootState) => state.userAuthStore
);

const handleAddToBook = async (carItemId:number) =>{

  // if not registered , send to login page
  if (!userData.id) {
    navigate("/login");
    return;
  }
  setIsAddingToBook(true);
  const response :apiResponse=await updateBooking({
    carListId: carItemId,
    userId: userData.id,

  });

  if(response.data){
    const mes=response.data.message;
    if(mes){
    toastNotify(mes);}
}

  setIsAddingToBook(false);
}
  return (
    
    <div className="container pt-4 pt-md-5">

  {!isLoading? (
   
    <div className="row">
    <div className="col-7">
      <h2 className="text-success">{data.value?.name}</h2>
      <span>
        <span
          className="badge text-bg-dark pt-2"
          style={{ height: "40px", fontSize: "20px" }}
        >
          {data.value?.category}
        </span>
      </span>
      <span>
        <span
          className="badge text-bg-light pt-2"
          style={{ height: "40px", fontSize: "20px" }}
        >
          {data.value?.specialTag}
        </span>
      </span>
      <p style={{ fontSize: "20px" }} className="pt-2">
      {data.value?.description}
      </p>
      <span className="h3">₹ {data.value?.rent}/day</span> &nbsp;
      {/* <span
        className="pb-2  p-3"
        style={{ border: "1px solid #333", borderRadius: "30px" }}
      >
        <i
          className="bi bi-dash p-1"
          style={{ fontSize: "25px", cursor: "pointer" }}
        ></i>
        <span className="h3 mt-3 px-3">XX</span>
        <i
          className="bi bi-plus p-1"
          style={{ fontSize: "25px", cursor: "pointer" }}
        ></i>
      </span> */}
      <div className="row pt-4">
        <div className="col-5">
          {isAddingToBook?(
            <button disabled className='btn btn-success form-control'>
              <MiniLoader />
            </button>
          ):
          (<button className="btn btn-success form-control" onClick={()=>handleAddToBook(data.value?.id)}>
            Rent Car
          </button>)}
          
        </div>

        <div className="col-5 ">
          <button className="btn btn-secondary form-control" onClick={() => navigate(-1)}>
            Back to Home
          </button>
        </div>
      </div>
    </div>
    <div className="col-5">
      <img
        src={require(`../Assets/Images/${data.value?.image}`)}
        width="100%"
        style={{ borderRadius: "50%" }}
        alt="No content"
      ></img>
    </div>
  </div>
  ): (
  <div
        className="d-flex justify-content-center"
        style={{width:"100%"}}
        >
        <MainLoader />
        </div>
        )}
      
    </div>
  );
}

export default CarItemDetails;