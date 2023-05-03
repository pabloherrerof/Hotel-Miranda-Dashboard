import users from "../data/users.json"
import rooms from "../data/rooms.json"

export const searchObjectByEmailAndPassword = (email, password) => {
    return users.find(
      (object) => object.email === email && object.password === password
    );
  };

 

  export const searchBookingRoom = (roomId) => {
    return rooms.find(
      (object) => object.id === roomId
    );
  };