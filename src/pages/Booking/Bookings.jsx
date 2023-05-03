import { useDispatch, useSelector } from "react-redux";
import { Table } from "../../components/Table";
import { HashLoader } from "react-spinners";
import { useEffect } from "react";
import { fetchBookings } from "../../features/bookings/bookingThunks";
import { getBookingsData, getBookingsStatus } from "../../features/bookings/bookingsSlice";
import { Wrapper } from "../../components/LayoutStyled";


export const Bookings = (props) => {
  const dispatch = useDispatch();
  const bookingsStatus = useSelector(getBookingsStatus);
  const bookingsData = useSelector(getBookingsData);
 
  const tableTitles = [
    "Guest",
    "Order Date",
    "Check In",
    "Check Out",
    "Request",
    "Room Type",
    "Status",
    "Details",
    "Delete",
  ];


  useEffect(() => {
    if (bookingsStatus === "idle") {
      dispatch(fetchBookings());
   
    }
  }, [dispatch, bookingsStatus]);
  
  if (bookingsStatus === "pending") {
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
        <Table tableTitles={tableTitles} data={bookingsData} page={"bookings"} />
      </>
    );
  }

};



    
      