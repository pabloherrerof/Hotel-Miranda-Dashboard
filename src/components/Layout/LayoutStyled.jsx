import styled, {css} from "styled-components";

export const Container = styled.div`
    min-height: 100vh;
    display: flex;
    margin: 0;
    max-width: 100vw;
`;

export const LeftMenu = styled.div`
 display: inline-block;
 width: 300px;
 ${props => !props.open && css`
    display: none;
`}
 `;


export const RightSection = styled.section`
display: inline-block;
width: ${props => props.open ? "calc(100% - 300px)" : "100%"};
`

export const Content = styled.main`
display: flex;
align-items: center;
flex-direction: column;
background-color: #00000005;
padding: 3% 5%;
height: calc(100% - 100px);
position: relative;

`

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;