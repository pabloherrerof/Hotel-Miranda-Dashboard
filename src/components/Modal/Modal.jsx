import { useDispatch, useSelector } from "react-redux";
import { ArchiveButton, Button } from "../Button/Button";
import { ModalButtonRow, ModalCloseRow, ModalContainer } from "./ModalStyled";
import { IoClose } from "react-icons/io5";
import { addUser, deleteUser } from "../../features/users/usersThunks";
import { addBooking, deleteBooking } from "../../features/bookings/bookingThunks";
import { addRoom, deleteRoom } from "../../features/rooms/roomsThunks";
import {
  FormContainer,
  Input,
  InputBig,
  Label,
  RadioInput,
} from "../Form/FormStyled";
import {
  createBookingDatesValidator,
  dateConverter,
  getTodayString,
} from "../../features/otherFunctions";
import { useState } from "react";
import { ReviewComment, ReviewInfo } from "../LastReviews/LastReviewsStyled";
import { getRoomsData } from "../../features/rooms/roomsSlice";
import { toastWarning } from "../../features/toastify";
import { getBookingsData, resetBookingsState } from "../../features/bookings/bookingsSlice";
import { roomAvailability } from "../../features/roomOccupancy";
import { archiveContacts } from "../../features/contacts/contactThunks";


export const Modal = (props) => {
  const dispatch = useDispatch();
  const bookingsData = useSelector(getBookingsData);
  const roomsData = useSelector(getRoomsData);
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userPosition, setUserPosition] = useState("Manager");
  const [userEmail, setUserEmail] = useState("");
  const [userStartDate, setUserStartDate] = useState(getTodayString());
  const [userImage, setUserImage] = useState(
    "https://cdn.pixabay.com/photo/2022/06/05/07/04/person-7243410_1280.png"
  );
  const [userState, setUserState] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const [guestName, setGuestName] = useState("");
  const [bookingRoomId, setBookingRoomId] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [specialRequest, setSpecialRequest] = useState("");

  const [roomType, setRoomType] = useState("Single Bed");
  const [roomNumber, setRoomNumber] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [description, setDescription] = useState("");



  const onClickDeleteHandler = () => {
    if (props.page === "users") {
      dispatch(deleteUser(props.itemId));

      props.setShowDeleteModal(false);
    }

    if (props.page === "bookings") {
      dispatch(deleteBooking(props.itemId));
      props.setShowDeleteModal(false);
    }

    if (props.page === "rooms") {
      dispatch(deleteRoom(props.itemId));
      dispatch(resetBookingsState())
      props.setShowDeleteModal(false);
    }
  };

  const onCreateSubmitHandler = (e) => {
    e.preventDefault();
    if (props.page === "users") {
      if (
        userEmail === "" ||
        userImage === "" ||
        userName === "" ||
        userPosition === "" ||
        userStartDate === "" ||
        userState === "" ||
        userPhone === "" ||
        userPassword === ""
      ) {
        toastWarning("You have to enter all inputs.");
      } else if (/[a-zA-Z]/.test(userPhone)) {
        toastWarning("Error! Phone must be a valid phone number");
      } else {
        const user = {
          photo: userImage,
          name: userName,
          position: userPosition,
          email: userEmail,
          phone: userPhone,
          startDate: new Date(userStartDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          }),
          state: userState,
          password: userPassword,
        };
        dispatch(addUser(user));
        props.setShowCreateModal(false);
        setUserEmail("");
        setUserName("");
        setUserImage(
          "https://cdn.pixabay.com/photo/2022/06/05/07/04/person-7243410_1280.png"
        );
        setUserPassword("");
        setUserPosition("Manager");
        setUserStartDate(getTodayString());
        setUserState("");
        setUserPhone("");
        e.target.reset();
      }
    }
    if (props.page === "bookings") {

      if (
        guestName === "" ||
        checkIn === "" ||
        checkOut === "" ||
        bookingRoomId === ""
      ) {
        toastWarning("You have to enter all inputs.");
      } else if (!roomsData.find((room) => room.id === bookingRoomId)) {
        toastWarning("The room you've entered does not exists!");
      } else if(bookingRoomId === "R-0000"){
        toastWarning("The room you've entered does not exists!")
      } else if (!createBookingDatesValidator(checkIn, checkOut)) {
        toastWarning("Invalid Dates!");
       
      } else if(roomAvailability(bookingRoomId, bookingsData, checkIn, checkOut).length > 0){
        toastWarning("Room occupied on these dates!");
      } else {
        const booking = {
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

          specialRequest: specialRequest,
          room: bookingRoomId,
        };
        dispatch(addBooking(booking));
        props.setShowCreateModal(false);
        setGuestName("");
        setBookingRoomId("");
        setCheckIn("");
        setCheckOut("");
        setSpecialRequest("");
        e.target.reset();
      }
    }
    if (props.page === "rooms") {
      if (
        roomNumber === "" ||
        roomType === "" ||
        price === "" ||
        description === ""
      ) {
        toastWarning("You have to enter all inputs.");
      } else {
        if (discount === "") {
          setDiscount(0);
        }
        if (discount > 100) {
          toastWarning("Discount must be smaller than 100!");
        } else {
          const room = {
            roomType: roomType,
            roomNumber: roomNumber,
            price: price,
            discount: discount,
            description: description,
          };
          dispatch(addRoom(room));
          props.setShowCreateModal(false);
          setRoomNumber("");
          setRoomType("Single Bed");
          setDiscount("");
          setPrice("");
          setDescription("");
          e.target.reset();
        }
      }
    }
  };

  const onClickArchiveHandler = (contact) => {
    dispatch(archiveContacts(contact));
  };

  if (props.mode === "delete") {
    return (
      <>
        <ModalContainer show={props.showDeleteModal}>
          <ModalCloseRow>
            <IoClose
              onClick={() => {
                props.setShowDeleteModal(false);
              }}
            />
          </ModalCloseRow>
          <h2>Are you sure that yo want to delete this item?</h2>
          <ModalButtonRow>
            <Button type="delete" onClick={onClickDeleteHandler}>
              Delete
            </Button>
            <Button
              onClick={() => {
                props.setShowDeleteModal(false);
              }}
            >
              Cancel
            </Button>
          </ModalButtonRow>
        </ModalContainer>
      </>
    );
  }
  if (props.mode === "create") {
    if (props.page === "users") {
      return (
        <>
          <ModalContainer show={props.showCreateModal} top>
            <ModalCloseRow>
              <IoClose
                onClick={() => {
                  props.setShowCreateModal(false);
                  document.getElementById("createUserForm").reset();
                }}
              />
            </ModalCloseRow>
            <FormContainer onSubmit={onCreateSubmitHandler} id="createUserForm">
              <h2>New User</h2>

              <Input>
                <label htmlFor="image">Image Link</label>
                <input
                  type="link"
                  name="image"
                  onInput={(e) => {
                    setUserImage(e.target.value);
                  }}
                />
              </Input>
              <Input>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  onInput={(e) => {
                    setUserName(e.target.value);
                  }}
                />
              </Input>
              <Input>
                <label htmlFor="position">Position</label>
                <select
                  name="position"
                  defaultValue={"manager"}
                  onChange={(e) => {
                    setUserPosition(e.target.value);
                  }}
                >
                  <option>Manager</option>
                  <option>Receptionist</option>
                  <option>Room Service</option>
                </select>
              </Input>
              <Input>
                <label htmlFor="name">Phone Number</label>
                <input
                  type="tel"
                  name="name"
                  onInput={(e) => {
                    setUserPhone(e.target.value);
                  }}
                />
              </Input>
              <Input>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="name"
                  onInput={(e) => {
                    setUserEmail(e.target.value);
                  }}
                />
              </Input>
              <Input>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  onInput={(e) => {
                    setUserPassword(e.target.value);
                  }}
                />
              </Input>
              <RadioInput>
                <Label active htmlFor="state">
                  <input
                    type="radio"
                    name="state"
                    value="ACTIVE"
                    onChange={(e) => {
                      setUserState(e.target.value);
                    }}
                  />
                  ACTIVE
                </Label>
                <Label inactive htmlFor="state">
                  <input
                    type="radio"
                    name="state"
                    value="INACTIVE"
                    onChange={(e) => {
                      setUserState(e.target.value);
                    }}
                  />
                  INACTIVE
                </Label>
              </RadioInput>
              <Input>
                <label htmlFor="name">Date of Start</label>
                <input
                  type="date"
                  name="startDate"
                  defaultValue={getTodayString()}
                  onInput={(e) => {
                    setUserStartDate(e.target.value);
                  }}
                />
              </Input>
              <Button>Save!</Button>
            </FormContainer>
          </ModalContainer>
        </>
      );
    }
    if (props.page === "bookings") {
      return (
        <>
          <ModalContainer show={props.showCreateModal} top>
            <ModalCloseRow>
              <IoClose
                onClick={() => {
                  props.setShowCreateModal(false);
                  document.getElementById("createUserForm").reset();
                }}
              />
            </ModalCloseRow>
            <FormContainer onSubmit={onCreateSubmitHandler} id="createUserForm">
              <h2>New Booking</h2>
              <Input>
                <label htmlFor="guestName">Guest Name</label>
                <input
                  type="text"
                  name="guestName"
                  onInput={(e) => {
                    setGuestName(e.target.value);
                  }}
                />
              </Input>
              <Input>
                <label htmlFor="checkIn">Check In</label>
                <input
                  type="date"
                  name="checkIn"
                  onInput={(e) => {
                    setCheckIn(e.target.value);
                  }}
                />
              </Input>
              <Input>
                <label htmlFor="checkOut">Check Out</label>
                <input
                  type="date"
                  name="checkOut"
                  onInput={(e) => {
                    setCheckOut(e.target.value);
                  }}
                />
              </Input>
              <Input>
                <label htmlFor="room">Room</label>
                <input
                  type="text"
                  name="room"
                  onInput={(e) => {
                    setBookingRoomId(e.target.value);
                  }}
                />
              </Input>
              <InputBig>
                <label htmlFor="specialRequest">Special Request</label>
                <input
                  type="text"
                  name="specialRequest"
                  defaultValue={specialRequest}
                  onInput={(e) => {
                    setSpecialRequest(e.target.value);
                  }}
                />
              </InputBig>

              <Button>Save!</Button>
            </FormContainer>
          </ModalContainer>
        </>
      );
    }

    if (props.page === "rooms") {
      return (
        <>
          <ModalContainer show={props.showCreateModal} top>
            <ModalCloseRow>
              <IoClose
                onClick={() => {
                  props.setShowCreateModal(false);
                  document.getElementById("createUserForm").reset();
                }}
              />
            </ModalCloseRow>
            <FormContainer onSubmit={onCreateSubmitHandler} id="createUserForm">
              <h2>New Room</h2>

              <Input>
                <label htmlFor="roomNumber">Room Number</label>
                <input
                  type="number"
                  name="roomNumber"
                  defaultValue={roomNumber}
                  onInput={(e) => {
                    setRoomNumber(e.target.value);
                  }}
                />
              </Input>
              <Input>
                <label htmlFor="roomType">Room Type</label>
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
              <Input>
                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  name="price"
                  defaultValue={price}
                  onInput={(e) => {
                    setPrice(e.target.value);
                  }}
                />
              </Input>
              <Input>
                <label htmlFor="discount">Discount</label>
                <input
                  type="number"
                  name="discount"
                  defaultValue={discount}
                  onInput={(e) => {
                    setDiscount(e.target.value);
                  }}
                />
              </Input>
              <InputBig>
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  name="description"
                  onInput={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </InputBig>

              <Button>Save!</Button>
            </FormContainer>
          </ModalContainer>
        </>
      );
    }
  }

  if (props.mode === "moreInfo") {
    if (props.page === "contacts" && props.target !== undefined) {
      return (
        <>
          <ModalContainer show={props.showModal}>
            <ModalCloseRow>
              <IoClose
                onClick={() => {
                  props.setShowModal(false);
                }}
              />
            </ModalCloseRow>

            <ReviewComment>{props.target.comment}</ReviewComment>
            <ReviewInfo>
              <div>
                <h4>{props.target.customer.name}</h4>
                <p>{dateConverter(props.target.date).date}</p>
              </div>
              {console.log(props.target)}
              {props.target.archived !== true ? (
                <ArchiveButton archived onClick={() => onClickArchiveHandler(props.target)}>Archived</ArchiveButton>
              ) : (
                ""
              )}
              {props.target.archived ? (
                <ArchiveButton unarchived onClick={() => onClickArchiveHandler(props.target)}>Unarchived</ArchiveButton>
              ) : (
                ""
              )}
            </ReviewInfo>
          </ModalContainer>
        </>
      );
    }
    if (props.page === "bookings" && props.targetBooking !== undefined) {
      return (
        <>
          <ModalContainer show={props.showNotesModal}>
            <ModalCloseRow>
              <IoClose
                onClick={() => {
                  props.setShowNotesModal(false);
                }}
              />
            </ModalCloseRow>

            <ReviewComment>{props.targetBooking.specialRequest}</ReviewComment>
            <ReviewInfo>
              <div>
                <h4>{props.targetBooking.name}</h4>
                <p>{dateConverter(props.targetBooking.date).date}</p>
              </div>
            </ReviewInfo>
          </ModalContainer>
        </>
      );
    }
  }
};
