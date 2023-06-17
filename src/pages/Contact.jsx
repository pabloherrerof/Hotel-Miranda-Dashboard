import { useDispatch, useSelector } from "react-redux"
import { getContactsData, getContactsStatus } from "../features/contacts/contactsSlice"
import { useEffect, useState } from "react";
import { archiveContacts, fetchContacts } from "../features/contacts/contactThunks";
import { Wrapper } from "../components/Layout/LayoutStyled";
import { HashLoader } from "react-spinners";
import { LeftActions, RightActions, TableActions, TableContainer, TableItem, TableLink, TableRow, TableTitle } from "../components/Table/TableStyled";
import { dateConverter, tableDataSlicer, tableDataUnSlicer } from "../features/otherFunctions";
import { ArchiveButton } from "../components/Button/Button";
import { LastReviews } from "../components/LastReviews/LastReviews";
import { ErrorPage } from "./ErrorPage/ErrorPage";
import { Pagination } from "../components/Pagination/Pagination";




export const Contact = (props) =>{
    const dispatch = useDispatch();
    const contactsStatus = useSelector(getContactsStatus);
    const contactsData = useSelector(getContactsData);
    const [tableData, setTableData] = useState(tableDataSlicer(contactsData));
    const [recentContacts, setRecentContacts] = useState(contactsData)
    const [page, setPage] = useState(1);
    
    

    const [showAll, setShowAll] = useState(true);
    const [showArchived, setShowArchived] = useState(false)

   

    const tableTitles = [
        "Date",
        "Customer",
        "Comment",
        "Action"
      ];
    
      useEffect(() => {
        if ((contactsStatus === "idle")) {
          dispatch(fetchContacts());
      
        }
        setTableData(tableDataSlicer(contactsData));

      }, [dispatch, contactsStatus, contactsData]);

      useEffect(() => {
        if (showArchived=== true) {
          const orderedUnsliceData = [...contactsData].filter((contact) => 
          contact.archived === true )
          setTableData(tableDataSlicer(orderedUnsliceData))
        }
      }, [dispatch , showArchived, contactsData]);
     

        useEffect(()=> {
          if(contactsStatus==="fulfilled" && contactsData.length > 0){
            const unslicedData = [...contactsData];
            const orderedUnsliceData = unslicedData.sort((a, b) => {
                if (a.date < b.date) return -1;
                if (a.date > b.date) return 1;
                return 0;
              }).slice(0, 6)
              setRecentContacts(orderedUnsliceData)
        }
        }, [contactsData, contactsStatus, tableData])

      
      const onClickHandler = (e) => {
        const option = e.target.innerText;
        if (option === "All Contacts") {
          setShowAll(true);
          setShowArchived(false);
          setTableData(tableDataSlicer(contactsData));
          setPage(1)
        } else if (option === "Archived") {
          setShowAll(false);
          setShowArchived(true);
          setPage(1)
          const unslicedData = tableDataUnSlicer(tableData);
          const orderedUnsliceData = unslicedData.filter((contact) => 
          contact.archived === true )
          setTableData(tableDataSlicer(orderedUnsliceData))
        }
    }

    const onClickArchiveHandler = (contact) =>{
        dispatch(archiveContacts(contact));
    }

  
    if(contactsStatus === "rejected"){
      return (
          <ErrorPage/>
      );
    } else 
    {
      if (contactsStatus === "fulfilled" && recentContacts.length>0 && tableData.length > 0) {
        return (
            <>
            <LastReviews data={recentContacts}/>
              <TableActions>
                <LeftActions>
                <TableLink active={showAll.toString()} onClick={onClickHandler}>
                All Contacts
                </TableLink>
                <TableLink active={showArchived.toString()} onClick={onClickHandler}>
                Archived
            </TableLink>
                </LeftActions>
                <RightActions>
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
                  {tableData[page-1].map((element) => (
                    <TableRow key={element.id}>
                      <TableItem>
                        <p>{element.id}</p>
                        {dateConverter(element.date).date}
                        <p>{dateConverter(element.date).hour}</p>
                      </TableItem>
                      <TableItem big>
                        {element.subject}
                        <p>{element.comment}</p>
                      </TableItem>
                      <TableItem >
                        {element.customer.name}
                        <p>{element.customer.phone}</p>
                        <p>{element.customer.email}</p>
                      </TableItem>
                      <TableItem >
                            {element.archived !== true ? <ArchiveButton archived onClick={() => onClickArchiveHandler(element)}>Archive</ArchiveButton> : ""}
                            {element.archived ? <ArchiveButton unarchived onClick={() => onClickArchiveHandler(element)}>Unarchive</ArchiveButton> : ""}
                      </TableItem>
                    </TableRow>
                  ))}
                </tbody>
              </TableContainer>

              
              
            </>
          );
    } else  return (
      <>
        <Wrapper>
          <HashLoader color="#799283" size={100} />
        </Wrapper>
      </>
    )
  } 
}