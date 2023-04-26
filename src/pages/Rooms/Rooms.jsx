import { Table } from "../../components/Table";
import { useDispatch, useSelector } from "react-redux";
import { getRoomData, getRoomStatus } from "../../features/rooms/roomsSlice";
import { useEffect } from "react";
import { fetchRooms } from "../../features/rooms/roomsThunks";
import { HashLoader } from "react-spinners";
import styled from "styled-components";


const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Rooms = (props) => {
  const dispatch = useDispatch();
  const getStatus = useSelector(getRoomStatus);
  const getData = useSelector(getRoomData);
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
      dispatch(fetchRooms());
    }
  }, [dispatch, getStatus]);



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
        <Table tableTitles={tableTitles} data={getData} page={"rooms"} />
      </>
    );
  }
};
