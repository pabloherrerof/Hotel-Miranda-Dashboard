import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { Booking } from "./pages/Booking/Booking";
import { Rooms } from "./pages/Rooms/Rooms";
import { Contact } from "./pages/Contact";
import { Users } from "./pages/Users/Users";
import { AddUser } from "./pages/Users/AddUser";
import { AddRoom } from "./pages/Rooms/AddRoom";
import { EditUser } from "./pages/Users/EditUser";
import "./App.css";
import { Login } from "./pages/Login";
import { SingleBooking } from "./pages/Booking/SingleBooking";
import { ErrorPage } from "./pages/ErrorPage";
import { PrivateRoute } from "./components/PrivateRoute";
import { Layout } from "./components/Layout";


function App() {

  const [isAuthenticated, setAuthenticated] = useState(localStorage.getItem("isLogged"));
 
  

  if(localStorage.getItem("users") === null){
    const user = {
      email: "admin@admin.com",
      password: "admin",
      name: "Admin" ,
    }

    let objectLocalStorage = {
      data: [],
    }

    objectLocalStorage.data.push(user);
    let objectLocalStorageEncoded = JSON.stringify(objectLocalStorage);
      localStorage.setItem("users", objectLocalStorageEncoded);
  }




  return (
    <>
      <BrowserRouter>
      
        <Routes>
        <Route exact path = "/login" element={isAuthenticated ? <Navigate to="/"/> : <Login setAuth={setAuthenticated}/>} />
         
         <Route element={<Layout setAuth={setAuthenticated}/>}>
          <Route exact path="/" element={<PrivateRoute authenticated= {isAuthenticated}><Dashboard/></PrivateRoute>} />
 
          <Route exact path="/booking" element={  <PrivateRoute authenticated= {isAuthenticated}><Booking /></PrivateRoute> } />
          <Route exact path="/booking/:bookingId" element={ <PrivateRoute authenticated= {isAuthenticated}><SingleBooking/></PrivateRoute> } />

          <Route exact path="/rooms" element={<PrivateRoute authenticated= {isAuthenticated}><Rooms /> </PrivateRoute>} />
          <Route exact path="/rooms/addRoom" element={ <PrivateRoute authenticated= {isAuthenticated}><AddRoom /></PrivateRoute> } />

          <Route exact path="/contact" element={<PrivateRoute authenticated= {isAuthenticated}><Contact /> </PrivateRoute>} />

          <Route exact path="/user" element={<PrivateRoute authenticated= {isAuthenticated}><Users /> </PrivateRoute>} /> {/*/ Vista de datos de usuario loggeado con posibilidad de editar*/}
          <Route exact path="/user/add" element= {<PrivateRoute authenticated= {isAuthenticated}><AddUser/> </PrivateRoute> } /> 
          <Route exact path="/user/:id" element= {<PrivateRoute authenticated= {isAuthenticated}><EditUser/> </PrivateRoute> } /> 

        
          <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
        
      </BrowserRouter>
    </>
  );
}

export default App;
