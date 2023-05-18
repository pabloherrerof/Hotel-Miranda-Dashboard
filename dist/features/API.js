import users from "../data/users.json";
import rooms from "../data/rooms.json";
export const searchObjectByEmailAndPassword = (email, password) => {
    return users.find((object) => object.email === email && object.password === password);
};
export const searchBookingRoom = (roomId) => {
    const room = rooms.find((object) => object.id === roomId);
    if (room) {
        return room;
    }
    else
        return {
            roomType: "",
            roomNumber: "",
            id: "",
            description: "",
            price: 0,
            discount: 0,
            cancellation: "",
            amenities: [""],
            thumbnail: "",
            images: [""],
            status: "",
        };
};
