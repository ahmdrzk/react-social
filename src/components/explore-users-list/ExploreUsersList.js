import { useCallback, useState } from "react";

import Card from "../UI/Card";
import UserRow from "../user-row/UserRow";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./ExploreUsersList.module.css";

import useHttp from "../../hooks/use-http";

const ExploreUsersList = ({ heading, userId }) => {
  const [users, setUsers] = useState([]);

  const resetState = useCallback(() => setUsers([]), []);

  const PATH_GET_EXPLORE = `users/${userId}/explore`;
  const { isLoading } = useHttp("get", PATH_GET_EXPLORE, null, setUsers, resetState);

  if (isLoading)
    return (
      <Card as="article" className={classes.container}>
        <LoadingSpinner />
      </Card>
    );

  return (
    <Card as="article" className={classes.container}>
      <header className={classes.heading}>{heading}</header>
      <ul>
        {users.slice(0, 6).map((user) => (
          <UserRow key={user.id} user={user} secondaryTitle="followers" />
        ))}
      </ul>
    </Card>
  );
};

export default ExploreUsersList;
