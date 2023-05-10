import logo from "../../assets/logo-hotel.svg";
import { Logo } from "../../components/SideBarStyled";
import { EditButton } from "../../components/Button";
import { useContext, useState } from "react";
import { UserContext } from "../../components/UserContext";
import { Inputs, LogContainer, LogForm } from "./LoginStyled";
import { searchObjectByEmailAndPassword } from "../../features/API";

export const Login = (props) => {
  const [email, setEmail] = useState("admin@admin.com");
  const [password, setPassword] = useState("admin");
  const { dispatch } = useContext(UserContext);


  const handleSubmit = (e) => {
    e.preventDefault();

    const user = searchObjectByEmailAndPassword(email, password);

    if (user) {
      dispatch({ type: "LogIn", payload: user });
    } else {
      alert("Invalid credentials!");
    }
  };

  return (
    <>
      <LogContainer>
        <LogForm onSubmit={handleSubmit} data-testid="login__form">
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
              type="text" data-testid="login__email__input"
            />
            <label htmlFor="password">Pasword:</label>
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password" data-testid="login__password__input"
            />
          </Inputs>

          <EditButton type="submit" data-testid="login__submit__button">Login</EditButton>
        </LogForm>
      </LogContainer>
    </>
  );
};
