import countries from "./countries-list.json";

export const getNameValidationErrors = (value) => {
  if (value.trim().length === 0) return "Name field is required.";

  const regex = /^(?:[A-Za-z]+)(?:[A-Za-z0-9 _]*)$/;

  const hasValidPattern = regex.test(String(value));
  if (!hasValidPattern) return "Name field has to start with a letter and contain only letters, numbers and spaces.";

  const hasValidMinLength = value.trim().length >= 5;
  if (!hasValidMinLength) return "Name field has to be more than or equal to 5 characters.";

  const hasValidMaxLength = value.trim().length <= 40;
  if (!hasValidMaxLength) return "Name field has to be less than or equal to 40 characters.";

  return "";
};

export const getEmailValidationErrors = (value) => {
  if (value.trim().length === 0) return "Email field is required.";

  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const hasValidPattern = regex.test(String(value).toLowerCase());
  if (!hasValidPattern) return "Email field has to be a valid email address.";

  const hasValidMinLength = value.trim().length >= 5;
  if (!hasValidMinLength) return "Email field has to be more than or equal to 5 characters.";

  const hasValidMaxLength = value.trim().length <= 40;
  if (!hasValidMaxLength) return "Email field has to be less than or equal to 40 characters.";

  return "";
};

export const getCountryValidationErrors = (value) => {
  if (value.trim().length === 0) return "Country field is required.";

  const isValidCountryCode = countries.filter((country) => country.name === value);

  if (isValidCountryCode.length === 0) return "Country code is not valid.";

  return "";
};

export const getBirthdateValidationErrors = (value) => {
  if (!(new Date() - new Date(value) >= new Date(504911232000))) return "Age has to be more than or equal to 16 years.";

  return "";
};

export const getStatusValidationErrors = (value) => {
  if (value.trim().length === 0) return "Status field is required.";

  const hasValidMinLength = value.trim().length >= 2;
  if (!hasValidMinLength) return "Status field has to be more than or equal to 2 characters.";

  const hasValidMaxLength = value.trim().length <= 100;
  if (!hasValidMaxLength) return "Status field has to be less than or equal to 100 characters.";

  return "";
};

export const getPasswordValidationErrors = (value) => {
  if (value.trim().length === 0) return "Password field is required.";

  const hasValidMinLength = value.trim().length >= 8;
  if (!hasValidMinLength) return "Password field has to be more than or equal to 8 characters.";

  const hasValidMaxLength = value.trim().length <= 50;
  if (!hasValidMaxLength) return "Password field has to be less than or equal to 50 characters.";

  return "";
};

export const getConfirmPasswordValidationErrors = (value, passwordValue) => {
  if (value !== passwordValue) return "Confirm password field is not matching password field.";

  return "";
};
