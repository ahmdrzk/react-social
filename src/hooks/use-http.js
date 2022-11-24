import { useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";

import { AlertsContext } from "../store/alerts-context";
import { AuthContext } from "../store/auth-context";
import asyncErrorHandler from "../lib/async-error-handler";

const useHttp = (method, path, data, callback, effectCall = false, effectDependency = []) => {
  /*
  effectCall: boalean or a function to be used as a cleanup function for the useEffect hook.
  */
  const [isLoading, setIsLoading] = useState(false);
  const { dispatchAlerts } = useContext(AlertsContext);
  const { authToken, deleteAuthToken } = useContext(AuthContext);

  const sendRequest = useCallback(
    async (httpMethod = method, httpPath = path, httpData = data, reqCallback = callback) => {
      setIsLoading(true);

      const axiosConfig = {
        method: httpMethod,
        url: `${process.env.REACT_APP_API_URL}/${httpPath}`,
        headers: { Authorization: `Bearer ${authToken}` },
      };
      if (httpData) axiosConfig.data = httpData;
      if (data?.image) axiosConfig.headers["content-type"] = "multipart/form-data";

      try {
        const response = await axios(axiosConfig);

        if (reqCallback) {
          if (httpMethod.toLowerCase() === "delete") {
            reqCallback();
          } else {
            reqCallback(Object.values(response.data.data)[0]);
          }
        }

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        asyncErrorHandler(error, dispatchAlerts, deleteAuthToken);
      }
    },
    [method, path, data, callback, authToken, dispatchAlerts, deleteAuthToken]
  );

  useEffect(() => {
    if (effectCall) {
      sendRequest();

      return () => {
        if (typeof effectCall === "function") effectCall();
      };
    }
    /*
    We added all the dependencies of sendRequest function except path and not the function itself to be able to exclude path becauses it causes excessive rerendering.
    */
  }, [method, data, callback, authToken, dispatchAlerts, effectCall, ...effectDependency]);

  return { isLoading, sendRequest };
};

export default useHttp;
