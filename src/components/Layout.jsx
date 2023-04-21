import { Outlet, useLocation, useMatch } from "react-router-dom";
import { TopBar } from "./TopBar";
import { useState } from "react";
import { SideBar } from "./SideBar";
import styled, {css} from "styled-components";

const Container = styled.body`
    min-height: 100vh;
    display: flex;
    margin: 0;
`;

const LeftMenu = styled.div`
 display: inline-block;
 width: 400px;
 height: 100vh;
 ${props => !props.open && css`
    display: none;
`};
 `;


const RightSection = styled.section`
display: inline-block;
height: 100vh;
width: 100%;
`

const Content = styled.main`
display: flex;
justify-content: center;
background-color: #00000005;
padding: 50px 50px;

`


export const Layout = (props) => {
  let location = useLocation();
  
  let title = "";

  const[open, setOpen] = useState(false);

  const titleChooser = () => {
    if (location.pathname === "/") {
      title = "Dashboard";
    } else if (location.pathname === "/contact") {
      title = "Contact";
    } else if (location.pathname === "/rooms") {
      title = "Rooms";
    } else if (location.pathname === "/booking") {
      title = "Bookings";
    } else if (location.pathname === "*") {
      title = "Error";
    } else if(location.pathname === "/user"){
      title= "User";
    }
    return title;
  };

 
  return (
    <>
      <Container>
        <LeftMenu open={open}>
          <SideBar/>
        </LeftMenu>
        <RightSection>
            <TopBar page={titleChooser()} setAuth={props.setAuth} showSideBar={setOpen} open={open} />
            <Content>
                <Outlet/>
            </Content>
        </RightSection>
      </Container>
    </>
  );
};
