import { checkIfExistsUser } from "../features/localStorage/login";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo-hotel.svg"
import { Logo } from "../components/SideBar";
import { EditButton } from "../components/Button";

const LogContainer = styled.div`
display: flex;
justify-content:center;
align-items: center;
background-color: #F8F8F8;
width: 100vw;
height: 100vh;
min-width: 300px;
min-height: 400px;
`
const LogForm = styled.form`
 
    padding: 4% 2%;
    background: #FFFFFF;
    box-shadow: 0px 4px 4px #00000005;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    p{
        text-align: center;
        font-family: "Poppins";
        font-weight: 300;
        font-size: 10px;
        color: #5D5449;

    }
`
const Inputs = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    justify-content: center;
    align-items: center;

    label{
        font-family: "Poppins";
        font-weight: 600;
        font-size: 12px;
        letter-spacing: 0.2px;
    }

    input{
        width: 150%;
        border: none;
        border-radius: 5px;
        background-color:#00000014;
        font-family: "Poppins";
        padding: 0.5rem 1rem;
    }
  
`



export const Login = (props) =>{
    const navigate = useNavigate();


    
const handleSubmit = (e) =>{
    e.preventDefault();
    const email = document.getElementById("email").value; 
    const password = document.getElementById("password").value;

    const user = {
        email: email,
        password: password,
    }

    const loginResponse = checkIfExistsUser(user);
    

    if(loginResponse){
        localStorage.setItem("isLogged", true);
        props.setAuth(true)
        navigate("/contact");
    }
}

    
    return (<>

<LogContainer>
    <LogForm onSubmit={handleSubmit}>
        <Logo column>
        <img src={logo} alt="logo" />
        <h2>travl</h2>
        </Logo>
        
        <p>(Use email=<strong> admin@admin.com </strong>  and password=<strong> admin</strong> to test the application )</p>
        <Inputs> 
        <label htmlFor="email">Email:</label>
        <input id="email" type="text" />
        <label htmlFor="password">Pasword:</label>
        <input id="password" type="password" /></Inputs>
       
        <EditButton type="submit">Login</EditButton>
    </LogForm>
</LogContainer>
    </>)
}