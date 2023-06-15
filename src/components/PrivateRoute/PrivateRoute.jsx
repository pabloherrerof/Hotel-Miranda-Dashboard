import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export const PrivateRoute = (props) => {
  const { state } = useContext(UserContext);

  if (state.auth === false) {
    return <Navigate to="/login" />;
  }
  return props.children;
};
