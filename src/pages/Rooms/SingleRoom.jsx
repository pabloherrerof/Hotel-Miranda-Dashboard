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
} from "../../components/CardStyled";
import { MySlider } from "../../components/Slider";
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
  offerPriceCalc,
  roomInfoChooser,
} from "../../features/otherFunctions";
import { Wrapper } from "../../components/LayoutStyled";
import { FiArrowLeftCircle, FiEdit } from "react-icons/fi";
import {
  Input,
  InputBig,
  Label,
  RadioInput,
} from "../../components/FormStyled";
import { Button } from "../../components/Button";

export const SingleRoom = (props) => {
  const roomId = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const singleRoomData = useSelector(getSingleRoom);
  const singleRoomStatus = useSelector(getSingleRoomStatus);

  const [fieldError, setFieldError] = useState("");
  const [roomType, setRoomType] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");

  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (singleRoomStatus === "idle" || singleRoomData) {
      if (roomId.id !== singleRoomData.id) {
        dispatch(getRoom(roomId.id));
      }
    }
    console.log(singleRoomData.roomType);
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
      setFieldError("You have to enter all inputs!");
    } else {
      if (discount === "") {
        setDiscount(0);
      }
      const room = {
        id: singleRoomData.id,
        roomType: roomType,
        roomNumber: roomNumber,
        price: price,
        discount: discount,
        status: status,
        amenities: roomInfoChooser(roomType).amenities,
        cancellation: roomInfoChooser(roomType).cancelattion,
        thumbnail: roomInfoChooser(roomType).thumbnail,
        description: description,
      };
      console.log(room);
      dispatch(editRoom(room));
      dispatch(getRoom(room));
      setEdit(false);
    }
  };

  if (singleRoomStatus === "pending" || singleRoomStatus === "idle") {
    return (
      <Wrapper>
        <HashLoader color="#799283" size={100} />
      </Wrapper>
    );
  } else if (singleRoomData) {
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
                {singleRoomData.amenities.map((amenitie) => {
                  return (
                    <CardItem amenitie>
                      <CardAmenitie>{amenitie}</CardAmenitie>
                    </CardItem>
                  );
                })}
              </FeaturesRow>
              <FeaturesRow>
                <CardItem paragraph>
                  <h3>Cancellation</h3>
                  <p>{singleRoomData.cancellation}</p>
                </CardItem>
              </FeaturesRow>
            </Card>
            <CardImage>
              <MySlider></MySlider>

              <Booked bookStatus={offerChecker(singleRoomData.discount)}>
                {offerChecker(singleRoomData.discount)}
              </Booked>
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
  } else {
    return (
      <>
        <Navigate to="/error" />
      </>
    );
  }
};
