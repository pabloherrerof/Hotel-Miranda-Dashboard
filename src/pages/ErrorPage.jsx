import { useNavigate  } from "react-router-dom";
import styled from "styled-components";

const ErrorWrapper = styled.div`
    display: flex;
    height: 100%;
    width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  text-align: center;
  h1 {
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  line-height: 29px;
  letter-spacing: 0.05em;
  font-size: 2em;
}
i{
    color: #E23428;
}

button{
        font-family: "Poppins";
        font-size: 14px;
        font-weight: normal;
    padding: 0.5em 2em;
        border-radius: 10px;
        border: none;
        background: #135846;
        color: #FFFFFF;
    }
    
    button:hover{
        scale: 1.2;
        cursor: pointer;
    }
`

export const ErrorPage = () =>{

    const navigate = useNavigate();

    const onClickHandler = () =>{
        navigate("/")
    }
    
    return(<>
        <ErrorWrapper>
        <i className="errorSearchIcon fa-solid fa-x fa-beat fa-2xl"></i>{" "}
          <h1>The page you’re looking for can’t be found.</h1>
          <button onClick={onClickHandler}>RETURN TO HOME</button>
        </ErrorWrapper>
        
       
        
    </>)
}