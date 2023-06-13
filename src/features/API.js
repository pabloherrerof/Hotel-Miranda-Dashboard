
import fetch from "cross-fetch";





const globalRoute = "http://localhost:3001";

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
    console.error(err);
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
    console.error(err);
  }
};
