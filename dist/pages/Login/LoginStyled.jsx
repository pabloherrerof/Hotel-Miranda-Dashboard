import styled from "styled-components";
export const LogContainer = styled.div `
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f8f8f8;
  width: 100vw;
  height: 100vh;
  min-width: 300px;
  min-height: 400px;
`;
export const LogForm = styled.form `
  padding: 4% 2%;
  background: #ffffff;
  box-shadow: 0px 4px 4px #00000005;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  p {
    text-align: center;
    font-family: "Poppins";
    font-weight: 300;
    font-size: 10px;
    color: #5d5449;
  }
`;
export const Inputs = styled.div `
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  justify-content: center;
  align-items: center;

  label {
    font-family: "Poppins";
    font-weight: 600;
    font-size: 12px;
    letter-spacing: 0.2px;
  }

  input {
    width: 150%;
    border: none;
    border-radius: 5px;
    background-color: #00000014;
    font-family: "Poppins";
    padding: 0.5rem 1rem;
  }
`;
