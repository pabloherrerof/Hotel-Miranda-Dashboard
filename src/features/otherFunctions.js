




export function delay(data, time = 1000) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data);
        }, time);
    });
}

  export const offerChecker = (discount) => {
    if(discount > 0){
      return "OFFER"
    } else return ""
  }

  export const offerPriceCalc = (price, discount) => {
    return discount > 0 ? price - (price * discount) / 100 + "$"
      : "-"
  }

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

  export const bookedStatusCalc = (checkIn , checkOut) => {
    const actualDate = new Date();
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    if (actualDate.getTime() < checkInDate.getTime()) {
        return "CHECK IN"
      } else if (actualDate.getTime() > checkOutDate.getTime()) {
        return "CHECK OUT"
      } else {
        return "IN PROGRESS"
      }
  }

  export const totalPriceCalc = (pricePerNight, checkIn, checkOut) => {
    var date1 = new Date (checkOut);
    var date2 = new Date (checkIn);

    var difference = date1.getTime()-date2.getTime();
    return Math.round(difference / (1000 * 60 * 60 * 24))*pricePerNight;
  }