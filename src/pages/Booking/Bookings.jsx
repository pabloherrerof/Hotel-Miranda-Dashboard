import { useDispatch, useSelector } from "react-redux";
import { HashLoader } from "react-spinners";
import { useEffect, useState } from "react";
import { fetchBookings } from "../../features/bookings/bookingThunks";
import {
  getBookingsData,
  getBookingsStatus,
} from "../../features/bookings/bookingsSlice";
import { Wrapper } from "../../components/Layout/LayoutStyled";
import { AiOutlineInfoCircle, AiOutlineSearch } from "react-icons/ai";
import { VscTrash } from "react-icons/vsc";
import {
  CustomDropdown,
  LeftActions,
  RightActions,
  SearchBar,
  StyledLink,
  TableActions,
  TableContainer,
  TableItem,
  TableLink,
  TableRow,
  TableTitle,
} from "../../components/Table/TableStyled";
import {
  Button,
  NotesButton,
  StatusButton,
} from "../../components/Button/Button";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { Modal } from "../../components/Modal/Modal";
import {
  bookedStatusCalc,
  dateConverter,
  tableDataSlicer,
  tableDataUnSlicer,
} from "../../features/otherFunctions";
import { getRoomsData, getRoomsStatus } from "../../features/rooms/roomsSlice";
import { fetchRooms } from "../../features/rooms/roomsThunks";
import { ErrorPage } from "../ErrorPage/ErrorPage";
import { Pagination } from "../../components/Pagination/Pagination";

export const Bookings = (props) => {
  const dispatch = useDispatch();
  const bookingsStatus = useSelector(getBookingsStatus);
  const bookingsData = useSelector(getBookingsData);
  const roomsStatus = useSelector(getRoomsStatus);
  const roomsData = useSelector(getRoomsData);

  const [showAll, setShowAll] = useState("true");
  const [showCheckIn, setShowCheckIn] = useState("false");
  const [showCheckOut, setShowCheckOut] = useState("false");
  const [showInProgress, setShowInProgress] = useState("false");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [targetId, setTargetId] = useState("");
  const [tableData, setTableData] = useState(tableDataSlicer(bookingsData));
  const [page, setPage] = useState(1);
  const [targetBooking, setTargetBooking] = useState();
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [orderValue, setOrderValue] = useState("ID");

  console.log(page);
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

  const options = ["Guest", "Date", "Check in", "Check out"];

  useEffect(() => {
    if (bookingsStatus === "idle") {
      dispatch(fetchBookings());
    }
    setTableData(tableDataSlicer(bookingsData));
  }, [dispatch, bookingsStatus, bookingsData]);

  useEffect(() => {
    if (roomsStatus === "idle" && bookingsStatus === "fulfilled") {
      dispatch(fetchRooms());
    }
  }, [dispatch, roomsStatus, bookingsStatus]);

  const onClickHandler = (e) => {
    const option = e.target.innerText;
    if (option === "All Bookings") {
      setOrderValue("ID");
      setShowAll("true");
      setShowCheckIn("false");
      setShowCheckOut("false");
      setShowInProgress("false");
      setTableData(tableDataSlicer(bookingsData));
      setPage(1)
    } else if (option === "Checking In") {
      setOrderValue("ID");
      setShowAll("false");
      setShowCheckIn("true");
      setShowCheckOut("false");
      setShowInProgress("false");
      setPage(1)
      const unslicedData = tableDataUnSlicer(bookingsData);
      const orderedUnsliceData = unslicedData.filter(
        (booking) =>
          bookedStatusCalc(booking.checkIn, booking.checkOut) === "CHECK IN"
      );
      setTableData(tableDataSlicer(orderedUnsliceData));
    } else if (option === "Checking Out") {
      setOrderValue("ID");
      setShowAll("false");
      setShowCheckIn("false");
      setShowCheckOut("true");
      setShowInProgress("false");
      setPage(1)
      const unslicedData = tableDataUnSlicer(bookingsData);
      const orderedUnsliceData = unslicedData.filter(
        (booking) =>
          bookedStatusCalc(booking.checkIn, booking.checkOut) === "CHECK OUT"
      );
      setTableData(tableDataSlicer(orderedUnsliceData));
    } else if (option === "In Progress") {
      setOrderValue("ID");
      setShowAll("false");
      setShowCheckIn("false");
      setShowCheckOut("false");
      setShowInProgress("true");
      setPage(1)
      const unslicedData = tableDataUnSlicer(bookingsData);
      const orderedUnsliceData = unslicedData.filter(
        (booking) =>
          bookedStatusCalc(booking.checkIn, booking.checkOut) === "IN PROGRESS"
      );
      setTableData(tableDataSlicer(orderedUnsliceData));
    }
  };

  const onSearchInputHandler = (e) => {
    const unslicedData = tableDataUnSlicer(tableData);
    const orderedUnsliceData = unslicedData.filter((user) =>
      user.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setTableData(tableDataSlicer(orderedUnsliceData));
    setPage(1)
    if (e.target.value === "") {
      if (showAll === "true") {
        setTableData(tableDataSlicer(bookingsData));
      }
      if (showCheckIn === "true") {
        const orderedUnsliceData = bookingsData.filter(
          (booking) =>
            bookedStatusCalc(booking.checkIn, booking.checkOut) === "CHECK IN"
        );
        setTableData(tableDataSlicer(orderedUnsliceData));
      }
      if (showCheckOut === "true") {
        const orderedUnsliceData = bookingsData.filter(
          (booking) =>
            bookedStatusCalc(booking.checkIn, booking.checkOut) === "CHECK OUT"
        );
        setTableData(tableDataSlicer(orderedUnsliceData));
      }
      if (showInProgress === "true") {
        const orderedUnsliceData = bookingsData.filter(
          (booking) =>
            bookedStatusCalc(booking.checkIn, booking.checkOut) ===
            "IN PROGRESS"
        );
        setTableData(tableDataSlicer(orderedUnsliceData));
      }
    }
  };

  const onChangeHandler = (e) => {
    if (e.value === "Guest") {
      setOrderValue("Guest");
      const unslicedData = tableDataUnSlicer(tableData);
      const orderedUnsliceData = unslicedData.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });
      setTableData(tableDataSlicer(orderedUnsliceData));
    }
    if (e.value === "Date") {
      setOrderValue("Date");
      const unslicedData = tableDataUnSlicer(tableData);
      const orderedUnsliceData = unslicedData.sort((a, b) => {
        if (new Date(a.orderDate).getTime() < new Date(b.orderDate).getTime())
          return -1;
        if (new Date(a.orderDate).getTime() > new Date(b.orderDate).getTime())
          return 1;
        return 0;
      });
      setTableData(tableDataSlicer(orderedUnsliceData));
    }
    if (e.value === "Check in") {
      setOrderValue("Check in");
      const unslicedData = tableDataUnSlicer(tableData);
      const orderedUnsliceData = unslicedData.sort((a, b) => {
        if (new Date(a.checkIn).getTime() < new Date(b.checkIn).getTime())
          return -1;
        if (new Date(a.checkIn).getTime() > new Date(b.checkIn).getTime())
          return 1;
        return 0;
      });
      setTableData(tableDataSlicer(orderedUnsliceData));
    }
    if (e.value === "Check out") {
      setOrderValue("Check out");
      const unslicedData = tableDataUnSlicer(tableData);
      const orderedUnsliceData = unslicedData.sort((a, b) => {
        if (new Date(a.checkOut).getTime() < new Date(b.checkOut).getTime())
          return -1;
        if (new Date(a.checkOut).getTime() > new Date(b.checkOut).getTime())
          return 1;
        return 0;
      });
      setTableData(tableDataSlicer(orderedUnsliceData));
    }
  };

  if (bookingsStatus === "rejected" || roomsStatus === "rejected") {
    return (
      <>
        <ErrorPage />
      </>
    );
  } else {
    if (
      bookingsStatus === "fulfilled" &&
      roomsStatus === "fulfilled" &&
      tableData &&
      roomsData
    ) {
      return (
        <>
          <TableActions>
            <LeftActions>
              <TableLink active={showAll} onClick={onClickHandler}>
                All Bookings
              </TableLink>
              <TableLink active={showCheckIn} onClick={onClickHandler}>
                Checking In
              </TableLink>
              <TableLink active={showCheckOut} onClick={onClickHandler}>
                Checking Out
              </TableLink>
              <TableLink active={showInProgress} onClick={onClickHandler}>
                In Progress
              </TableLink>
            </LeftActions>
            <RightActions>
              <SearchBar>
                <AiOutlineSearch />
                <input
                  type="text"
                  name="users"
                  id="users"
                  onChange={onSearchInputHandler}
                  placeholder="Search By Guestname"
                />
              </SearchBar>
              {showAll === "true" ? (
                <Button
                  onClick={() => {
                    setShowCreateModal(true);
                  }}
                >
                  + New
                </Button>
              ) : (
                ""
              )}
              <CustomDropdown
                arrowOpen={<MdOutlineKeyboardArrowUp />}
                arrowClosed={<MdOutlineKeyboardArrowDown />}
                options={options}
                onChange={onChangeHandler}
                value={orderValue}
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
              {tableData.length > 0
                ? tableData[page - 1].map((element, index) => {
                    const room = roomsData.find(
                      (room) => room.id === element.room
                    );
                    return (
                      <TableRow key={element.id}>
                        <TableItem>
                          {element.name}
                          <p>{element.id}</p>
                        </TableItem>
                        <TableItem>
                          {dateConverter(element.orderDate).date}
                          <p>{dateConverter(element.orderDate).hour}</p>
                        </TableItem>
                        <TableItem>
                          {dateConverter(element.checkIn).date}
                          <p>{dateConverter(element.checkIn).hour}</p>
                        </TableItem>
                        <TableItem>
                          {dateConverter(element.checkOut).date}
                          <p>{dateConverter(element.checkOut).hour}</p>
                        </TableItem>
                        <TableItem>
                          <NotesButton
                            onClick={() => {
                              setTargetBooking(element);
                              setShowNotesModal(true);
                            }}
                          >
                            View Notes
                          </NotesButton>
                        </TableItem>
                        <TableItem>
                          {room.id === "R-0000"
                            ? "ROOM DELETED"
                            : room.roomType + "-" + room.roomNumber}
                          {}
                        </TableItem>
                        <TableItem>
                          <StatusButton
                            status={bookedStatusCalc(
                              element.checkIn,
                              element.checkOut
                            )}
                          >
                            {bookedStatusCalc(
                              element.checkIn,
                              element.checkOut
                            )}
                          </StatusButton>
                        </TableItem>
                        <TableItem>
                          <StyledLink to={`/bookings/${element.id}`}>
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
                    );
                  })
                : ""}
            </tbody>
          </TableContainer>
         

          <Modal
            mode="delete"
            page={"bookings"}
            showDeleteModal={showDeleteModal}
            setShowDeleteModal={setShowDeleteModal}
            itemId={targetId}
          />
          <Modal
            mode="create"
            page={"bookings"}
            setShowCreateModal={setShowCreateModal}
            showCreateModal={showCreateModal}
          />
          <Modal
            mode="moreInfo"
            page={"bookings"}
            setShowNotesModal={setShowNotesModal}
            showNotesModal={showNotesModal}
            targetBooking={targetBooking}
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
