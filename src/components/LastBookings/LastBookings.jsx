import { AiOutlineInfoCircle } from "react-icons/ai"
import { StatusButton } from "../Button/Button"
import { LastBookingsTable, ViewMore, ViewMoreButton } from "./LastBookingsStyled"
import { RoomImageItem, StyledLink, TableItem, TableRow } from "../Table/TableStyled"
import { bookedStatusCalc } from "../../features/otherFunctions"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getRoomsData, getRoomsStatus } from "../../features/rooms/roomsSlice"
import { fetchRooms } from "../../features/rooms/roomsThunks"


export const LastBookings = (props) => {

  const dispatch = useDispatch();
  const getRoomStatus = useSelector(getRoomsStatus)
  const getRoomData = useSelector(getRoomsData)

 
  
  useEffect(() => {
    if(getRoomStatus==="idle"){
      dispatch(fetchRooms());
    }
  }, [getRoomStatus, dispatch]);



  const navigate = useNavigate();
  if(getRoomStatus==="idle" || getRoomStatus==="pending"){
    return(<></>)
  } else
    return (<>
      <LastBookingsTable>
          <tbody>
          {props.data.map((booking) => {
              return (<TableRow key={booking.id}>
                <TableItem>
                
                         {  <RoomImageItem
                            src={getRoomData.find((room) => room.id === booking.room).thumbnail}
                            alt="room"
                          /> }
                         
                </TableItem>
                <TableItem>
                {getRoomData.find((room) => room.id === booking.room).roomType + "-" + getRoomData.find((room) => room.id === booking.room).roomNumber}
                            <p>{booking.name}</p>
                </TableItem>
                <TableItem>
                  {booking.orderDate}
                </TableItem>
                <TableItem>
                  <StatusButton
                    status={bookedStatusCalc(booking.checkIn, booking.checkOut)}
                  >
                    {bookedStatusCalc(booking.checkIn, booking.checkOut)}
                  </StatusButton>
                  </TableItem>
                
                <TableItem>
                  {booking.checkIn + " - " + booking.checkOut}
                </TableItem>
                <TableItem>
                  <StyledLink to={`/bookings/${booking.id}`}>
                    <AiOutlineInfoCircle />
                  </StyledLink>
                </TableItem>
                </TableRow>)
          })}
          </tbody>
          <ViewMore>
          <TableRow>
            <TableItem>
            <ViewMoreButton onClick={() => {navigate("/bookings")}}>View More</ViewMoreButton>
            </TableItem>
          
          </TableRow>
          </ViewMore>
          
        </LastBookingsTable>
    </>)
}