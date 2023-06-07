import React, { useEffect} from 'react'
import { carListModel } from '../../../Interfaces';
import CarItemCard from './CarItemCard';
import { useGetCarItemsQuery } from '../../../Apis/carItemApi';
import { setCarItem } from '../../../Storage/Redux/carItemSlice';
import {useDispatch} from "react-redux";
import { MainLoader } from '../Common';


function CarItemList() {
    const dispatch = useDispatch();
    const {data,isLoading} = useGetCarItemsQuery(null);
    
  useEffect(()=>{
    if(!isLoading){
      dispatch(setCarItem(data.value));
    }
  },[data,isLoading,dispatch]);

if(isLoading){
  return <div><MainLoader /></div>;
}
console.log(data);
  return (
    <div className='container row'>
        { data && data.value.length > 0 &&
         data.value.map((carList: carListModel,index:number)=>(
            <CarItemCard carList={carList} key={index} />
         ))}
    </div>
  )
}

export default CarItemList;