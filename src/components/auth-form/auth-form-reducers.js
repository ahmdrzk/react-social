import {
  getConfirmPasswordValidationErrors,
  getCountryValidationErrors,
  getEmailValidationErrors,
  getNameValidationErrors,
  getPasswordValidationErrors,
} from "../../lib/form-validators";

export const initialNameState = { value: "", error: "", blurred: false };
export const initialEmailState = { value: "", error: "", blurred: false };
export const initialCountryState = { value: "", error: "", blurred: false };
export const initialPasswordState = {
  value: "",
  valueConfirm: "",
  error: "",
  errorConfirm: "",
  blurred: false,
};

export const nameReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return { ...state, value: action.payload.value };

    case "BLUR":
      return { ...state, blurred: true };

    case "VALIDATE":
      const nameValidationError = getNameValidationErrors(state.value);
      return { ...state, error: nameValidationError };

    case "RESET":
      return initialNameState;

    default:
      break;
  }
};

export const emailReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return { ...state, value: action.payload.value };

    case "BLUR":
      return { ...state, blurred: true };

    case "VALIDATE":
      const emailValidationError = getEmailValidationErrors(state.value);
      return { ...state, error: emailValidationError };

    case "RESET":
      return initialEmailState;

    default:
      break;
  }
};

export const countryReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return { ...state, value: action.payload.value };

    case "BLUR":
      return { ...state, blurred: true };

    case "VALIDATE":
      const countryValidationError = getCountryValidationErrors(state.value);
      return { ...state, error: countryValidationError };

    case "RESET":
      return initialCountryState;

    default:
      break;
  }
};

export const passwordReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return { ...state, ...action.payload };

    case "BLUR":
      return { ...state, blurred: true };

    case "VALIDATE":
      const passwordValidationError = getPasswordValidationErrors(state.value);
      return { ...state, error: passwordValidationError };

    case "VALIDATE_CONFIRM":
      const confPasswordValidationError = getConfirmPasswordValidationErrors(state.valueConfirm, state.value);
      return { ...state, errorConfirm: confPasswordValidationError };

    case "RESET":
      return initialPasswordState;

    default:
      break;
  }
};
