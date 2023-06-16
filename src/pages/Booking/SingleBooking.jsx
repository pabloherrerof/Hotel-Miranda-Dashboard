import {
  Card,
  CardContainer,
  CardImage,
  Booked,
  CardTitle,
  CardItem,
  CardSeparator,
  CardAmenitie,
  TitleRow,
  FeaturesRow,
  CardImageText,
  CardHeader,
  CloseIcon,
} from "../../components/Card/CardStyled";
import { MySlider } from "../../components/Slider/Slider";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getBookingsData,
  getBookingsStatus,
  getSingleBooking,
  getSingleBookingStatus,
} from "../../features/bookings/bookingsSlice";
import { useEffect, useState } from "react";
import { editBooking, fetchBookings, getBooking } from "../../features/bookings/bookingThunks";
import {
  bookedStatusCalc,
  dateConverter,
  dateToCalendar,
  totalPriceCalc,
  updateBookingDatesValidator,
} from "../../features/otherFunctions";
import { Wrapper } from "../../components/Layout/LayoutStyled";
import { HashLoader } from "react-spinners";
import { FiArrowLeftCircle, FiEdit } from "react-icons/fi";
import { Button } from "../../components/Button/Button";
import { Input, InputBig } from "../../components/Form/FormStyled";
import {
  getRoomsData,
  getRoomsStatus,
  getSingleRoom,
  getSingleRoomStatus,
} from "../../features/rooms/roomsSlice";
import { fetchRooms, getRoom } from "../../features/rooms/roomsThunks";
import { toastWarning } from "../../features/toastify";
import { roomAvailability } from "../../features/roomOccupancy";

export const SingleBooking = (props) => {
  const bookingId = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const bookingData = useSelector(getSingleBooking);
  const singleBookingStatus = useSelector(getSingleBookingStatus);
  const roomsStatus = useSelector(getRoomsStatus)
  const roomStatus = useSelector(getSingleRoomStatus);
  const roomData = useSelector(getSingleRoom);
  const roomsData = useSelector(getRoomsData);
  const bookingsData = useSelector(getBookingsData)
  const bookingsStatus = useSelector(getBookingsStatus)


  const [guestName, setGuestName] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [roomId, setRoomId] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [specialRequest, setSpecialRequest] = useState("");
  
  const [edit, setEdit] = useState(false);


  useEffect(() => {
    if ((singleBookingStatus === "idle")|| (singleBookingStatus ==="fulfilled" && bookingId.id !== bookingData.id)) {
        dispatch(getBooking(bookingId.id));
       
    }
    setGuestName(bookingData.name);
    setOrderDate(bookingData.orderDate);
    setRoomId(bookingData.room);
    setCheckIn(bookingData.checkIn);
    setCheckOut(bookingData.checkOut);
    setSpecialRequest(bookingData.specialRequest);
  }, [dispatch, singleBookingStatus, bookingId, bookingData]);

  useEffect(() => {
    if (bookingsStatus === "idle" && edit==="true") {
      dispatch(fetchBookings());
    }
  }, [dispatch, bookingsStatus, bookingsData, edit]);

 

  useEffect(() => {
    if (singleBookingStatus === "fulfilled" && roomsStatus === "idle") {
      dispatch(fetchRooms());
    }
  }, [dispatch, singleBookingStatus, roomsStatus]);

  useEffect(() => {
    if (singleBookingStatus === "fulfilled") {
      dispatch(getRoom(bookingData.room));
    }
  }, [bookingData, singleBookingStatus, dispatch]);

  

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (
      guestName === "" ||
      checkIn === "" ||
      checkOut === "" ||
      orderDate === "" ||
      roomId === ""
    ) {
      toastWarning("You have to enter all inputs!");
    } else if (!updateBookingDatesValidator(checkIn, checkOut)) {
      toastWarning("Invalid Dates!");
    } else if (!roomsData.find((room) => room.id === roomId)) {
      toastWarning("The room you've entered does not exists!");
    } else if(roomAvailability(roomId, bookingsData, checkIn, checkOut).length > 0){
      toastWarning("Room occupied on these dates!");
    }  else {
      const booking = {
        id: bookingData.id,
        name: guestName,
        checkIn: new Date(checkIn).toLocaleDateString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }),
        checkOut: new Date(checkOut).toLocaleDateString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }),
        orderDate: new Date(orderDate).toLocaleDateString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }),
        specialRequest: specialRequest,
        room: roomId,
      };
      dispatch(editBooking(booking));
      dispatch(getBooking(booking.id));
      dispatch(getRoom(roomId));
      setEdit(false);
    }
  };

 








if(singleBookingStatus === "rejected" || roomStatus === "rejected" || roomsStatus=== "rejected" || bookingsStatus==="rejected"){
  return (
    <>
      <Navigate to="/error" />
    </>
  );
} else {
   if (
    singleBookingStatus === "fulfilled" && roomsStatus === "fulfilled" &&
    roomStatus === "fulfilled" && roomData &&  bookingData.room === roomData.id
  ) {
    if (edit !== true) {
      return (
        <>
          <CardContainer full>
            <Card full>
              <CardHeader>
                <FiArrowLeftCircle
                  onClick={() => {
                    navigate("/bookings");
                  }}
                />
                <FiEdit
                  onClick={() => {
                    setEdit(true);
                  }}
                />
              </CardHeader>
              <TitleRow>
                <CardTitle>
                  <h2>{bookingData.name}</h2>
                  <h5>{bookingData.id}</h5>
                </CardTitle>
              </TitleRow>
              <FeaturesRow>
                <CardItem>
                  <h6>Check in</h6>
                  <h5>{dateConverter(bookingData.checkIn).date}, </h5>
                  <h5>{dateConverter(bookingData.checkIn).hour}</h5>
                </CardItem>
                <CardItem>
                  <h6>Check out</h6>
                  <h5>{dateConverter(bookingData.checkOut).date}, </h5>
                  <h5>{dateConverter(bookingData.checkOut).hour}</h5>
                </CardItem>
              </FeaturesRow>
              <CardSeparator />
              <FeaturesRow>
                <CardItem>
                  <h6>Room info</h6>
                  <h4>
                  {roomData.id==="R-0000" ? "ROOM DELETED" : roomData.roomType + "-" + roomData.roomNumber}
                  </h4>
                </CardItem>
                <CardItem>
                  <h6>Price</h6>
                  <h4>
                    {totalPriceCalc(
                      roomData.price,
                      bookingData.checkIn,
                      bookingData.checkOut
                    )}{" "}
                    $
                  </h4>
                </CardItem>
              </FeaturesRow>
              <FeaturesRow>
                <CardItem paragraph>
                  <p>{bookingData.specialRequest}</p>
                </CardItem>
              </FeaturesRow>
              <FeaturesRow amenities>
                {roomData.amenities.map((amenitie, i) => {
                  return (
                    <CardItem amenitie key={i}>
                      <CardAmenitie>{amenitie}</CardAmenitie>
                    </CardItem>
                  );
                })}
              </FeaturesRow>
            </Card>
            <CardImage>
              <MySlider data= {roomData.id==="R-0000" ? [roomData.thumbnail] : roomData.images} />

              <Booked
                bookStatus={bookedStatusCalc(
                  bookingData.checkIn,
                  bookingData.checkOut
                )}
              >
                {bookedStatusCalc(bookingData.checkIn, bookingData.checkOut)}
              </Booked>
              <CardImageText>
                <h4>{roomData.roomType}</h4>
                <p>{roomData.description}</p>
              </CardImageText>
            </CardImage>
          </CardContainer>
        </>
      );
    } else {
      return (
        <>
          <CardContainer>
            <Card>
              <CardHeader>
                <FiArrowLeftCircle
                  onClick={() => {
                    navigate("/bookings");
                  }}
                />
                <CloseIcon
                  onClick={() => {
                    setEdit(false);
                  }}
                />
              </CardHeader>
              <form onSubmit={onSubmitHandler}>
                <FeaturesRow>
                  <Input>
                    <h6>Guest Name</h6>
                    <input
                      type="text"
                      name="name"
                      defaultValue={bookingData.name}
                      onInput={(e) => {
                        setGuestName(e.target.value);
                      }}
                    />
                  </Input>
                </FeaturesRow>
                <FeaturesRow>
                  <CardItem>
                    <Input>
                      <h6>Check In</h6>
                      <input
                        type="date"
                        name="checkIn"
                        defaultValue={dateToCalendar(bookingData.checkIn)}
                        onInput={(e) => {
                          setCheckIn(e.target.value);
                        }}
                      />
                    </Input>
                  </CardItem>
                  <CardItem>
                    <Input>
                      <h6>Check Out</h6>
                      <input
                        type="date"
                        name="checkOut"
                        defaultValue={dateToCalendar(bookingData.checkOut)}
                        onInput={(e) => {
                          setCheckOut(e.target.value);
                        }}
                      />
                    </Input>
                  </CardItem>
                </FeaturesRow>
                <FeaturesRow>
                  <CardItem>
                    <Input>
                      <h6>Order Date</h6>
                      <input
                        type="date"
                        name="orderDate"
                        defaultValue={dateToCalendar(bookingData.orderDate)}
                        onInput={(e) => {
                          setOrderDate(e.target.value);
                        }}
                      />
                    </Input>
                  </CardItem>
                  <CardItem>
                    <Input>
                      <h6>Room</h6>
                      <input
                        type="text"
                        name="room"
                        defaultValue={bookingData.room}
                        onInput={(e) => {
                          setRoomId(e.target.value);
                        }}
                      />
                    </Input>
                  </CardItem>
                </FeaturesRow>
                <FeaturesRow>
                  <InputBig>
                    <h6>Special Request</h6>
                    <input
                      type="text"
                      name="specialRequest"
                      defaultValue={bookingData.specialRequest}
                      onInput={(e) => {
                        setSpecialRequest(e.target.value);
                      }}
                    />
                  </InputBig>
                </FeaturesRow>
                <CardSeparator />

                <FeaturesRow>
                  <Button>Save</Button>
                </FeaturesRow>
              </form>
            </Card>
          </CardContainer>
        </>
      );
    }
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
