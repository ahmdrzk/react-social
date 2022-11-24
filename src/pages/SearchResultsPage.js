import { useCallback, useState } from "react";
import { useLocation } from "react-router-dom";

import Card from "../components/UI/Card";
import UserRow from "../components/user-row/UserRow";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import classes from "./SearchResultsPage.module.css";

import useHttp from "../hooks/use-http";

const SearchResultsPage = () => {
  const [users, setUsers] = useState([]);
  const { search } = useLocation();

  const searchParams = new URLSearchParams(search);
  const nameParam = searchParams.get("name");

  const resetState = useCallback(() => setUsers([]), []);

  const PATH_SEARCH_USERS = `users/search?name=${nameParam}`;
  const { isLoading } = useHttp("get", PATH_SEARCH_USERS, null, setUsers, resetState, [PATH_SEARCH_USERS]);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className={classes.container}>
      <Card hasPadding={true} className={classes.headingContainer}>
        <h2>Search Results</h2>
      </Card>
      <Card as="section" hasPadding={true}>
        <ul>
          {users.length > 0 ? (
            users.map((user) => <UserRow key={user.id} user={user} secondaryTitle="country" />)
          ) : (
            <p>No results found for your search.</p>
          )}
        </ul>
      </Card>
    </div>
  );
};

export default SearchResultsPage;
