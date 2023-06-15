import logo from "../../assets/logo-hotel.svg";
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
  WrapperSideBar,
} from "./SideBarStyled";
import { useContext, useEffect } from "react";
import { UserContext } from "../UserContext";
import { useDispatch, useSelector } from "react-redux";
import { getLoggedUserData, getLoggedUserStatus } from "../../features/users/usersSlice";
import { getLoggedUser } from "../../features/users/usersThunks";



export const SideBar = (props) => {
  const navigate = useNavigate();
  const { state } = useContext(UserContext);
  const loggedUserStatus = useSelector(getLoggedUserStatus);
  const loggedUserData = useSelector(getLoggedUserData)
  const dispatch = useDispatch();
 

  useEffect(()=> {
    if (loggedUserStatus === "idle") {
        dispatch(getLoggedUser(state.user));
    }
  },[loggedUserStatus, dispatch, state.user])

  const clickHandler = () => {
    console.log(state.user)
    navigate(`/users/${state.user}`);
  };

  return (
    
    <>
      <WrapperSideBar>
        <Logo direction={"row"}>
          <img src={logo} alt="logo" />
          <div>
            <h2>travl</h2>
            <p>Hotel Admin Dashboard</p>
          </div>
        </Logo>
        <LinkContainer>
          <li>
            
            <MenuLink to={"/"}><TbLayoutDashboard />Dashboard</MenuLink>
          </li>

          <li>
            
            <MenuLink to={"/rooms"}><TbKey />Rooms</MenuLink>
          </li>

          <li>
            
            <MenuLink to={"/bookings"}><TbCalendarEvent />Bookings</MenuLink>
          </li>

          <li>
           
            <MenuLink to={"/contact"}> <TbMessageCircle />Contact</MenuLink>
          </li>

          <li>
            
            <MenuLink to={"/users"}><MdPersonOutline />Users</MenuLink>
          </li>
        </LinkContainer>
        <User>
        <SideBarUserImage src={loggedUserData.photo}>
           
        </SideBarUserImage>
          <h5>{loggedUserData.name}</h5>
          <p>{loggedUserData.email}</p>
          <button onClick={() => clickHandler()}>View User</button>
        </User>
        
        <Copyright>
          <h6>Travl Hotel Admin Dashboard</h6>
          <p>2023 All Rights Reserved</p>
        </Copyright>
      </WrapperSideBar>
    </>
  );
};
