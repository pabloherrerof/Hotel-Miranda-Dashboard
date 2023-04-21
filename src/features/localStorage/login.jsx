export const readUserLocalStorage = () => {
    const userLocalStorage = localStorage.getItem("users");
    console.log(userLocalStorage)
    if (userLocalStorage != null) {
      const userLocalStorageObject = JSON.parse(userLocalStorage); // {data: []}
      return userLocalStorageObject.data;
    }
    return [];
  };

  export const checkIfExistsUser= (user) => {
    let exits = false;
    readUserLocalStorage().forEach((obj) => {
      if (obj != null) {
        if (obj.email === user.email && obj.password === user.password) {
          exits = true;
        }
      }
    });
    return exits;
  };