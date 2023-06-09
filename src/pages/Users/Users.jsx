import { useDispatch, useSelector } from "react-redux";
import { getUsersStatus, getUsersData } from "../../features/users/usersSlice";
import { useEffect, useState } from "react";
import { fetchUsers } from "../../features/users/usersThunks";
import { HashLoader } from "react-spinners";
import { Button, StatusButton } from "../../components/Button/Button";
import {
  CustomDropdown,
  ImageItem,
  LeftActions,
  RightActions,
  SearchBar,
  StyledLink,
  TableActions,
  TableItem,
  TableLink,
  UserTableImage,
  TableRow,
  TableContainer,
  TableTitle,
} from "../../components/Table/TableStyled";
import { Wrapper } from "../../components/Layout/LayoutStyled";
import { Modal } from "../../components/Modal/Modal";
import { dateConverter, tableDataSlicer, tableDataUnSlicer } from "../../features/otherFunctions";
import { AiOutlineInfoCircle, AiOutlineSearch } from "react-icons/ai";
import { VscTrash } from "react-icons/vsc";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { ErrorPage } from "../ErrorPage/ErrorPage";
import { Pagination } from "../../components/Pagination/Pagination";

export const Users = (props) => {
  const dispatch = useDispatch();
  const usersStatus = useSelector(getUsersStatus);
  const usersData = useSelector(getUsersData);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showAll, setShowAll] = useState("true");
  const [showActive, setShowActive] = useState("false");
  const [showInactive, setShowInactive] = useState("false");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [targetId, setTargetId] = useState("");
  const [tableData, setTableData] = useState(tableDataSlicer(usersData));
  const [page, setPage] = useState(1);
  const [orderValue, setOrderValue] = useState("ID");

  const tableTitles = [
    "Name",
    "Start Date",
    "Description",
    "Contact",
    "Status",
    "Details",
    "Delete",
  ];

  const options = ["Date", "Name"];

  useEffect(() => {
    if (usersStatus === "idle") {
      dispatch(fetchUsers());
    }
    setTableData(tableDataSlicer(usersData));
  }, [dispatch, usersStatus, usersData]);

  const onClickHandler = (e) => {
    const option = e.target.innerText;
    if (option === "All users") {
      setShowAll("true");
      setShowActive("false");
      setShowInactive("false");
      setOrderValue("ID");
      setTableData(tableDataSlicer(usersData));
      setPage(1)
    } else if (option === "Active users") {
      setShowActive("true");
      setShowAll("false");
      setShowInactive("false");
      setOrderValue("ID");
      const orderedUnsliceData = usersData.filter((user) => user.state === "ACTIVE");
      setTableData(tableDataSlicer(orderedUnsliceData))
      setPage(1)
    } else if (option === "Inactive users") {
      setShowActive("false");
      setShowAll("false");
      setShowInactive("true");
      setOrderValue("ID");
      const orderedUnsliceData = usersData.filter((user) => user.state === "INACTIVE");
      setTableData(tableDataSlicer(orderedUnsliceData))
      setPage(1)
    }
  };

  const onSearchInputHandler = (e) => {
     const unslicedData = tableDataUnSlicer(tableData);
    const orderedUnsliceData = unslicedData.filter((user) =>
      user.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setTableData(tableDataSlicer(orderedUnsliceData));
    setPage(1)
    if (e.target.value === "") {
      if (showAll === "true") {
        setTableData(tableDataSlicer(usersData));
      }
      if (showActive === "true") {

        const orderedUnsliceData = usersData.filter((user) => user.state === "ACTIVE");
        setTableData(tableDataSlicer(orderedUnsliceData));
      }
      if (showInactive === "true") {

        const orderedUnsliceData = usersData.filter((user) => user.state === "INACTIVE");
        setTableData(tableDataSlicer(orderedUnsliceData));
      }
    }
  };

  const onChangeHandler = (e) => {
    if (e.value === "Name") {
      setOrderValue("Name");
      const unslicedData = tableDataUnSlicer(tableData);
      const orderedUnsliceData = unslicedData.sort((a, b) => {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        })
        setTableData(tableDataSlicer(orderedUnsliceData));
    }
    if (e.value === "Date") {
      setOrderValue("Date");
      const unslicedData = tableDataUnSlicer(tableData);
      const orderedUnsliceData = unslicedData.sort((a, b) => {
          if (new Date(a.startDate).getTime() < new Date(b.startDate).getTime())
            return -1;
          if (new Date(a.startDate).getTime() > new Date(b.startDate).getTime())
            return 1;
          return 0;
        })
        setTableData(tableDataSlicer(orderedUnsliceData));
    }
  };

  if(usersStatus==="rejected"){
    return (
      <ErrorPage/>
  );
  } else {

  }


  if (usersStatus === "pending" || usersStatus === "idle") {
    return (
      <>
        <Wrapper>
          <HashLoader color="#799283" size={100} />
        </Wrapper>
      </>
    );
  } else {
    if(usersStatus === "fulfilled" && tableData ){
      return (
        <>
          <TableActions>
            <LeftActions>
              <TableLink active={showAll} onClick={onClickHandler}>
                All users
              </TableLink>
              <TableLink active={showActive} onClick={onClickHandler}>
                Active users
              </TableLink>
              <TableLink active={showInactive} onClick={onClickHandler}>
                Inactive users
              </TableLink>
            </LeftActions>
            <RightActions>
              <SearchBar>
                <AiOutlineSearch />
                <input
                  type="text"
                  name="users"
                  id="users"
                  onChange={onSearchInputHandler}
                  placeholder="Search By Name"
                />
              </SearchBar>
              {showAll === "true" ? (
                <Button
                  onClick={() => {
                    setShowCreateModal(true);
                  }}
                >
                  + New{" "}
                </Button>
              ) : (
                ""
              )}
              <CustomDropdown
                arrowOpen={<MdOutlineKeyboardArrowUp />}
                arrowClosed={<MdOutlineKeyboardArrowDown />}
                options={options}
                onChange={onChangeHandler}
                value={orderValue}
              />
            </RightActions>
          </TableActions>
          <Pagination page={page} setPage={setPage} data={tableData} />
          <TableContainer>
            <thead>
              <TableTitle>
                {tableTitles.map((element) => (
                  <th key={tableTitles.indexOf(element)}>{element}</th>
                ))}
              </TableTitle>
            </thead>
            <tbody>
              {tableData.length > 0 ? tableData[page - 1].map((element) => (
                <TableRow key={element.id}>
                  <TableItem>
                    <ImageItem user>
                      <UserTableImage src={element.photo} alt="user" />
  
                      <div>
                        {element.name}
                        <p>{element.id}</p>
                      </div>
                    </ImageItem>
                  </TableItem>
                  <TableItem>
                    {dateConverter(element.startDate).date}
                    <p>{dateConverter(element.startDate).hour}</p>
                  </TableItem>
                  <TableItem>
                    <p>{element.jobDescription}</p>
                  </TableItem>
                  <TableItem>
                    <p>{element.phone}</p>
                    <p>{element.email}</p>
                  </TableItem>
                  <TableItem>
                    <StatusButton status={element.state}>
                      {" "}
                      {element.state}
                    </StatusButton>
                  </TableItem>
                  <TableItem>
                    <StyledLink to={`/users/${element.id}`}>
                      <AiOutlineInfoCircle />
                    </StyledLink>
                  </TableItem>
                  <TableItem>
                    {element.email === "admin@admin.com" ? (
                      ""
                    ) : (
                      <VscTrash
                        onClick={() => {
                          setShowDeleteModal(true);
                          setTargetId(element.id);
                        }}
                      />
                    )}
                  </TableItem>
                </TableRow>
              )): ""}
            </tbody>
          </TableContainer>
          <Modal
            mode="delete"
            page={"users"}
            showDeleteModal={showDeleteModal}
            setShowDeleteModal={setShowDeleteModal}
            itemId={targetId}
          />
  
          <Modal
            mode="create"
            page={"users"}
            setShowCreateModal={setShowCreateModal}
            showCreateModal={showCreateModal}
          />
        </>
      );
    } else {
      return (
        <>
          <Wrapper>
            <HashLoader color="#799283" size={100} />
          </Wrapper>
        </>
      )
    }
  } 
};
