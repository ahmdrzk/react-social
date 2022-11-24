import { createContext, useState } from "react";

const initialContext = {
  authUser: null,
  setAuthUser: () => {},
};

export const UserContext = createContext(initialContext);

const UserContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState();

  const contextValue = {
    authUser,
    setAuthUser,
  };

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
