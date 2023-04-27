import { StatusButton, NotesButton } from "../components/Button";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { VscTrash } from "react-icons/vsc";
import {
  ImageItem,
  StyledLink,
  TableContainer,
  TableItem,
  TableRow,
  TableTitle,
} from "./TableStyled";
import {
  bookedStatusCalc,
  dateConverter,
  offerPriceCalc,
} from "../features/otherFunctions";
import { Modal } from "./Modal";
import { useState } from "react";

export const Table = (props) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [targetId, setTargetId] = useState("");

  const rowRender = (page, element) => {
    switch (page) {
      case "rooms":
        return (
          <>
            <TableItem>
              <ImageItem>
                <img
                  src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80"
                  alt=""
                />
                <div>
                  {element.roomType + "-" + element.roomNumber}
                  <p>{element.id}</p>
                </div>
              </ImageItem>
            </TableItem>
            <TableItem>
              <p>{element.amenities.join(", ")}</p>
            </TableItem>
            <TableItem price discount={element.discount}>
              {element.price + "$"} <p>{"/per night"}</p>
            </TableItem>
            <TableItem offer discount={element.discount}>
              {offerPriceCalc(element.price, element.discount)}
              <p>{element.discount > 0 ? "/per night" : ""}</p>
            </TableItem>
            <TableItem>
              <StatusButton status={element.status}>
                {element.status}
              </StatusButton>
            </TableItem>
            <TableItem>
              <StyledLink to={`/rooms/${element.id}`}>
                <AiOutlineInfoCircle />
              </StyledLink>
            </TableItem>
            <TableItem>
              <VscTrash
                onClick={() => {
                  setShowDeleteModal(true);
                  setTargetId(element.id);
                }}
              />
            </TableItem>
          </>
        );
      case "bookings":
        return (
          <>
            <TableItem>
              {element.name}
              <p>{element.id}</p>
            </TableItem>
            <TableItem>
              {dateConverter(element.orderDate).date}
              <p>{dateConverter(element.orderDate).hour}</p>
            </TableItem>
            <TableItem>
              {dateConverter(element.checkIn).date}
              <p>{dateConverter(element.checkIn).hour}</p>
            </TableItem>
            <TableItem>
              {dateConverter(element.checkOut).date}
              <p>{dateConverter(element.checkOut).hour}</p>
            </TableItem>
            <TableItem>
              <NotesButton>View Notes</NotesButton>
            </TableItem>
            <TableItem>
              {element.room.roomType} - {element.room.roomNumber}
            </TableItem>
            <TableItem>
              <StatusButton
                status={bookedStatusCalc(element.checkIn, element.checkOut)}
              >
                {bookedStatusCalc(element.checkIn, element.checkOut)}
              </StatusButton>
            </TableItem>
            <TableItem>
              <StyledLink to={`/bookings/${element.id}`}>
                <AiOutlineInfoCircle />
              </StyledLink>
            </TableItem>
            <TableItem>
              <VscTrash
                onClick={() => {
                  setShowDeleteModal(true);
                  setTargetId(element.id);
                }}
              />
            </TableItem>
          </>
        );
      case "users":
        return (
          <>
            <TableItem>
              <ImageItem>
                <img src={element.photo} alt="user" />
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
              <VscTrash
                onClick={() => {
                  setShowDeleteModal(true);
                  setTargetId(element.id);
                }}
              />
            </TableItem>
          </>
        );
      default:
        return "fuk";
    }
  };

  return (
    <>
      <TableContainer>
        <thead>
          <TableTitle>
            {props.tableTitles.map((element) => (
              <th key={props.tableTitles.indexOf(element)}>{element}</th>
            ))}
          </TableTitle>
        </thead>
        <tbody>
          {props.data.map((element) => (
            <TableRow key={element.id}>
              {rowRender(props.page, element)}
            </TableRow>
          ))}
        </tbody>
      </TableContainer>
      <Modal
        mode="delete"
        page={props.page}
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        itemId={targetId}
      />
    </>
  );
};
