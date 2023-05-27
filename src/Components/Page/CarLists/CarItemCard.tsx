import React from 'react'
import { apiResponse, carListModel, userModel } from '../../../Interfaces';
import {Link} from "react-router-dom";
import {useState} from "react";
import { useUpdateBookingMutation } from '../../../Apis/bookingApi';
import { MiniLoader } from '../Common';
import { toastNotify } from '../../../Helper';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Storage/Redux/store';
import { useNavigate } from "react-router-dom";


interface Props {
    carList:carListModel;
}

function CarItemCard(props:Props) {
    let img2=require(`../../../Assets/Images/${props.carList.image}`);
    const navigate = useNavigate();
    const [isAddingToBook,setIsAddingToBook]=useState<boolean>(false);
    const [updateBooking] =useUpdateBookingMutation();
    const userData: userModel = useSelector(
      (state: RootState) => state.userAuthStore
    );

    const handleAddToBook = async (carItemId:number) =>{

      if (!userData.id) {
        navigate("/login");
        return;
      }
      
      setIsAddingToBook(true);
      const response: apiResponse=await updateBooking({
        carListId: carItemId,
        userId: userData.id,
    
      });

     
    

      // union type compiler can't be sure
      if(response.data){
        const mes=response.data.message;
        if(mes){
        toastNotify(mes);}
    }
    
      setIsAddingToBook(false);
    }

  return (
    <div className="col-md-4 col-12 p-4">
      <div
        className="card"
        style={{ boxShadow: "0 1px 7px 0 rgb(0 0 0 / 50%)" }}
      >
        <div className="card-body pt-2">
          <div className="row col-10 offset-1 p-4">
            <Link to={`/carItemDetails/${props.carList.id}`}>
            <img
              src={img2}
              style={{ borderRadius: "50%" }}
              alt=""
              className="w-100 mt-5 image-box"
            />
            </Link>
          </div>
          {props.carList.specialTag && props.carList.specialTag.length>0 && ( <i
            className="bi bi-star btn btn-success"
            style={{
              position: "absolute",
              top: "15px",
              left: "15px",
              padding: "5px 10px",
              borderRadius: "3px",
              outline: "none !important",
              cursor: "pointer",
            }}
          >
            &nbsp; {props.carList.specialTag}
          </i>)}
         
          

         {isAddingToBook?(
          <div
            style={{
                position: "absolute",
                top: "15px",
                right: "15px",
              }}
            >
              <MiniLoader />
          </div>
         ):(
            <i
            className="bi bi-car-front-fill btn btn-outline-danger"
            style={{
              position: "absolute",
              top: "15px",
              right: "15px",
              padding: "5px 10px",
              borderRadius: "3px",
              outline: "none !important",
              cursor: "pointer",
            }}
            onClick={()=>handleAddToBook(props.carList.id)}
          ></i>

         )} 
          
          <div className="text-center">
            <p className="card-title m-0 text-success fs-3">
            <Link to={`/carItemDetails/${props.carList.id}`}
            style={{textDecoration:"none",color:"green"}}>
              {props.carList.name}
              </Link>
              </p>
            <p className="badge bg-secondary" style={{ fontSize: "12px" }}>
              {props.carList.category}
            </p>
          </div>
          <p className="card-text" style={{ textAlign: "center" }}>
            {props.carList.description}
          </p>
          <div className="row text-center">
            <h4>₹{props.carList.rent}/day</h4>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CarItemCard;