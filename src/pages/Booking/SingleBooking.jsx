import {
  Card,
  CardContainer,
  CardImage,
  Booked,
  CardTitle,
  UserImage,
  CardItem,
  CardSeparator,
  CardAmenitie,
  TitleRow,
  FeaturesRow,
  CardImageText,
} from "../../components/CardStyled";
import { MySlider } from "../../components/Slider";
import { Navigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getBookingsStatus,
  getSingleBooking,
  getSingleBookingStatus,
} from "../../features/bookings/bookingsSlice";
import { useEffect } from "react";
import {
  fetchBookings,
  getBooking,
} from "../../features/bookings/bookingThunks";
import { bookedStatusCalc, dateConverter, totalPriceCalc } from "../../features/otherFunctions";
import { fetchRooms, getRoom } from "../../features/rooms/roomsThunks";
import {
  getRoomsStatus,
  getSingleRoom,
  getSingleRoomStatus,
} from "../../features/rooms/roomsSlice";
import { Wrapper } from "../../components/LayoutStyled";
import { HashLoader } from "react-spinners";

export const SingleBooking = (props) => {
  const bookingId = useParams();
  const dispatch = useDispatch();
  const bookingData = useSelector(getSingleBooking);
  const bookingsStatus = useSelector(getBookingsStatus);
  const singleBookingStatus = useSelector(getSingleBookingStatus);
  const singleRoomData = useSelector(getSingleRoom);
  const singleRoomStatus = useSelector(getSingleRoomStatus);
  const roomsStatus = useSelector(getRoomsStatus);

  useEffect(() => {
    if (bookingsStatus === "idle") {
      dispatch(fetchBookings());
      dispatch(fetchRooms());
    }
    if (singleBookingStatus === "idle" || bookingData) {
      if (bookingId.id !== bookingData.id) {
        dispatch(getBooking(bookingId.id));
      }
    }
  }, [
    dispatch,
    singleBookingStatus,
    bookingsStatus,
    bookingId.id,
    bookingData,
  ]);

  useEffect(() => {
    if (roomsStatus === "idle") {
      dispatch(fetchRooms());
    }
    if (singleBookingStatus === "fulfilled") {
      if (bookingData.room !== singleRoomData.id) console.log(bookingData.room);
      dispatch(getRoom(bookingData.room));
    }
  }, [dispatch, bookingData, roomsStatus, singleBookingStatus, singleRoomData]);

  if (
    bookingsStatus === "pending" ||
    singleBookingStatus === "pending" ||
    roomsStatus === "pending" ||
    singleRoomStatus === "pending" ||
    bookingsStatus === "idle" ||
    singleBookingStatus === "idle" ||
    roomsStatus === "idle" ||
    singleRoomStatus === "idle"
  ) {
    return (
      <Wrapper>
        <HashLoader color="#799283" size={100} />
      </Wrapper>
    );
  } else if (bookingData) {
    if (bookingData.room !== singleRoomData.id) {
      return (
        <Wrapper>
          <HashLoader color="#799283" size={100} />
        </Wrapper>
      );
    } else {
      return (
        <>
          <CardContainer full>
            <Card full>
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
                    {singleRoomData.roomType}-{singleRoomData.roomNumber}
                  </h4>
                </CardItem>
                <CardItem>
                  <h6>Price</h6>
                  <h4>{totalPriceCalc(singleRoomData.price, bookingData.checkIn, bookingData.checkOut)} $</h4>
                </CardItem>
              </FeaturesRow>
              <FeaturesRow>
                <CardItem paragraph>
                  <p>{bookingData.specialRequest}</p>
                </CardItem>
              </FeaturesRow>
              <FeaturesRow amenities>
                {singleRoomData.amenities.map((amenitie) => {
                  return (
                    <CardItem amenitie>
                      <CardAmenitie>{amenitie}</CardAmenitie>
                    </CardItem>
                  );
                })}
              </FeaturesRow>
            </Card>
            <CardImage>
              <MySlider></MySlider>

              <Booked
                bookStatus={bookedStatusCalc(
                  bookingData.checkIn,
                  bookingData.checkOut
                )}
              >
                {bookedStatusCalc(bookingData.checkIn, bookingData.checkOut)}
              </Booked>
              <CardImageText>
                <h4>{singleRoomData.roomType}</h4>
                <p>
                  {singleRoomData.description}
                </p>
              </CardImageText>
            </CardImage>
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
