
import { Logo } from "../../components/SideBarStyled";
import { EditButton } from "../../components/Button";
import React, { useContext, useState } from "react";
import { UserContext } from "../../components/UserContext";
import { Inputs, LogContainer, LogForm } from "./LoginStyled";
import { searchObjectByEmailAndPassword } from "../../features/API";
import logoSVG from "../../assets/logo-hotel.svg" 

export const Login = () => {

  const [email, setEmail] = useState("admin@admin.com");
  const [password, setPassword] = useState("admin");
  const appContext = useContext(UserContext);

  if (!appContext) {
    // Manejar el caso en el que el contexto no esté disponible
    return null;
  }
  const { dispatch } = appContext;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
            <img alt="logo" src={logoSVG} />
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
