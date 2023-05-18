import { Outlet, useLocation, useMatch } from "react-router-dom";
import { TopBar } from "./TopBar";
import { useState } from "react";
import { SideBar } from "./SideBar";
import { Container, Content, LeftMenu, RightSection } from "./LayoutStyled";
export const Layout = () => {
    let location = useLocation();
    let roomMatch = useMatch("/rooms/:id");
    let bookingMatch = useMatch("/booking/:bookingId");
    let userMatch = useMatch("/user/:id");
    let title = "";
    const [open, setOpen] = useState(false);
    const titleChooser = () => {
        if (location.pathname === "/") {
            title = "Dashboard";
        }
        else if (location.pathname === "/contact") {
            title = "Contact";
        }
        else if (location.pathname === "/rooms") {
            title = "Rooms";
        }
        else if (location.pathname === "/bookings") {
            title = "Bookings";
        }
        else if (location.pathname === "/users") {
            title = "Users";
        }
        else if (userMatch != null && location.pathname === userMatch.pathname) {
            title = "User";
        }
        else if (bookingMatch != null &&
            location.pathname === bookingMatch.pathname) {
            title = "Booking detail";
        }
        else if (roomMatch != null && location.pathname === roomMatch.pathname) {
            title = "Room detail";
        }
        return title;
    };
    return (<>
      <Container>
        <LeftMenu open={open}>
          <SideBar />
        </LeftMenu>
        <RightSection open={open}>
          <TopBar page={titleChooser()} showSideBar={setOpen} open={open}/>
          <Content>
            <Outlet />
          </Content>
        </RightSection>
      </Container>
    </>);
};
