import {createContext, useEffect, useState} from "react";
export const LoggedInContext = createContext();
export const LoggedInProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    console.log("useEffect")
    if (localStorage.getItem("token")) {
      console.log("token found")
      setIsLoggedIn(true);
    } else {
      console.log("token not found")
      setIsLoggedIn(false);
    }
  }
  , []);

  return (
    <LoggedInContext.Provider value={{ isLoggedIn, setIsLoggedIn}}>
      {children}
    </LoggedInContext.Provider>
  );
};
