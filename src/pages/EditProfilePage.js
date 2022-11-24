import { Link, Redirect, Route, Switch, useLocation, useRouteMatch } from "react-router-dom";

import EditProfileForm from "../components/edit-profile-form.js/EditProfileForm";
import classes from "./EditProfilePage.module.css";

import useDocumentTitle from "../hooks/use-documentTitle";

const EditProfilePage = () => {
  const location = useLocation();
  const { path, url } = useRouteMatch();

  const currentMode = location.pathname.split("/").pop();

  useDocumentTitle("Edit Profile");

  return (
    <div className={classes.container}>
      <aside className={classes.aside}>
        <nav>
          <ul>
            <li>
              <Link
                to={`${url}/profile`}
                className={`${classes.navTab} ${currentMode === "profile" && classes.navTabSelected}`}
              >
                Profile
              </Link>
            </li>
            <li>
              <Link
                to={`${url}/security`}
                className={`${classes.navTab} ${currentMode === "security" && classes.navTabSelected}`}
              >
                Security
              </Link>
            </li>
            <li>
              <Link
                to={`${url}/danger`}
                className={`${classes.navTab} ${currentMode === "danger" && classes.navTabSelected}`}
              >
                Danger
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      <section className={classes.formContainer}>
        <Switch>
          <Route path={`${path}/profile`}>
            <EditProfileForm mode="profile" />
          </Route>
          <Route path={`${path}/security`}>
            <EditProfileForm mode="security" />
          </Route>
          <Route path={`${path}/danger`}>
            <EditProfileForm mode="danger" />
          </Route>
        </Switch>

        {currentMode === "edit" && <Redirect from="/users/edit" to="/users/edit/profile" />}
      </section>
    </div>
  );
};

export default EditProfilePage;
