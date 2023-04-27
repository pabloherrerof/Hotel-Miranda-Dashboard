import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { Bookings } from "./pages/Booking/Bookings";
import { Rooms } from "./pages/Rooms/Rooms";
import { Contact } from "./pages/Contact";
import { Users } from "./pages/Users/Users";
import { AddUser } from "./pages/Users/AddUser";
import { AddRoom } from "./pages/Rooms/AddRoom";
import { SingleUser } from "./pages/Users/SingleUser";
import "./App.css";
import { Login } from "./pages/Login";
import { SingleBooking } from "./pages/Booking/SingleBooking";
import { ErrorPage } from "./pages/ErrorPage";
import { PrivateRoute } from "./components/PrivateRoute";
import { Layout } from "./components/Layout";
import { SingleRoom } from "./pages/Rooms/SingleRoom";



function App() {

  const [isAuthenticated, setAuthenticated] = useState(localStorage.getItem("isLogged"));
 
  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem("isLogged", "true");
    } else {
      localStorage.removeItem("isLogged");
    }
  }, [isAuthenticated]);




  return (
    <>
      <BrowserRouter>
      
        <Routes>
        <Route exact path = "/login" element={isAuthenticated ? <Navigate to="/"/> : <Login setAuth={setAuthenticated}/>} />
         
         <Route element={<PrivateRoute authenticated={isAuthenticated}><Layout setAuth={setAuthenticated}/></PrivateRoute>}>
          <Route exact path="/" element={<Dashboard/>} />
 
          <Route exact path="/bookings" element={<Bookings /> } />
          <Route exact path="/bookings/:id" element={<SingleBooking/>} />

          <Route exact path="/rooms" element={<Rooms />} />
          <Route exact path = "/rooms/:id" element={<SingleRoom/>}/>
          <Route exact path="/rooms/addRoom" element={<AddRoom />} />

          <Route exact path="/contact" element={<Contact />} />

          <Route exact path="/users" element={<Users />} /> {/*/ Vista de datos de usuario loggeado con posibilidad de editar*/}
          <Route exact path="/user/add" element= {<AddUser/> } /> 
          <Route  path="/users/:id" element= {<SingleUser/>} /> 
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        
      </BrowserRouter>
    </>
  );
}

export default App;
