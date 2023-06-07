import React from 'react';
import { Footer, Header } from '../Components/Layout/Index';
import { AccessDenied, AuthenticationTest, AuthenticationTestAdmin, Booking, CarItemDetails, CarItemList, CarItemUpsert, Home, Login, NotFound,  OrderConfirmed,  Payment,  Register } from '../Pages';
import {Routes,Route} from "react-router-dom";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetBookingQuery } from '../Apis/bookingApi';
import { setBooking } from '../Storage/Redux/bookingSlice';
import { setLoggedInUser } from '../Storage/Redux/userAuthSlice';
import { userModel } from '../Interfaces';
import jwt_decode from "jwt-decode";
import { RootState } from '../Storage/Redux/store';
import MyOrders from '../Pages/Order/MyOrders';
import AllOrders from '../Pages/Order/AllOrders';

function App() {
  const dispatch= useDispatch();

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (localToken) {
      const { fullName, id, email, role }: userModel = jwt_decode(localToken);
      dispatch(setLoggedInUser({ fullName, id, email, role }));
    }
  }, []);

  const userData = useSelector(
    (state: RootState) => state.userAuthStore
  );

  const {data,isLoading} = useGetBookingQuery(userData.id);
  useEffect(() =>
  {
    if(! isLoading)
    {
      dispatch(setBooking(data.result?.rentItems));
    }

  },[data]);
  return (
    <div>
      <Header />
      <div className='pb-5'>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/carItemDetails/:carItemId" element={<CarItemDetails />}></Route>
          <Route path="/booking" element={<Booking />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/authentication" element={<AuthenticationTest />}></Route>
          <Route path="/authorization" element={<AuthenticationTestAdmin />}></Route>
          <Route path="/accessDenied" element={<AccessDenied />} />
          <Route path="/payment" element={<Payment />}></Route>
          <Route path="order/orderconfirmed/:id" element={<OrderConfirmed />}></Route>
          <Route path="/order/myOrders" element={<MyOrders />}></Route>
          <Route path="/order/allOrders" element={<AllOrders />}></Route>
          <Route path="/carItem/caritemList" element={<CarItemList />}></Route>
          <Route path="/carItem/caritemupsert/:id" element={<CarItemUpsert />}></Route>
          <Route path="/carItem/caritemupsert" element={<CarItemUpsert />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
