import styled from "styled-components"
import {BsArrowBarLeft, BsArrowBarRight} from 'react-icons/bs'
import {HiOutlineLogout, HiOutlineBell, HiOutlineMail} from 'react-icons/hi'
import { useNavigate } from "react-router-dom"



const Nav = styled.nav`
width: 100%;
height: 100px;
box-shadow: 0px 3px 10px #00000005;
display: flex;
align-items: center;
justify-content: space-between;
background: #FFFFFF;
`

const NavItemContainer = styled.div`
    font-size: 24px;
    color: #262626;
    display: flex;
    flex-direction: row;
    font-family:"Poppins";
    align-items: center;
    gap: 2.5rem;
    padding: 0 2%;

    
    
    svg:hover{
       scale: 1.2;
       cursor: pointer;
       
    }

    h2{
        font-size: 24px; 
    }
`




export const TopBar = (props) => {
   


   
   
    const navigate = useNavigate();

    const onLogOutClickHandler = () => {
        localStorage.removeItem("isLogged");
        props.setAuth(false)
        navigate("/login");
    }

    const onClickSideBarHandler = () => {
        if(props.open){
            props.showSideBar(false);
        } else{
            props.showSideBar(true);
        }
    }


console.log(props.open);
   
    if(props.open){
        return (<>
            <Nav>
                <NavItemContainer>
                    <BsArrowBarLeft onClick={onClickSideBarHandler}/>
                    <h2>{props.page}</h2>
                </NavItemContainer>
                <NavItemContainer>
                <HiOutlineBell/>
                <HiOutlineMail/>
                <HiOutlineLogout onClick={onLogOutClickHandler}/>
                </NavItemContainer>
            </Nav> 
        </>)
    } else{
        return (<>
            <Nav>
                <NavItemContainer>
                    <BsArrowBarRight onClick={onClickSideBarHandler}/>
                    <h2>{props.page}</h2>
                </NavItemContainer>
                <NavItemContainer>
                <HiOutlineBell/>
                <HiOutlineMail/>
                <HiOutlineLogout onClick={onLogOutClickHandler}/>
                </NavItemContainer>
            </Nav> 
        </>)
    }
        
        
        
    
    
}

