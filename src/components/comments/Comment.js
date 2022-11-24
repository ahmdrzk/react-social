import { useCallback, useContext, useState } from "react";
import { FaHeart } from "react-icons/fa";

import Avatar from "../UI/Avatar";
import UserNameLink from "../UI/UserNameLink";
import ArticleOptions from "../UI/ArticleOptions";
import IconButton from "../UI/IconButton";
import classes from "./Comment.module.css";

import { AuthContext } from "../../store/auth-context";
import useHttp from "../../hooks/use-http";
import { convertToLocaleDate } from "../../lib/date-conversions";
import EditContent from "../edit-content/EditContent";

const Comment = ({ comment, dispatchComments }) => {
  const {
    authorId: { id: authorId, name, image: authorImage },
    id: commentId,
    content,
    postId,
    createdAt,
    likesCount,
  } = comment;

  const [editMode, setEditMode] = useState(false);
  const { authUserId } = useContext(AuthContext);

  const { isLoading, sendRequest } = useHttp();
  const PATH_LIKE_COMMENT = `users/${authUserId}/posts/${postId}/comments/${commentId}/likes`;

  const setCommentLikes = useCallback(
    (data) => dispatchComments({ type: "SET_COMMENT_LIKES", payload: { commentId: commentId, likesCount: data } }),
    [dispatchComments, commentId]
  );

  const likeCommentHandler = async () => {
    await sendRequest("post", PATH_LIKE_COMMENT, null, setCommentLikes);
  };

  const toggleEditModeHandler = () => {
    setEditMode((prevState) => !prevState);
  };

  return (
    <li>
      <article className={classes.container}>
        <header className={classes.header}>
          <Avatar image={authorImage} alt={name} dimension={4} />
          <div>
            <UserNameLink userId={authorId}>{name}</UserNameLink>
            <time dateTime={createdAt} className={classes.createdAt}>
              {convertToLocaleDate(createdAt)}
            </time>
          </div>
          <ArticleOptions
            btnLabel="Comment Options"
            postId={postId}
            commentId={commentId}
            dispatchComments={dispatchComments}
            toggleEditModeHandler={toggleEditModeHandler}
          />
        </header>
        {editMode ? (
          <EditContent
            postId={postId}
            commentId={commentId}
            dispatchComments={dispatchComments}
            defaultContent={content}
            closeHandler={toggleEditModeHandler}
          />
        ) : (
          <p className={classes.content}>{content}</p>
        )}
        <footer className={classes.footer}>
          <IconButton
            icon={FaHeart}
            label={`${likesCount} Likes`}
            hasVisibleLabel={true}
            className={classes.footerIcon}
            isLoading={isLoading}
            onClick={likeCommentHandler}
          />
        </footer>
      </article>
    </li>
  );
};

export default Comment;
