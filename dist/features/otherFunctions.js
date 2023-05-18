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
    }
    else
        return "";
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
    }
    else if (actualDate.getTime() > checkOutDate.getTime()) {
        return "CHECK OUT";
    }
    else {
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
    let day = dd.toString();
    let month = mm.toString();
    let year = yyyy.toString();
    if (dd < 10) {
        day = "0" + day;
    }
    if (mm < 10) {
        month = "0" + month;
    }
    return year + "-" + month + "-" + day;
}
export const jobDescriptionChooser = (position) => {
    if (position === "Manager") {
        return "Responsible for the hotel's daily management.";
    }
    else if (position === "Recepcionist") {
        return "Responsible for greeting guests and checking them in and out of the hotel.";
    }
    else if (position === "Room Service") {
        return "Responsible for preparing and delivering food and beverages to guest rooms.";
    }
};
export const roomInfoChooser = (roomType) => {
    switch (roomType) {
        case "Single Bed":
            return {
                cancelattion: "You can cancel up to 24 hours before check-in without penalty.",
                amenities: ["Wi-Fi", "TV", "Air conditioning"],
                thumbnail: "https://images.unsplash.com/photo-1619011502686-b512e3989a33?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3087&q=80",
                images: [
                    "https://images.unsplash.com/photo-1619011502686-b512e3989a33?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3087&q=80",
                    "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
                    "https://images.unsplash.com/photo-1486946255434-2466348c2166?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
                ]
            };
        case "Double Bed":
            return {
                cancelattion: "You can cancel up to 48 hours before check-in without penalty.",
                amenities: ["Wi-Fi", "TV", "A/C", "Air conditioning", "Safe"],
                thumbnail: "https://images.unsplash.com/photo-1576354302919-96748cb8299e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=658&q=80",
                images: [
                    "https://images.unsplash.com/photo-1576354302919-96748cb8299e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=658&q=80",
                    "https://images.unsplash.com/photo-1604014237256-11d475e2a2d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
                    "https://plus.unsplash.com/premium_photo-1676320514027-c3259eb9a73a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
                ]
            };
        case "Double Superior":
            return {
                cancelattion: "You can cancel up to 72 hours before check-in without penalty.",
                amenities: ["Wi-Fi", "TV", "Safe", "Bathtub", "Air conditioning"],
                thumbnail: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
                images: [
                    "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
                    "https://images.unsplash.com/photo-1620626011761-996317b8d101?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2069&q=80",
                    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1558&q=80"
                ]
            };
        case "Suite":
            return {
                cancelattion: "You can cancel up to 1 week before check-in without penalty.",
                amenities: [
                    "Wi-Fi",
                    "TV",
                    "Kitchen",
                    "Hair dryer",
                    "Air conditioning",
                    "Bathtub",
                    "Safe",
                ],
                thumbnail: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
                images: [
                    "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
                    "https://images.unsplash.com/photo-1580229080435-1c7e2ce835c1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80",
                    "https://images.unsplash.com/photo-1600566752229-250ed79470f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2039&q=80"
                ]
            };
        default:
            return {
                cancelattion: "None",
                amenities: [],
                thumbnail: "none",
                images: []
            };
            ;
    }
};
export const maxCharString = (string, maxChar) => {
    return string.slice(0, maxChar) + "...";
};
