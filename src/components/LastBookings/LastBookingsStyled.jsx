import styled from "styled-components";

export const LastBookingsTable = styled.table`
  width: 100%;
  background-color: #ffffff;
  box-shadow: 0px 4px 4px #00000005;
  border-radius: 20px;
  padding: 2rem 2%;
`;

export const ViewMore = styled.tfoot`
  width: 100%;
  height: 3rem;
  padding-left: 40%;
  padding-right: 40%;
`;

export const ViewMoreButton = styled.button`
  color: #135846;
  font-size: 14px;
  font-weight: 600;
  font-family: "Poppins";
  background-color: transparent;
  border: none;
  &:hover {
    cursor: pointer;
    scale: 1.1;
  }
`;
