export function delay(data, time = 1000) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, time);
  });
}

export const offerChecker = (discount) => {
  if (discount > 0) {
    return "OFFER";
  } else return "";
};

export const offerPriceCalc = (price, discount) => {
  return discount > 0 ? price - (price * discount) / 100 + "$" : "-";
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

export const jobDescriptionChooser = (position) => {
  if (position === "Manager") {
    return "Responsible for the hotel's daily management.";
  } else if (position === "Recepcionist") {
    return "Responsible for greeting guests and checking them in and out of the hotel.";
  } else if (position === "Room Service") {
    return "Responsible for preparing and delivering food and beverages to guest rooms.";
  }
};

export const roomInfoChooser = (roomType) => {
  switch (roomType) {
    case "Single Bed":
      return {
        cancelattion:
          "You can cancel up to 24 hours before check-in without penalty.",
        amenities: ["Wi-Fi", "TV", "Air conditioning"],
      };
    case "Double Bed":
      return {
        cancelattion:
          "You can cancel up to 48 hours before check-in without penalty.",
        amenities: ["Wi-Fi", "TV", "A/C", "Air conditioning", "Safe"],
      };
    case "Double Superior":
      return {
        cancelattion:
          "You can cancel up to 72 hours before check-in without penalty.",
        amenities: ["Wi-Fi", "TV", "Safe", "Bathtub", "Air conditioning"],
      };
    case "Suite":
      return {
        cancelattion:
          "You can cancel up to 1 week before check-in without penalty.",
        amenities: [
          "Wi-Fi",
          "TV",
          "Mini fridge",
          "Hair dryer",
          "Air conditioning",
          "Bathtub",
          "Safe",
        ],
      };

    default:
      return undefined;
  }
};
