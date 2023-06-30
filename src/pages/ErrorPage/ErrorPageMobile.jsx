import { ErrorWrapper } from "./ErrorPageStyled";

export const ErrorPageMobile = (props) => {

    return (
      <>
        <ErrorWrapper>
          <i className="errorSearchIcon fa-solid fa-x fa-beat fa-2xl"></i>{" "}
          <h1>App only available for desktop users.</h1>
        </ErrorWrapper>
      </>
    );
  }