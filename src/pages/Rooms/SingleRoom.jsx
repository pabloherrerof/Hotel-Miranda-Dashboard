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
} from "../../components/CardStyled";
import { MySlider } from "../../components/Slider";
import { Navigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getRoomsStatus,
  getSingleRoom,
  getSingleRoomStatus,
} from "../../features/rooms/roomsSlice";
import { useEffect } from "react";
import { fetchRooms, getRoom } from "../../features/rooms/roomsThunks";
import { HashLoader } from "react-spinners";
import { offerChecker, offerPriceCalc } from "../../features/otherFunctions";
import { Wrapper } from "../../components/LayoutStyled";



export const SingleRoom = (props) => {
  const roomId = useParams();
  const dispatch = useDispatch();
  const singleRoomData = useSelector(getSingleRoom);
  const roomsStatus = useSelector(getRoomsStatus);
  const singleRoomStatus = useSelector(getSingleRoomStatus);

  useEffect(() => {
    if (roomsStatus === "idle") {
      dispatch(fetchRooms());
    }
   
    if( singleRoomStatus ==="idle" || singleRoomData){
      if(roomId.id !== singleRoomData.id){
        dispatch(getRoom(roomId.id))
      }
    }
  }, [dispatch, roomsStatus, singleRoomStatus, roomId.id, singleRoomData ]);

  console.log(singleRoomData)

  if ( roomsStatus=== "pending" || singleRoomStatus==="pending" || roomsStatus=== "idle" || singleRoomStatus==="idle" ) {
    return(
    <Wrapper>
        <HashLoader color="#799283" size={100} />
      </Wrapper>)
  } else if (singleRoomData !== undefined ){
    return (
      <>
        <CardContainer full>
          <Card full>
            <TitleRow>
              <CardTitle>
                <h2>Room {singleRoomData.roomNumber}</h2>
                <h5>{singleRoomData.roomType}</h5>
              </CardTitle>
            </TitleRow>
            <FeaturesRow>
              <CardItem paragraph>
                <h3>Description</h3>
                <p>
                  {singleRoomData.description}
                </p>
              </CardItem>
            </FeaturesRow>
            <CardSeparator />
            <FeaturesRow>
              <CardItem price discount={singleRoomData.discount}>
                <h6>Price</h6>
                <h5>
                  {singleRoomData.price} <span>/per night</span>
                </h5>
              </CardItem>
              <CardItem >
                <h6>Discount</h6>
                <h5>{singleRoomData.discount}%</h5>
              </CardItem>
            </FeaturesRow>
            <FeaturesRow>
              <CardItem offer discount={singleRoomData.discount}> 
                <h6>Offer Price</h6>
                <h5>{offerPriceCalc(singleRoomData.price, singleRoomData.discount)} <span>/per night</span></h5>  
              </CardItem>
              <CardItem state={singleRoomData.status}>
                <h6>Status</h6>
                <h5 >{singleRoomData.status}</h5>

              </CardItem>
            </FeaturesRow>
            <CardSeparator />

            <FeaturesRow amenities>
              {singleRoomData.amenities.map(amenitie => {
                return(<CardItem amenitie>
                  <CardAmenitie>{amenitie}</CardAmenitie>
                </CardItem>)
              })}
            </FeaturesRow>
            <FeaturesRow>
              <CardItem paragraph>
                <h3>Cancellation</h3>
                <p>
                  {singleRoomData.cancellation}
                </p>
              </CardItem>
            </FeaturesRow>
          </Card>
          <CardImage>
            <MySlider></MySlider>

            <Booked bookStatus={offerChecker(singleRoomData.discount)}>{offerChecker(singleRoomData.discount)}</Booked>
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
