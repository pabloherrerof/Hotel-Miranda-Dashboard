import { BookingCalendar } from "./CalendarStyled";
import dayGridPlugin from '@fullcalendar/daygrid' 
import FullCalendar from "@fullcalendar/react";
import { useNavigate } from "react-router-dom";


export const Calendar = (props)=>{
    const navigate = useNavigate();

    

    return (
      <BookingCalendar>
        <FullCalendar
          plugins={[dayGridPlugin]}
          displayEventTime={false}
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
          events={props.data.map(booking => ({
            title: booking.id,
            start: new Date(booking.checkIn),
            end: new Date(booking.checkOut)
          }))}
          eventClick={info => {
            navigate(`/bookings/${info.event.title}`);
          }}
          
        />
        
      </BookingCalendar>
    );
  };
  
