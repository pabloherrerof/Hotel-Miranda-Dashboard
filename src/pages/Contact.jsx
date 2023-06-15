import { useDispatch, useSelector } from "react-redux"
import { getContactsData, getContactsStatus } from "../features/contacts/contactsSlice"
import { useEffect, useState } from "react";
import { archiveContacts, fetchContacts } from "../features/contacts/contactThunks";
import { Wrapper } from "../components/Layout/LayoutStyled";
import { HashLoader } from "react-spinners";
import { LeftActions, RightActions, TableActions, TableContainer, TableItem, TableLink, TableRow, TableTitle } from "../components/Table/TableStyled";
import { dateConverter } from "../features/otherFunctions";
import { ArchiveButton } from "../components/Button/Button";
import { LastReviews } from "../components/LastReviews/LastReviews";
import { Navigate } from "react-router-dom";
import { ErrorPage } from "./ErrorPage/ErrorPage";




export const Contact = (props) =>{
    const dispatch = useDispatch();
    const contactsStatus = useSelector(getContactsStatus);
    const contactsData = useSelector(getContactsData);
    const [tableData, setTableData] = useState(contactsData);
    const [recentContacts, setRecentContacts] = useState()
    
    

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
        setTableData(contactsData);
      }, [dispatch, contactsStatus, contactsData]);

      useEffect(() => {
        if (showArchived=== true) {
          setTableData([...contactsData].filter((contact) => 
          contact.archived === true ))
        }
      }, [dispatch , showArchived, contactsData]);

        useEffect(()=> {
          if(contactsData.length > 0){
            setRecentContacts([...contactsData].sort((a, b) => {
                if (a.date < b.date) return -1;
                if (a.date > b.date) return 1;
                return 0;
              }).slice(0, 6))
        }
        }, [contactsData])

      
      const onClickHandler = (e) => {
        const option = e.target.innerText;
        if (option === "All Contacts") {
          setShowAll(true);
          setShowArchived(false);
          setTableData(contactsData);
        } else if (option === "Archived") {
          setShowAll(false);
          setShowArchived(true);
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
      if (contactsStatus === "fulfilled" && recentContacts && tableData) {
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
              <TableContainer>
                <thead>
                  <TableTitle>
                    {tableTitles.map((element) => (
                      <th key={tableTitles.indexOf(element)}>{element}</th>
                    ))}
                  </TableTitle>
                </thead>
                <tbody>
                  {tableData.map((element) => (
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