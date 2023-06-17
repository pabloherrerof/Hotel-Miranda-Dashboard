import { PaginationButton } from "../Button/Button";
import { PaginationButtons, PaginationRow, PaginationText } from "./PaginationStyled";
import {MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight} from "react-icons/md"

export const Pagination = ({data, page, setPage}) =>{
console.log(page)

    const onClickPrevHandler = ()=>{
        if(page === 1){
            return
        }
         setPage(page -1);
    }

    const onClickNextHandler = ()=>{
        if(page === data.length){
            return
        }
         setPage(page + 1);
    }


    return(<>
    <PaginationRow>
        <PaginationText>Page {page} of {data.length}</PaginationText>
        <PaginationButtons>
        <PaginationButton onClick={onClickPrevHandler}><MdOutlineKeyboardArrowLeft/></PaginationButton>
        <PaginationButton onClick={onClickNextHandler}><MdOutlineKeyboardArrowRight/></PaginationButton>
        </PaginationButtons>
    </PaginationRow>
    
    </>)
}