import classes from "./LoadingSpinner.module.css";

const LoadingSpinner = ({ sm, color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40px"
      height="40px"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
      className={`${classes.container} ${sm && classes.sm}`}
    >
      <circle
        cx="50"
        cy="50"
        fill="none"
        stroke="#3d22f7"
        strokeWidth="10"
        r="35"
        strokeDasharray="164.93361431346415 56.97787143782138"
        className={color && classes[color]}
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          repeatCount="indefinite"
          dur="1s"
          values="0 50 50;360 50 50"
          keyTimes="0;1"
        ></animateTransform>
      </circle>
    </svg>
  );
};

export default LoadingSpinner;
