import ReactDropdown, { Option } from "react-dropdown";
import { LinkProps, To } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";

interface TableProps{
  big?: boolean;
  discount?: number;
  price?: boolean;
  offer?: boolean;
  active?: string;
  room?: boolean;
  user?: boolean;
}


interface ReactDropdownProps {
  options: any;
  baseClassName?: string;
  className?: string;
  controlClassName?: string;
  placeholderClassName?: string;
  menuClassName?: string;
  arrowClassName?: string;
  disabled?: boolean;
  arrowClosed?: React.ReactNode,
  arrowOpen?: React.ReactNode,
  onChange?: (arg: Option) => void;
  onFocus?: (arg: boolean) => void;
  value?: Option | string;
  placeholder?: String;
  room?: boolean,
}

export const TableActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  width: 100%;
  height: 30px;
`;

export const LeftActions = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 55%;
  align-items: center;
  height: 100%;

  a {
    text-decoration: none;
  }
`;

export const RightActions = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 40%;
  align-items: center;
  height: 100%;
  gap: 1rem;
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
    width: 100%;
  }
`;
export const TableTitle = styled.tr`
  width: 100%;
  font-family: "Poppins";
  font-weight: 600;
  font-size: 10px;
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
  position: relative;
`;
export const TableItem = styled.td<TableProps>`
  font-family: "Poppins";
  font-weight: 500;
  font-size: 14px;
  max-width: ${props => props.big ? "120px" : "80px"};

  text-decoration: ${(props) => {
    if(props.discount)
      if (props.discount > 0 && props.price) {
      return "line-through";
    } else return "none";
  }};

  color: ${(props) => {
    if(props.discount)
      if (props.discount > 0 && props.offer) {
      return "#E23428";
    } else return "#393939";
  }};
  padding: 1% 1%;

  p {
    font-size: 12px;
    color: #799283;
    font-weight: 300;
    margin: 0;
    margin-top: 0rem;
  }
  svg {
    font-size: 18px;
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

export const ImageItem = styled.div<TableProps>`
  
  
  display: flex;
  gap:0.5rem;
  flex-direction: column;
  margin: 0;
`;

export const UserTableImage = styled.img`
  border-radius: 12px;
  background: #c5c5c5;
  width: 80px;
  height: 80px;
`;

export const StyledLink = styled(Link)`
  color: #262626;
`;

export const RoomImageItem = styled.img`
  width: 80%;
  border-radius: 10px;
  height: 70px;
  object-fit: cover;
`;

export const TableLink = styled(Link)<any>`
  width: 100%;
  border-bottom: ${(props) => {if(props.active === "true"){
    return "#135846 2px solid";
  } else{
    return "#939090be 2px solid";
  } }};
  height: 30px;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  color: ${(props) => {if(props.active === "true"){
    return "#135846";
  } else{
    return "#939090be";
  } }};
`;

export const SearchBar = styled.div`
  width: 50%;
  height: 32px;
  display: flex;
  flex-direction: row;
  padding: 2% 2%;
  align-items: center;
  font-weight: normal;
  font-family: "Poppins";
  font-size: 14px;
  background-color: #d4d4d4;
  border-radius: 10px;
  box-shadow: 0px 3px 10px #00000005;
  gap: 1%;
  
  input {
    border: none;
    width: 80%;
    background-color: #d4d4d4;
    padding: 0.3rem 0.5rem;
    height: 100%;
    font-family: "Poppins";
    font-size: 12px;
  }
`;

export const CustomDropdown = styled(ReactDropdown)<ReactDropdownProps>`
   font-family: "Poppins";
    font-size: 12px;
    font-weight: normal;
    position: relative;
  
    .Dropdown-control{
      display: flex;
      gap: 2%;
      justify-content: space-between;
      align-items: center;
      height: 32px;
      border-radius: 10px;
      background-color: #135846;
      color: #FFFFFF;
      padding: 0.5rem ;
      width: ${props => props.room ? "120px" : "80px"};
      z-index: 1;
      &:hover{
        scale:1.1;
        cursor: pointer;

      }

    }
    .Dropdown-menu{
      position: absolute;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      background-color: #135846;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
      width: ${props => props.room ? "120px" : "80px"};;
      padding: 0.5rem;
      top: 25px;
      z-index: 0;
      color: #FFFFFF;
    }

    .Dropdown-arrow-wrapper{
        display: flex;
        align-items: center;
      };

    .Dropdown-option {
      &:hover{
        scale:1.1;
        cursor: pointer;

      }

      
    }
`