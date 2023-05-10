import { MdOutlineKingBed } from "react-icons/md";
import {
  HiOutlineArrowRightOnRectangle,
  HiOutlineArrowLeftOnRectangle,
  HiOutlineCalendarDays,
} from "react-icons/hi2";
import { KPI, KpiIcon, KpiRow, KpiText } from "./DashboardStyled";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getContactsData, getContactsStatus } from "../../features/contacts/contactsSlice";
import { fetchContacts } from "../../features/contacts/contactThunks";
import { Wrapper } from "../../components/LayoutStyled";
import { HashLoader } from "react-spinners";
import { LastReviews } from "../../components/LastReviews";



export const Dashboard = (props) => {
  const dispatch = useDispatch("");
  const [recentContacts, setRecentContacts] = useState();
  const contactsStatus = useSelector(getContactsStatus);
  const contactsData = useSelector(getContactsData);


  useEffect(() => {
    if(contactsStatus === "idle"){
      dispatch(fetchContacts());
    }
    if(contactsData.length > 0){
      setRecentContacts([...contactsData].sort((a, b) => {
        if (a.date < b.date) return -1;
        if (a.date > b.date) return 1;
        return 0;
      }).slice(0, 6))
    }
  }, [contactsData, contactsStatus, dispatch])

  if (contactsStatus === "pending" || contactsStatus === "idle" || !recentContacts) {
    return (
      <>
        <Wrapper>
          <HashLoader color="#799283" size={100} />
        </Wrapper>
      </>
    )
  } else {
    return (
      <>
        <KpiRow data-testid="dashboard__kpi">
          <KPI>
            <KpiIcon>
              <MdOutlineKingBed />
            </KpiIcon>
            <KpiText>
              <h2>8,454</h2>
              <h6>New Booking</h6>
            </KpiText>
          </KPI>
          <KPI>
            <KpiIcon>
              <HiOutlineCalendarDays />
            </KpiIcon>
            <KpiText>
              <h2>963</h2>
              <h6>Scheduled Room</h6>
            </KpiText>
          </KPI>
          <KPI>
            <KpiIcon>
              <HiOutlineArrowRightOnRectangle />
            </KpiIcon>
            <KpiText>
              <h2>753</h2>
              <h6>Check In</h6>
            </KpiText>
          </KPI>
          <KPI>
            <KpiIcon>
              <HiOutlineArrowLeftOnRectangle />
            </KpiIcon>
            <KpiText>
              <h2>516</h2>
              <h6>Check Out</h6>
            </KpiText>
          </KPI>
        </KpiRow>
        <LastReviews data={recentContacts}/>
      </>
    );
  }

};
