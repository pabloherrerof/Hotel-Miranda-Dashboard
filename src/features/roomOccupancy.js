export const roomAvailability = (roomId, bookings, startDate, endDate) => {
  return bookings.filter((booking) => {
    return (
      booking.room === roomId &&
      ((new Date(booking.checkIn).getTime() >= new Date(startDate).getTime() &&
        new Date(booking.checkIn).getTime() <= new Date(endDate).getTime()) ||
        (new Date(booking.checkOut).getTime() >=
          new Date(startDate).getTime() &&
          new Date(booking.checkOut).getTime() <=
            new Date(endDate).getTime()) ||
        (new Date(booking.checkIn).getTime() <= new Date(startDate).getTime() &&
          new Date(booking.checkOut).getTime() >= new Date(endDate).getTime()))
    );
  });
};

export const roomStatusCalc = (roomId, bookings) => {
  const currentDate = Date.now();
  const filteredBookings = bookings.filter((booking) => {
    const checkIn = new Date(booking.checkIn).getTime();
    const checkOut = new Date(booking.checkOut).getTime();
    return (
      booking.room === roomId &&
      checkIn <= currentDate &&
      currentDate <= checkOut
    );
  });
  if (filteredBookings.length > 0) {
    return "BOOKED";
  } else return "AVAILABLE";
};
