import { Table } from "../../components/Table";
import { useDispatch, useSelector } from "react-redux";
import { getRoomsData, getRoomsStatus } from "../../features/rooms/roomsSlice";
import { useEffect } from "react";
import { fetchRooms } from "../../features/rooms/roomsThunks";
import { HashLoader } from "react-spinners";
import { Wrapper } from "../../components/LayoutStyled";


export const Rooms = (props) => {
  const dispatch = useDispatch();
  const roomsStatus = useSelector(getRoomsStatus);
  const roomsData = useSelector(getRoomsData);
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
    if (roomsStatus === "idle") {
      dispatch(fetchRooms());
    }
  }, [dispatch, roomsStatus]);


  if (roomsStatus === "pending") {
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
        <Table tableTitles={tableTitles} data={roomsData} page={"rooms"} />
      </>
    );
  }
};
