import styled from "styled-components";

export const ErrorWrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  text-align: center;
  h1 {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 600;
    line-height: 50px;
    letter-spacing: 0.05em;
    font-size: 2em;
  }
  i {
    color: #e23428;
  }

  button {
    font-family: "Poppins";
    font-size: 14px;
    font-weight: normal;
    padding: 0.5em 2em;
    border-radius: 10px;
    border: none;
    background: #135846;
    color: #ffffff;
  }

  button:hover {
    scale: 1.2;
    cursor: pointer;
  }
`;
