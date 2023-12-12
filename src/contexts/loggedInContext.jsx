import {createContext, useEffect, useState} from "react";
export const LoggedInContext = createContext();
export const LoggedInProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLoggedIn(true);
    } else {
      localStorage.removeItem("username");
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
