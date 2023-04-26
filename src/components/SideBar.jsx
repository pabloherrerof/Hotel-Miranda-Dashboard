import logo from "../assets/logo-hotel.svg";
import {
  TbLayoutDashboard,
  TbKey,
  TbCalendarEvent,
  TbMessageCircle,
} from "react-icons/tb";
import { MdPersonOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import {
  Copyright,
  LinkContainer,
  Logo,
  MenuLink,
  User,
  Wrapper,
} from "./SideBarStyled";

export const SideBar = () => {
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate("/user/:id");
  };
  
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
          <button onClick={() => clickHandler()}>Edit User</button>
        </User>
        <Copyright>
          <h6>Travl Hotel Admin Dashboard</h6>
          <p>2023 All Rights Reserved</p>
        </Copyright>
      </Wrapper>
    </>
  );
};
