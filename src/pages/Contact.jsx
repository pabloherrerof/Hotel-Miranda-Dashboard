import { useDispatch, useSelector } from "react-redux"
import { getContactsData, getContactsStatus } from "../features/contacts/contactsSlice"
import { useEffect, useState } from "react";
import { archiveContacts, fetchContacts } from "../features/contacts/contactThunks";
import { Wrapper } from "../components/LayoutStyled";
import { HashLoader } from "react-spinners";
import { LeftActions, RightActions, StyledLink, TableActions, TableContainer, TableItem, TableLink, TableRow, TableTitle } from "../components/TableStyled";
import { Modal } from "../components/Modal";
import { dateConverter } from "../features/otherFunctions";
import { ArchiveButton } from "../components/Button";
import { LastReviews } from "../components/LastReviews";




export const Contact = (props) =>{

    const dispatch = useDispatch();
    const contactsStatus = useSelector(getContactsStatus);
    const contactsData = useSelector(getContactsData);
    const [tableData, setTableData] = useState(contactsData);
    const [recentContacts, setRecentContacts] = useState()
    
    

    const [showAll, setShowAll] = useState("true");
    const [showArchived, setShowArchived] = useState("false")

   

    const tableTitles = [
        "Date",
        "Customer",
        "Comment",
        "Action"
      ];
    
      useEffect(() => {
        if (contactsStatus === "idle") {
          dispatch(fetchContacts());
        }
        if(showAll === "true"){
            setTableData(contactsData);
        }
        
        if(showArchived === "true"){
            setTableData(tableData.filter((contact) => contact.archived === true ))
        }
        if(contactsData.length > 0){
            setRecentContacts([...contactsData].sort((a, b) => {
                if (a.date < b.date) return -1;
                if (a.date > b.date) return 1;
                return 0;
              }).slice(0, 6))
        }
        
      }, [dispatch, contactsStatus, contactsData, showArchived, tableData, showAll]);


      const onClickHandler = (e) => {
        const option = e.target.innerText;
        if (option === "All Contacts") {
          setShowAll("true");
            setShowArchived("false");
          setTableData(contactsData);
        } else if (option === "Archived") {
          setShowAll("false");
          setShowArchived("true");
          setTableData(tableData.filter((contact) => contact.archived === true ));
        }
    }

    const onClickArchiveHandler = (contact) =>{
        dispatch(archiveContacts(contact));
        if(showArchived === "true"){
            setTableData(contactsData.filter((contact) => contact.archived === true ));
        }
    }
   console.log(recentContacts)
   console.log(contactsData)

     if (contactsStatus === "pending" || contactsStatus === "idle" || !recentContacts) {
    return (
      <>
        <Wrapper>
          <HashLoader color="#799283" size={100} />
        </Wrapper>
      </>
    )} else {
        return (
            <>
            <LastReviews data={recentContacts}/>
              <TableActions>
                <LeftActions>
                <TableLink active={showAll} onClick={onClickHandler}>
                All Contacts
                </TableLink>
                <TableLink active={showArchived} onClick={onClickHandler}>
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
    }
}