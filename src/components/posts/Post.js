import { useCallback, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { MdInsertComment } from "react-icons/md";

import Card from "../UI/Card";
import Avatar from "../UI/Avatar";
import UserNameLink from "../UI/UserNameLink";
import ArticleOptions from "../UI/ArticleOptions";
import EditContent from "../edit-content/EditContent";
import IconButton from "../UI/IconButton";
import classes from "./Post.module.css";

import { AuthContext } from "../../store/auth-context";
import useHttp from "../../hooks/use-http";
import { convertToLocaleDate, convertToTimeAgo } from "../../lib/date-conversions";

const Post = ({ post, dispatchPosts, isInPostPage }) => {
  const {
    authorId: { id: authorId, name, image: authorImage },
    id: postId,
    content,
    image: postImage,
    createdAt,
    likesCount,
    commentsCount,
  } = post;

  const [editMode, setEditMode] = useState(false);
  const { authUserId } = useContext(AuthContext);
  const history = useHistory();

  const { isLoading, sendRequest } = useHttp();
  const PATH_LIKE_POST = `users/${authUserId}/posts/${postId}/likes`;

  const setPostLikes = useCallback(
    (data) => dispatchPosts({ type: "SET_POST_LIKES", payload: { postId: postId, likesCount: data } }),
    [dispatchPosts, postId]
  );

  const likePostHandler = async () => {
    await sendRequest("post", PATH_LIKE_POST, null, setPostLikes);
  };

  const navigateToPostHandler = () => {
    history.push(`/users/${authorId}/posts/${postId}`);
  };

  const toggleEditModeHandler = () => {
    setEditMode((prevState) => !prevState);
  };

  return (
    <li>
      <Card as="article" hasPadding={true}>
        <header className={classes.header}>
          <Avatar image={authorImage} alt={name} dimension={6} />
          <div>
            <UserNameLink userId={authorId}>{name}</UserNameLink>
            <time dateTime={createdAt} className={classes.createdAt}>
              {isInPostPage ? convertToLocaleDate(createdAt) : convertToTimeAgo(createdAt)}
            </time>
          </div>
          {authUserId === authorId && (
            <ArticleOptions
              btnLabel="Post Options"
              postId={postId}
              dispatchPosts={dispatchPosts}
              toggleEditModeHandler={toggleEditModeHandler}
            />
          )}
        </header>
        {editMode ? (
          <EditContent
            postId={postId}
            dispatchPosts={dispatchPosts}
            defaultContent={content}
            closeHandler={toggleEditModeHandler}
          />
        ) : (
          <p className={classes.content}>{content}</p>
        )}
        {postImage && (
          <img
            src={postImage}
            alt={`Posted by ${name}`}
            className={classes.postImage}
          />
        )}
        <footer className={classes.footer}>
          <IconButton
            icon={FaHeart}
            label={`${likesCount} Likes`}
            hasVisibleLabel={true}
            className={classes.footerIcon}
            isLoading={isLoading}
            onClick={likePostHandler}
          />
          <IconButton
            icon={MdInsertComment}
            label={`${commentsCount} Comments`}
            hasVisibleLabel={true}
            className={classes.footerIcon}
            onClick={navigateToPostHandler}
          />
        </footer>
      </Card>
    </li>
  );
};

export default Post;
