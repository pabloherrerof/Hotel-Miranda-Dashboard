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
} from "../../components/CardStyled";
import { MySlider } from "../../components/Slider";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getSingleBooking,
  getSingleBookingStatus,
} from "../../features/bookings/bookingsSlice";
import { useEffect, useState } from "react";
import { editBooking, getBooking } from "../../features/bookings/bookingThunks";
import {
  bookedStatusCalc,
  dateConverter,
  totalPriceCalc,
} from "../../features/otherFunctions";
import { Wrapper } from "../../components/LayoutStyled";
import { HashLoader } from "react-spinners";
import { searchBookingRoom } from "../../features/API";
import { FiArrowLeftCircle, FiEdit } from "react-icons/fi";
import { Button } from "../../components/Button";
import { Input, InputBig } from "../../components/FormStyled";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

export const SingleBooking = () => {
  const bookingId = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const bookingData = useAppSelector(getSingleBooking);
  const singleBookingStatus = useAppSelector(getSingleBookingStatus);

  const [fieldError, setFieldError] = useState("");
  const [guestName, setGuestName] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [roomId, setRoomId] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [specialRequest, setSpecialRequest] = useState("");

  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (singleBookingStatus === "idle") {
      if(bookingData && bookingId){
        if (bookingId.id !== bookingData.id) {
          dispatch(getBooking(bookingId.id as string));
        }
      }
    }
    if(bookingData){
      setGuestName(bookingData.name);
      setOrderDate(bookingData.orderDate);
      setRoomId(bookingData.room);
      setCheckIn(bookingData.checkIn);
      setCheckOut(bookingData.checkOut);
      setSpecialRequest(bookingData.specialRequest);
    }
  }, [dispatch, singleBookingStatus, bookingId.id, bookingData]);


  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(guestName=== "" || checkIn ==="" || checkOut=== "" || orderDate==="" ||  roomId===""){
      setFieldError("You have to enter all inputs!")
      console.log(searchBookingRoom(roomId))
      
  } if(!searchBookingRoom(roomId)){
    setFieldError("The room you've entered does not exists!")
  }  else {
    if(bookingData){
      const booking = {
        id: bookingData.id,
        name: guestName,
        checkIn: checkIn,
        checkOut: checkOut,
        orderDate: orderDate,
        specialRequest: specialRequest,
        room: roomId,
    }
    console.log(booking);
    dispatch(editBooking(booking));
    dispatch(getBooking(booking.id))
    setEdit(false);
    setFieldError("");
    } 
} 
  };



  if (singleBookingStatus === "pending") {
    return (
      <Wrapper>
        <HashLoader color="#799283" size={100} />
      </Wrapper>
    );
  } else if (bookingData) {
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
                    {searchBookingRoom(bookingData.room).roomType}-
                    {searchBookingRoom(bookingData.room).roomNumber}
                  </h4>
                </CardItem>
                <CardItem>
                  <h6>Price</h6>
                  <h4>
                    {totalPriceCalc(
                      searchBookingRoom(bookingData.room).price,
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
                {searchBookingRoom(bookingData.room).amenities.map(
                  (amenitie, i) => {
                    return (
                      <CardItem key={i} amenitie>
                        <CardAmenitie>{amenitie}</CardAmenitie>
                      </CardItem>
                    );
                  }
                )}
              </FeaturesRow>
            </Card>
            <CardImage>
              <MySlider data={searchBookingRoom(bookingData.room).images}/>

              <Booked
                bookStatus={bookedStatusCalc(
                  bookingData.checkIn,
                  bookingData.checkOut
                )}
              >
                {bookedStatusCalc(bookingData.checkIn, bookingData.checkOut)}
              </Booked>
              <CardImageText>
                <h4>{searchBookingRoom(bookingData.room).roomType}</h4>
                <p>{searchBookingRoom(bookingData.room).description}</p>
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
                <p>{fieldError}</p>
                <CloseIcon
                  onClick={() => {
                    setEdit(false);
                    setFieldError("");
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
                      value={guestName}
                      onInput={(e) => {
                        setGuestName(e.currentTarget.value);
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
                        defaultValue={checkIn}
                        onInput={(e) => {
                          setCheckIn(e.currentTarget.value);
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
                        defaultValue={checkOut}
                        onInput={(e) => {
                          setCheckOut(e.currentTarget.value);
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
                        defaultValue={orderDate}
                        onInput={(e) => {
                          setOrderDate(e.currentTarget.value);
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
                        defaultValue={roomId}
                        onInput={(e) => {
                          setRoomId(e.currentTarget.value);
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
                        defaultValue={specialRequest}
                        onInput={(e) => {
                          setSpecialRequest(e.currentTarget.value);
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
        <Navigate to="/error" />
      </>
    );
  }
};
