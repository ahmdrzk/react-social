import { useRef } from "react";
import { useHistory } from "react-router";
import { GoSearch } from "react-icons/go";

import IconButton from "../UI/IconButton";
import classes from "./SearchForm.module.css";

const SearchForm = () => {
  const searchInputRef = useRef("");
  const history = useHistory();

  const navigateToResults = (event) => {
    event.preventDefault();

    history.push(`/users/search?name=${searchInputRef.current.value}`);
  };

  return (
    <form role="search" autoComplete="false" className={classes.searchForm}>
      <input
        type="search"
        name="search"
        aria-label="Search users by name"
        placeholder="Search Users ..."
        className={classes.searchInput}
        ref={searchInputRef}
      />
      <IconButton
        icon={GoSearch}
        label="Search users by name..."
        submit
        className={classes.searchIconBtn}
        onClick={navigateToResults}
      />
    </form>
  );
};

export default SearchForm;
