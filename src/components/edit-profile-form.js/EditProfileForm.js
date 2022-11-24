import { Fragment, useContext, useRef, useState } from "react";
import { useHistory } from "react-router-dom";

import Button from "../UI/Button";
import classes from "./EditProfileForm.module.css";

import { AuthContext } from "../../store/auth-context";
import { UserContext } from "../../store/user-context";
import useHttp from "../../hooks/use-http";
import {
  getBirthdateValidationErrors,
  getConfirmPasswordValidationErrors,
  getCountryValidationErrors,
  getEmailValidationErrors,
  getNameValidationErrors,
  getPasswordValidationErrors,
  getStatusValidationErrors,
} from "../../lib/form-validators";
import { convertToHtmlDateValue } from "../../lib/date-conversions";
import countries from "../../lib/countries-list.json";

const EditProfileForm = ({ mode }) => {
  const [errors, setErrors] = useState({});
  const { deleteAuthToken } = useContext(AuthContext);
  const { authUser, setAuthUser } = useContext(UserContext);
  const history = useHistory();

  const { isLoading, sendRequest } = useHttp();
  const PATH_UPDATE_USER = `users/${authUser.id}`;
  const PATH_UPDATE_PASSWORD = `users/${authUser.id}/updatePassword`;
  const PATH_DELETE_USER = `users/${authUser.id}`;

  const nameRef = useRef(authUser.name);
  const emailRef = useRef(authUser.email);
  const countryRef = useRef(authUser.country);
  const birthdateRef = useRef(authUser.birthdate);
  const birthdate = convertToHtmlDateValue(authUser.birthdate);
  const statusRef = useRef(authUser.status);
  const imageRef = useRef(authUser.image);

  const currentPasswordRef = useRef();
  const newPasswordRef = useRef();
  const confirmNewPasswordRef = useRef();

  const cancelHandler = () => {
    history.push("/users/me");
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    setErrors((prevState) => {});

    if (mode === "profile") {
      const nameError = getNameValidationErrors(nameRef.current.value);
      const emailError = getEmailValidationErrors(emailRef.current.value);
      const countryError = getCountryValidationErrors(countryRef.current.value);
      const birthdateError = getBirthdateValidationErrors(birthdateRef.current.value);
      const statusError = getStatusValidationErrors(statusRef.current.value);

      if (nameError || emailError || countryError || birthdateError || statusError) {
        setErrors({ nameError, emailError, countryError, birthdateError, statusError });
        return;
      }

      const formData = new FormData();
      formData.append("name", nameRef.current.value);
      formData.append("email", emailRef.current.value);
      formData.append("country", countryRef.current.value);
      formData.append("birthdate", birthdateRef.current.value);
      formData.append("status", statusRef.current.value);
      formData.append("image", imageRef.current.files[0]);

      await sendRequest("patch", PATH_UPDATE_USER, formData, setAuthUser);

      history.push("/users/me");
    }

    if (mode === "security") {
      const currentPasswordError = getPasswordValidationErrors(currentPasswordRef.current.value);
      const newPasswordError = getPasswordValidationErrors(newPasswordRef.current.value);
      const confirmNewPasswordError = getConfirmPasswordValidationErrors(
        newPasswordRef.current.value,
        confirmNewPasswordRef.current.value
      );

      if (currentPasswordError || newPasswordError || confirmNewPasswordError) {
        setErrors({ currentPasswordError, newPasswordError, confirmNewPasswordError });
        return;
      }

      await sendRequest(
        "patch",
        PATH_UPDATE_PASSWORD,
        { data: { currentPassword: currentPasswordRef.current.value, password: newPasswordRef.current.value } },
        false
      );

      history.push("/users/me");
    }

    if (mode === "danger") {
      if (window.confirm("Are you sure you want to deactivate your account?")) {
        await sendRequest("delete", PATH_DELETE_USER, null);
        deleteAuthToken();
      }
    }
  };

  return (
    <form className={classes.form} autoComplete="off">
      {mode === "profile" && (
        <Fragment>
          <h2 className={classes.heading}>Edit Profile</h2>
          <div className={classes.inputContainer}>
            <label htmlFor="name" className={classes.label}>
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              defaultValue={authUser.name}
              placeholder="[5 - 50] chars - [A-Z 0-9]"
              className={classes.input}
              ref={nameRef}
            />
            {errors?.nameError && <p className={classes.error}>{errors.nameError}</p>}
          </div>

          <div className={classes.inputContainer}>
            <label htmlFor="email" className={classes.label}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              defaultValue={authUser.email}
              placeholder="[5 - 50] chars"
              className={classes.input}
              ref={emailRef}
            />
            {errors?.emailError && <p className={classes.error}>{errors.emailError}</p>}
          </div>

          <div className={classes.inputContainer}>
            <label htmlFor="country" className={classes.label}>
              Country
            </label>
            <select
              id="country"
              name="country"
              defaultValue={authUser.country}
              className={classes.input}
              ref={countryRef}
            >
              {countries.map((country) => (
                <option value={country.name} key={country.code}>
                  {country.name} {country.emoji}
                </option>
              ))}
            </select>
            {errors?.countryError && <p className={classes.error}>{errors.countryError}</p>}
          </div>

          <div className={classes.inputContainer}>
            <label htmlFor="birthdate" className={classes.label}>
              Birthdate
            </label>
            <input
              type="date"
              id="birthdate"
              name="birthdate"
              defaultValue={birthdate}
              className={classes.input}
              ref={birthdateRef}
            />
            {errors?.birthdateError && <p className={classes.error}>{errors.birthdateError}</p>}
          </div>

          <div className={classes.inputContainer}>
            <label htmlFor="status" className={classes.label}>
              Status
            </label>
            <textarea
              id="status"
              name="status"
              defaultValue={authUser.status}
              placeholder="[2 - 100] chars"
              className={classes.input}
              ref={statusRef}
            />
            {errors?.statusError && <p className={classes.error}>{errors.statusError}</p>}
          </div>

          <div className={classes.inputContainer}>
            <label htmlFor="image" className={classes.label}>
              Profile Picture
            </label>
            <input type="file" id="image" name="image" ref={imageRef} />
          </div>
        </Fragment>
      )}

      {mode === "security" && (
        <Fragment>
          <h2 className={classes.heading}>Security Settings</h2>
          <div className={classes.inputContainer}>
            <label htmlFor="currentPassword" className={classes.label}>
              Current password
            </label>
            <input
              type="password"
              id="currentPassword"
              name="currentPassword"
              placeholder="Current Password"
              className={classes.input}
              ref={currentPasswordRef}
            />
            {errors?.currentPasswordError && <p className={classes.error}>{errors.currentPasswordError}</p>}
          </div>

          <div className={classes.inputContainer}>
            <label htmlFor="newPassword" className={classes.label}>
              New password (Minimum 8 characters)
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              autoComplete="new-password"
              className={classes.input}
              ref={newPasswordRef}
            />
            {errors?.newPasswordError && <p className={classes.error}>{errors.newPasswordError}</p>}
          </div>

          <div className={classes.inputContainer}>
            <label htmlFor="confirmPassword" className={classes.label}>
              Confirm new password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmNewPassword"
              autoComplete="new-password"
              className={classes.input}
              ref={confirmNewPasswordRef}
            />
            {errors?.confirmNewPasswordError && <p className={classes.error}>{errors.confirmNewPasswordError}</p>}
          </div>
        </Fragment>
      )}

      {mode === "danger" && (
        <Fragment>
          <h2 className={classes.heading}>Danger Zone</h2>
          <p>Deactivate my account:</p>
        </Fragment>
      )}

      <div className={classes.btnsContainer}>
        <Button
          primary
          className={mode === "danger" && classes.deactivateBtn}
          isLoading={isLoading}
          onClick={onSubmitHandler}
        >
          {mode === "danger" ? "Deactivate" : "Submit"}
        </Button>
        <Button secondary onClick={cancelHandler}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default EditProfileForm;
