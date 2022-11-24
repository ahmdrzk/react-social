import { Fragment, useCallback, useReducer } from "react";
import { IoNewspaperOutline } from "react-icons/io5";

import Card from "../UI/Card";
import ComposePost from "../compose-form/ComposePost";
import Post from "./Post";
import Button from "../UI/Button";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./PostsList.module.css";

import { initialState, reducer } from "./posts-reducer";
import useHttp from "../../hooks/use-http";

const PostsList = ({ heading, userId, isOwn }) => {
  const [postsState, dispatch] = useReducer(reducer, initialState);
  const { posts, perPage, nextSkip, isLastPage } = postsState;

  const setPosts = useCallback((data) => dispatch({ type: "SET_POSTS", payload: { posts: data } }), []);
  const resetState = useCallback((data) => dispatch({ type: "RESET" }), []);

  const PATH_GET_HOME_POSTS = `users/${userId}/posts/home?skip=${nextSkip}&limit=${perPage}`;
  const PATH_GET_USER_POSTS = `users/${userId}/posts?skip=${nextSkip}&limit=${perPage}`;
  const PATH = heading.toLowerCase() === "home feed" ? PATH_GET_HOME_POSTS : PATH_GET_USER_POSTS;
  const { isLoading, sendRequest } = useHttp("get", PATH, null, setPosts, resetState);

  const getPostsHandler = async () => {
    await sendRequest("get", PATH, null, setPosts);
  };

  return (
    <section className={classes.container}>
      {isOwn && <ComposePost dispatchPosts={dispatch} />}
      <Card as="header" hasPadding={true} className={classes.header}>
        <h2>{heading}</h2>
        <IoNewspaperOutline />
      </Card>
      {(isLoading && !posts?.length && <LoadingSpinner />) ||
        (!posts?.length ? (
          <p className={classes.noPostsPara}>There are no posts yet.</p>
        ) : (
          <Fragment>
            <ul className={classes.postsList}>
              {posts.map((post) => (
                <Post key={post.id} post={post} dispatchPosts={dispatch} />
              ))}
            </ul>
            {!isLastPage && (
              <div className={classes.loadMoreBtnContainer}>
                <Button secondary isLoading={isLoading} onClick={getPostsHandler}>
                  Load More
                </Button>
              </div>
            )}
          </Fragment>
        ))}
    </section>
  );
};

export default PostsList;
