import { useCallback, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import Card from "../UI/Card";
import Button from "../UI/Button";
import UserRow from "../user-row/UserRow";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./ConnectionsList.module.css";

import useHttp from "../../hooks/use-http";

const ConnectionsList = ({ userId, background }) => {
  const [connectionsList, setConnectionsList] = useState([]);
  const { connectionslist } = useParams();
  const { push } = useHistory();

  const resetState = useCallback(() => setConnectionsList([]), []);

  const PATH_GET_CONNECTIONS_LIST = `users/${userId}/${connectionslist}`;
  const { isLoading } = useHttp("get", PATH_GET_CONNECTIONS_LIST, null, setConnectionsList, resetState, []);

  const goBackHandler = () => push(`/users/${userId}`);

  const stopPropagationHandler = (event) => {
    event.stopPropagation();
  };

  return (
    <div className={background && classes.backdrop} onClick={goBackHandler}>
      <Card as="article" className={classes.container} hasPadding={true} onClick={stopPropagationHandler}>
        <header className={classes.heading}>
          <h2>{connectionslist}</h2>
          <Button secondary onClick={goBackHandler}>
            Done
          </Button>
        </header>
        {!connectionsList || isLoading ? (
          <LoadingSpinner />
        ) : (
          <ul>
            {connectionsList.map((user) => (
              <UserRow key={user.id} user={user} secondaryTitle="country" />
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
};

export default ConnectionsList;
