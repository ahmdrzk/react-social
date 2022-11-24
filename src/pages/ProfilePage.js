import { useCallback, useContext, useState } from "react";
import { Route, useLocation, useParams, useRouteMatch } from "react-router-dom";

import ProfileIntro from "../components/profile-intro/ProfileIntro";
import PostsList from "../components/posts/PostsList";
import ConnectionsList from "../components/connections-list/ConnectionsList";
import LoadingSpinner from "../components/UI/LoadingSpinner";

import { AuthContext } from "../store/auth-context";
import useHttp from "../hooks/use-http";
import useDocumentTitle from "../hooks/use-documentTitle";

const ProfilePage = () => {
  const [user, setUser] = useState();
  const { authUserId } = useContext(AuthContext);
  const location = useLocation();
  const { userId: userIdParam } = useParams();
  const { path } = useRouteMatch();

  const userId = userIdParam ? userIdParam : authUserId;
  const isOwn = userId === authUserId;
  const background = location.state && location.state.background;

  const resetState = useCallback(() => setUser(null), []);

  const PATH_GET_USER = `users/${userId}`;
  const { isLoading } = useHttp("get", PATH_GET_USER, null, setUser, resetState, [userId]);

  useDocumentTitle(user?.name ? `${user.name} Profile` : "Profile");

  if (!user || isLoading) return <LoadingSpinner />;

  return (
    <div>
      <ProfileIntro user={user} isOwn={isOwn} />

      <Route exact path={path}>
        <PostsList heading="Profile Feed" userId={userId} isOwn={isOwn} />
      </Route>
      <Route path={`${path}/:connectionslist`}>
        <ConnectionsList userId={userId} background={background} />
      </Route>
    </div>
  );
};

export default ProfilePage;
