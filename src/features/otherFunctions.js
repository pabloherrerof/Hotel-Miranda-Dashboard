




export function delay(data, time = 1000) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data);
        }, time);
    });
}

export function addIndexProperty(arr) {
    
    arr.forEach((obj, index) => {
      obj.id = "#" + (index + 1).toString().padStart(3, "0");
    });
    return arr;
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
