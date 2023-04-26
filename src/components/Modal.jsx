import { useDispatch } from "react-redux"
import { Button } from "./Button"
import { CardContainer } from "./CardStyled"
import { ModalButtonRow, ModalCloseRow, ModalContainer } from "./ModalStyled"
import {IoClose} from "react-icons/io5"
import { deleteUser } from "../features/users/usersThunks"

export const Modal = (props) => {
    const dispatch = useDispatch();

    const onClickDeleteHandler = () => {
        if(props.page === "users"){
            dispatch(deleteUser(props.itemId))
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