import { useState } from "react";

import classes from "./Input.module.css";

import { convertToCamelCase } from "../../lib/string-conversions";

const Input = ({ type, label, value, defaultValue, onChange, onBlur, error }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const id = convertToCamelCase(label);

  const toggleIsPasswordVisible = () => setIsPasswordVisible((prevState) => !prevState);

  return (
    <div className={classes.container}>
      <input
        type={type !== "password" ? type : isPasswordVisible ? "text" : "password"}
        id={id}
        name={id}
        placeholder={label}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        onBlur={onBlur}
        className={classes.input}
      />
      <label htmlFor={id} className={classes.label}>
        {label}
      </label>
      {type === "password" && <span className={classes.showPasswordIcon} onClick={toggleIsPasswordVisible} />}
      {error && <span className={classes.error}>{error}</span>}
    </div>
  );
};

export default Input;
