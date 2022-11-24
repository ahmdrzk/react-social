export const initialState = {
  /*
  alertType: success | info | warn | error
  */
  alertType: "",
  alertContent: "",
};

export const reducer = (state, action) => {
  switch (action.type) {
    // case "SET_SUCCESS_ALERT":
    //   return { alertType: "success", alertContent: action.payload.alertContent };

    case "SET_INFO_ALERT":
      return { ...state, alertType: "info", alertContent: action.payload.alertContent };

    // case "SET_WARN_ALERT":
    //   return { ...state, alertType: "warn", alertContent: action.payload.alertContent };

    case "SET_ERROR_ALERT":
      return { ...state, alertType: "error", alertContent: action.payload.alertContent };

    case "CLEAR_ALERT":
      return initialState;

    default:
      break;
  }
};
