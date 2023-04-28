import logo from "../assets/logo-hotel.svg";
import { Logo } from "../components/SideBarStyled";
import { EditButton } from "../components/Button";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../components/UserContext";
import { useDispatch, useSelector } from "react-redux";
import { getUsersData, getUsersStatus } from "../features/users/usersSlice";
import { fetchUsers } from "../features/users/usersThunks";
import { searchObjectByEmailAndPassword } from "../features/otherFunctions";
import { Inputs, LogContainer, LogForm } from "./LoginStyled";

export const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch } = useContext(UserContext);

  const dispatcher = useDispatch();
  const usersStatus = useSelector(getUsersStatus);
  const usersData = useSelector(getUsersData);

  useEffect(() => {
    if (usersStatus === "idle") {
      dispatcher(fetchUsers());
    }
  }, [dispatcher, usersStatus]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = searchObjectByEmailAndPassword(usersData, email, password);

    if (user) {
      dispatch({ type: "LogIn", payload: user });
    } else {
      alert("Invalid credentials!");
    }
  };

  return (
    <>
      <LogContainer>
        <LogForm onSubmit={handleSubmit}>
          <Logo column>
            <img src={logo} alt="logo" />
            <h2>travl</h2>
          </Logo>

          <p>
            (Use email=<strong> admin@admin.com </strong> and password=
            <strong> admin</strong> to test the application )
          </p>
          <Inputs>
            <label htmlFor="email">Email:</label>
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="text"
            />
            <label htmlFor="password">Pasword:</label>
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
            />
          </Inputs>

          <EditButton type="submit">Login</EditButton>
        </LogForm>
      </LogContainer>
    </>
  );
};
