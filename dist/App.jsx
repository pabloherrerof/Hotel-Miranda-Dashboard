import React, { useReducer } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { Bookings } from "./pages/Booking/Bookings";
import { Rooms } from "./pages/Rooms/Rooms";
import { Contacts } from "./pages/Contact";
import { Users } from "./pages/Users/Users";
import { SingleUser } from "./pages/Users/SingleUser";
import "./App.css";
import { Login } from "./pages/Login/Login";
import { SingleBooking } from "./pages/Booking/SingleBooking";
import { ErrorPage } from "./pages/ErrorPage/ErrorPage";
import { PrivateRoute } from "./components/PrivateRoute";
import { SingleRoom } from "./pages/Rooms/SingleRoom";
import { UserContext } from "./components/UserContext";
const initialState = {
    auth: false,
    user: {
        photo: "",
        name: "",
        id: "",
        phone: "",
        email: "",
        startDate: "",
        jobDescription: "",
        state: "",
        password: "",
        position: "",
    },
};
const reducer = (state, action) => {
    switch (action.type) {
        case "LogIn":
            return Object.assign(Object.assign({}, state), { auth: true, user: action.payload });
        case "LogOut":
            return Object.assign(Object.assign({}, state), { auth: false, user: {} });
        default:
            return state;
    }
};
export function App() {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (<>
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
      
        <Routes>
        <Route path="/login" element={state.auth ? <Navigate to="/"/> : <Login />}/>
         <Route element={<PrivateRoute></PrivateRoute>}>
          <Route path="/" element={<Dashboard />}/>
 
          <Route path="/bookings" element={<Bookings />}/>
          <Route path="/bookings/:id" element={<SingleBooking />}/>

          <Route path="/rooms" element={<Rooms />}/>
          <Route path="/rooms/:id" element={<SingleRoom />}/>

          <Route path="/contact" element={<Contacts />}/>

          <Route path="/users" element={<Users />}/> {/*/ Vista de datos de usuario loggeado con posibilidad de editar*/}
          <Route path="/users/:id" element={<SingleUser />}/> 
          <Route path="*" element={<ErrorPage />}/>
          </Route>
          
        </Routes>
        
      </BrowserRouter>
      </UserContext.Provider>
    </>);
}
export default App;
