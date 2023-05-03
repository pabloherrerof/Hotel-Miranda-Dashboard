import React, { useReducer } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { Bookings } from "./pages/Booking/Bookings";
import { Rooms } from "./pages/Rooms/Rooms";
import { Contact } from "./pages/Contact";
import { Users } from "./pages/Users/Users";
import { AddRoom } from "./pages/Rooms/AddRoom";
import { SingleUser } from "./pages/Users/SingleUser";
import "./App.css";
import { Login } from "./pages/Login";
import { SingleBooking } from "./pages/Booking/SingleBooking";
import { ErrorPage } from "./pages/ErrorPage";
import { PrivateRoute } from "./components/PrivateRoute";
import { Layout } from "./components/Layout";
import { SingleRoom } from "./pages/Rooms/SingleRoom";
import { UserContext } from "./components/UserContext";

const initialState = {
    auth: false,
    user:{},
}


const reducer = (state, action) => {
  switch(action.type){
    case "LogIn":
    return {...state, auth: true, user: action.payload}
    case "LogOut":
      return {...state, auth: false, user:{}}
    default: 
    return state;
  }
    
}

function App() {


  const [state, dispatch] = useReducer(reducer, initialState);

  console.log(state);
 
  



  return (
    <>
    <UserContext.Provider value={{state, dispatch}}>
      <BrowserRouter>
      
        <Routes>
        <Route exact path = "/login" element={state.auth ? <Navigate to="/"/> : <Login/>} />
         
         <Route element={<PrivateRoute auth={state.auth}><Layout/></PrivateRoute>}>
          <Route exact path="/" element={<Dashboard/>} />
 
          <Route exact path="/bookings" element={<Bookings /> } />
          <Route exact path="/bookings/:id" element={<SingleBooking/>} />

          <Route exact path="/rooms" element={<Rooms />} />
          <Route exact path = "/rooms/:id" element={<SingleRoom/>}/>
          <Route exact path="/rooms/addRoom" element={<AddRoom />} />

          <Route exact path="/contact" element={<Contact />} />

          <Route exact path="/users" element={<Users />} /> {/*/ Vista de datos de usuario loggeado con posibilidad de editar*/}
          <Route  path="/users/:id" element= {<SingleUser/>} /> 
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        
      </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;
