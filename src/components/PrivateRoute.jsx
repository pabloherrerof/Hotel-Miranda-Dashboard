import { Navigate } from "react-router-dom"

export const PrivateRoute = (props) =>{
    if(!props.authenticated){
        return <Navigate to="/login"/>
    } return props.children;
}