import styled from "styled-components";
import logo from "../assets/logo-hotel.svg";
import {
  TbLayoutDashboard,
  TbKey,
  TbCalendarEvent,
  TbMessageCircle,
} from "react-icons/tb";
import { MdPersonOutline } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";

const Wrapper = styled.div`

  display: flex;
  flex-direction: column;
  box-shadow: 13px 3px 40px #00000005;
  gap: 2rem;
  align-items: center;
  width: 100%;
 
  
`;
export const Logo = styled.div`
  height: 100px;
  display: flex;
  align-items: center;
  flex-direction: ${(props) => (props.column ? "column" : "row")};
  justify-content: center;
  gap: ${(props) => (props.column ? "0.5rem" : "1.5rem")};
  p {
    margin: 0;
    font-family: "Poppins";
    font-size: 12px;
    font-weight: 300;
    color: #5d5449;
  }
  h2 {
    margin: 0;
    font-family: "Poppins";
    font-weight: 900;
    font-size: 28px;
  }
  img {
    width: 60px;
  }
`;

const LinkContainer = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  gap: 2.5rem;
  font-family: "Poppins";
  font-style: 18px;
  font-weight: normal;
  color: #799283;
  padding: 0;  

  li:hover{
    scale: 1.2;
    cursor: pointer;
  }

  svg {
    font-size: 22px;
  }

  li {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
  }
`;

const User = styled.div`
  box-shadow: 0px 20px 30px #00000014;
  border-radius: 12px;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem 2rem;
  margin: 0 2rem;
  

  .user-image {
    width: 70px;
    height: 70px;
    background-color: #c5c5c5;
    border-radius: 8px;
  }

  h5 {
    text-align: center;
    font-family: "Poppins";
    font-size: 16px;
    font-weight: medium;
    letter-spacing: 0px;
    color: #393939;
    margin-top: 1rem;
    margin-bottom: 0.2rem;
  }

  p {
    font-family: "Poppins";
    font-size: 12px;
    font-weight: 300;
    letter-spacing: 0px;
    color: #b2b2b2;
    margin: 0;
    margin-bottom: 1rem;
  }

  button{
    background: #EBF1EF;
    border: none;
    border-radius: 8px;
    font-size: 12px;
    font-family: "Poppins";
    font-weight: 600;
letter-spacing: 0px;
color: #135846;
padding: 0.7rem 2rem;
  }

  button:hover{
    cursor: pointer;
    scale: 1.1;
  }
`;

const MenuLink = styled(NavLink)`
   
    font-weight: normal;
    color: #799283;
    text-decoration: none;
  

  &.active{
    color: #135846;
    font-weight: 600;
  }
`

const Copyright = styled.div`
  margin-top: 0;
  padding: 0 1%;
 
  h6{
    font-size: 14px;
    font-family: "Poppins";
    font-weight: 600;
    color: #212121;
    margin-bottom: 5px;
    margin-top: 0;
  }

  p{
    font-family: "Poppins";
    font-weight: 300;
    font-size: 12px;
    color: #799283;
    margin: 0;
  }
`

export const SideBar = () => {

  const navigate = useNavigate();

  const clickHandler = () =>{
    navigate("/user/:id")
  }
  return (
    <>
      <Wrapper>
        <Logo direction={"row"}>
          <img src={logo} alt="logo" />
          <div>
            <h2>travl</h2>
            <p>Hotel Admin Dashboard</p>
          </div>
        </Logo>
        <LinkContainer>
          <li>
            <TbLayoutDashboard />
            <MenuLink to={"/"}>Dashboard</MenuLink>
          </li>

          <li>
            <TbKey />
            <MenuLink to={"/rooms"}>Rooms</MenuLink>
          </li>

          <li>
            <TbCalendarEvent />
            <MenuLink to={"/booking"}>Bookings</MenuLink>
          </li>

          <li>
            <TbMessageCircle />
            <MenuLink to={"/contact"}>Contact</MenuLink>
          </li>

          <li>
            <MdPersonOutline />
            <MenuLink to={"/user"}>Users</MenuLink>
          </li>
        </LinkContainer>
        <User>
          <div className="user-image"></div>
          <h5>Pablo</h5>
          <p>admin@admin.com</p>
          <button onClick={()=> clickHandler()}>Edit User</button>
        </User>
        <Copyright>
          <h6>Travl Hotel Admin Dashboard</h6>
          <p>2023 All Rights Reserved</p>
        </Copyright>

      </Wrapper>
    </>
  );
};
