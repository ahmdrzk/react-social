import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./IconButton.module.css";

const IconButton = ({ icon, label, hasVisibleLabel, submit, className, isLoading, onClick }) => {
  const IconComponent = icon;

  return (
    <button
      type={submit ? "submit" : "button"}
      className={`${classes.container} ${className}`}
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading ? <LoadingSpinner sm /> : <IconComponent aria-hidden="true" />}
      <span className={!hasVisibleLabel ? "visually-hidden" : classes.label}>{label}</span>
    </button>
  );
};

export default IconButton;
