import { useNavigate } from "react-router-dom";
import { ErrorWrapper } from "./ErrorPageStyled";
export const ErrorPage = () => {
    const navigate = useNavigate();
    const onClickHandler = () => {
        navigate("/");
    };
    return (<>
      <ErrorWrapper>
        <i className="errorSearchIcon fa-solid fa-x fa-beat fa-2xl"></i>{" "}
        <h1>The page you’re looking for can’t be found.</h1>
        <button onClick={onClickHandler}>RETURN TO HOME</button>
      </ErrorWrapper>
    </>);
};
