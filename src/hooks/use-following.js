import { useContext, useEffect, useState } from "react";

import { UserContext } from "../store/user-context";
import useHttp from "./use-http";

const useFollowing = (followId) => {
  const { authUser, setAuthUser } = useContext(UserContext);
  const { following } = authUser;
  const [isFollowed, setIsFollowed] = useState(following.includes(followId));

  const { isLoading, sendRequest } = useHttp();
  const PATH_FOLLOW = `users/${authUser.id}/follow/${followId}`;

  useEffect(() => setIsFollowed(following.includes(followId)), [following, followId]);

  const followUserHandler = async () => {
    await sendRequest("patch", PATH_FOLLOW, null, setAuthUser);
  };

  return { isFollowed, isLoading, followUserHandler };
};

export default useFollowing;
