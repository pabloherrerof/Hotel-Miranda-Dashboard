import { useDispatch, useSelector } from "react-redux";
import {
  Table,
} from "../../components/Table";
import { HashLoader } from "react-spinners";
import styled from "styled-components";
import { useEffect } from "react";
import { addBooking, fetchBookings } from "../../features/bookings/bookingThunks";
import { getBookingsData, getBookingsStatus } from "../../features/bookings/bookingsSlice";
import { TableActions } from "../../components/TableStyled";
import { AddButton } from "../../components/Button";
import { addUser } from "../../features/users/usersThunks";


const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;


export const Booking = (props) => {
  const dispatch = useDispatch();
  const getStatus = useSelector(getBookingsStatus);
  const getData = useSelector(getBookingsData);
  console.log(getData)
  const tableTitles = [
    "Room Name",
    "Amenities",
    "Price",
    "Offer Price",
    "Status",
    "Details",
    "Delete",
  ];

  useEffect(() => {
    if (getStatus === "idle") {
      dispatch(fetchBookings());
    }
  }, [dispatch, getStatus]);

  

  const onAddClickHandler = () => {};

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



    
      