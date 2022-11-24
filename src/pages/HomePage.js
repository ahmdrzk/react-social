import { useContext } from "react";

import UserCard from "../components/user-card/UserCard";
import PostsList from "../components/posts/PostsList";
import ExploreUsersList from "../components/explore-users-list/ExploreUsersList";
import classes from "./HomePage.module.css";

import { AuthContext } from "../store/auth-context";
import useDocumentTitle from "../hooks/use-documentTitle";

const HomePage = () => {
  const { authUserId } = useContext(AuthContext);

  useDocumentTitle("Home Feed");

  return (
    <div className={classes.container}>
      <UserCard />
      <PostsList heading="Home Feed" userId={authUserId} />
      <ExploreUsersList heading="People Suggestions" userId={authUserId} />
    </div>
  );
};

export default HomePage;
