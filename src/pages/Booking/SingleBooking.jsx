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
} from "../../components/CardStyled";
import { MySlider } from "../../components/Slider";
import { Navigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getSingleBooking,
  getSingleBookingStatus,
} from "../../features/bookings/bookingsSlice";
import { useEffect } from "react";
import {
  getBooking,
} from "../../features/bookings/bookingThunks";
import { bookedStatusCalc, dateConverter, totalPriceCalc } from "../../features/otherFunctions";
import { Wrapper } from "../../components/LayoutStyled";
import { HashLoader } from "react-spinners";
import { searchBookingRoom } from "../../features/API";

export const SingleBooking = (props) => {
  const bookingId = useParams();
  const dispatch = useDispatch();
  const bookingData = useSelector(getSingleBooking);
  const singleBookingStatus = useSelector(getSingleBookingStatus);


  console.log(bookingData)

  useEffect(() => {
    console.log(bookingId);
    if (singleBookingStatus === "idle" || bookingData) {
      if (bookingId.id !== bookingData.id) {
        dispatch(getBooking(bookingId.id));
      }
    }
  }, [
    dispatch,
    singleBookingStatus,
    bookingId, bookingData]);

console.log(bookingData)

  if (
    singleBookingStatus === "pending" ||  singleBookingStatus === "idle" ) {
    return (
      <Wrapper>
        <HashLoader color="#799283" size={100} />
      </Wrapper>
    );
  } else if (bookingData !== {}) {
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
                    {searchBookingRoom(bookingData.room).roomType}-{searchBookingRoom(bookingData.room).roomNumber}
                  </h4>
                </CardItem>
                <CardItem>
                  <h6>Price</h6>
                  <h4>{totalPriceCalc(searchBookingRoom(bookingData.room).price, bookingData.checkIn, bookingData.checkOut)} $</h4>
                </CardItem>
              </FeaturesRow>
              <FeaturesRow>
                <CardItem paragraph>
                  <p>{bookingData.specialRequest}</p>
                </CardItem>
              </FeaturesRow>
              <FeaturesRow amenities>
                {searchBookingRoom(bookingData.room).amenities.map((amenitie) => {
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
                <h4>{searchBookingRoom(bookingData.room).roomType}</h4>
                <p>
                  {searchBookingRoom(bookingData.room).description}
                </p>
              </CardImageText>
            </CardImage>
          </CardContainer>
        </>
      );
  } else {
    return (
      <>
        <Navigate to="/error" />
      </>
    );
  }
};
