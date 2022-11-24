import { RiUserAddFill, RiUserFollowFill } from "react-icons/ri";

import Avatar from "../UI/Avatar";
import UserNameLink from "../UI/UserNameLink";
import IconButton from "../UI/IconButton";
import classes from "./UserRow.module.css";

import useFollowing from "../../hooks/use-following";

const UserRow = ({ user, secondaryTitle }) => {
  const {
    id,
    name,
    country,
    image,
    followers: { length: followers },
  } = user;

  const { isFollowed, isLoading, followUserHandler } = useFollowing(id);

  return (
    <li>
      <article className={classes.container}>
        <Avatar image={image} alt={name} dimension={4} />
        <div className={classes.textContainer}>
          <UserNameLink userId={id}>{name}</UserNameLink>
          <span>
            {(secondaryTitle === "followers" && `${followers} Followers`) || (secondaryTitle === "country" && country)}
          </span>
        </div>
        <IconButton
          icon={isFollowed ? RiUserFollowFill : RiUserAddFill}
          label="Follow user"
          className={`${classes.followBtn} ${isFollowed && classes.followBtnFollowed}`}
          isLoading={isLoading}
          onClick={followUserHandler}
        />
      </article>
    </li>
  );
};

export default UserRow;
