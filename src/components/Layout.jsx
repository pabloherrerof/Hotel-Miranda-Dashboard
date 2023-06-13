import { Outlet, useLocation, useMatch } from "react-router-dom";
import { TopBar } from "./TopBar";
import { useContext, useEffect, useState } from "react";
import { SideBar } from "./SideBar";
import { Container, Content, LeftMenu, RightSection } from "./LayoutStyled";
import { useDispatch, useSelector } from "react-redux";
import { getLoggedUserData, getLoggedUserStatus } from "../features/users/usersSlice";
import { UserContext } from "./UserContext";
import { getLoggedUser } from "../features/users/usersThunks";
import "react-toastify/dist/ReactToastify.css";

export const Layout = (props) => {
  let location = useLocation();
  let roomMatch = useMatch("/rooms/:id");
  let bookingMatch = useMatch("/booking/:bookingId");
  let userMatch = useMatch("/user/:id");
  const dispatch = useDispatch();
  const getUserData = useSelector(getLoggedUserData);
  const getUserStatus = useSelector(getLoggedUserStatus);
  const { state } = useContext(UserContext);

  let title = "";
  const [open, setOpen] = useState(false);

  useEffect(()=> {
    if (getUserStatus === "idle") {
        dispatch(getLoggedUser(state.user));
    }
  },[getUserStatus, dispatch, state.user])

  const titleChooser = () => {
    if (location.pathname === "/") {
      title = "Dashboard";
    } else if (location.pathname === "/contact") {
      title = "Contact";
    } else if (location.pathname === "/rooms") {
      title = "Rooms";
    } else if (location.pathname === "/bookings") {
      title = "Bookings";
    } else if (location.pathname === "/users") {
      title = "Users";
    } else if (userMatch != null && location.pathname === userMatch.pathname) {
      console.log(bookingMatch);
      title = "User";
    } else if (
      bookingMatch != null &&
      location.pathname === bookingMatch.pathname
    ) {
      title = "Booking detail";
    } else if (roomMatch != null && location.pathname === roomMatch.pathname) {
      title = "Room detail";
    }

    return title;
  };

  
  if (getUserData) {
  return (
    <>
      <Container>
        <LeftMenu open={open}>
          <SideBar user={getUserData}/>
        </LeftMenu>
        <RightSection open={open}>
       
          <TopBar
            page={titleChooser()}
            setAuth={props.setAuth}
            showSideBar={setOpen}
            open={open}
          />
          <Content>
            <Outlet></Outlet>
          </Content>
        </RightSection>
      
      </Container>
      
    </>
  );
}};
