import styled from "styled-components";
export const Nav = styled.nav `
  width: 100%;
  height: 100px;
  box-shadow: 0px 3px 10px #00000005;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #ffffff;
`;
export const NavItemContainer = styled.div `
  font-size: 24px;
  color: #262626;
  display: flex;
  flex-direction: row;
  font-family: "Poppins";
  align-items: center;
  gap: 2.5rem;
  padding: 0 2%;

  svg:hover {
    scale: 1.2;
    cursor: pointer;
  }

  h2 {
    font-size: 24px;
  }
`;
