import styled from "styled-components";

export const KpiRow = styled.div`
  display: flex;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 1.5rem;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 2rem;
`;

export const KPI = styled.div`
  height: 70px;
  width: 300px;
  display: flex;

  align-items: center;
  gap: 1rem;
  padding: 1rem 1rem;
  background-color: #ffffff;
  box-shadow: 0px 4px 4px #00000005;
  border-radius: 12px;

  &:hover {
    scale: 1.1;
  }
`;

export const KpiIcon = styled.div`
  width: 55px;
  height: 55px;
  background: #ffedec;
  border-radius: 8px;
  color: #e23428;
  font-size: 32px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #ffedec;
    background-color: #e23428;
  }
`;

export const KpiText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  margin: 0;
  h2 {
    text-align: left;
    font-weight: 600;
    font-size: 20px;
    font-family: "Poppins";
    color: #393939;
    margin: 0;
  }

  h6 {
    text-align: left;
    font-weight: 300;
    font-size: 10px;
    font-family: "Poppins";
    color: #787878;
    margin: 0;
  }
`;

export const CalendarRow = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 47.5% 47.5%;
  grid-column-gap: 5%;
  margin-bottom: 3rem;
`;

