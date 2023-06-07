import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { rentItemModel, userModel } from '../../../Interfaces'
import { RootState } from '../../../Storage/Redux/store'
import { removeFromBooking } from '../../../Storage/Redux/bookingSlice';
import { useUpdateBookingMutation } from '../../../Apis/bookingApi';


function BookingSummary() {
  const dispatch =useDispatch();
  const [updateBooking]=useUpdateBookingMutation();
 
    const bookingFromStore: rentItemModel[] =useSelector(
        (state: RootState) => state.bookingStore.rentItems?? []
    )
        console.log(bookingFromStore);
        const userData: userModel = useSelector(
          (state: RootState) => state.userAuthStore
        );

    if(!bookingFromStore)
    {
        <div>Booking is Empty!</div>
    }


   const handleRemove=(removeCar:Number,rentItem:rentItemModel)=>{
    if(removeCar==1)
    {
      console.log("removed");
      updateBooking({
        carListId:rentItem.carListId,
        userId:userData.id,
        removeCar:1
      })
      dispatch(removeFromBooking({rentItem,removeCar:1}))
     
    }
   }

    
  return (
    <div className="container p-4 m-2">
    <h4 className="text-center text-success">Booking Summary</h4>

    {bookingFromStore.map((rentItem:rentItemModel, index :number) =>(
        <div key={index}
        
        
        className="d-flex flex-sm-row flex-column align-items-center custom-card-shadow rounded m-3"
        style={{ background: "ghostwhite" }}
        >
          
        <div className="p-3">
        
          <img
            src={require(`../../../Assets/Images/${rentItem.carList?.image}`)}
            alt=""
            width={"120px"}
            className="rounded-circle"
          />
        </div>
  
        <div className="p-2 mx-3" style={{ width: "100%" }}>
          <div className="d-flex justify-content-between align-items-center">
            
            <h4 style={{ fontWeight: 300 }}>
           
               {rentItem.carList?.name}
            </h4>
            
            <h4>₹ {rentItem.carList?.rent}/day</h4>
          </div>
          <div className="flex-fill">
            <h4 className="text-danger">{rentItem.carList?.description}</h4>
          </div>
          <div className="d-flex justify-content-between">
            <div
              className="d-flex justify-content-between p-2 mt-2 rounded-pill custom-card-shadow  "
              style={{
                width: "100px",
                height: "43px",
              }}
            >
            </div>
  
            <button className="btn btn-danger mx-1" onClick={()=>handleRemove(1,rentItem)}>Remove</button>
          </div>
        </div>
      </div>
        ))}
    
  </div>
  )
}

export default BookingSummary