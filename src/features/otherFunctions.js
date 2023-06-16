
export const offerChecker = (discount) => {
  if (discount > 0) {
    return "OFFER";
  } else return "";
};

export const offerPriceCalc = (price, discount) => {
  return discount > 0 ? (price - (price * discount) / 100).toFixed(2) + "$" : "-";
};

export const dateConverter = (dateToConver) => {
  const fecha = new Date(dateToConver);

  const opcionesFecha = { day: "numeric", month: "long", year: "numeric" };
  const opcionesHora = { hour12: true, hour: "numeric", minute: "numeric" };

  const fechaString = fecha.toLocaleDateString("en-US", opcionesFecha);
  const horaString = fecha.toLocaleTimeString("en-US", opcionesHora);

  return {
    date: fechaString,
    hour: horaString,
  };
};

export const bookedStatusCalc = (checkIn, checkOut) => {
  const actualDate = new Date();
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);

  if (actualDate.getTime() < checkInDate.getTime()) {
    return "CHECK IN";
  } else if (actualDate.getTime() > checkOutDate.getTime()) {
    return "CHECK OUT";
  } else {
    return "IN PROGRESS";
  }
};

export const totalPriceCalc = (pricePerNight, checkIn, checkOut) => {
  var date1 = new Date(checkOut);
  var date2 = new Date(checkIn);

  var difference = date1.getTime() - date2.getTime();
  return Math.round(difference / (1000 * 60 * 60 * 24)) * pricePerNight;
};

export function getTodayString() {
  const today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1;
  const yyyy = today.getFullYear();

  if (dd < 10) {
    dd = "0" + dd;
  }

  if (mm < 10) {
    mm = "0" + mm;
  }

  return yyyy + "-" + mm + "-" + dd;
}

export const maxCharString = (string, maxChar) =>{
  return string.slice(0, maxChar) +"..."
}

export const dateToCalendar = (dateToConvert)=> {
  
const date = new Date(dateToConvert);

const year = date.getFullYear();
const month = String(date.getMonth() + 1).padStart(2, '0');
const day = String(date.getDate()).padStart(2, '0');

return `${year}-${month}-${day}`;
}

export const createBookingDatesValidator = (checkIn, checkOut)=> {
  const checkInTime = new Date(checkIn).getTime();
  const checkOutTime = new Date(checkOut).getTime();
  const currentTime = new Date().getTime()
  if(checkInTime >= currentTime && checkOutTime >= checkInTime){
    return true
  } return false;
}

export const updateBookingDatesValidator = (checkIn, checkOut)=> {
  const checkInTime = new Date(checkIn).getTime();
  const checkOutTime = new Date(checkOut).getTime();
  if(checkInTime <= checkOutTime ){
    return true
  } return false;
}

export function filtrarArraySinRepetidos(array, propiedad) {
  const valoresUnicos = new Set();
  return array.filter((elemento) => {
    const valorPropiedad = elemento[propiedad];
    if (!valoresUnicos.has(valorPropiedad)) {
      valoresUnicos.add(valorPropiedad);
      return true;
    }
    return false;
  });
}

              
export const filterCheckInBookings = (bookingsArray) => {
  return bookingsArray.filter(booking => bookedStatusCalc(booking.checkIn, booking.checkOut) === "CHECK IN")
}

export const filterCheckOutBookings = (bookingsArray) => {
  return bookingsArray.filter(booking => bookedStatusCalc(booking.checkIn, booking.checkOut) === "CHECK OUT")
}

const  availableRooms =(rooms, startDate, endDate) => {
  try{
    let totalRoomsAvailable= [];
  if (startDate.getTime() >= endDate.getTime()) {
    throw new Error("La fecha de fin introducida es anterior o igual a la fecha de inicio")
  } else if (rooms.length === 0) {
    throw new Error("No se han introducido habitaciones");
  } else {
    rooms.forEach((room) => {
      
      if (room.occupancyPercentage(startDate, endDate) === 0) {
        totalRoomsAvailable.push(room);
      }
      if(room.occupancyPercentage(startDate, endDate) === -1){
        throw new Error("La reserva introducida en la habitación no corresponde a esta habitación o no tiene reservas disponibles");
      }
    });

    return totalRoomsAvailable;
  }
  } catch(e){
    console.log(e.name + ": " + e.message);
    return [];
  }
  
}