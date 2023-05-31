import React from 'react'
import { useDeleteCarItemMutation, useGetCarItemsQuery } from '../../Apis/carItemApi'
import { MainLoader } from '../../Components/Page/Common';
import { carListModel } from '../../Interfaces';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function CarItemList() {
    const [deleteCarItem]=useDeleteCarItemMutation();
    const {data,isLoading}= useGetCarItemsQuery(null);
    const navigate=useNavigate();
    console.log(data);

    const handleCarItemDelete = async (id: number) => {
        
        toast.promise(
            deleteCarItem(id),
          {
            pending: "Processing your request...",
            success: "Car Item Deleted Successfully 👌",
            error: "Error encoutnered 🤯",
          },
          {
            theme: "dark",
          }
        );
      }
  return (
    <>
    {isLoading && <MainLoader />}
    {!isLoading && (
        <div className="table p-5">
        <div className="d-flex align-items-center justify-content-between">
          <h1 className="text-success">Car List</h1>
          <button className="btn btn-success" onClick={()=>navigate("/caritem/caritemupsert/")}>Add New</button>
        </div>
        <div className="p-2">
          <div className="row border">
            <div className="col-1">Image</div>
            <div className="col-1">ID</div>
            <div className="col-2">Name</div>
            <div className="col-2">Category</div>
            <div className="col-1">Rent</div>
            <div className="col-2">Special Tag</div>
            <div className="col-1">Action</div>
          </div>

          {data.value.map((carItem:carListModel)=>{
            return(
                <div className="row border" key={carItem.id}>
            <div className="col-1">
              <img
                src={require(`../../Assets/Images/${carItem.image}`)}
                alt="no content"
                style={{ width: "100%", maxWidth: "120px" }}
              />
            </div>
            <div className="col-1">{carItem.id}</div>
            <div className="col-2">{carItem.name}</div>
            <div className="col-2">{carItem.category}</div>
            <div className="col-1">₹ {carItem.rent}</div>
            <div className="col-2">{carItem.specialTag}</div>
            <div className="col-1">
              <button className="btn btn-success"  onClick={()=>navigate("/caritem/caritemupsert/"+carItem.id)}>
                <i className="bi bi-pencil-fill"></i>
              </button>
              <button className="btn btn-danger mx-2" onClick={() => handleCarItemDelete(carItem.id)}>
                <i className="bi bi-trash-fill"></i>
              </button>
            </div>
          </div>
            )
          })}
          </div>
      </div>
      )}
    </>
  );
    
}

export default CarItemList