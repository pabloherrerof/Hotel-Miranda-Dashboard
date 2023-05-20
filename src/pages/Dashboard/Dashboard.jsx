import { MdOutlineKingBed } from "react-icons/md";
import {
  HiOutlineArrowRightOnRectangle,
  HiOutlineArrowLeftOnRectangle,
  HiOutlineCalendarDays,
} from "react-icons/hi2";
import { BookingCalendar, CalendarRow, KPI, KpiIcon, KpiRow, KpiText, LastBookings, ViewMore, ViewMoreButton } from "./DashboardStyled";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getContactsData, getContactsStatus } from "../../features/contacts/contactsSlice";
import { fetchContacts } from "../../features/contacts/contactThunks";
import { Wrapper } from "../../components/LayoutStyled";
import { HashLoader } from "react-spinners";
import { LastReviews } from "../../components/LastReviews";
import dayGridPlugin from '@fullcalendar/daygrid' 
import FullCalendar from "@fullcalendar/react";
import { getBookingsData, getBookingsStatus } from "../../features/bookings/bookingsSlice";
import { fetchBookings } from "../../features/bookings/bookingThunks";
import {  RoomImageItem, StyledLink, TableItem, TableRow } from "../../components/TableStyled";
import { searchBookingRoom } from "../../features/API";
import { useNavigate } from "react-router-dom";
import { StatusButton } from "../../components/Button";
import { bookedStatusCalc } from "../../features/otherFunctions";
import { AiOutlineInfoCircle } from "react-icons/ai";



export const Dashboard = (props) => {
  const dispatch = useDispatch("");
  const navigate = useNavigate();
  const [recentContacts, setRecentContacts] = useState();
  const contactsStatus = useSelector(getContactsStatus);
  const contactsData = useSelector(getContactsData);
  const bookingsStatus = useSelector(getBookingsStatus)
  const bookingsData = useSelector(getBookingsData);
  const [recentBooking, setRecentBookings] = useState();

  useEffect(() => {
    if(contactsStatus === "idle"){
      dispatch(fetchContacts());
    }
    if(contactsData.length > 0){
      setRecentContacts([...contactsData].sort((a, b) => {
        if (a.date < b.date) return -1;
        if (a.date > b.date) return 1;
        return 0;
      }).slice(0, 6))
    }
  }, [contactsData, contactsStatus, dispatch])

  useEffect(() => {
    if(bookingsStatus === "idle"){
      dispatch(fetchBookings());
    }
    if(bookingsData.length > 0){
      setRecentBookings([...bookingsData].sort((a, b) => {
        if (a.checkIn > b.checkIn) return -1;
        if (a.checkIn < b.checkIn) return 1;
        return 0;
      }).slice(0, 5))
    }
  }, [bookingsData, bookingsStatus, dispatch])

  if (contactsStatus === "pending" || contactsStatus === "idle" || !recentContacts || !recentBooking || bookingsStatus ==="pending" || bookingsStatus==="idle" || bookingsData.length <= 0) {
    return (
      <>
        <Wrapper>
          <HashLoader color="#799283" size={100} />
        </Wrapper>
      </>
    )
  } else {
    return (
      <>
        <KpiRow data-testid="dashboard__kpi">
          <KPI>
            <KpiIcon>
              <MdOutlineKingBed />
            </KpiIcon>
            <KpiText>
              <h2>8,454</h2>
              <h6>New Booking</h6>
            </KpiText>
          </KPI>
          <KPI>
            <KpiIcon>
              <HiOutlineCalendarDays />
            </KpiIcon>
            <KpiText>
              <h2>963</h2>
              <h6>Scheduled Room</h6>
            </KpiText>
          </KPI>
          <KPI>
            <KpiIcon>
              <HiOutlineArrowRightOnRectangle />
            </KpiIcon>
            <KpiText>
              <h2>753</h2>
              <h6>Check In</h6>
            </KpiText>
          </KPI>
          <KPI>
            <KpiIcon>
              <HiOutlineArrowLeftOnRectangle />
            </KpiIcon>
            <KpiText>
              <h2>516</h2>
              <h6>Check Out</h6>
            </KpiText>
          </KPI>
        </KpiRow>
        
        <LastReviews data={recentContacts}/>
        <CalendarRow>
          <BookingCalendar>
          <FullCalendar
        plugins={[ dayGridPlugin ]}
        initialView="dayGridMonth"
        themeSystem="unthemed"
        customButtons={{
          titleCustom: {
            text: "Recent Booking Schedule"
          }
        }}
        headerToolbar={{
            left: "titleCustom",
            center: "today",
            right: "prev,title,next",
        }}
        events={bookingsData.map((booking) => {
          
          return {title: booking.id, start: booking.checkIn, end: booking.checkOut}
        })}
        eventClick={(info) => {navigate(`/bookings/${info.el.innerText}`)}}
      />
          </BookingCalendar>
        </CalendarRow>

        <LastBookings>
          {recentBooking.map(booking => {
              return (<TableRow>
                <TableItem>
                
                          <RoomImageItem
                            src={searchBookingRoom(booking.room).thumbnail}
                            alt="room"
                          />
                         
                </TableItem>
                <TableItem>
                {searchBookingRoom(booking.room).roomType + "-" + searchBookingRoom(booking.room).roomNumber}
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
          <ViewMore>

            <ViewMoreButton onClick={() => {navigate("/bookings")}}>View More</ViewMoreButton>
            
          </ViewMore>

        </LastBookings>
       
      </>
    );
  }

};
