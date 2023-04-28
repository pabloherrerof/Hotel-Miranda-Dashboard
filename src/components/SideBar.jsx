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
  SideBarUserImage,
  User,
  Wrapper,
} from "./SideBarStyled";
import { useContext } from "react";
import { UserContext } from "./UserContext";

export const SideBar = () => {
  const navigate = useNavigate();
  const { state } = useContext(UserContext);

  const clickHandler = () => {
    navigate(`/users/${state.user.id}`);
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
            <MenuLink to={"/bookings"}>Bookings</MenuLink>
          </li>

          <li>
            <TbMessageCircle />
            <MenuLink to={"/contact"}>Contact</MenuLink>
          </li>

          <li>
            <MdPersonOutline />
            <MenuLink to={"/users"}>Users</MenuLink>
          </li>
        </LinkContainer>
        <User>
        <SideBarUserImage src={state.user.photo}>
           
        </SideBarUserImage>
          <h5>{state.user.name}</h5>
          <p>{state.user.email}</p>
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
