import { BsArrowBarLeft, BsArrowBarRight } from "react-icons/bs";
import { HiOutlineLogout, HiOutlineBell, HiOutlineMail } from "react-icons/hi";
import { Nav, NavItemContainer } from "./TopBarStyled";
import { useContext } from "react";
import { UserContext } from "./UserContext";
export const TopBar = ({ open, page, showSideBar }) => {
    const appContext = useContext(UserContext);
    if (!appContext) {
        // Manejar el caso en el que el contexto no esté disponible
        return null;
    }
    const { dispatch } = appContext;
    const onLogOutClickHandler = () => {
        dispatch({ type: "LogOut" });
    };
    const onClickSideBarHandler = () => {
        if (open) {
            showSideBar(false);
        }
        else {
            showSideBar(true);
        }
    };
    if (open) {
        return (<>
        <Nav>
          <NavItemContainer>
            <BsArrowBarLeft onClick={onClickSideBarHandler}/>
            <h2>{page}</h2>
          </NavItemContainer>
          <NavItemContainer>
            <HiOutlineBell />
            <HiOutlineMail />
            <HiOutlineLogout onClick={onLogOutClickHandler} data-testid="logout__button"/>
          </NavItemContainer>
        </Nav>
      </>);
    }
    else {
        return (<>
        <Nav>
          <NavItemContainer>
            <BsArrowBarRight onClick={onClickSideBarHandler}/>
            <h2>{page}</h2>
          </NavItemContainer>
          <NavItemContainer>
            <HiOutlineBell />
            <HiOutlineMail />
            <HiOutlineLogout onClick={onLogOutClickHandler} data-testid="logout__button"/>
          </NavItemContainer>
        </Nav>
      </>);
    }
};
