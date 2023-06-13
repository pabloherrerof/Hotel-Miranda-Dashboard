import styled from "styled-components";

export const BookingCalendar = styled.div`
  background-color: #ffffff;
  box-shadow: 0px 4px 4px #00000005;
  border-radius: 20px;
  padding: 2rem 1rem;

  .fc {
    max-height: 600px;
  }
  .fc-button {
    font-family: "Poppins";
    background-color: transparent;
    color: #393939;
    font-weight: 500;
    font-size: 16px;
    border: none;
  }

  .fc-titleCustom-button {
    font-family: "Poppins";
    background-color: transparent;
    color: #393939;
    font-weight: 500;
    font-size: 12px;
    border: none;
  }
  .fc-titleCustom-button:hover {
    font-family: "Poppins";
    background-color: transparent;
    color: #393939;
    font-weight: 500;
    font-size: 12px;
    border: none;
    cursor: default;
  }

  .fc-toolbar-title {
    font-family: "Poppins";
    background-color: transparent;
    color: #393939;
    font-weight: 500;
    font-size: 12px;
  }

  .fc .fc-toolbar {
    gap: 0.5rem;
  }

  .fc-toolbar-chunk {
    div {
      display: flex;
      flex-direction: row;
      gap: 1rem;
    }
  }
  .fc-dayGridMonth-view {
    table {
      border: none;
    }
    th {
      border: none;
      height: 40px;
    }
    td {
      border: none;
    }
  }

  table {
    border: none;
  }
  colgroup {
    width: auto;
  }

  .fc .fc-daygrid-day.fc-day-today {
    background-color: #ff9c3a65;
    border-radius: 12px;
  }

  .fc-day,
  .fc-day-sat,
  .fc-day-future,
  .fc-daygrid-day {
    text-align: center;
  }
  .fc-direction-ltr .fc-daygrid-event.fc-event-end,
  .fc-direction-rtl .fc-daygrid-event.fc-event-start {
    border-radius: 8px;
    border: none;
    padding: 0.2rem;
  }
  .fc-direction-ltr .fc-daygrid-event.fc-event-start,
  .fc-direction-rtl .fc-daygrid-event.fc-event-end {
    border-radius: 8px;
    border: none;
    padding: 0.2rem;
  }
  .fc-event {
    background-color: #ebd90d;
  }

  .fc-event:hover{
    scale: 1.1;
    cursor: pointer;
  }

  .fc-event-future {
    background-color: #5ad07a;
  }

  .fc-event-past {
    background-color: #e23428;
  }
`;
