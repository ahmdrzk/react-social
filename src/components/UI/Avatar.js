import classes from "./Avatar.module.css";

const Avatar = ({ image, alt, dimension, hasBorder }) => {
  let dimensionClassName;

  switch (Number(dimension)) {
    case 10:
      dimensionClassName = "rem10";
      break;

    case 6:
      dimensionClassName = "rem6";
      break;

    case 4:
      dimensionClassName = "rem4";
      break;

    default:
      dimensionClassName = "";
  }

  return (
    <img
      src={image}
      alt={alt}
      className={`${classes.avatar} ${hasBorder && classes.avatarBorder} ${classes[dimensionClassName]}`}
    />
  );
};

export default Avatar;
