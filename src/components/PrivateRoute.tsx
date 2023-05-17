import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import { Layout } from "./Layout";



export const PrivateRoute = () => {
  const appContext = useContext(UserContext);

  if (!appContext) {
    // Manejar el caso en el que el contexto no esté disponible
    return null;
  }
  const { state } = appContext;

  if (state.auth === false) {
    return <Navigate to="/login" />;
  }
  return <Layout/>;
};
