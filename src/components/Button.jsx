import styled from "styled-components";


export const EditButton = styled.button`
     font-family: "Poppins";
    font-size: 12px;
    font-weight: normal;
  min-width: 100px;
    height: 32px;
    border-radius: 10px;
    border: none;
    background: #EBF1EF;
    color: #135846;

    &:hover{
        scale: 1.2;
    cursor: pointer;
    background-color: #135846;
    color: #FFFFFF;
    }
`

export const Button = styled.button`
     font-family: "Poppins";
    font-size: 12px;
    font-weight: normal;
    padding: 0.5rem ;
    height: 32px;
    border-radius: 10px;
    border: none;
    min-width: 100px;
    
    background-color: ${props => {
      switch (props.type){
        case "delete":
          return "#E23428"
        default:
         return "rgb(19, 88, 70)";
      }
    }};
    color: #FFFFFF;

    &:hover{
        scale: 1.2;
    cursor: pointer;
    background: #EBF1EF;
    color: #135846;
  
    }
`

export const NotesButton = styled.button`
    font-family: "Poppins";
    font-size: 12px;
    font-weight: 500;
    height: 32px;
    width: 100%;
    border-radius: 10px;
    border: ${props => props.empty ? "1px solid #799283" : "none"} ;
    background: ${props => props.empty ? "rgb(255, 255, 255)" : "rgb(238, 249, 242)"} ;
    color: ${props => props.empty ? "#799283" : "#212121"};
    &:hover{
        scale: 1.2;
    cursor: pointer;
    }
`

export const StatusButton = styled.button`
width: 100%;
     font-family: "Poppins";
    font-size: 12px;
    font-weight: 500;
    text-align: center;
    height: 32px;
    border: none;
    border-radius: 10px;
    color: ${props => {
       
    switch (props.status) {
        
      case "CHECK IN":
        return "rgb(90, 208, 122)";
      case "ACTIVE":
        return "#5AD07A";
      case "CHECK OUT":
        return "#E23428";
        case "INACTIVE":
        return "#E23428";
      case "IN PROGRESS":
        return "#ebd90d";
        case "OFFER":
        return "#c1ae8b";
        case "AVAILABLE":
        return "#5AD07A";
        case "BOOKED":
            return "#E23428";
      default:
        return "transparent";
    }
    
   }};

    background-color: ${props => {
    switch (props.status) {
      case "CHECK IN":
        return "rgb(232, 255, 238)";
      case "CHECK OUT":
        return "#FFEDEC";
        case "ACTIVE":
        return "#E8FFEE";
        case "INACTIVE":
        return "#FFEDEC";
      case "IN PROGRESS":
        return "#fffeeb";
        case "OFFER":
        return "#c6b89eae";
        case "BOOKED":
            return "#FFEDEC";
        case "AVAILABLE":
        return "#E8FFEE";
      default:
        return "transparent";
    }}};;
`

export const ArchiveButton = styled.button`
  font-family: "Poppins";
  font-size: 14px;
  font-weight: 500;
  border: none;
  background-color: transparent;
letter-spacing: 0px;
color: ${props => props.archived ? "#E23428" : "#5AD07A"  } 
;

&:hover{
  scale: 1.1;
  cursor: pointer;
}
`