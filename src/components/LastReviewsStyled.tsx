import Slider from "react-slick";
import styled from "styled-components";

export const ReviewSlider = styled(Slider)`
    width: 100%;
    margin-bottom: 2rem;
`
export const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 25px;
  box-shadow: 0px 4px 4px #00000005;
  border-radius: 20px;
  background-color: #ffffff;
  margin-right: 20px;
  min-height: 180px;
  
  &:hover{
    scale: 1.1;
    cursor: pointer;
  }
`;

export const ReviewComment = styled.div`
  font-size: 12px;
  font-weight: normal;
  color: #262626;
  font-family: "Poppins";
  background-color: #FFFFFFFF;
  
`;

export const ReviewInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: "Poppins";
  background-color: #FFFFFFFF;


  h4 {
    font-size: 14px;
    font-weight: 600;
    color: #262626;
    margin: 0;
  }

  p {
    font-weight: normal;
    font-size: 10px;
    color: #799283;
    margin: 0;
  }
`;


