import { Outlet, useLocation, useMatch } from "react-router-dom";
import { TopBar } from "../TopBar/TopBar";
import { useState } from "react";
import { SideBar } from "../SideBar/SideBar";
import { Container, Content, LeftMenu, RightSection } from "./LayoutStyled";
import "react-toastify/dist/ReactToastify.css";

export const Layout = (props) => {
  let location = useLocation();
  let roomMatch = useMatch("/rooms/:id");
  let bookingMatch = useMatch("/bookings/:bookingId");
  let userMatch = useMatch("/users/:id");

  let title = "";
  const [open, setOpen] = useState(false);

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

  return (
    <>
      <Container>
        <LeftMenu open={open}>
          <SideBar />
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
};
