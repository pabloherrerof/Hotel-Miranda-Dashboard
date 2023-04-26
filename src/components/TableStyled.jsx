import { Link } from "react-router-dom";
import styled from "styled-components";

export const TableActions = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
margin-bottom: 1rem;
`;


export const TableContainer = styled.table`
  border-radius: 20px;
  background-color: #ffffff;
  width: 100%;
  text-align: start;
  box-shadow: 0px 3px 10px #00000005;

  thead {
    height: 70px;
    text-align: left;
  }
`;
export const TableTitle = styled.tr`
  width: 100%;
  font-family: "Poppins";
  font-weight: 600;
  font-size: 12px;
  letter-spacing: 0px;
  color: #393939;
  box-shadow: 0px 3px 10px #00000005;
  th {
    padding: 0 1%;
    
  }
`;

export const TableRow = styled.tr`
  max-height: 70px;
  box-shadow: 0px 3px 10px #00000005;
`;
export const TableItem = styled.td`
  font-family: "Poppins";
  font-weight: 500;
  font-size: 14px;
  max-width: 150px;

  text-decoration: ${(props) => {
    if (props.discount > 0 && props.price) {
      return "line-through";
    } else return "none";
  }};

  color: ${(props) => {
    if (props.discount > 0 && props.offer) {
      return "#E23428";
    } else return "#393939";
  }};
  padding: 1% 1%;
  img {
    width: 40%;
    height: 70px;
    object-fit: cover;
  }
  p {
    font-size: 12px;
    color: #799283;
    font-weight: 300;
    margin: 0;
    margin-top: 0rem;
  }
  svg {
    font-size: 18px;
    text-align: center;
    width: 100%;
  }

  svg:hover {
    scale: 1.1;
    cursor: pointer;
  }
  button {
    min-width: 100px;
  }
`;

export const ImageItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 0;
`;

export const UserTableImage = styled.div`
    border-radius: 12px;
    background: #C5C5C5;
    width: 70px;
    height: 70px;
    object-fit: cover;
`

export const StyledLink = styled(Link)`

color: #262626;

  
`