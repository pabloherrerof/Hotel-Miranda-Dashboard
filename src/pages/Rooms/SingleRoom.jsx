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
  CardHeader,
  CloseIcon,
  CardImageText,
} from "../../components/Card/CardStyled";
import { MySlider } from "../../components/Slider/Slider";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getSingleRoom,
  getSingleRoomStatus,
} from "../../features/rooms/roomsSlice";
import { useEffect, useState } from "react";
import { editRoom, getRoom } from "../../features/rooms/roomsThunks";
import { HashLoader } from "react-spinners";
import {
  offerChecker,
  offerPriceCalc
} from "../../features/otherFunctions";
import { Wrapper } from "../../components/Layout/LayoutStyled";
import { FiArrowLeftCircle, FiEdit } from "react-icons/fi";
import {
  Input,
  InputBig,
  Label,
  RadioInput,
} from "../../components/Form/FormStyled";
import { Button } from "../../components/Button/Button";
import { toastWarning } from "../../features/toastify";


export const SingleRoom = (props) => {
  const roomId = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const singleRoomData = useSelector(getSingleRoom);
  const singleRoomStatus = useSelector(getSingleRoomStatus);

  const [roomType, setRoomType] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");

  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (singleRoomStatus === "idle" || (singleRoomStatus==="fulfilled" && roomId.id !== singleRoomData.id)) {
        dispatch(getRoom(roomId.id));
    }
    setRoomType(singleRoomData.roomType);
    setRoomNumber(singleRoomData.roomNumber);
    setPrice(singleRoomData.price);
    setDiscount(singleRoomData.discount);
    setStatus(singleRoomData.status);
    setDescription(singleRoomData.description);
  }, [dispatch, singleRoomStatus, roomId.id, singleRoomData]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (
      roomType === "" ||
      roomNumber === "" ||
      price === "" ||
      status === "" ||
      description === ""
    ) {
      toastWarning("Error! You have to enter all inputs.")
    } else 
      if (discount === "") {
        setDiscount(0);
      } else if (discount >= 100) {
        toastWarning("Discount must be smaller than 100!");
      } else {
      const room = {
        id: singleRoomData.id,
        roomType: roomType,
        roomNumber: roomNumber,
        price: price,
        discount: discount,
        status: status,
        description: description
      };
      console.log(room)
      dispatch(editRoom(room));
      setEdit(false);
      dispatch(getRoom(room.id));
    }
  };




if(singleRoomStatus === "rejected"){
  return (
    <>
      <Navigate to="/error"/>
    </>
  );
} else {
 if (singleRoomStatus==="fulfilled" && singleRoomData.id === roomId.id) {
    if (edit !== true) {
      return (
        <>
          <CardContainer full>
            <Card full>
              <CardHeader>
                <FiArrowLeftCircle
                  onClick={() => {
                    navigate("/rooms");
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
                  <h2>Room {singleRoomData.roomNumber}</h2>
                  <h5>{singleRoomData.roomType}</h5>
                </CardTitle>
              </TitleRow>
              <FeaturesRow>
                <CardItem paragraph>
                  <h3>Description</h3>
                  <p>{singleRoomData.description}</p>
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
                <CardItem>
                  <h6>Discount</h6>
                  <h5>{singleRoomData.discount}%</h5>
                </CardItem>
              </FeaturesRow>
              <FeaturesRow>
                <CardItem offer discount={singleRoomData.discount}>
                  <h6>Offer Price</h6>
                  <h5>
                    {offerPriceCalc(
                      singleRoomData.price,
                      singleRoomData.discount
                    )}{" "}
                    <span>/per night</span>
                  </h5>
                </CardItem>
                <CardItem state={singleRoomData.status}>
                  <h6>Status</h6>
                  <h5>{singleRoomData.status}</h5>
                </CardItem>
              </FeaturesRow>
              <CardSeparator />

              <FeaturesRow amenities>
                {singleRoomData.amenities.map((amenitie, i) => {
                  return (
                    <CardItem amenitie key={i}>
                      <CardAmenitie>{amenitie}</CardAmenitie>
                    </CardItem>
                  );
                })}
              </FeaturesRow>
            </Card>
            <CardImage>
              <MySlider data={singleRoomData.images}/>

              <Booked bookStatus={offerChecker(singleRoomData.discount)}>
                {offerChecker(singleRoomData.discount)}
              </Booked>
              <CardImageText>
              <h4>Cancellation</h4>
                  <p>{singleRoomData.cancellation}</p>
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
                    navigate("/rooms");
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
                  <CardItem>
                    <Input>
                      <h6>Room Number</h6>
                      <input
                        type="number"
                        name="roomNumber"
                        defaultValue={roomNumber}
                        onInput={(e) => {
                          setRoomNumber(e.target.value);
                        }}
                      />
                    </Input>
                  </CardItem>
                  <CardItem>
                    <Input>
                      <h6>Room Type</h6>
                      <select
                        name="RoomType"
                        defaultValue={roomType}
                        onChange={(e) => {
                          setRoomType(e.target.value);
                        }}
                      >
                        <option>Single Bed</option>
                        <option>Double Bed</option>
                        <option>Double Superior</option>
                        <option>Suite</option>
                      </select>
                    </Input>
                  </CardItem>
                </FeaturesRow>

                <FeaturesRow>
                  <CardItem>
                    <Input>
                      <h6>Price</h6>
                      <input
                        type="number"
                        name="price"
                        defaultValue={price}
                        onInput={(e) => {
                          setPrice(e.target.value);
                        }}
                      />
                    </Input>
                  </CardItem>
                  <CardItem>
                    <Input>
                      <h6>Discount</h6>
                      <input
                        type="number"
                        name="discount"
                        defaultValue={discount}
                        onInput={(e) => {
                          setDiscount(e.target.value);
                        }}
                      />
                    </Input>
                  </CardItem>
                </FeaturesRow>
                <FeaturesRow>
                  <CardItem>
                    <RadioInput>
                      <h6>State</h6>
                      <Label active htmlFor="state">
                        <input
                          type="radio"
                          name="state"
                          value="AVAILABLE"
                          defaultChecked={status === "AVAILABLE" ? true : false}
                          onChange={(e) => {
                            setStatus(e.target.value);
                          }}
                        />
                        AVAILABLE
                      </Label>
                      <Label inactive htmlFor="state">
                        <input
                          type="radio"
                          name="state"
                          value="BOOKED"
                          defaultChecked={status === "BOOKED" ? true : false}
                          onChange={(e) => {
                            setStatus(e.target.value);
                          }}
                        />
                        BOOKED
                      </Label>
                    </RadioInput>
                  </CardItem>
                </FeaturesRow>
                <FeaturesRow>
                  <InputBig>
                    <h6>Description</h6>
                    <input
                      type="text"
                      name="description"
                      defaultValue={description}
                      onInput={(e) => {
                        setDescription(e.target.value);
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
} else{
    return (
      <Wrapper>
        <HashLoader color="#799283" size={100} />
      </Wrapper>
    );
} 
}
};
