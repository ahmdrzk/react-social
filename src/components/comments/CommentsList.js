import { useCallback, useReducer } from "react";
import { IoNewspaperOutline } from "react-icons/io5";

import Card from "../UI/Card";
import ComposeComment from "../compose-form/ComposeComment";
import Comment from "./Comment";
import Button from "../UI/Button";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./CommentsList.module.css";

import { initialState, reducer } from "../comments/comments-reducer";
import useHttp from "../../hooks/use-http";

const CommentsList = ({ userId, postId }) => {
  const [commentsState, dispatch] = useReducer(reducer, initialState);
  const { comments, perPage, nextSkip, isLastPage } = commentsState;

  const setComments = useCallback((data) => dispatch({ type: "SET_COMMENTS", payload: { comments: data } }), []);
  const resetState = useCallback((data) => dispatch({ type: "RESET" }), []);

  const PATH_GET_COMMENTS = `users/${userId}/posts/${postId}/comments?skip=${nextSkip}&limit=${perPage}`;
  const { isLoading, sendRequest } = useHttp("get", PATH_GET_COMMENTS, null, setComments, resetState);

  const getCommentsHandler = async () => {
    await sendRequest("get", PATH_GET_COMMENTS, null, setComments);
  };

  return (
    <section className={classes.container}>
      <Card as="header" hasPadding={true} className={classes.header}>
        <h4>Comments</h4>
        <IoNewspaperOutline />
      </Card>
      <Card>
        <ComposeComment postId={postId} dispatchComments={dispatch} />
        {(isLoading && !comments?.length && <LoadingSpinner />) ||
          (comments?.length > 0 && (
            <ul>
              {comments.map((comment) => (
                <Comment key={comment.id} comment={comment} dispatchComments={dispatch} />
              ))}
            </ul>
          ))}
      </Card>
      {!comments?.length && <p className={classes.noCommentsPara}>There are no comments yet.</p>}
      {!isLastPage && (
        <div className={classes.loadMoreBtnContainer}>
          <Button secondary isLoading={isLoading} onClick={getCommentsHandler}>
            Load More
          </Button>
        </div>
      )}
    </section>
  );
};

export default CommentsList;
