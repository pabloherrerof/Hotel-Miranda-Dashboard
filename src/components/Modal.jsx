import { useDispatch } from "react-redux";
import { Button } from "./Button";
import { ModalButtonRow, ModalCloseRow, ModalContainer } from "./ModalStyled";
import { IoClose } from "react-icons/io5";
import { addUser, deleteUser } from "../features/users/usersThunks";
import { deleteBooking } from "../features/bookings/bookingThunks";
import { deleteRoom } from "../features/rooms/roomsThunks";
import { FormContainer, Input, Label, RadioInput } from "./FormStyled";
import { getTodayString, jobDescriptionChooser } from "../features/otherFunctions";
import { useState } from "react";

export const Modal = (props) => {
  const dispatch = useDispatch();
  const [fieldError, setFieldError] = useState("")
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userPosition, setUserPosition] = useState("Manager");
  const [userEmail, setUserEmail] = useState("");
  const [userStartDate, setUserStartDate] = useState(getTodayString());
  const [userImage, setUserImage] = useState("");
  const [userState, setUserState] = useState("")
  const [userPassword, setUserPassword] = useState("");
  

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
      props.setShowDeleteModal(false);
    }
  };

  const onCreateSubmitHandler = (e) => {
    e.preventDefault();
    if(props.page === "users") {
        if(userEmail=== "" || userImage ==="" || userName=== "" || userPosition==="" || userStartDate==="" || userState==="" || userPhone==="" || userPassword=== ""){
            setFieldError("You have to enter all inputs!")
            console.log(userEmail)
            console.log(userPhone)
            console.log(userName)
            console.log(userPosition)
            console.log(userStartDate)
            console.log(userState)
            console.log(userImage)

        } else {
            const user = {
                photo: userImage,
                name: userName,
                position: userPosition,
                email: userEmail,
                phone: userPhone,
                startDate: userStartDate,
                state: userState,
                jobDescription: jobDescriptionChooser(userPosition),
                password: userPassword,
            }
            dispatch(addUser(user));
            props.setShowCreateModal(false);
            setFieldError("");
            setUserEmail("");
            setUserName("");
            setUserImage("");
            setUserPassword("");
            setUserPosition("Manager");
            setUserStartDate(getTodayString());
            setUserState("");
            setUserPhone("");
            e.target.reset();
        }
       
    }
  }

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
                  setFieldError("");
                document.getElementById("createUserForm").reset()
                }}
              />
            </ModalCloseRow>
            <FormContainer onSubmit={onCreateSubmitHandler} id="createUserForm">
                <h2>New User</h2>
                <p>{fieldError}</p>

                <Input>
                    <label htmlFor="image">Image Link</label>
                    <input type="link" name="image" onInput={(e)=>{setUserImage(e.target.value)}}/>
                </Input>
                <Input>
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" onInput={(e)=>{setUserName(e.target.value)}}/>
                </Input>
                <Input>
                    <label htmlFor="position">Position</label>
                    <select name="position" defaultValue={"manager"} onChange={(e)=>{setUserPosition(e.target.value)}}>
                        <option >Manager</option>
                        <option >Recepcionist</option>
                        <option>Room Service</option>
                    </select>
                </Input>
                <Input>
                    <label htmlFor="name">Phone Number</label>
                    <input type="tel" name="name" onInput={(e)=>{setUserPhone(e.target.value)}}/>
                </Input>
                <Input>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="name" onInput={(e)=>{setUserEmail(e.target.value)}}/>
                </Input>
                <Input>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" onInput= {(e)=>{setUserPassword(e.target.value)}}/>
                </Input>
                <RadioInput>
                    <Label active htmlFor="state">
                    <input type="radio" name="state" value="ACTIVE" onChange={(e)=>{setUserState(e.target.value)}}/>
                    ACTIVE
                    </Label>
                    <Label  inactive htmlFor="state">
                    <input type="radio" name="state" value="INACTIVE" onChange={(e)=>{setUserState(e.target.value)}}/>
                    INACTIVE</Label>
                    
                </RadioInput>
                <Input>
                    <label htmlFor="name">Date of Start</label>
                    <input type="date" name="startDate" defaultValue={getTodayString()} onInput={(e)=>{setUserStartDate(e.target.value)}}/>
                </Input>
                <Button>Save!</Button>
            </FormContainer>
            
              
          </ModalContainer>
        </>
      );
    }
  }
};
