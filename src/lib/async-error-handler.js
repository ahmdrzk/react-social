const asyncErrorHandler = (error, dispatchAlerts, deleteAuthToken) => {
  if (error.response) {
    if (error.response.data.message) {
      dispatchAlerts({ type: "SET_ERROR_ALERT", payload: { alertContent: error.response.data.message } });

      if (
        error.response.data.message === "Authentication token is no longer valid because user has changed password." ||
        error.response.data.message === "No user is associated with this authentication token." ||
        error.response.data?.error?.name === "TokenExpiredError"
      ) {
        deleteAuthToken();
      }
    } else {
      dispatchAlerts({ type: "SET_ERROR_ALERT", payload: { alertContent: error.response.message } });
    }
  } else if (error.request) {
    if (error.request.data.message) {
      dispatchAlerts({ type: "SET_ERROR_ALERT", payload: { alertContent: error.request.data.message } });
    } else {
      dispatchAlerts({ type: "SET_ERROR_ALERT", payload: { alertContent: error.request.message } });
    }
  } else {
    dispatchAlerts({ type: "SET_ERROR_ALERT", payload: { alertContent: error.message } });
  }
};

export default asyncErrorHandler;
