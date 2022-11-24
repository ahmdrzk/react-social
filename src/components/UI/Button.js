import LoadingSpinner from "./LoadingSpinner";
import classes from "./Button.module.css";

const Button = ({ primary, secondary, lg, submit, className, isLoading, onClick, children }) => {
  return (
    <button
      type={submit ? "submit" : "button"}
      className={`${classes.button} ${primary && classes.primary} ${secondary && classes.secondary} ${
        lg && classes.lg
      } ${isLoading && classes.unclickable} ${className}`}
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading ? <LoadingSpinner sm={true} color={(primary && "light") || (secondary && "dark")} /> : children}
    </button>
  );
};

export default Button;
