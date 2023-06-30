import React, { useEffect, useReducer, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { Bookings } from "./pages/Booking/Bookings";
import { Rooms } from "./pages/Rooms/Rooms";
import { Contact } from "./pages/Contact";
import { Users } from "./pages/Users/Users";
import { SingleUser } from "./pages/Users/SingleUser";
import "./App.css";
import { Login } from "./pages/Login/Login";
import { SingleBooking } from "./pages/Booking/SingleBooking";
import { ErrorPage } from "./pages/ErrorPage/ErrorPage";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";
import { Layout } from "./components/Layout/Layout";
import { SingleRoom } from "./pages/Rooms/SingleRoom";
import { UserContext } from "./components/UserContext";
import { ToastContainer } from "react-toastify";
import { ErrorPageMobile } from "./pages/ErrorPage/ErrorPageMobile";

export const loginLocalValue = localStorage.getItem("login");

const initialState = loginLocalValue
  ? { auth: true, user: JSON.parse(loginLocalValue).id }
  : { auth: false, user: {} };

const reducer = (state, action) => {
  switch (action.type) {
    case "LogIn":
      return { ...state, auth: true, user: action.payload };
    case "LogOut":
      return { ...state, auth: false, user: {} };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  

  if(windowWidth < 1000){
    return(
      <ErrorPageMobile/>
    )
  } else
  return (
    <>
      <UserContext.Provider value={{ state, dispatch }}>
        <BrowserRouter basename="/Hotel-Miranda-Dashboard">
          <Routes>
            <Route
              path="/login"
              element={state.auth ? <Navigate to="/" /> : <Login />}
            />

            <Route
              element={
                <PrivateRoute auth={state.auth}>
                  <Layout />
                </PrivateRoute>
              }
            >
              <Route path="/" element={<Dashboard />} />
              <Route path="/bookings" element={<Bookings />} />
              <Route path="/bookings/:id" element={<SingleBooking />} />
              <Route path="/rooms" element={<Rooms />} />
              <Route path="/rooms/:id" element={<SingleRoom />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/users" element={<Users />} />{" "}
              <Route path="/users/:id" element={<SingleUser />} />
              <Route path="*" element={<ErrorPage error/>} />
            </Route>
          </Routes>
        </BrowserRouter>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </UserContext.Provider>
    </>
  );
}

export default App;
