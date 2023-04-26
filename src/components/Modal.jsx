import { useDispatch } from "react-redux"
import { Button } from "./Button"
import { ModalButtonRow, ModalCloseRow, ModalContainer } from "./ModalStyled"
import {IoClose} from "react-icons/io5"
import { deleteUser } from "../features/users/usersThunks"
import { deleteBooking } from "../features/bookings/bookingThunks"
import { deleteRoom } from "../features/rooms/roomsThunks"

export const Modal = (props) => {
    const dispatch = useDispatch();

    const onClickDeleteHandler = () => {
        if(props.page === "users"){
            dispatch(deleteUser(props.itemId))
            props.setShowDeleteModal(false);
        }
        
        if(props.page === "bookings"){
            dispatch(deleteBooking(props.itemId));
            props.setShowDeleteModal(false);
        }

        if(props.page === "rooms"){
            dispatch(deleteRoom(props.itemId));
            props.setShowDeleteModal(false);
        }   
    }
    
    if(props.mode === "delete"){
        return(
            <>
            <ModalContainer show={props.showDeleteModal}>
                <ModalCloseRow>
                    <IoClose onClick={()=>{props.setShowDeleteModal(false)}}/>
                </ModalCloseRow>
                <h2>Are you sure that yo want to delete this item?</h2>
                <ModalButtonRow>
                <Button type="delete" onClick={onClickDeleteHandler}>Delete</Button>
                <Button onClick={()=>{props.setShowDeleteModal(false)}}>Cancel</Button>
                </ModalButtonRow>
                
                
                
            </ModalContainer>
            </>
        )
    }
}