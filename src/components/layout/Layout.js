import { Fragment, useContext } from "react";
import { Link } from "react-router-dom";

import Header from "./Header";
import Modal from "./Modal";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./Layout.module.css";

import { AlertsContext } from "../../store/alerts-context";
import { AuthContext } from "../../store/auth-context";
import { UserContext } from "../../store/user-context";
import useHttp from "../../hooks/use-http";

const Layout = ({ children }) => {
  const { alertType, alertContent, dispatchAlerts } = useContext(AlertsContext);
  const { isAuthenticated, authUserId, deleteAuthToken } = useContext(AuthContext);
  const { authUser, setAuthUser } = useContext(UserContext);

  const isModalOpen = ["info", "warn", "error"].includes(alertType);

  const PATH_GET_USER = `users/${authUserId}`;
  const { isLoading } = useHttp("get", PATH_GET_USER, null, setAuthUser, isAuthenticated);

  const closeModalHandler = () => {
    dispatchAlerts({ type: "CLEAR_ALERT" });
  };

  const confirmModalHandler = () => {};

  if (isLoading || (isAuthenticated && !authUser)) return <LoadingSpinner />;

  return (
    <Fragment>
      <Link to="#main-content" className={classes.skipToMain}>
        Skip To Main
      </Link>
      <header className={classes.header}>
        <Header isAuthenticated={isAuthenticated} signoutHandler={deleteAuthToken} />
      </header>
      <main id="main-content" className={classes.main}>
        {children}
      </main>
      {isModalOpen && (
        <Modal status={alertType} onClose={closeModalHandler} onConfirm={confirmModalHandler}>
          {alertContent}
        </Modal>
      )}
    </Fragment>
  );
};

export default Layout;
