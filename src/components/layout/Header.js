import { Fragment } from "react";
import { Link } from "react-router-dom";

import SearchForm from "./SearchForm";
import classes from "./Header.module.css";

const Header = ({ isAuthenticated, signoutHandler }) => {
  return (
    <div className={classes.container}>
      <Link to="/" className={classes.logo}>
        React Social
      </Link>
      {isAuthenticated && <SearchForm />}
      <nav>
        <ul className={classes.navigationList}>
          {isAuthenticated ? (
            <Fragment>
              <li>
                <Link to="/home" className={classes.navLink}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/users/me" className={classes.navLink}>
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/" onClick={signoutHandler} className={classes.navLink}>
                  Sign Out
                </Link>
              </li>
            </Fragment>
          ) : (
            <Fragment>
              <li>
                <Link to="/signin" className={classes.navLink}>
                  Sign In
                </Link>
              </li>
              <li>
                <Link to="/signup" className={classes.navLink}>
                  Sign Up
                </Link>
              </li>
            </Fragment>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Header;
