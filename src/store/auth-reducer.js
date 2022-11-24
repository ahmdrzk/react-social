export const initialState = {
  authToken: "",
  authTokenExp: 0,
  authUserId: "",
  isAuthenticated: false,
  isLoading: false,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "START_LOADING":
      return { ...state, isLoading: true };

    case "STOP_LOADING":
      return { ...state, isLoading: false };

    case "STORE_TOKEN":
      return {
        authToken: action.payload.authToken,
        authTokenExp: action.payload.authTokenExp,
        authUserId: action.payload.authUserId,
        isAuthenticated: true,
      };

    case "DELETE_TOKEN":
      return initialState;

    default:
      break;
  }
};
