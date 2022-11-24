import { createContext, useReducer } from "react";

import { initialState, reducer } from "./alerts-reducer";

const initialContext = {
  alertType: "",
  alertContent: "",
  dispatchAlerts: ({ type, payload }) => {},
};

export const AlertsContext = createContext(initialContext);

const AlertsContextProvider = ({ children }) => {
  const [alertsState, dispatch] = useReducer(reducer, initialState);

  const contextValue = {
    alertType: alertsState.alertType,
    alertContent: alertsState.alertContent,
    dispatchAlerts: dispatch,
  };

  return <AlertsContext.Provider value={contextValue}>{children}</AlertsContext.Provider>;
};

export default AlertsContextProvider;
