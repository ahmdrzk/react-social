import { Link } from "react-router-dom";

import classes from "./UserNameLink.module.css";

const UserNameLink = ({ userId, children }) => {
  return (
    <Link to={`/users/${userId}`} className={classes.link}>
      {children}
    </Link>
  );
};

export default UserNameLink;
