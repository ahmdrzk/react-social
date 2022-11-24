import { useEffect, useReducer, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

import Input from "./Input";
import SelectCountry from "./SelectCountry";
import Button from "../UI/Button";
import StickyMessage from "./StickyMessage";
import classes from "./AuthForm.module.css";

import useAuthHttp from "../../hooks/use-authHttp";
import {
  initialNameState,
  initialEmailState,
  initialCountryState,
  initialPasswordState,
  nameReducer,
  emailReducer,
  countryReducer,
  passwordReducer,
} from "./auth-form-reducers";

const AuthForm = () => {
  const [formMode, setFormMode] = useState("signup");
  const [isFormValid, setIsFormValid] = useState(false);
  const { pathname, state: locationState } = useLocation();
  const { resetToken } = useParams();
  const { isLoading, sendAuthRequest } = useAuthHttp();

  const [nameState, dispatchName] = useReducer(nameReducer, initialNameState);
  const [emailState, dispatchEmail] = useReducer(emailReducer, initialEmailState);
  const [countryState, dispatchCountry] = useReducer(countryReducer, initialCountryState);
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, initialPasswordState);

  const onChangeHandler = (event) => {
    switch (event.target.name) {
      case "name":
        dispatchName({ type: "CHANGE", payload: { value: event.target.value } });
        dispatchName({ type: "VALIDATE" });
        break;

      case "email":
        dispatchEmail({ type: "CHANGE", payload: { value: event.target.value } });
        dispatchEmail({ type: "VALIDATE" });
        break;

      case "country":
        dispatchCountry({ type: "CHANGE", payload: { value: event.target.value } });
        dispatchCountry({ type: "VALIDATE" });
        break;

      case "password":
        dispatchPassword({ type: "CHANGE", payload: { value: event.target.value } });
        dispatchPassword({ type: "VALIDATE" });
        if (formMode === "signup") dispatchPassword({ type: "VALIDATE_CONFIRM" });
        break;

      case "confirmPassword":
        dispatchPassword({ type: "CHANGE", payload: { valueConfirm: event.target.value } });
        dispatchPassword({ type: "VALIDATE_CONFIRM" });
        break;

      default:
        break;
    }
  };

  const onBlurHandler = (event) => {
    switch (event.target.name) {
      case "name":
        dispatchName({ type: "BLUR" });
        break;
      case "email":
        dispatchEmail({ type: "BLUR" });
        break;
      case "country":
        dispatchCountry({ type: "BLUR" });
        break;
      case "password":
      case "confirmPassword":
        dispatchPassword({ type: "BLUR" });
        break;

      default:
        break;
    }
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!isFormValid) {
      if (!nameState.blurred || !emailState.blurred || !countryState.blurred || !passwordState.blurred) {
        dispatchName({ type: "BLUR" });
        dispatchEmail({ type: "BLUR" });
        dispatchCountry({ type: "BLUR" });
        dispatchPassword({ type: "BLUR" });
      }

      return;
    }

    switch (formMode) {
      case "signup":
        const signupData = {
          name: nameState.value,
          email: emailState.value,
          password: passwordState.value,
          country: countryState.value,
          birthdate: "1980-01-01T00:00Z",
        };
        await sendAuthRequest("signup", signupData);
        break;

      case "signin":
        const signinData = { email: emailState.value, password: passwordState.value };
        await sendAuthRequest("signin", signinData);
        break;

      case "forgotpassword":
        const forgotPassData = { email: emailState.value };
        await sendAuthRequest("forgotpassword", forgotPassData);
        break;

      case "resetpassword":
        const resetPassData = { email: emailState.value, password: passwordState.value };
        await sendAuthRequest(`resetpassword`, resetPassData, resetToken);
        break;

      default:
        break;
    }
  };

  const changeFormModeTo = (mode) => {
    setFormMode(mode);

    dispatchName({ type: "RESET" });
    dispatchEmail({ type: "RESET" });
    dispatchCountry({ type: "RESET" });
    dispatchPassword({ type: "RESET" });

    switch (mode) {
      case "signup":
        dispatchName({ type: "VALIDATE" });
        dispatchEmail({ type: "VALIDATE" });
        dispatchCountry({ type: "VALIDATE" });
        dispatchPassword({ type: "VALIDATE" });
        dispatchPassword({ type: "VALIDATE_CONFIRM" });
        break;
      case "signin":
        dispatchEmail({ type: "VALIDATE" });
        dispatchPassword({ type: "VALIDATE" });
        break;
      case "forgotpassword":
        dispatchEmail({ type: "VALIDATE" });
        break;
      case "resetpassword":
        dispatchEmail({ type: "VALIDATE" });
        dispatchPassword({ type: "VALIDATE" });
        dispatchPassword({ type: "VALIDATE_CONFIRM" });
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (pathname === "/signup") changeFormModeTo("signup");
    if (pathname === "/signin") changeFormModeTo("signin");
    if (pathname === "/forgotpassword") changeFormModeTo("forgotpassword");
    if (pathname.startsWith("/resetpassword")) changeFormModeTo("resetpassword");
  }, [pathname]);

  useEffect(() => {
    const noFormErrors =
      !nameState.error &&
      !emailState.error &&
      !countryState.error &&
      !passwordState.error &&
      !passwordState.errorConfirm;

    setIsFormValid(noFormErrors);
  }, [nameState, emailState, countryState, passwordState]);

  return (
    <form className={classes.container}>
      <h1 className={classes.heading}>{formMode === "signup" ? `Create your account` : `Welcome back`}</h1>
      {locationState?.message ? <StickyMessage>{locationState.message}</StickyMessage> : <span></span>}

      {formMode === "signup" && (
        <Input
          type="text"
          label="name"
          value={nameState.value}
          onChange={onChangeHandler}
          onBlur={onBlurHandler}
          error={nameState.blurred && nameState.error}
        />
      )}

      <Input
        type="email"
        label="email"
        value={emailState.value}
        onChange={onChangeHandler}
        onBlur={onBlurHandler}
        error={emailState.blurred && emailState.error}
      />

      {formMode === "signup" && (
        <SelectCountry
          value={countryState}
          onChange={onChangeHandler}
          onBlur={onBlurHandler}
          error={countryState.blurred && countryState.error}
        />
      )}

      {formMode !== "forgotpassword" && (
        <Input
          type="password"
          label="password"
          value={passwordState.value}
          onChange={onChangeHandler}
          onBlur={onBlurHandler}
          error={passwordState.blurred && passwordState.error}
        />
      )}

      {(formMode === "signup" || formMode === "resetpassword") && (
        <Input
          type="password"
          label="confirm password"
          value={passwordState.valueConfirm}
          onChange={onChangeHandler}
          onBlur={onBlurHandler}
          error={passwordState.blurred && !passwordState.error && passwordState.errorConfirm}
        />
      )}

      <Button primary lg submit isLoading={isLoading} onClick={onSubmitHandler} className={classes.btn}>
        {formMode === "signup"
          ? `Sign Up`
          : formMode === "forgotpassword"
          ? `Send Reset URL`
          : formMode === "resetpassword"
          ? `Change Password`
          : `Sign In`}
      </Button>

      {formMode === "signup" && (
        <p className={classes.switch}>
          Already have an account <Link to="/signin">Sign In</Link> instead.
        </p>
      )}

      {formMode !== "signup" && formMode !== "resetpassword" && (
        <p className={classes.switch}>
          Don't have an account <Link to="/signup">Sign Up</Link> instead.
        </p>
      )}

      {formMode === "signin" && <Link to="/forgotpassword">Forgot Password?</Link>}
    </form>
  );
};

export default AuthForm;
