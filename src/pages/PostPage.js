import { useCallback, useReducer } from "react";
import { useParams } from "react-router-dom";

import Post from "../components/posts/Post";
import CommentsList from "../components/comments/CommentsList";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import classes from "./PostPage.module.css";

import { initialState, reducer } from "../components/posts/posts-reducer";
import useHttp from "../hooks/use-http";
import useDocumentTitle from "../hooks/use-documentTitle";

const PostPage = () => {
  const [postsState, dispatch] = useReducer(reducer, initialState);
  const { userId, postId } = useParams();

  const post = postsState.posts[0];

  const setOnePost = useCallback((data) => dispatch({ type: "SET_ONE_POST", payload: { post: data } }), []);
  const resetState = useCallback((data) => dispatch({ type: "RESET" }), []);

  const PATH_GET_POST = `users/${userId}/posts/${postId}`;
  const { isLoading } = useHttp("get", PATH_GET_POST, null, setOnePost, resetState);

  useDocumentTitle(`Post Detail`);

  if (!post || isLoading) return <LoadingSpinner />;

  return (
    <section className={classes.container}>
      <Post post={post} dispatchPosts={dispatch} isInPostPage={true} />
      <CommentsList userId={userId} postId={postId} />
    </section>
  );
};

export default PostPage;
