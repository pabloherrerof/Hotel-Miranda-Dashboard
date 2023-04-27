import { useDispatch, useSelector } from "react-redux";
import { Table } from "../../components/Table";
import { HashLoader } from "react-spinners";
import { useEffect } from "react";
import { fetchBookings } from "../../features/bookings/bookingThunks";
import { getBookingsData, getBookingsStatus } from "../../features/bookings/bookingsSlice";
import { Wrapper } from "../../components/LayoutStyled";


export const Bookings = (props) => {
  const dispatch = useDispatch();
  const getStatus = useSelector(getBookingsStatus);
  const getData = useSelector(getBookingsData);
  const tableTitles = [
    "Guest",
    "Order Date",
    "Check In",
    "Check Out",
    "Special Request",
    "Room Type",
    "Status",
    "Details",
    "Delete",
  ];


  useEffect(() => {
    if (getStatus === "idle") {
      dispatch(fetchBookings());
   
    }
  }, [dispatch, getStatus]);

  console.log(getData)
  
  if (getStatus === "pending") {
    return (
      <>
        <Wrapper>
          <HashLoader color="#799283" size={100} />
        </Wrapper>
      </>
    );
  } else {
    return (
      <>
        <Table tableTitles={tableTitles} data={getData} page={"bookings"} />
      </>
    );
  }

};



    
      