import { useDispatch, useSelector } from "react-redux";
import { getUsersStatus, getUsersData } from "../../features/users/usersSlice";
import { useEffect, useState } from "react";
import { addUser, editUser, fetchUsers } from "../../features/users/usersThunks";
import { HashLoader } from "react-spinners";
import { Table } from "../../components/Table";
import { Button } from "../../components/Button";
import { TableActions } from "../../components/TableStyled";
import { Wrapper } from "../../components/LayoutStyled";
import { Modal } from "../../components/Modal";


export const Users = (props) => {
  const dispatch = useDispatch();
  const usersStatus = useSelector(getUsersStatus);
  const usersData = useSelector(getUsersData);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const tableTitles = [
    "Name",
    "Start Date",
    "Description",
    "Contact",
    "Status",
    "Details",
    "Delete",
  ];

  useEffect(() => {
    if (usersStatus === "idle") {
      dispatch(fetchUsers());
    }
  }, [dispatch, usersStatus]);

  


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
  

  if (usersStatus === "pending") {
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
        <Button onClick={()=>{setShowCreateModal(true)}}>Add Room</Button>
        <Button onClick={onEditClickHandler}>Edit User</Button>
        
      </TableActions>
        <Table tableTitles={tableTitles} data={usersData} page={"users"} />
        <Modal
      mode="create"
      page={"users"}
      setShowCreateModal={setShowCreateModal}
      showCreateModal={showCreateModal}
      />
      </>
      
    );
  }
};
