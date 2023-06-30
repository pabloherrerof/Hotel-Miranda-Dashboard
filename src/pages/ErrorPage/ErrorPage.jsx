import { useNavigate } from "react-router-dom";
import { ErrorWrapper } from "./ErrorPageStyled";

export const ErrorPage = (props) => {
  const navigate = useNavigate();

  const onClickHandler = () => {
    window.location.reload()
  };
if(props.mobile){
  return (
    <>
      <ErrorWrapper>
        <i className="errorSearchIcon fa-solid fa-x fa-beat fa-2xl"></i>{" "}
        <h1>App only available for desktop users.</h1>
      </ErrorWrapper>
    </>
  );
} else if(props.error){
    return (
      <>
        <ErrorWrapper>
          <i className="errorSearchIcon fa-solid fa-x fa-beat fa-2xl"></i>{" "}
          <h1>The page you’re looking for can’t be found.</h1>
          <button onClick={()=>{navigate("/")}}>RETURN TO HOME</button>
        </ErrorWrapper>
      </>
    );
} else {
    return (
      <>
        <ErrorWrapper>
          <i className="errorSearchIcon fa-solid fa-x fa-beat fa-2xl"></i>{" "}
          <h1>We encountered a network error.</h1>
          <button onClick={onClickHandler}>Try again</button>
        </ErrorWrapper>
      </>
    );
  }
}
  

