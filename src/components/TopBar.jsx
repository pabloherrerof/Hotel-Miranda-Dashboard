import { BsArrowBarLeft, BsArrowBarRight } from "react-icons/bs";
import { HiOutlineLogout, HiOutlineBell, HiOutlineMail } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import {Nav, NavItemContainer} from "./TopBarStyled"



export const TopBar = (props) => {
  const navigate = useNavigate();

  const onLogOutClickHandler = () => {
    localStorage.removeItem("isLogged");
    props.setAuth(false);
    navigate("/login");
  };

  const onClickSideBarHandler = () => {
    if (props.open) {
      props.showSideBar(false);
    } else {
      props.showSideBar(true);
    }
  };

  if (props.open) {
    return (
      <>
        <Nav>
          <NavItemContainer>
            <BsArrowBarLeft onClick={onClickSideBarHandler} />
            <h2>{props.page}</h2>
          </NavItemContainer>
          <NavItemContainer>
            <HiOutlineBell />
            <HiOutlineMail />
            <HiOutlineLogout onClick={onLogOutClickHandler} />
          </NavItemContainer>
        </Nav>
      </>
    );
  } else {
    return (
      <>
        <Nav>
          <NavItemContainer>
            <BsArrowBarRight onClick={onClickSideBarHandler} />
            <h2>{props.page}</h2>
          </NavItemContainer>
          <NavItemContainer>
            <HiOutlineBell />
            <HiOutlineMail />
            <HiOutlineLogout onClick={onLogOutClickHandler} />
          </NavItemContainer>
        </Nav>
      </>
    );
  }
};
