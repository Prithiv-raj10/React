import React, { useEffect, useState } from "react";
import { inputHelper, toastNotify } from "../../Helper";
import { useNavigate, useParams } from "react-router-dom";
import { useCreateCarItemMutation, useGetCarItemByIdQuery, useUpdateCarItemMutation } from "../../Apis/carItemApi";
import { MainLoader } from "../../Components/Page/Common";
const carItemData = {
    name: "",
    description: "",
    specialTag: "",
    category: "",
    rent: "",
  };
function CarItemUpsert() {
    const {id}=useParams();
    const navigate=useNavigate();
    const [carItemInputs, setCarItemInputs] = useState(carItemData);
    const [imageToStore, setImageToStore] = useState<any>();
  const [imageToDisplay, setImageToDisplay] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [createCarItem] = useCreateCarItemMutation();
  const [updateCarItem] = useUpdateCarItemMutation();
  const { data } = useGetCarItemByIdQuery(id);

//   console.log(data.value);
  useEffect(() => {
    if (data && data.value) {
      const tempData = {
        name: data.value.name,
        description: data.value.description,
        specialTag: data.value.specialTag,
        category: data.value.category,
        rent: data.value.rent,
      };
      setCarItemInputs(tempData);
      setImageToDisplay(require(`../../Assets/Images/${data.value.image!}`));
    }
  }, [data]);

    const handleCarItemInput = (
        e: React.ChangeEvent<
          HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
      ) => {
        const tempData = inputHelper(e, carItemInputs);
        setCarItemInputs(tempData);
      };


      const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
          const imgType = file.type.split("/")[1];
          const validImgTypes = ["jpeg", "jpg", "png"];
    
          const isImageTypeValid = validImgTypes.filter((e) => {
            return e === imgType;
          });
    
          if (file.size > 1000 * 1024) {
            setImageToStore("");
            toastNotify("File Must be less then 1 MB", "error");
            return;
          } else if (isImageTypeValid.length === 0) {
            setImageToStore("");
            toastNotify("File Must be in jpeg, jpg or png", "error");
            return;
          }
          
          // filereader to store img locally
      const reader = new FileReader();
      reader.readAsDataURL(file);
      setImageToStore(file);
      reader.onload = (e) => {
        const imgUrl = e.target?.result as string;
        setImageToDisplay(imgUrl);
      };
    }
};

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (!imageToStore && !id) {
      toastNotify("Please upload an image", "error");
      setLoading(false);
      return;
    }


const formData = new FormData();

formData.append("Name", carItemInputs.name);
formData.append("Description", carItemInputs.description);
formData.append("SpecialTag", carItemInputs.specialTag ?? "");
formData.append("Category", carItemInputs.category);
formData.append("Rent", carItemInputs.rent);
if (imageToDisplay) formData.append("ImageFile",imageToStore);

let response;
if (id) {
    //update
    formData.append("Id", id);
    response = await updateCarItem({ data: formData, id });
    console.log(formData);
    toastNotify("Menu Item updated successfully", "success");
  } else {
    //create
    response = await createCarItem(formData);
    toastNotify("Menu Item created successfully", "success");
  }

if (response) {
    setLoading(false);
    navigate("/carItem/caritemlist");
  }

  setLoading(false);
}


    

  return (
    <div className="container border mt-5 p-5 bg-light">
        {loading && <MainLoader />}
    <h3 className="px-2 text-success">{id ? "Edit Car" : "Add Car"}</h3>
    <form method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
      <div className="row mt-3">
        <div className="col-md-7">
          <input
            type="text"
            className="form-control"
            placeholder="Enter Name"
            name="name"
              value={carItemInputs.name}
              onChange={handleCarItemInput}
            required
          />
          <textarea
            className="form-control mt-3"
            placeholder="Enter Description"
            name="description"
              value={carItemInputs.description}
              onChange={handleCarItemInput}
          ></textarea>
          <input
            type="text"
            className="form-control mt-3"
            placeholder="Enter Special Tag"
            name="specialTag"
            value={carItemInputs.specialTag}
            onChange={handleCarItemInput}
          />
          <input
            type="text"
            className="form-control mt-3"
            placeholder="Enter Category"
            name="category"
            value={carItemInputs.category}
            onChange={handleCarItemInput}
          />
          <input
            type="number"
            className="form-control mt-3"
            required
            placeholder="Enter Rent"
            name="rent"
            value={carItemInputs.rent}
            onChange={handleCarItemInput}
          />
          <input type="file" className="form-control mt-3" onChange={handleFileChange} />
          <div className="text-center">
            <button
              type="submit"
              style={{ width: "50%" }}
              className="btn btn-success mt-5"
            >
              {id ? "Update" : "Create"}
            </button>
          </div>
        </div>
        <div className="col-md-5 text-center">
          <img
            src={imageToDisplay}
            style={{ width: "100%", borderRadius: "30px" }}
            alt=""
          />
        </div>
      </div>
    </form>
  </div>
  )
}


export default CarItemUpsert
