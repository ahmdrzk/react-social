import { createContext, useEffect, useReducer } from "react";
import jwtDecode from "jwt-decode";

import { initialState, reducer } from "./auth-reducer";

const initialContext = {
  authToken: "",
  authUserId: "",
  isAuthenticated: false,
  isLoading: false,
  storeAuthToken: (newAuthToken) => {},
  deleteAuthToken: () => {},
};

export const AuthContext = createContext(initialContext);

const AuthContextProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(reducer, initialState);

  const storeAuthTokenHandler = (newAuthToken) => {
    const decodedToken = jwtDecode(newAuthToken);

    dispatch({
      type: "STORE_TOKEN",
      payload: { authToken: newAuthToken, authTokenExp: decodedToken.exp, authUserId: decodedToken.id },
    });
    localStorage.setItem("RSAUTH", newAuthToken);
  };

  const deleteAuthTokenHandler = () => {
    dispatch({ type: "DELETE_TOKEN" });
    localStorage.removeItem("RSAUTH");
  };

  useEffect(() => {
    const localAuthToken = localStorage.getItem("RSAUTH");
    if (!localAuthToken) return;

    const decodedToken = jwtDecode(localAuthToken);
    if (decodedToken.exp * 1000 > Date.now()) {
      storeAuthTokenHandler(localAuthToken);
    } else {
      deleteAuthTokenHandler();
    }
  }, []);

  const contextValue = {
    authToken: authState.authToken,
    authUserId: authState.authUserId,
    isAuthenticated: authState.isAuthenticated,
    isLoading: authState.isLoading,
    storeAuthToken: storeAuthTokenHandler,
    deleteAuthToken: deleteAuthTokenHandler,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
