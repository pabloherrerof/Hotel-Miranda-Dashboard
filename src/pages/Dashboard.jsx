import styled from "styled-components";
import {MdOutlineKingBed} from "react-icons/md";
import { HiOutlineArrowRightOnRectangle , HiOutlineArrowLeftOnRectangle, HiOutlineCalendarDays } from "react-icons/hi2"

const KpiRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 1.5rem;
`;

export const KPI = styled.div`
  height: 70px;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1rem;
  background-color: #ffffff;
  box-shadow: 0px 4px 4px #00000005;
  border-radius: 12px;

  &:hover{
    scale: 1.1;
  }
`;

const KpiIcon = styled.div`
  width: 55px;
  height: 55px;
  background: #FFEDEC;
  border-radius: 8px;
  color: #E23428;
  font-size: 32px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover{
    color:#FFEDEC;
    background-color:#E23428;
  }
`

const KpiText = styled.div`
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

  h6{
    text-align: left;
    font-weight: 300;
    font-size: 10px;
    font-family: "Poppins";
    color: #787878;
    margin: 0;
  }
`

export const Dashboard = (props) => {
  return (
    <>
     <KpiRow>
      <KPI>
        <KpiIcon>
          <MdOutlineKingBed/>
        </KpiIcon>
        <KpiText>
          <h2>8,454</h2>
          <h6>New Booking</h6>
        </KpiText>
      </KPI>
      <KPI>
        <KpiIcon>
          <HiOutlineCalendarDays/>
        </KpiIcon>
        <KpiText>
          <h2>963</h2>
          <h6>Scheduled Room</h6>
        </KpiText>
      </KPI>
      <KPI>
        <KpiIcon>
          <HiOutlineArrowRightOnRectangle/>
        </KpiIcon>
        <KpiText>
          <h2>753</h2>
          <h6>Check In</h6>
        </KpiText>
      </KPI>
      <KPI>
        <KpiIcon>
          <HiOutlineArrowLeftOnRectangle/>
        </KpiIcon>
        <KpiText>
          <h2>516</h2>
          <h6>Check Out</h6>
        </KpiText>
      </KPI>
     </KpiRow>
    </>
  );
};
