import { useCallback, useContext, useState } from "react";
import { FaPlus } from "react-icons/fa";

import Avatar from "../UI/Avatar";
import Button from "../UI/Button";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./ComposeComment.module.css";

import { UserContext } from "../../store/user-context";
import useHttp from "../../hooks/use-http";

const ComposeComment = ({ postId, dispatchComments }) => {
  const [content, setContent] = useState("");
  const { authUser } = useContext(UserContext);

  const { id, name, image } = authUser;

  const isValid = content.trim().length >= 1 && content.trim().length <= 450;

  const setNewComment = useCallback(
    (data) => {
      const localComment = Object.assign({}, data, {
        authorId: { id, name, image },
        likesCount: 0,
      });
      dispatchComments({ type: "SET_NEW_COMMENT", payload: { comment: localComment } });
    },
    [dispatchComments, id, name, image]
  );

  const PATH_CREATE_COMMENT = `users/${id}/posts/${postId}/comments`;
  const { isLoading, sendRequest: createComment } = useHttp(
    "post",
    PATH_CREATE_COMMENT,
    { data: { content } },
    setNewComment,
    false
  );

  const onChangeHandler = (event) => {
    setContent(event.target.value);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!isValid) return;

    await createComment();

    setContent("");
  };

  return (
    <section className={classes.outerContainer}>
      <div className={classes.innerContainer}>
        {!authUser || isLoading ? <LoadingSpinner sm /> : <Avatar image={image} alt={name} dimension={4} />}
        <form className={classes.form}>
          <textarea
            id="compose"
            name="textarea"
            placeholder="textarea"
            className={classes.textarea}
            value={content}
            onChange={onChangeHandler}
          />
          <label htmlFor="compose" className={classes.label}>
            Write something ...
          </label>
          <Button primary className={classes.btn} isLoading={isLoading} onClick={onSubmitHandler}>
            <span>Comment</span>
            <span>
              <FaPlus />
            </span>
          </Button>
        </form>
      </div>
      <span className={`${classes.charsCounter} ${content.length > 450 && classes.charsCounterErr}`}>
        {450 - content.length} Chars
      </span>
    </section>
  );
};

export default ComposeComment;
