import React from "react";
import ReactDOM from "react-dom";

import AlertsContextProvider from "./store/alerts-context";
import AuthContextProvider from "./store/auth-context";
import UserContextProvider from "./store/user-context";
import App from "./App";
import "./theme/index.css";

ReactDOM.render(
  <React.StrictMode>
    <AlertsContextProvider>
      <AuthContextProvider>
        <UserContextProvider>
          <App />
        </UserContextProvider>
      </AuthContextProvider>
    </AlertsContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
