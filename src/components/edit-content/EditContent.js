import { useCallback, useContext, useState } from "react";

import Button from "../UI/Button";
import classes from "./EditContent.module.css";

import { AuthContext } from "../../store/auth-context";
import useHttp from "../../hooks/use-http";

const EditContent = ({ postId, dispatchPosts, commentId, dispatchComments, defaultContent, closeHandler }) => {
  const [content, setContent] = useState(defaultContent);
  const { authUserId } = useContext(AuthContext);

  const isValid = content.trim().length >= 1 && content.trim().length <= 450;

  const { isLoading, sendRequest } = useHttp();
  const PATH_UPDATE_POST = `users/${authUserId}/posts/${postId}`;
  const PATH_UPDATE_COMMENT = `users/${authUserId}/posts/${postId}/comments/${commentId}`;

  const setUpdatedPost = useCallback(
    (data) => dispatchPosts({ type: "SET_UPDATED_POST", payload: { postId: postId, updatedPost: data } }),
    [dispatchPosts, postId]
  );

  const setUpdatedComment = useCallback(
    (data) =>
      dispatchComments({ type: "SET_UPDATED_COMMENT", payload: { commentId: commentId, updatedComment: data } }),
    [dispatchComments, commentId]
  );

  const onChangeHandler = (event) => {
    setContent(event.target.value);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!commentId) await sendRequest("patch", PATH_UPDATE_POST, { data: { content } }, setUpdatedPost);
    if (commentId) await sendRequest("patch", PATH_UPDATE_COMMENT, { data: { content } }, setUpdatedComment);

    closeHandler();
  };

  return (
    <div className={classes.container}>
      <form className={classes.form}>
        <label htmlFor="textarea" className={classes.label}>
          Edit Content
        </label>
        <textarea
          id="textarea"
          placeholder="Maximum 450 characters"
          className={classes.textarea}
          defaultValue={content}
          onChange={onChangeHandler}
        />
        <div className={classes.btnsContainer}>
          <Button primary isLoading={isLoading} onClick={onSubmitHandler}>
            Update
          </Button>
          <Button secondary onClick={closeHandler}>
            Cancel
          </Button>
          <span className={`${classes.charsCounter} ${!isValid && classes.charsCounterErr}`}>{`${
            450 - content.trim().length
          } Chars`}</span>
        </div>
      </form>
    </div>
  );
};

export default EditContent;
