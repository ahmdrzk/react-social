import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import { AlertsContext } from "../store/alerts-context";
import { AuthContext } from "../store/auth-context";
import asyncErrorHandler from "../lib/async-error-handler";

const useAuthHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { dispatchAlerts } = useContext(AlertsContext);
  const { storeAuthToken, deleteAuthToken } = useContext(AuthContext);
  const history = useHistory();

  const sendAuthRequest = async (mode, data, resetToken) => {
    const PATH =
      (mode === "signup" && "users/signup") ||
      (mode === "signin" && "users/signin") ||
      (mode === "forgotpassword" && "users/forgotPassword") ||
      (mode === "resetpassword" && `users/resetPassword/${resetToken}`);

    setIsLoading(true);

    try {
      const response = await axios({
        method: `${mode === "resetpassword" ? "patch" : "post"}`,
        url: `${process.env.REACT_APP_API_URL}/${PATH}`,
        data: { data },
      });

      setIsLoading(false);

      if (mode === "signup") {
        history.replace({
          pathname: "/signin",
          state: { message: "User account created successfully. Please use your credentials to sign in." },
        });
      }

      if (mode === "signin") {
        storeAuthToken(response.data.data.token);
        history.push({ pathname: "/home" });
      }

      if (mode === "forgotpassword") {
        dispatchAlerts({ type: "SET_INFO_ALERT", payload: { alertContent: response.data.message } });
      }

      if (mode === "resetpassword") {
        dispatchAlerts({ type: "SET_INFO_ALERT", payload: { alertContent: response.data.message } });
        history.push({ pathname: "/signin" });
      }
    } catch (error) {
      setIsLoading(false);
      asyncErrorHandler(error, dispatchAlerts, deleteAuthToken);
    }
  };

  return { isLoading, sendAuthRequest };
};

export default useAuthHttp;
