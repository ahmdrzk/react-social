import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { HiDotsHorizontal } from "react-icons/hi";

import IconButton from "./IconButton";
import Card from "./Card";
import classes from "./ArticleOptions.module.css";

import { AuthContext } from "../../store/auth-context";
import useHttp from "../../hooks/use-http";

const ArticleOptions = ({ btnLabel, postId, dispatchPosts, commentId, dispatchComments, toggleEditModeHandler }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { authUserId } = useContext(AuthContext);
  const menuRef = useRef();

  const { isLoading, sendRequest } = useHttp();
  const PATH_DELETE_POST = `users/${authUserId}/posts/${postId}`;
  const PATH_DELETE_COMMENT = `users/${authUserId}/posts/${postId}/comments/${commentId}`;

  const deleteLocalPost = useCallback(() => {
    dispatchPosts({ type: "DELETE_POST", payload: { postId } });
  }, [dispatchPosts, postId]);

  const deleteLocalComment = useCallback(() => {
    dispatchComments({ type: "DELETE_COMMENT", payload: { commentId } });
  }, [dispatchComments, commentId]);

  const deleteHandler = async () => {
    if (window.confirm(`Are you sure you want to delete this ${commentId ? "comment" : "post"}?`)) {
      if (!commentId) await sendRequest("delete", PATH_DELETE_POST, null, deleteLocalPost);
      if (commentId) await sendRequest("delete", PATH_DELETE_COMMENT, null, deleteLocalComment);
    }
  };

  const toggleMenuHandler = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  useEffect(() => {
    const closeMenuHandler = (event) => {
      if (isMenuOpen && event.target !== menuRef.current) setIsMenuOpen(false);
    };

    window.addEventListener("click", closeMenuHandler);

    return () => window.removeEventListener("click", closeMenuHandler);
  }, [isMenuOpen]);

  return (
    <div className={classes.container}>
      <IconButton
        icon={HiDotsHorizontal}
        label={btnLabel}
        className={classes.optionsBtn}
        isLoading={isLoading}
        onClick={toggleMenuHandler}
      />
      <Card
        as="div"
        className={`${classes.optionsContainer} ${isMenuOpen && classes.visibleOptionsContainer}`}
        ref={menuRef}
      >
        <ul>
          <li>
            <Link to="#" className={classes.option} onClick={toggleEditModeHandler}>
              Edit
            </Link>
          </li>
          <li>
            <Link to="#" className={classes.option} onClick={deleteHandler}>
              Delete
            </Link>
          </li>
        </ul>
      </Card>
    </div>
  );
};

export default ArticleOptions;
