import { createContext, useState } from "react";

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const [userINFO, setUserINFO] = useState({});
  return (
    <UserContext.Provider value={{ userINFO, setUserINFO }}>
      {children}
    </UserContext.Provider>
  );
};
