
import fetch from "cross-fetch";
import { loginLocalValue } from "../App";
import { toastError } from "./toastify";
import { useNavigate } from "react-router-dom";






const globalRoute = process.env.REACT_APP_API_URL;



export const fetchApi = async (route, method, body) => {
  try {
      const token = JSON.parse(localStorage.getItem("login")).token 
    const url = `${globalRoute}/${route}`;
    const res = await fetch(url, {
      method: method,
      mode: "cors",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: body,
    });
    if (res.status >= 400) {
      throw new Error("Bad response from server");
    }
    return await res.json();
  } catch (err) {
    console.log(err)
  }
};

export const fetchLoginApi = async (body) => {
  try {
    const url = `${globalRoute}/login`;
    const res = await fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (res.status >= 400) {
      throw new Error("Bad response from server");
    } else {
     
      return await res.json();
    }
  } catch (err) {
    console.log(err)
      toastError("Server error! Try again later")
  }
};
