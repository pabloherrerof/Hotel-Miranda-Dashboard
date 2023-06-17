import { useDispatch, useSelector } from "react-redux";
import { getRoomsData, getRoomsStatus } from "../../features/rooms/roomsSlice";
import { useEffect } from "react";
import { fetchRooms } from "../../features/rooms/roomsThunks";
import { HashLoader } from "react-spinners";
import { Wrapper } from "../../components/Layout/LayoutStyled";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { VscTrash } from "react-icons/vsc";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { Modal } from "../../components/Modal/Modal";
import { useState } from "react";
import {
  ImageItem,
  LeftActions,
  RoomImageItem,
  StyledLink,
  TableContainer,
  TableItem,
  TableRow,
  TableTitle,
} from "../../components/Table/TableStyled";
import { Button, StatusButton } from "../../components/Button/Button";
import { offerPriceCalc, tableDataSlicer, tableDataUnSlicer } from "../../features/otherFunctions";
import {
  CustomDropdown,
  RightActions,
  TableActions,
} from "../../components/Table/TableStyled";
import { ErrorPage } from "../ErrorPage/ErrorPage";
import { getBookingsData, getBookingsStatus } from "../../features/bookings/bookingsSlice";
import { roomStatusCalc } from "../../features/roomOccupancy";
import { fetchBookings } from "../../features/bookings/bookingThunks";
import { Pagination } from "../../components/Pagination/Pagination";

export const Rooms = (props) => {
  const dispatch = useDispatch();
  const roomsStatus = useSelector(getRoomsStatus);
  const roomsData = useSelector(getRoomsData);
  const bookingsData = useSelector(getBookingsData);
  const bookingsStatus = useSelector(getBookingsStatus);
  const [targetId, setTargetId] = useState("");
  const [tableData, setTableData] = useState(tableDataSlicer(roomsData));
  const [page, setPage] = useState(1);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const tableTitles = [
    "Room Name",
    "Amenities",
    "Price",
    "Offer Price",
    "Status",
    "Details",
    "Delete",
  ];

  const options = ["Room Number", "State", "Lowest Price", "Highest Price"];

  useEffect(() => {
    if (roomsStatus === "idle") {
      dispatch(fetchRooms());
    }
    setTableData(tableDataSlicer(roomsData));
  }, [dispatch, roomsStatus, roomsData , tableData.length]);

  useEffect(() => {
    if (bookingsStatus === "idle") {
      dispatch(fetchBookings());
    }
  }, [dispatch, bookingsStatus, bookingsData]);
  

  const onChangeHandler = (e) => {
    if (e.value === "Room Number") {
      const unslicedData = tableDataUnSlicer(tableData);
      const orderedUnsliceData = unslicedData.sort((a, b) => {
          if (Number(a.roomNumber) < Number(b.roomNumber)) return -1;
          if (Number(a.roomNumber) > Number(b.roomNumber)) return 1;
          return 0;
        })
        setTableData(tableDataSlicer(orderedUnsliceData));
    }
    if (e.value === "State") {
      const unslicedData = tableDataUnSlicer(tableData);
      const orderedUnsliceData = unslicedData.sort((a, b) => {
          if (roomStatusCalc(a.id, bookingsData) === "AVAILABLE") return -1;
          if (roomStatusCalc(a.id, bookingsData) === "BOOKED") return 1;
          return 0;
        })
        setTableData(tableDataSlicer(orderedUnsliceData));
    }

    if (e.value === "Lowest Price") {
      const unslicedData = tableDataUnSlicer(tableData);
      const orderedUnsliceData = unslicedData.sort((a, b) => {
          if (a.price < b.price) return -1;
          if (a.price > b.price) return 1;
          return 0;
        })
        setTableData(tableDataSlicer(orderedUnsliceData));
    }

    if (e.value === "Highest Price") {
      
      const unslicedData = tableDataUnSlicer(tableData);
      const orderedUnsliceData = unslicedData.sort((a, b) => {
          if (a.price > b.price) return -1;
          if (a.price < b.price) return 1;
          return 0;
        })
        setTableData(tableDataSlicer(orderedUnsliceData));
    }
  }; 


  if(roomsStatus === "rejected" || bookingsStatus==="rejected"){
    return (
        <ErrorPage/>
    );
  } else {
   if (roomsStatus === "fulfilled" &&  bookingsStatus==="fulfilled" && bookingsData && tableData.length > 0) {
    return (
      <>
        <TableActions>
          <LeftActions></LeftActions>
          <RightActions>
            <Button
              onClick={() => {
                setShowCreateModal(true);
              }}
            >
              + New{" "}
            </Button>
            <CustomDropdown
              arrowOpen={<MdOutlineKeyboardArrowUp />}
              arrowClosed={<MdOutlineKeyboardArrowDown />}
              options={options}
              onChange={onChangeHandler}
              value={"ID"}
              room
            />
          </RightActions>
        </TableActions>
        <Pagination page={page} setPage={setPage} data={tableData} />
        <TableContainer>
          <thead>
            <TableTitle>
              {tableTitles.map((element) => (
                <th key={tableTitles.indexOf(element)}>{element}</th>
              ))}
            </TableTitle>
          </thead>
          <tbody>
            {console.log(page)}
            {tableData[page-1].map((element) => {if(element.id === "R-0000"){
              return "";
            }else return(
              <TableRow key={element.id}>
                <TableItem>
                  <ImageItem>
                    <RoomImageItem src={element.thumbnail} alt="room" />
                    <div>
                      {element.roomType + "-" + element.roomNumber}
                      <p>{element.id}</p>
                    </div>
                  </ImageItem>
                </TableItem>
                <TableItem>
                  {<p>{element.amenities.join(", ")}</p> }
                </TableItem>
                <TableItem price discount={element.discount}>
                  {element.price + "$"} <p>{"/per night"}</p>
                </TableItem>
                <TableItem offer discount={element.discount}>
                  {offerPriceCalc(element.price, element.discount)}
                  <p>{element.discount > 0 ? "/per night" : ""}</p>
                </TableItem>
                <TableItem>
                  <StatusButton status={roomStatusCalc(element.id, bookingsData)}>
                    {roomStatusCalc(element.id, bookingsData)}
                  </StatusButton>
                </TableItem>
                <TableItem>
                  <StyledLink to={`/rooms/${element.id}`}>
                    <AiOutlineInfoCircle />
                  </StyledLink>
                </TableItem>
                <TableItem>
                  <VscTrash
                    onClick={() => {
                      setShowDeleteModal(true);
                      setTargetId(element.id);
                    }}
                  />
                </TableItem>
              </TableRow>
            )})}
          </tbody>
        </TableContainer>
        <Modal
          mode="delete"
          page={"rooms"}
          showDeleteModal={showDeleteModal}
          setShowDeleteModal={setShowDeleteModal}
          itemId={targetId}
        />
        <Modal
          mode="create"
          page={"rooms"}
          setShowCreateModal={setShowCreateModal}
          showCreateModal={showCreateModal}
        />
      </>
    );
  } else {
    return (
      <>
        <Wrapper>
          <HashLoader color="#799283" size={100} />
        </Wrapper>
      </>
    );
  }
}
};
