import { Outlet, useLocation, useMatch } from "react-router-dom";
import { TopBar } from "./TopBar";
import { useState } from "react";
import { SideBar } from "./SideBar";
import styled, {css} from "styled-components";

const Container = styled.div`
    min-height: 100vh;
    display: flex;
    margin: 0;
    max-width: 100vw;
`;

const LeftMenu = styled.div`
 display: inline-block;
 width: 300px;
 ${props => !props.open && css`
    display: none;
`}
 `;


const RightSection = styled.section`
display: inline-block;
width: ${props => props.open ? "calc(100% - 300px)" : "100%"};
`

const Content = styled.main`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
background-color: #00000005;
padding: 50px 30px;
height: calc(100% - 100px);
position: relative;
`


export const Layout = (props) => {
  let location = useLocation();
  let roomMatch = useMatch("/rooms/:id");
  let bookingMatch = useMatch("/booking/:bookingId");
  let userMatch = useMatch("/user/:id");


  
let title= ""

  const[open, setOpen] = useState(true);


  const titleChooser = () => {
    if (location.pathname === "/") {
      title = "Dashboard";
    } else if (location.pathname === "/contact") {
      title = "Contact";
    } else if (location.pathname === "/rooms") {
      title = "Rooms";
    } else if (location.pathname === "/booking") {
      title = "Bookings";
    } else if(location.pathname === "/user"){
      title= "Users";
    } else if( userMatch != null && location.pathname === userMatch.pathname){
      console.log(bookingMatch)
      title= "User"
    } else if(bookingMatch != null && location.pathname === bookingMatch.pathname){
      console.log(userMatch)
      console.log("booking")
      title="Booking detail";
    } else if(roomMatch != null && location.pathname === roomMatch.pathname){
      title= "Room detail";
    }

    return title
  };

 
  return (
    <>
      <Container>
        <LeftMenu open={open}>
          <SideBar/>
        </LeftMenu>
        <RightSection open={open}>
            <TopBar page={titleChooser()} setAuth={props.setAuth} showSideBar={setOpen} open={open} />
            <Content>
                <Outlet/>
            </Content>
        </RightSection>
      </Container>
    </>
  );
};
