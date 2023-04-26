import { useDispatch, useSelector } from "react-redux";
import { getUsersStatus, getUsersData } from "../../features/users/usersSlice";
import { useEffect } from "react";
import { addUser, editUser, fetchUsers } from "../../features/users/usersThunks";
import { HashLoader } from "react-spinners";
import styled from "styled-components";
import { Table } from "../../components/Table";
import { Button } from "../../components/Button";
import { TableActions } from "../../components/TableStyled";


const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Users = (props) => {
  const dispatch = useDispatch();
  const getStatus = useSelector(getUsersStatus);
  const getData = useSelector(getUsersData);
  console.log(getData);
  const tableTitles = [
    "Name",
    "Start Date",
    "Description",
    "Phone",
    "Email",
    "Status",
    "Details",
    "Delete",
  ];

  useEffect(() => {
    if (getStatus === "idle") {
      dispatch(fetchUsers());
    }
  }, [dispatch, getStatus]);

  const onAddClickHandler = () => {
    const user = {
        photo: "https://randomuser.me/api/portraits/women/14.jpg",
        name: "Sarah Johnson",
        position: "Receptionist",
        email: "sarah.johnson@example.com",
        phone: "+1 123 456 7890",
        startDate: "2021-09-01",
        jobDescription: "Responsible for greeting guests and checking them in and out of the hotel.",
        state: "ACTIVE",
        password: "b2c4f63a324ac9d4d8b438b36486eb08" 
     };

    dispatch(addUser(user))
   
  };



  const onEditClickHandler = () =>{
    const user = {
        photo: "https://randomuser.me/api/portraits/women/14.jpg",
        name: "Sarah Johnson",
        id: "U-0001",
        position: "Receptionist",
        email: "sarah.johnson@example.com",
        phone: "+1 123 456 7890",
        startDate: "2021-09-01",
        jobDescription: "Responsible for greeting guests and checking them in and out of the hotel.",
        state: "ACTIVE",
        password: "b2c4f63a324ac9d4d8b438b36486eb08" 
     };
    dispatch(editUser(user))
  }
  

  if (getStatus === "pending") {
    return (
      <>
      
        <Wrapper>
          <HashLoader color="#799283" size={100} />
        </Wrapper>
      </>
    );
  } else {
    return (
      <>
      <TableActions>
        <Button onClick={onAddClickHandler}>Add Room</Button>
        <Button onClick={onEditClickHandler}>Edit User</Button>
        
      </TableActions>
        <Table tableTitles={tableTitles} data={getData} page={"users"} />
        
      </>
      
    );
  }
};
