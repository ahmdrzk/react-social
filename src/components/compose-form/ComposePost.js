import { useCallback, useContext, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";

import Card from "../UI/Card";
import Button from "../UI/Button";
import classes from "./ComposePost.module.css";

import { UserContext } from "../../store/user-context";
import useHttp from "../../hooks/use-http";

const ComposePost = ({ dispatchPosts }) => {
  const [content, setContent] = useState("");
  const { authUser } = useContext(UserContext);
  const imageRef = useRef();

  const { id = null, name = null, image = null } = authUser;

  const isValid = content.trim().length >= 1 && content.trim().length <= 450;

  const { isLoading, sendRequest } = useHttp();
  const PATH_CREATE_POST = `users/${id}/posts`;

  const setNewPost = useCallback(
    (data) => {
      const localPost = Object.assign({}, data, {
        authorId: { id, name, image },
        likesCount: 0,
        commentsCount: 0,
      });

      dispatchPosts({ type: "SET_NEW_POST", payload: { post: localPost } });
    },
    [dispatchPosts, id, name, image]
  );

  const onChangeHandler = (event) => {
    setContent(event.target.value);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!isValid) return;

    const formData = new FormData();

    formData.append("content", content);
    formData.append("image", imageRef.current.files[0]);

    await sendRequest("post", PATH_CREATE_POST, formData, setNewPost);

    setContent("");
    imageRef.current.value = null;
  };

  return (
    <Card as="section" hasPadding={true} className={classes.outerContainer}>
      <div className={classes.innerContainer}>
        <form id="composePost" className={classes.form}>
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
            <span>Create Post</span>
            <span>
              <FaPlus />
            </span>
          </Button>
        </form>
      </div>
      <span className={`${classes.charsCounter} ${content.trim().length > 450 && classes.charsCounterErr}`}>
        {450 - content.trim().length} Chars
      </span>
      <div className={classes.imageInput}>
        <label htmlFor="image">Add image:</label>
        <input type="file" id="image" name="image" ref={imageRef} form="composePost" />
      </div>
    </Card>
  );
};

export default ComposePost;
